class PointsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_point, only: [:show, :edit, :update, :destroy]
  # GET /points
  # GET /points.json
  def index
    @points = Point.all
    @user = current_user
    @icon_hash = {
      "観光施設" => ApplicationController.helpers.master_icon_path("static/roggi.png"),
      "飲食店" => ApplicationController.helpers.master_icon_path("static/inshoku.png"),
      "宿泊" => ApplicationController.helpers.master_icon_path("static/hotel.png"),
      "日帰り温泉" => ApplicationController.helpers.master_icon_path("static/fuwa.gif"),
      "道の駅" => ApplicationController.helpers.master_icon_path("static/yado.gif"),
      "その他" => ApplicationController.helpers.master_icon_path("static/hatena2.gif"),  
    }
    @area_pos ={
      "石西エリア" => [131.482636,34.433905],
      "石央エリア" => [132.144666,34.959614],
      "石東エリア" => [132.445299,35.113757],
    }
    gon.user = @user
    gon.icon = @icon_hash
    gon.points = @points
    gon.area_pos = @area_pos

  end

  # GET /points/1
  # GET /points/1.json
  def show
  end

  # GET /points/new
  def new
    @point = Point.new
  end

  # GET /points/1/edit
  def edit
  end

  # POST /points
  # POST /points.json
  def create
    @point = Point.new(point_params)

    respond_to do |format|
      if @point.save
        format.html { redirect_to @point, notice: 'Point was successfully created.' }
        format.json { render :show, status: :created, location: @point }
      else
        format.html { render :new }
        format.json { render json: @point.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /points/1
  # PATCH/PUT /points/1.json
  def update
    respond_to do |format|
      if @point.update(point_params)
        format.html { redirect_to @point, notice: 'Point was successfully updated.' }
        format.json { render :show, status: :ok, location: @point }
      else
        format.html { render :edit }
        format.json { render json: @point.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /points/1
  # DELETE /points/1.json
  def destroy
    @point.destroy
    respond_to do |format|
      format.html { redirect_to points_url, notice: 'Point was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_point
      @point = Point.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def point_params
      params.require(:point).permit(:name, :desc, :lon, :lat, :path, :deleted_at)
    end
end
