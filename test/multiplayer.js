import {joinRoom, selfId} from 'https://cdn.skypack.dev/trystero/ipfs';
const config = {appId: 'line-up'};
let room = joinRoom(config, 'session-join');
room.onPeerJoin(peerId => console.log(`${peerId} joined`))
room.onPeerLeave(peerId => console.log(`${peerId} left`))
let gamerooms = [];

let globalroomid = 0;   

let gameroom;

document.getElementById('createroom').addEventListener('click', globalroom);

document.getElementById('createroom').addEventListener('click', createroom);

function globalroom(){
    
}

function createroom(){
    room.leave();

    gameroom = joinRoom(config, `room${globalroomid}`);
    gamerooms.push(gameroom);
    room = gamerooms[globalroomid];
    globalroomid += 1;

    appendserverlist();
}

function appendserverlist(){
    let roomlist = document.getElementById("roomlist");
    let roomitem = document.createElement("li");
    let roomname = document.createTextNode(`${selfId}`);
    roomitem.appendChild(roomname);
    roomlist.appendChild(roomitem);
};
