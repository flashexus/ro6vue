class PointsController < ApplicationController
  before_action :authenticate_user!
  #before_action :set_point, only: [:show, :edit, :update, :destroy]
  # GET /points
  # GET /points.json
  def index
    @points = Point.all
    @user = current_user

    @link_path = Point::LINK_PATH
    @icon_hash = {
      "セルフ"=> {
        "男性" => ApplicationController.helpers.master_icon_path("static/boy.gif"),
        "女性" => ApplicationController.helpers.master_icon_path("static/girl.gif"),
        "その他" => ApplicationController.helpers.master_icon_path("static/qoo.gif"),
      },
      "宿泊" => ApplicationController.helpers.master_icon_path("image_stamps/icon_02.png"),
      "飲食店" => ApplicationController.helpers.master_icon_path("image_stamps/icon_03.png"),
      "日帰り温泉" => ApplicationController.helpers.master_icon_path("image_stamps/icon_04.png"),
      "神楽会場" => ApplicationController.helpers.master_icon_path("image_stamps/icon_06.png"),
      "観光施設" => ApplicationController.helpers.master_icon_path("image_stamps/icon_07.png"),
      "道の駅" => ApplicationController.helpers.master_icon_path("image_stamps/icon_08.png"),
      "美術館" => ApplicationController.helpers.master_icon_path("image_stamps/icon_09.png"),
      "ガソリンスタンド" => ApplicationController.helpers.master_icon_path("image_stamps/icon_10.png"),
      "その他" => ApplicationController.helpers.master_icon_path("image_stamps/icon_11.png")
    }
    @area_pos = Point::AREA_POS
    @select_area = Point::INIT_AREA

    gon.select_area = @select_area
    gon.user = @user
    gon.icon = @icon_hash
    gon.points = @points
    gon.area_pos = @area_pos
    gon.link_path = @link_path
  end

  def ajax_area_shop
    @select_area = params[:area]
    @points = Point.where(area_group: @select_area)
    @icon_hash = {
      "セルフ"=> {
        "男性" => ApplicationController.helpers.master_icon_path("static/boy.gif"),
        "女性" => ApplicationController.helpers.master_icon_path("static/girl.gif"),
        "その他" => ApplicationController.helpers.master_icon_path("static/qoo.gif"),
      },
      "宿泊" => ApplicationController.helpers.master_icon_path("image_stamps/icon_02.png"),
      "飲食店" => ApplicationController.helpers.master_icon_path("image_stamps/icon_03.png"),
      "日帰り温泉" => ApplicationController.helpers.master_icon_path("image_stamps/icon_04.png"),
      "神楽会場" => ApplicationController.helpers.master_icon_path("image_stamps/icon_06.png"),
      "観光施設" => ApplicationController.helpers.master_icon_path("image_stamps/icon_07.png"),
      "道の駅" => ApplicationController.helpers.master_icon_path("image_stamps/icon_08.png"),
      "美術館" => ApplicationController.helpers.master_icon_path("image_stamps/icon_09.png"),
      "ガソリンスタンド" => ApplicationController.helpers.master_icon_path("image_stamps/icon_10.png"),
      "その他" => ApplicationController.helpers.master_icon_path("image_stamps/icon_11.png")
  }

    render partial: 'shop_table',
           locals: {points: @points, select_area:@select_area, icon_hash:@icon_hash}
  end

  def ajax_select_shop
    @select_area = params[:area]
    @select_shop = params[:shop_type]
    if @select_shop == "全て"
      @points = Point.where(area_group: @select_area)
    else
      @points = Point.where(area_group: @select_area,shop_type:@select_shop)
    end
    @icon_hash = {
      "セルフ"=> {
        "男性" => ApplicationController.helpers.master_icon_path("static/boy.gif"),
        "女性" => ApplicationController.helpers.master_icon_path("static/girl.gif"),
        "その他" => ApplicationController.helpers.master_icon_path("static/qoo.gif"),
      },
      "宿泊" => ApplicationController.helpers.master_icon_path("image_stamps/icon_02.png"),
      "飲食店" => ApplicationController.helpers.master_icon_path("image_stamps/icon_03.png"),
      "日帰り温泉" => ApplicationController.helpers.master_icon_path("image_stamps/icon_04.png"),
      "神楽会場" => ApplicationController.helpers.master_icon_path("image_stamps/icon_06.png"),
      "観光施設" => ApplicationController.helpers.master_icon_path("image_stamps/icon_07.png"),
      "道の駅" => ApplicationController.helpers.master_icon_path("image_stamps/icon_08.png"),
      "美術館" => ApplicationController.helpers.master_icon_path("image_stamps/icon_09.png"),
      "ガソリンスタンド" => ApplicationController.helpers.master_icon_path("image_stamps/icon_10.png"),
      "その他" => ApplicationController.helpers.master_icon_path("image_stamps/icon_11.png")
  }

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
