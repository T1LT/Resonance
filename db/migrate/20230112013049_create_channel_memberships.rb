class CreateChannelMemberships < ActiveRecord::Migration[7.0]
  def change
    create_table :channel_memberships do |t|
      t.references :user, foreign_key: true, index: false
      t.references :channel, foreign_key: true
      t.index [:user_id, :channel_id], unique: true
      t.timestamps
    end
  end
end
