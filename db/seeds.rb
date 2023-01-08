# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Destroying all previous rows..."
User.destroy_all
Server.destroy_all
Channel.destroy_all
ServerMembership.destroy_all
Message.destroy_all

puts "Resetting primary keys..."
ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('server')
ApplicationRecord.connection.reset_pk_sequence!('channels')
ApplicationRecord.connection.reset_pk_sequence!('server_memberships')
ApplicationRecord.connection.reset_pk_sequence!('messages')

user1 = User.create!(username: "Demo", tag: "0001", email: "demo@demo.io", password: "password", status: "online")
user2 = User.create!(username: "nishant", tag: "2525", email: "nishant.racherla@gmail.com", password: "password", status: "online")
user3 = User.create!(username: "faker", tag: "ggwp", email: "faker@gmail.com", password: "password", status: "online")
user4 = User.create!(username: "maxfong", tag: "6942", email: "maxfong@gmail.com", password: "password", status: "online")
user5 = User.create!(username: "cbum", tag: "5000", email: "cbum@gmail.com", password: "password", status: "online")

my_squad = Server.create!(server_name: "MySquad", owner_id: user1.id)
js_moon = Server.create!(server_name: "JavaScript to the Moon", owner_id: user2.id)
fit_buds = Server.create!(server_name: "Fitness Buddies", owner_id: user5.id)

channel1 = Channel.create!(channel_name: "general", server_id: my_squad.id)
channel2 = Channel.create!(channel_name: "memes", server_id: my_squad.id)
channel3 = Channel.create!(channel_name: "coding-stuff", server_id: my_squad.id)

channel4 = Channel.create!(channel_name: "general", server_id: js_moon.id)
channel5 = Channel.create!(channel_name: "fun-methods", server_id: js_moon.id)
channel6 = Channel.create!(channel_name: "project-ideas", server_id: js_moon.id)
channel7 = Channel.create!(channel_name: "quirky-behavior", server_id: js_moon.id)
channel8 = Channel.create!(channel_name: "event-loop", server_id: js_moon.id)

channel9 = Channel.create!(channel_name: "general", server_id: fit_buds.id)
channel10 = Channel.create!(channel_name: "hiking", server_id: fit_buds.id)
channel11 = Channel.create!(channel_name: "personal-records", server_id: fit_buds.id)
channel12 = Channel.create!(channel_name: "progress-updates", server_id: fit_buds.id)

ServerMembership.create!(user_id: user1.id, server_id: my_squad.id)
ServerMembership.create!(user_id: user2.id, server_id: my_squad.id)
ServerMembership.create!(user_id: user3.id, server_id: my_squad.id)

ServerMembership.create!(user_id: user1.id, server_id: js_moon.id)
ServerMembership.create!(user_id: user2.id, server_id: js_moon.id)
ServerMembership.create!(user_id: user3.id, server_id: js_moon.id)
ServerMembership.create!(user_id: user4.id, server_id: js_moon.id)
ServerMembership.create!(user_id: user5.id, server_id: js_moon.id)

ServerMembership.create!(user_id: user2.id, server_id: fit_buds.id)
ServerMembership.create!(user_id: user5.id, server_id: fit_buds.id)

Message.create!(sender_id: user1.id, channel_id: channel1.id, body: "hey yall!", parent_id: nil)
Message.create!(sender_id: user2.id, channel_id: channel1.id, body: "hey hey", parent_id: nil)
Message.create!(sender_id: user1.id, channel_id: channel1.id, body: "sup", parent_id: nil)
Message.create!(sender_id: user3.id, channel_id: channel1.id, body: "yooo", parent_id: nil)
Message.create!(sender_id: user2.id, channel_id: channel1.id, body: "is this up and running??", parent_id: nil)
Message.create!(sender_id: user1.id, channel_id: channel1.id, body: "yessir!", parent_id: nil)

Message.create!(sender_id: user4.id, channel_id: channel4.id, body: "*clears throat*", parent_id: nil)
Message.create!(sender_id: user4.id, channel_id: channel4.id, body: "ruby bad", parent_id: nil)
Message.create!(sender_id: user1.id, channel_id: channel4.id, body: "*gasp*", parent_id: nil)
Message.create!(sender_id: user2.id, channel_id: channel4.id, body: "*gasp*", parent_id: nil)
Message.create!(sender_id: user3.id, channel_id: channel4.id, body: "*gasp*", parent_id: nil)
Message.create!(sender_id: user5.id, channel_id: channel4.id, body: "*gasp*", parent_id: nil)

Message.create!(sender_id: user2.id, channel_id: channel9.id, body: "yo", parent_id: nil)
Message.create!(sender_id: user5.id, channel_id: channel9.id, body: "you ready?", parent_id: nil)
Message.create!(sender_id: user2.id, channel_id: channel9.id, body: "yeee", parent_id: nil)