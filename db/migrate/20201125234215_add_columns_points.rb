class AddColumnsPoints < ActiveRecord::Migration[6.0]
  def change
    add_column :points, :sp_flg, :boolean, default: false, null: false
    add_column :points, :zipcode, :string
    add_column :points, :TEL, :string
    add_column :points, :holiday, :string
  end
end
