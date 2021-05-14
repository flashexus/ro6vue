class CreateEmployees < ActiveRecord::Migration[6.0]
  def change
    create_table :employees do |t|
      t.string :name, null: false, default: ""
      t.string :department, null: false, default: ""
      t.integer :gender, null: false, default: 0
      t.date :birth, null: true
      t.date :joined_date, null: true
      t.bigint :payment, null: false, default: 0
      t.text :note, null: false

      t.timestamps
      t.integer :lock_version
    end
  end
end
