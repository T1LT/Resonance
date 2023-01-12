# [Resonance](https://resonance-jzh3.onrender.com)

## Overview

[Resonance](https://resonance-jzh3.onrender.com) is a clone of [Discord](https://discord.com), a VoIP and instant messaging social media platform. Discord has over 150 million active users as of 2022. Resonance is my attempt at making a website similar to Discord. Through Resonance users can communicate with each other via chat messages in real-time, create servers and channels, add other users as friends, and also invite other people to their servers.

## Technologies

To build Resonance, I used a React-Redux frontend paired with a Ruby on Rails backend, and PostgreSQL as the database management system. For the general styling I used CSS, I used [MUI](https://mui.com/) for the icons and [AnimateOnScroll](https://michalsnik.github.io/aos/) for the animations on the splash page. I also used Action Cable for the websocket connections to enable live updates for most of my CRUD features. 

## Features

Users can create their own servers and add as many channels as they like. Once they create servers and channels they can also edit or delete them. Users can send messages in these channels to talk with each other in real-time. They can also edit or delete their messages (if the user is the owner of the server, they can delete anyone's messages!).

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
