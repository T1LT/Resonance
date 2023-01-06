class Api::ChannelsController < ApplicationController
    wrap_parameters include: Channel.attribute_names

    def index
        @server = Server.find(params[:server_id])
        @channels = @server.channels
        render :index
    end

    def show
        @channel = Channel.find(params[:id])
        render :show
    end

    def create
        @server = Server.find(params[:server_id])
        @channel = Channel.new(channel_params)
        if @channel.save
            ServersChannel.broadcast_to @server,
                type: 'RECEIVE_CHANNEL',
                **from_template('api/channels/show', channel: @channel)
            render :show
        else
            render json: { errors: @channel.errors.full_messages }, status: 422
        end
    end

    def update
        @channel = Channel.find(params[:id])
        @server = @channel.server
        if current_user.id == @server.owner_id 
            if @channel.update(channel_params)
                ServersChannel.broadcast_to @server,
                    type: 'UPDATE_CHANNEL',
                    **from_template('api/channels/show', channel: @channel)
            render :show
            else
                render json: { errors: @channel.errors.full_messages }, status: 422
            end
        else
            render json: { errors: ["Only the owner of this server can edit this channel."] }, status: 422
        end
    end

    def destroy
        @channel = Channel.find(params[:id])
        @server = @channel.server
        if current_user.id == @server.owner_id
            if @channel.destroy
                ServersChannel.broadcast_to @server,
                    type: 'DESTROY_CHANNEL',
                    id: @channel.id
                render json: nil, status: :ok
            else
                render json: { errors: @message.errors.full_messages }, status: 422
            end
        else
            render json: { errors: ["Only the owner of this server can delete this channel."] }, status: 422
        end
    end

    private
    def channel_params
        params.require(:channel).permit(:channel_name, :server_id, :channel_type)
    end
end
