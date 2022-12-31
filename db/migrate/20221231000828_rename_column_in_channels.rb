class RenameColumnInChannels < ActiveRecord::Migration[7.0]
  def change
    remove_column :channels, :type
    add_column :channels, :channel_type, :string, null: false, default: "public"
  end
end
