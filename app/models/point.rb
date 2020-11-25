class Point < ApplicationRecord
    has_many :stamps
    INIT_AREA = "石央エリア"
    #area group Const
    AREA__GROUP_TYPE = %w(石西エリア 石央エリア 石東エリア)
    #area group Const
    POINT_TYPE = %w(観光施設 飲食店 宿泊 日帰り温泉 道の駅 その他)
end
