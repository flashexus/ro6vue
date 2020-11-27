class StampsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_stamp, only: [:show, :edit, :update, :destroy]

  # GET /stamp
  # GET /stamp.json
  def index
    @stamps = Stamp.where(user_id:current_user.id)
    areas = Point::AREA__GROUP_TYPE
    @bingo = {}
    
    @sp_record = Stamp.includes(:point).where(user_id:current_user.id).where(points:{sp_flg:true})
    @sp_cnt = @sp_record.count

  #スタンプ情報をエリアごとにハッシュ配列に並び替え
    areas.each do |area|
      hash = []
      @stamps.each do |stamp|
        if(area === stamp.point.area_group)
        hash << {'id' => stamp.point.id, 'name' => stamp.point.name}
        end
      end
      @bingo[area] = hash
    end

  #ビンゴ数の判定
    @bingo_cnt = bingo(@bingo)

    gon.stamps = @stamps
    gon.bingo = @bingo
    gon.bingo_cnt = @bingo_cnt
  end

  def servey
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
    point = params[:point_id].split("stamps/add/")
    @stamp.point_id = point[1]
    if Stamp.exists?( user_id: @stamp.user_id, point_id: @stamp.point_id )
      respond_to do |format|
        format.json { render json: '既に登録されています。' ,status: :unprocessable_entity }
      end
    else
      #本番ではここで重複チェックが必要
      respond_to do |format|
        if @stamp.save
          format.json { render :json => { status: "200" } }
        else
          format.json { render json: @stamp.errors, status: :unprocessable_entity }
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
    @stamp.point_id = params[:point_id]

    #本番ではここで重複チェックが必要
    respond_to do |format|
      if @stamp.save
        format.html { redirect_to stamps_path, notice: 'Stamp was successfully created.' }
      else
        format.html { render :new }
      end
    end
  end

  # PATCH/PUT /stamp/1
  # PATCH/PUT /stamp/1.json
  def update
    respond_to do |format|
      if @stamp.update(stamp_params)
        format.html { redirect_to @stamp, notice: 'Stamp was successfully updated.' }
        format.json { render :show, status: :ok, location: @stamp }
      else
        format.html { render :edit }
        format.json { render json: @stamp.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /stamp/1
  # DELETE /stamp/1.json
  def destroy
    @stamp.destroy
    respond_to do |format|
      format.html { redirect_to stamp_url, notice: 'Stamp was successfully destroyed.' }
      format.json { head :no_content }
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

end
