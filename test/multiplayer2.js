import { joinRoom, selfId } from 'https://cdn.skypack.dev/trystero/ipfs';
const config = { appId: 'line-up' };
let room = joinRoom(config, 'session-join');
room.onPeerJoin(peerId => console.log(`${peerId} joined`))
room.onPeerLeave(peerId => console.log(`${peerId} left`))
//sending room data

let globalroomid = (Math.random()+1).toString(36).substring(2);

//document.getElementById('createroom').addEventListener('click', globalroom);

let [sendroom, getroom] = room.makeAction('addroom')
let [sendremoveroom, getremoveroom] = room.makeAction('removeroom')
let [sendcstatus, getcstatus] = room.makeAction('cstatus')

document.getElementById('createroom').addEventListener('click', createroom);

function createroom() {
    peer = "self";
    let pname = document.getElementById("playername").value;
    appendserverlist(pname, gameroom);
    Broadcast(pname);
}
function Broadcast(pname){
    setInterval(() => {
        sendroom({addroom: globalroomid, pname});
    }, 500);
}



//data received
let gameroom = "self";
let peer = "self";

let roomarr = [`${gameroom}`]

getroom((data, peerId) => {
    for(let i = 0; i<roomarr.length; i++){
        if(roomarr[i] == data.addroom){
            return;
        }
        else if(roomarr[i+1] == undefined){
            roomarr.push(data.addroom);
            peer = peerId;
            let pname = data.pname; 
            gameroom = data.addroom;
            appendserverlist(pname, gameroom);
        }
    }
})

function appendserverlist(pname, gameroom) {
    let roomlist = document.getElementById("roomlist");
    let roomitem = document.createElement("li");
    let roomitemcont1 = document.createElement("p");
    let roomitemcont2 = document.createElement("p");
    let joinbutton = document.createElement('button');


    joinbutton.innerText = ("Join Room");
    joinbutton.value = (`room${gameroom} ${peer}`);
    joinbutton.id = ("joinbutton");
    joinbutton.className = (`${peer}`);
    let roomname = document.createTextNode(`${peer.slice(0, 4)}`);
    let playername = document.createTextNode(`${pname.slice(0, 20)}`);

    roomitemcont1.appendChild(roomname);
    roomitemcont2.appendChild(playername);
    roomitem.append(roomitemcont1, roomitemcont2, joinbutton);
    roomlist.append(roomitem);
};

//join sequence


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
    setTimeout(function () {
        document.cookie = `${gameid} untrue ${document.getElementById("playername").value}`;
        window.location = 'board.html';
    }, 500);
}


getcstatus((data) => {
    if (data.cstatus == selfId){
        room.leave();
        setTimeout(function () {
            document.cookie = `room${globalroomid} origin ${document.getElementById("playername").value}`;
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