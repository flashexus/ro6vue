class AddColumnToUsersApplyFlg < ActiveRecord::Migration[6.0]
  def change
    add_column :users,:apply_flg, :boolean, default: false, null: false
  end
end
