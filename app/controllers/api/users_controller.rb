class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ["password"]

    def create
        @user = User.new(user_params)
        @user.status = "online"
        if @user.save
            login!(@user)
            render :show
        else
            render json: { errors: @user.errors.full_messages }, status: 422
        end
    end

    private
    def user_params
        params.require(:user).permit(:email, :username, :tag, :password)
    end
end
