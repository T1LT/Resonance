json.extract! @friendship, :id, :created_at, :updated_at
if @friendship.user1_id == current_user.id
    json.friend User.find(@friendship.user2_id)
else
    json.friend User.find(@friendship.user1_id)
end