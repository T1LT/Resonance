# == Schema Information
#
# Table name: server_memberships
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  server_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ServerMembership < ApplicationRecord
    validates :user_id, uniqueness: { scope: :server_id }

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :server,
        foreign_key: :server_id,
        class_name: :Server
end
