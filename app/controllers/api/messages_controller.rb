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
            ChannelsChannel.broadcast_to @message.channel,
                type: 'RECEIVE_MESSAGE',
                **from_template('api/messages/show', message: @message)
            render json: nil, status: :ok
        else
            render json: { errors: @message.errors.full_messages }, status: 422
        end
    end

    def update
        @message = Message.find(params[:id])
        if @message.sender_id == current_user.id
            if @message.update(message_params)
                ChannelsChannel.broadcast_to @message.channel,
                    type: 'UPDATE_MESSAGE',
                    **from_template('api/messages/show', message: @message)
                render json: nil, status: :ok
            else
                render json: { errors: @message.errors.full_messages }, status: 422
            end
        else
            render json: { errors: ["Only the sender can update this message."] }, status: 422
        end
    end

    def destroy
        @message = Message.find(params[:id])
        if @message.channel.server
            owner_id = @message.channel.server.owner_id
        else
            owner_id = @message.sender_id
        end
        if current_user.id == owner_id || @message.sender_id == current_user.id
            if @message.destroy
                ChannelsChannel.broadcast_to @message.channel,
                    type: 'DESTROY_MESSAGE',
                    id: @message.id
                render json: nil, status: :ok
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
