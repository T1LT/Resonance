# [Resonance](https://resonance-jzh3.onrender.com)

## Overview

[Resonance](https://resonance-jzh3.onrender.com) is a clone of [Discord](https://discord.com), a VoIP and instant messaging social media platform. Discord has over 150 million active users as of 2022. Resonance is my attempt at making a website similar to Discord. Through Resonance users can communicate with each other via chat messages in real-time, create servers and channels, add other users as friends, and also invite other people to their servers.

![SplashPage](https://user-images.githubusercontent.com/65653163/212204576-01eb9b33-70e9-499b-8360-067bad81d5ad.gif)

## Technologies

To build Resonance, I used a React-Redux frontend paired with a Ruby on Rails backend, and PostgreSQL as the database management system. For the general styling I used CSS, I used [MUI](https://mui.com/) for the icons and [AnimateOnScroll](https://michalsnik.github.io/aos/) for the animations on the splash page. I also used Action Cable for the websocket connections to enable live updates for most of my CRUD features. 

## Features

Users can create their own servers and add as many channels as they like. Once they create servers and channels they can also edit or delete them. Users can send messages in these channels to talk with each other in real-time. They can also edit or delete their messages (if the user is the owner of the server, they can delete anyone's messages!).

### Live Messages
![LiveMessages](https://user-images.githubusercontent.com/65653163/212205435-8030ddd5-c3e5-4e1b-b0d2-07d0f42ab949.gif)

### Message CRUD
![MessageCRUD](https://user-images.githubusercontent.com/65653163/212205820-773672fd-6be5-4b75-b182-3f402869f095.gif)

## Significant Code

### Invite Links
Users can invite other users to the servers they created, but the invite link needs to be secure, otherwise anyone who knows the ID of a particular server can access the server without being a part of it. To handle this issue, I used AES encryption from the [CryptoJS](https://www.npmjs.com/package/crypto-js) library to encrypt the path to the server and copy the link to the user's clipboard. On the other end of this, I decrypted the link to get the path to redirect the user to.

#### Encryption
```javascript
const handleInvite = async (e) => {
  e.stopPropagation();
  const hash = CryptoJS.AES.encrypt(
    JSON.stringify(`${server.id}/channels/${server.defaultChannel.id}`),
    process.env.REACT_APP_SECRET_KEY
  );
  const url = `https://resonance-jzh3.onrender.com/invite/${hash}`;
  await navigator.clipboard.writeText(url);
};
```

#### Decryption
```javascript
useEffect(() => {
  const bytes = CryptoJS.AES.decrypt(hash, process.env.REACT_APP_SECRET_KEY);
  setPath(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
  if (path) {
    id = path.substring(0, path.indexOf("/"));
    dispatch(
      createMembership({
        server_id: id,
        user_id: sessionUser.id,
      })
    ).then(() => setPause(false));
  }
}, [path]);

return <>{!pause && <Redirect to={`/servers/${path}`} />}</>;
```

### Association to find the channel used for Direct Messages
When users add each other as friends, a new Direct Messaging channel is created and both the users are added to the newly created channel. But the data sent to the frontend only had the friendship object. To address this issue I had to write a custom association for the Friendship model which queried the database to find the associated channel. I initially had this as an O(n<sup>2</sup>) operation, but I later realized that the query I had was pretty similar to the [Two Sum problem](https://leetcode.com/problems/two-sum/) and ended up optimizing the query into an O(n) operation.
```ruby
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
```

## Other Visuals
### User Show Page
![UserShowPage](https://user-images.githubusercontent.com/65653163/212204894-d27cd38f-3237-463e-876c-107c6d3fc494.gif)

### Server Show Page
![ServerShowPage](https://user-images.githubusercontent.com/65653163/212204904-5da318ca-001d-4bf0-b1c3-d231fd2fac93.gif)


### Direct Messaging
![DirectMessages](https://user-images.githubusercontent.com/65653163/212204931-ed3ce22b-b6c5-4e52-8258-c64cbc0925e3.gif)
