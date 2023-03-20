import {joinRoom} from 'https://cdn.skypack.dev/trystero/ipfs';
const config = { appId: 'line-up' };
let room = joinRoom(config, 'session-join');
room.onPeerJoin(peerId => console.log(`${peerId} joined`))
room.onPeerLeave(peerId => console.log(`${peerId} left`))

let prevarr;
let previd;
let roomtojoin;
let x = document.cookie;

let [sendcstatus, getcstatus] = room.makeAction('cstatus')


window.onload = (event) => {
    prevarr = x.split(" ");
    roomtojoin = prevarr[0];
    previd = prevarr[1];
    console.log(roomtojoin);
};

getcstatus((data) => {
    if (data.lobbyfull = previd) {
        room.leave();
        setTimeout(function () {
            room = eval(roomtojoin);
            sendturn({turn: false});
            getperson();
        }, 500);
    }
});

let [sendbcast, getbcast] = room.makeAction('bcast');

function getperson(){
    setInterval(function (){
        sendbcast({bcast : "inroom"})
    }, 200)
}

getbcast((data) => {
    console.log("e");
})


let [sendturn, getturn] = room.makeAction('turn')

getturn((data) => {
    if(data.turn == flase){
        console.log("test")
        rollopt = true;
    }
});


//let [sendtest, gettest] = eval(roomtojoin).makeAction('test')
//setInterval(function(){
//    sendtest({test: "bruh"})
//}, 100);
//
//gettest((data) => {
//    console.log(data.test)
//});

//flipping coin

