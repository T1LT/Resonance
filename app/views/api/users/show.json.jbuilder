json.user do
    json.extract! @user, :id, :email, :username, :tag, :created_at, :updated_at
end