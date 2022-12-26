class Api::SessionsController < ApplicationController
    def create
        credential = params[:credential]
        password = params[:password]
        @user = User.find_by_credentials(credential, password)
        if @user
            login!(@user)
            render 'api/users/show'
        else
            render json: { errors: ['Login or password is invalid.'] }, status: :unauthorized
        end
    end

    def show
        if current_user
            @user = current_user
            render 'api/users/show'
        else
            render json: { user: nil }
        end
    end

    def destroy
        logout!
        render json: { message: "success" }
    end
end
