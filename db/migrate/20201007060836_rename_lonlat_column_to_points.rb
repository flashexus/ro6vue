class RenameLonlatColumnToPoints < ActiveRecord::Migration[6.0]
  def change
    change_column :points, :lon, :decimal, precision: 10, scale: 7
    change_column :points, :lat, :decimal, precision: 10, scale: 7
    add_column :points, :area_group_id, :integer
    add_column :points, :type_id, :integer
    add_column :points, :show_no, :integer
  end
end
