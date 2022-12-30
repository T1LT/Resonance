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
            @channel.destroy
        else
            render json: { errors: ["Only the owner of this server can delete this channel."] }, status: 422
        end
    end

    private
    def channel_params
        params.require(:channel).permit(:channel_name)
    end
end
