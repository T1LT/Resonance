json.user do
    json.extract! @user, :id, :email, :username, :tag, :created_at, :updated_at
    json.servers do
        @user.servers.each do |server|
            json.set! server.id do
                json.extract! server, :id, :server_name, :owner_id, :created_at
            end
        end
    end
end