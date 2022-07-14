class Point < ApplicationRecord
    has_many :stamps, dependent: :destroy
    INIT_AREA = "エリア1"
    #area group Const
    AREA__GROUP_TYPE = %w(エリア1 エリア2 エリア3)
    #area group Const
    POINT_TYPE = %w(観光施設 飲食店 宿泊 日帰り温泉 道の駅 その他)

    AREA_POS = {
        "エリア1" => [131.482636,34.433905],
        "エリア2" => [132.144666,34.959614],
        "エリア3" => [132.445299,35.113757],
    }

    LINK_PATH = {
        "エリア1" => "https://www.all-iwami.com/contents/stamprally/sekisei/",
        "エリア2" => "https://www.all-iwami.com/contents/stamprally/sekiou/",
        "エリア3" => "https://www.all-iwami.com/contents/stamprally/sekitou/",
    }

    ICON = %w({
        "宿泊" => ApplicationController.helpers.master_icon_path("image_stamps/icon_02.png"),
        "飲食店" => ApplicationController.helpers.master_icon_path("image_stamps/icon_03.png"),
        "日帰り温泉" => ApplicationController.helpers.master_icon_path("image_stamps/icon_04.png"),
        "神楽会場" => ApplicationController.helpers.master_icon_path("image_stamps/icon_06.png"),
        "観光施設" => ApplicationController.helpers.master_icon_path("image_stamps/icon_07.png"),
        "セルフ" => ApplicationController.helpers.master_icon_path("image_stamps/assets3.png"),
        "道の駅" => ApplicationController.helpers.master_icon_path("image_stamps/icon_08.png"),
        "美術館" => ApplicationController.helpers.master_icon_path("image_stamps/icon_09.png"),
        "ガソリンスタンド" => ApplicationController.helpers.master_icon_path("image_stamps/icon_10.png"),
        "その他" => ApplicationController.helpers.master_icon_path("image_stamps/icon_11.png")
    })
end
