# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  sender_id  :bigint           not null
#  channel_id :bigint           not null
#  body       :text             not null
#  parent_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord
end
