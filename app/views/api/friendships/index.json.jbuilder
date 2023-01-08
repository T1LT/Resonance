json.friendships do
    @friendships.each do |friendship|
        json.set! friendship.id do
            json.extract! friendship, :id, :created_at, :updated_at
            json.user1 User.find(friendship.user1_id)
            json.user2 User.find(friendship.user2_id)
        end
    end
end