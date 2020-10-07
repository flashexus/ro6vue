class CreatePoints < ActiveRecord::Migration[6.0]
  def change
    create_table :points do |t|
      t.string :name
      t.string :desc
      t.float :lat
      t.float :lon
      t.string :path
      t.timestamp :deleted_at

      t.timestamps
    end
  end
end
