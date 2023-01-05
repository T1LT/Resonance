class ServersChannel < ApplicationCable::Channel
    def subscribed
        @server = Server.find(params[:id])
        stream_for @server
    end
end