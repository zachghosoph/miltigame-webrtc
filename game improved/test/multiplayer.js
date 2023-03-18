import {joinRoom} from 'https://cdn.skypack.dev/trystero';
const config = {appId: 'line-up'};
const room = joinRoom(config, 'multiroom');

room.onPeerJoin(peerId => console.log(`${peerId} joined`));
