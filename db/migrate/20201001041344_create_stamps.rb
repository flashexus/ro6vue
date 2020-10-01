class CreateStamps < ActiveRecord::Migration[6.0]
  def change
    create_table :stamps do |t|
      t.string :name
      t.bigint :user_id
      t.bigint :point_id
      t.timestamps null: false
    end
  end
end
