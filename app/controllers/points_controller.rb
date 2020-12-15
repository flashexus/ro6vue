class PointsController < ApplicationController
  before_action :authenticate_user!
  #before_action :set_point, only: [:show, :edit, :update, :destroy]
  # GET /points
  # GET /points.json
  def index
    @points = Point.all
    @user = current_user
    @icon_hash = Point::ICON
    @area_pos = Point::AREA_POS
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
    @icon_hash = Point::ICON

    render partial: 'shop_table',
           locals: {points: @points, select_area:@select_area, icon_hash:@icon_hash}
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
