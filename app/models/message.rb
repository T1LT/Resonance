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
    validates :body, presence: true

    belongs_to :sender,
        foreign_key: :sender_id,
        class_name: :User

    belongs_to :channel,
        foreign_key: :channel_id,
        class_name: :Channel

    has_one :parent,
        foreign_key: :parent_id,
        class_name: :Message,
        dependent: :destroy
end
