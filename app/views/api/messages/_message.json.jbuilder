json.extract! message, :id, :sender_id, :channel_id, :body, :created_at, :updated_at
json.user do
    json.partial! 'api/users/user', user: message.sender
end