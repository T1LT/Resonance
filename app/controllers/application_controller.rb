class ApplicationController < ActionController::API
    include ActionController::RequestForgeryProtection
    protect_from_forgery with: :exception
    rescue_from StandardError, with: :unhandled_error
    rescue_from ActionController::InvalidAuthenticityToken,
        with: :invalid_authenticity_token
    before_action :snake_case_params, :attach_authenticity_token
    helper_method :current_user, :from_template

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def require_logged_in
        if !current_user
            render json: { message: "Unauthorized" }, status: :unauthorized
        end
    end

    def login!(user)
        user.status = "online"
        session[:session_token] = user.reset_session_token!
    end

    def logout!
        current_user.status = "offline"
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end

    def logged_in?
        !!current_user
    end

    def from_template(template, locals = {})
        JSON.parse(self.class.render(:json, template: template, locals: locals))
    end

    private
    def snake_case_params
        params.deep_transform_keys!(&:underscore)
    end

    def attach_authenticity_token
        headers["X-CSRF-Token"] = masked_authenticity_token(session)
    end

    def invalid_authenticity_token
        render json: { message: "Invalid authenticity token" }, status: :unauthorized
    end

    def unhandled_error(error)
        if request.accepts.first.html?
            raise error
        else
            @message = "#{error.class} - #{error.message}"
            @stack = Rails::BacktraceCleaner.new.clean(error.backtrace)
            render 'api/errors/internal_server_error', status: 500
            logger.error "\n#{@message}:\n\t#{@stack.join("\n\t")}\n"
        end
    end
end
