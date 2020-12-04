class StampsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_stamp, only: [:show, :edit, :update, :destroy]

  # GET /stamp
  # GET /stamp.json
  def index
    @bingo_flg = updateBingoStatus()

    @status = BingoStatus.find_by(user_id:current_user.id)
    @bingo_cnt = @status.bingo_cnt
    @bingo = JSON.parse(@status.bingo_matrix)

    gon.bingo = @bingo
    gon.bingo_cnt = @bingo_cnt
  end

  def servey
    @question = Servey::QUESTION
    bingo_cnt = params[:bingo_cnt]
    @gift = { :'1ビンゴ' => Servey::GIFT['1ビンゴ'] }

    if bingo_cnt.to_i >= 2
      @gift['2ビンゴ'] = Servey::GIFT['2ビンゴ']
    end
    if bingo_cnt.to_i >= 6
      @gift['6ビンゴ'] = Servey::GIFT['6ビンゴ']
    end
 
    end

  def send_mail
    #bingo count などもっていかないといけない
    @servey = Servey.new
    @servey.user_id = current_user.id
    @servey.TEL_number = params['TEL_number']
    @servey.address = params['address']
    @servey.zipcode = params['zipcode']
    @servey.full_name = params['full_name']
    @servey.gift = params['gift']
    @servey.question1 = params['question1']
    @servey.question2 = params['question2']
    #個人情報を保管しない場合は↓をコメントアウトする
    @servey.save!

    @status = BingoStatus.find_by(user_id:current_user.id)
    ApplyMailer.for_campaign(@servey,@status,current_user).deliver

    #応募済みフラグを立てる
    user = User.find(current_user.id)
    user.apply_flg = TRUE
    user.save!
    redirect_to action: "thanks"
  end

  def thanks
  end

  # GET /stamp/new
  def new
    @stamp = Stamp.new
  end

  # GET /stamp/1/edit
  def edit
  end

  # POST /stamp
  # POST /stamp.json
  # サイトからQRコードを読み取り用(QRコードのアクセス方法の前提 https://domain/stamps/add/:id)
  def create
    @stamp = Stamp.new
    @stamp.user_id = current_user.id
    code = params[:point_id].split("stamps/add/")
    point = Point.find_by(code:code[1])
    #QRコードの有効性チェック
    if point.nil?
      respond_to do |format|
        format.json { render json: '無効なコードです。' ,status: :unprocessable_entity }
      end
    else
      @stamp.point_id = point.id
      #2重登録チェック
      if Stamp.exists?( user_id: @stamp.user_id, point_id: @stamp.point_id )
        respond_to do |format|
          format.json { render json: '既に登録されています。' ,status: :unprocessable_entity }
        end
      else
        respond_to do |format|
          if @stamp.save
            bingo_flg = updateBingoStatus()
            if bingo_flg === true
              format.json { render :json => { status: "200", message: "Bingo" } }
            else
              format.json { render :json => { status: "200", message: "Stamp" } }
            end
          else
            format.json { render json: @stamp.errors, status: :unprocessable_entity }
          end
        end
      end
    end

  end
  # POST /stamp
  # POST /stamp.json
  # スマフォのカメラから直接読み取り用
  def add
    @stamp = Stamp.new
    @stamp.user_id = current_user.id

    code = params[:point_id]
    point = Point.find_by(code:code)

    #QRコードの有効性チェック
    if point.nil?
      respond_to do |format|
        format.html { render json: '無効なコードです。' ,status: :unprocessable_entity }
      end
    else
      #ここで重複チェック
      @stamp.point_id = point.id
      if Stamp.exists?( user_id: @stamp.user_id, point_id: @stamp.point_id )
        respond_to do |format|
          format.html { render json: '既に登録されています。' ,status: :unprocessable_entity }
        end
      else
        respond_to do |format|
          if @stamp.save
            format.html { redirect_to stamps_path, notice: 'Stamp was successfully created.' }
          else
            format.html { render :new }
          end
        end
      end
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_stamp
      @stamp = Stamp.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def stamp_params
      params.require(:stamp).permit(:name, :user_id, :point_id)
    end

    # #tate bingo
    # #エリアごとにソート
    # #エリアごとにスタンプ数が３個以上のものを探す
    # ["東"][施設1,施設2,施設4] 3　
    # ["中"][施設3,施設6,]      2
    # ["西"][施設7]            1
    # #yoko 
    # #3つの値で全てが１以上なら１ビンゴ
    def bingo(stamp_c)
      tate_cnt = 0
      yoko_cnt = 0
      stamp_cnt =[]

      stamp_c.each_value{ |value|
        if(value.size >= 3)
          tate_cnt += 1 
        end
        stamp_cnt << value.size
      }
      yoko_cnt = stamp_cnt.min

      return yoko_cnt + tate_cnt
    end

    def updateBingoStatus
      stamps = Stamp.where(user_id:current_user.id)
      areas = Point::AREA__GROUP_TYPE

      #スタンプ情報をエリアごとにハッシュ配列に並び替え
      bingo_matrix = {}
      areas.each do |area|
        hash = []
        stamps.each do |stamp|
          if(area === stamp.point.area_group)
          hash << {'id' => stamp.point.show_no, 'name' => stamp.point.name}
          end
        end
        bingo_matrix[area] = hash
      end
      #ビンゴ数の判定
      bingo_cnt = bingo(bingo_matrix)

      ##取得スタンプ内の特別数をカウント
      sp_record = Stamp.includes(:point).where(user_id:current_user.id).where(points:{sp_flg:true})
      sp_cnt = sp_record.count
      if BingoStatus.exists?(user_id:current_user.id)
        @status = BingoStatus.find_by(user_id:current_user.id)
      else
        @status = BingoStatus.new
      end
      @status.user_id = current_user.id
      @status.stamp_cnt = stamps.count
      ##ビンゴ獲得の判定
      if(bingo_cnt > @status.bingo_cnt)
        bingo_flg = true
      end
      @status.bingo_cnt = bingo_cnt
      @status.sp_cnt = sp_cnt
      @status.bingo_matrix = JSON.generate(bingo_matrix)
      @status.save
      return bingo_flg
    end
end
