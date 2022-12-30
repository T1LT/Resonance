class Api::ChannelsController < ApplicationController
    wrap_parameters include: Channel.attribute_names
end
