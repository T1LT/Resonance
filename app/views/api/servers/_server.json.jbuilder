json.extract! server, :id, :server_name, :owner_id

# json.channels here

json.users do
    server.users.each do |user|
        json.set! user.id do
            json.partial! "api/users/user", user: user
        end
    end
end