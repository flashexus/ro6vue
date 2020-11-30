class PointsController < ApplicationController
  before_action :authenticate_user!
  #before_action :set_point, only: [:show, :edit, :update, :destroy]
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
      "セルフ" => ApplicationController.helpers.master_icon_path("image_stamps/sr.png")
    }
    @area_pos ={
      "石西エリア" => [131.482636,34.433905],
      "石央エリア" => [132.144666,34.959614],
      "石東エリア" => [132.445299,35.113757],
    }
    @select_area = Point::INIT_AREA

    gon.select_area = @select_area
    gon.user = @user
    gon.icon = @icon_hash
    gon.points = @points
    gon.area_pos = @area_pos
  end

  def ajax_area_shop
    @select_area = params[:area]
    @points = Point.where(area_group: @select_area)
    render partial: 'shop_table',
           locals: {points: @points, select_area:@select_area}
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
