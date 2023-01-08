class Api::FriendshipsController < ApplicationController
    wrap_parameters include: Message.attribute_names

    def index
        @friendships = current_user.friends
        render :index
    end

    def create
        @friendship = Friendship.new(friendship_params)
        if @friendship.save
            render :show
        else
            render json: { errors: @friendship.errors.full_messages }, status: 422
        end
    end

    def update
        @friendship = Friendship.find(params[:id])
        if @friendship.update(status_params)
            render :show
        else
            render json: { errors: @friendship.errors.full_messages }, status: 422
        end
    end

    def destroy
        @friendship = Friendship.find(params[:id])
        if @friendship.destroy
            head :no_content
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
