class Api::ServerMembershipsController < ApplicationController
    wrap_parameters include: ServerMembership.attribute_names

    def create
        @server_membership = ServerMembership.new(server_membership_params)
        @server = Server.find(params[:server_membership][:server_id])
        if @server_membership.save
            render :show
        else
            render json: { errors: @server_membership.errors.full_messages }, status: 422
        end
    end

    def destroy
        @server_membership = ServerMembership.find_by(server_membership_params)
        @user = current_user
        if @server_membership.user_id == current_user.id && @server_membership.destroy
            render "api/users/show"
        else
            render json: { errors: @server_membership.errors.full_messages }, status: 422
        end
    end

    private
    def server_membership_params
        params.require(:server_membership).permit(:user_id, :server_id)
    end
end
