class Stamp < ApplicationRecord
  belongs_to :user
  belongs_to :point, optional: true
end
