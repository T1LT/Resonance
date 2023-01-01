json.extract! server, :id, :server_name, :owner_id

json.users do
    server.users.each do |user|
        json.set! user.id do
            json.partial! "api/users/user", user: user
            if server
                json.membership_id ServerMembership.find_by(user_id: user.id, server_id: server.id).id
            end
        end
    end
end

json.default_channel do
    channel = server.channels.find_by(channel_name: "general")
    json.partial! "api/channels/channel", channel: channel
end