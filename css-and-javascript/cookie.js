import {joinRoom, selfId} from 'https://cdn.skypack.dev/trystero/ipfs';
const config = {appId: 'line-up'};
let room = joinRoom(config, 'session-join');
room.onPeerJoin(peerId => console.log(`${peerId} joined`))
room.onPeerLeave(peerId => console.log(`${peerId} left`))

let prevarr;
let previd;
let roomtojoin;
let username;
let x = document.cookie;

let [sendcstatus, getcstatus] = room.makeAction('cstatus')


window.onload = (event) => {
    prevarr = x.split(" ");
    roomtojoin = prevarr[0];
    previd = prevarr[1]; 
    username = prevarr[2];
};

let heads;

let [sendname, getname] = room.makeAction('flipname')

getcstatus((data, peerId) => {
    if (data.lobbyfull = previd){
        room.leave();
        room = eval(roomtojoin);
 heads = true;
        setTimeout(function(){
            document.getElementById("coinflip").innerHTML = `${username} flips, heads for red`;
            sendname({flipname: username});
        }, 200)
    }
})


getname((data) => {
    document.getElementById("coinflip").innerHTML = `${data.flipname} flips, heads for red`;
});

function flipcondition(){

}


//flipping coin

