json.extract! channel, :id, :channel_name, :server_id, :channel_type, :created_at, :updated_at
json.dm_user channel.dm_users.select { |user| user != current_user }