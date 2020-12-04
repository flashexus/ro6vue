class CreateBingoStatuses < ActiveRecord::Migration[6.0]
  def change
    create_table :bingo_statuses do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :stamp_cnt,           null: false, default: "0"
      t.integer :bingo_cnt,           null: false, default: "0"
      t.integer :sp_cnt,              null: false, default: "0"
      t.text    :bingo_matrix,        limit: 16777215
      t.timestamps
    end
  end
end
