class AddColumnToServeyZipcode < ActiveRecord::Migration[6.0]
  def change
    add_column :serveys, :zipcode, :string

  end
end
