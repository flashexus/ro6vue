class RenameNameColumnToStamps < ActiveRecord::Migration[6.0]
  def change
    remove_column :stamps, :name, :string
  end
end
