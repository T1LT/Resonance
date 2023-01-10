class FriendshipsChannel < ApplicationCable::Channel
    def subscribed
        @user = User.find(params[:id])
        stream_for @user
    end
end