json.extract! @channel, :id, :channel_name, :server_id, :channel_type, :created_at, :updated_at
json.dm_user do
    json.extract! *@channel.dm_users.select { |user| user != current_user }, :id, :username, :tag
end