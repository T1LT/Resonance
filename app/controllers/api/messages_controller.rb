class Api::MessagesController < ApplicationController
    wrap_parameters include: Message.attribute_names

    def index
        @channel = Channel.find(params[:channel_id])
        @messages = @channel.messages
        render :index
    end

    def show
        @message = Message.find(params[:id])
        render :show
    end

    def create
        @message = Message.new(message_params)
        if @message.save
            render :show
        else
            render json: { errors: @message.errors.full_messages }, status: 422
        end
    end

    def update
        @message = Message.find(params[:id])
        if @message.sender_id == current_user.id
            if @message.update(message_params)
                render :show
            else
                render json: { errors: @message.errors.full_messages }, status: 422
            end
        else
            render json: { errors: ["Only the sender can update this message."] }, status: 422
        end
    end

    def destroy
        @message = Message.find(params[:id])
        owner_id = @message.channel.server.owner_id
        if current_user.id == owner_id || @message.sender_id == current_user.id
            if @message.destroy
                render :show
            else
                render json: { errors: @message.errors.full_messages }, status: 422
            end
        else
            render json: { errors: ["Only the sender and the owner can delete this message."] }, status: 422
        end
    end

    private
    def message_params
        params.require(:message).permit(:sender_id, :channel_id, :body, :parent_id)
    end
end
