class AddColumnToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :gender, :integer
    add_column :users, :age, :integer
    add_column :users, :address, :string
  end
end
