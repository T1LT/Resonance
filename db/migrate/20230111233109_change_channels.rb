class ChangeChannels < ActiveRecord::Migration[7.0]
  def change
    change_column_null :channels, :server_id, true
  end
end
