# == Schema Information
#
# Table name: servers
#
#  id          :bigint           not null, primary key
#  server_name :string           not null
#  owner_id    :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Server < ApplicationRecord
    validates :server_name, presence: true, uniqueness: true
    
    belongs_to :owner,
        foreign_key: :owner_id,
        class_name: :User

    has_many :server_memberships,
        foreign_key: :server_id,
        class_name: :ServerMembership

    has_many :users,
        through: :server_memberships,
        source: :user,
        dependent: :destroy
end
