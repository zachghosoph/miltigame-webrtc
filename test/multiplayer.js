import { joinRoom, selfId } from 'https://cdn.skypack.dev/trystero/ipfs';
const config = { appId: 'line-up' };
let room = joinRoom(config, 'session-join');
room.onPeerJoin(peerId => console.log(`${peerId} joined`))
room.onPeerLeave(peerId => console.log(`${peerId} left`))
//sending room data

let gamerooms = [];

let globalroomid = 0;

let gameroom;

//document.getElementById('createroom').addEventListener('click', globalroom);

let [sendroom, getroom] = room.makeAction('addroom')
let [sendremoveroom, getremoveroom] = room.makeAction('removeroom')
let [sendcstatus, getcstatus] = room.makeAction('cstatus')

document.getElementById('createroom').addEventListener('click', createroom);



let roomval = `room${globalroomid}`

function createroom() {
    console.log(roomval)
    gameroom = joinRoom(config, `room${globalroomid}`);
    gamerooms.push(gameroom);
    let pname = document.getElementById("playername").value
    sendroom({ addroom: roomval, gamerooms, pname, globalroomid });
    appendserverlist(pname);
 //   document.cookie = `joinRoom(config,'room${globalroomid}') ${selfId} ${pname}`;
}


//data received

let peer = "";

let info;

getroom((data, peerId) => {
    info = data;
    peer = peerId;
    let pname = data.pname;
    let gameroom = data.addroom;
    globalroomid += 1;
    console.log(globalroomid)
    appendserverlist(pname, gameroom);
})

function appendserverlist(pname, gameroom) {
    console.log(gameroom);
    let roomlist = document.getElementById("roomlist");
    let roomitem = document.createElement("li");
    let roomitemcont1 = document.createElement("p");
    let roomitemcont2 = document.createElement("p");
    let joinbutton = document.createElement('button');


    joinbutton.innerText = ("Join Room");
    joinbutton.value = (`room${globalroomid-1} ${peer}`);
    joinbutton.id = ("joinbutton");
    joinbutton.className = (`${peer}`);
    let roomname = document.createTextNode(`${peer.slice(0, 4)}`);
    let playername = document.createTextNode(`${pname.slice(0, 20)}`);

    roomitemcont1.appendChild(roomname);
    roomitemcont2.appendChild(playername);
    roomitem.append(roomitemcont1, roomitemcont2, joinbutton);
    roomlist.append(roomitem);
    gamerooms.push("full")
};

//join sequence

console.log(room);

let tobejoined = "nil";

let playerid;
let gameid;

document.addEventListener('click', (e) => {
    if (e.target.value != undefined) {
        tobejoined = e.target.value;
        if (tobejoined.includes("room")) {
            let infoarr = tobejoined.split(" ");
            gameid = infoarr[0];
            playerid = infoarr[1];
            initiatemulti(gameid, playerid);
        }
    }
}
);



function initiatemulti(gameid, playerid) {
    removeserverlist(playerid);
    sendcstatus({cstatus: playerid})
    room.leave();
    document.cookie = `${gameid} untrue`;
    setTimeout(function () {
        window.location = 'board.html';
    }, 500);
}


getcstatus((data) => {
    if (data.cstatus == selfId){
        room.leave();
        document.cookie = `room${globalroomid} origin`;
        setTimeout(function () {
            window.location = 'board.html';
        }, 500);
    } 
})

function removeserverlist(playerid) {
    sendremoveroom({ removeroom: playerid });
}

getremoveroom((data) => {
    if(selfId != data.removeroom){
        let remarr = document.getElementsByClassName(`${data.removeroom}`)
        remarr[0].parentElement.remove();
    }
});