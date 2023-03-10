class Api::ServersController < ApplicationController
    wrap_parameters include: Server.attribute_names

    def index
        @user = current_user
        @servers = @user.servers
        render :index
    end

    def show
        @server = Server.find(params[:id])
        @user = current_user
        # @membership_id = ServerMembership.find_by(user_id: @user.id, server_id: @server.id).id
        render :show
    end

    def create
        @server = Server.new(server_params)
        @server.owner_id = current_user.id
        if @server.save
            Channel.create(channel_name: "general", server_id: @server.id)
            @server_memberships = ServerMembership.create(user_id: current_user.id, server_id: @server.id)
            render :show
        else
            render json: { errors: @server.errors.full_messages }, status: 422
        end
    end

    def update
        @server = Server.find(params[:id])
        if @server.update(server_params)
            render :show
        else
            render json: { errors: @server.errors.full_messages }, status: 422
        end
    end

    def destroy
        @server = Server.find(params[:id])
        if @server.owner_id == current_user.id
            @server.destroy
        else
            render json: { errors: ["Only the owner of the server can delete this server."] }, status: 422
        end
    end

    private
    def server_params
        params.require(:server).permit(:server_name)
    end
end
