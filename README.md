# [Resonance](https://resonance-jzh3.onrender.com)

## Overview

[Resonance](https://resonance-jzh3.onrender.com) is a clone of [Discord](https://discord.com), a VoIP and instant messaging social media platform. Discord has over 150 million active users as of 2022. Resonance is my attempt at making a website similar to Discord. Through Resonance users can communicate with each other via chat messages in real-time, create servers and channels, add other users as friends, and also invite other people to their servers.

## Technologies

To build Resonance, I used a React-Redux frontend paired with a Ruby on Rails backend, and PostgreSQL as the database management system. For the general styling I used CSS, I used [MUI](https://mui.com/) for the icons and AnimateOnScroll for the animations on the splash page. I also used Action Cable for the websocket connections to enable live updates for most of my CRUD features. 

## Features

Users can create their own servers and add as many channels as they like. Once they create servers and channels they can also edit or delete them. Users can send messages in these channels to talk with each other in real-time. They can also edit or delete their messages (if the user is the owner of the server, they can delete anyone's messages!).
