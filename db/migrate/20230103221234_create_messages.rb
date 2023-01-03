class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.references :sender, null: false, foreign_key: { to_table: :users }
      t.references :channel, null: false, foreign_key: true
      t.text :body, null: false
      t.references :parent, foreign_key: { to_table: :messages }
      t.timestamps
    end
  end
end
