class CreateServeys < ActiveRecord::Migration[6.0]
  def change
    create_table :serveys do |t|
      t.references :user, null: false, foreign_key: true
      t.string :TEL_number
      t.string :address
      t.string :full_name
      t.string :gift
      t.string :question1
      t.string :question2
      t.timestamps
    end
  end
end
