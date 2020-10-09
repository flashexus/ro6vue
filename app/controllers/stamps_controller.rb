class StampsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_stamp, only: [:show, :edit, :update, :destroy]

  # GET /stamp
  # GET /stamp.json
  def index
    @stamps = Stamp.where(user_id:current_user.id)
    areas = Point::AREA__GROUP_TYPE
    @bingo = {}

    areas.each do |area|
      array = []
      @stamps.each do |stamp|
        if(area === stamp.point.area_group)
        array << stamp.point.name
        end
      end
      @bingo[area] = array
    end
    gon.stamps = @stamps
    gon.bingo = @bingo
    # #tate bingo
    # #エリアごとにソート
    # #エリアごとにスタンプ数が３個以上のものを探す
    # ["東"][施設1,施設2,施設4] 3　
    # ["中"][施設3,施設6,]      2
    # ["西"][施設7]            1
    # #yoko 
    # #3つの値で全てが１以上なら１ビンゴ


  end

  # GET /stamp/1
  # GET /stamp/1.json
  def show
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
  def create
    @stamp = Stamp.new(stamp_params)

    respond_to do |format|
      if @stamp.save
        format.html { redirect_to @stamp, notice: 'Stamp was successfully created.' }
        format.json { render :show, status: :created, location: @stamp }
      else
        format.html { render :new }
        format.json { render json: @stamp.errors, status: :unprocessable_entity }
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

    def bingo(stamp_c)

      return bingo_cnt
    end

end
