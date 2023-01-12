class Api::FriendshipsController < ApplicationController
    wrap_parameters include: Friendship.attribute_names

    def index
        if current_user
            @friendships = current_user.friends
            render :index
        else
            render json: { errors: ["No user is logged in"] }, status: 422
        end
    end

    def create
        @friendship = Friendship.new(friendship_params)
        if @friendship.save
            @user1 = User.find(@friendship.user1_id)
            @user2 = User.find(@friendship.user2_id)
            @dm_channel = Channel.create(channel_name: "#{@user1.username}_#{@user2.username}_dm", channel_type: "private")
            ChannelMembership.create(user_id: @user1.id, channel_id: @dm_channel.id)
            ChannelMembership.create(user_id: @user2.id, channel_id: @dm_channel.id)
            FriendshipsChannel.broadcast_to(@user1, type: 'RECEIVE_FRIENDSHIP', **from_template('api/friendships/show', friendship: @friendship, current_user: current_user))
            FriendshipsChannel.broadcast_to(@user2, type: 'RECEIVE_FRIENDSHIP', **from_template('api/friendships/show', friendship: @friendship, current_user: current_user))
            render json: nil, status: :ok
        else
            render json: { errors: @friendship.errors.full_messages }, status: 422
        end
    end

    def update
        @friendship = Friendship.find(params[:id])
        if @friendship.update(status_params)
            @user1 = User.find(@friendship.user1_id)
            @user2 = User.find(@friendship.user2_id)
            @dm_channel = @friendship.dm_channel
            FriendshipsChannel.broadcast_to(@user1, type: 'UPDATE_FRIENDSHIP', **from_template('api/friendships/show', friendship: @friendship, current_user: @user2))
            FriendshipsChannel.broadcast_to(@user2, type: 'UPDATE_FRIENDSHIP', **from_template('api/friendships/show', friendship: @friendship, current_user: @user1))
            render json: nil, status: :ok
        else
            render json: { errors: @friendship.errors.full_messages }, status: 422
        end
    end

    def destroy
        @friendship = Friendship.find(params[:id])
        if @friendship.destroy
            @user1 = User.find(@friendship.user1_id)
            @user2 = User.find(@friendship.user2_id)
            FriendshipsChannel.broadcast_to(@user1, type: 'DESTROY_FRIENDSHIP', id: @friendship.id)
            FriendshipsChannel.broadcast_to(@user2, type: 'DESTROY_FRIENDSHIP', id: @friendship.id)
            render json: nil, status: :ok
        else
            render json: { errors: @friendship.errors.full_messages }, status: 422
        end
    end

    private
    def friendship_params
        params.require(:friendship).permit(:user1_id, :user2_id, :status)
    end

    def status_params
        params.require(:friendship).permit(:status)
    end
end
