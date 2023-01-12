# == Schema Information
#
# Table name: channel_memberships
#
#  id         :bigint           not null, primary key
#  user_id    :bigint
#  channel_id :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ChannelMembership < ApplicationRecord
    validates :user_id, uniqueness: { scope: :channel_id }

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :channel,
        foreign_key: :channel_id,
        class_name: :Channel
end
