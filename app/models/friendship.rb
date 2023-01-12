# == Schema Information
#
# Table name: friendships
#
#  id         :bigint           not null, primary key
#  user1_id   :bigint           not null
#  user2_id   :bigint           not null
#  status     :string           default("pending"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Friendship < ApplicationRecord
    validates :status, inclusion: { in: ["pending", "friends", "blocked"] }
    validates :user1_id, uniqueness: { scope: :user2_id }
    validates :user2_id, uniqueness: { scope: :user1_id }

    belongs_to :request_sender,
        foreign_key: :user1_id,
        class_name: :User

    belongs_to :request_receiver,
        foreign_key: :user2_id,
        class_name: :User

    def dm_channel
        user1 = User.find(self.user1_id)
        user2 = User.find(self.user2_id)
        hash = {}
        user1.dm_channels.each do |u1_channel|
            hash[u1_channel.id] = u1_channel
        end
        user2.dm_channels.each do |u2_channel|
            if hash[u2_channel.id]
                return u2_channel
            end
        end
    end
end
