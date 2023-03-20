import {joinRoom, selfId} from 'https://cdn.skypack.dev/trystero/ipfs';
const config = {appId: 'line-up'};
let room = joinRoom(config,'session-join');
room.onPeerJoin(peerId => console.log(`${peerId} joined`))
room.onPeerLeave(peerId => console.log(`${peerId} left`))
//sending room data

let gamerooms = [];

let globalroomid = 0;   

let gameroom;

document.getElementById('createroom').addEventListener('click', globalroom);

let [sendroom, getroom] = room.makeAction('addroom')
let [sendremoveroom, getremoveroom] = room.makeAction('removeroom')
let [sendglobalid, getglobalid] = room.makeAction('addglobalid')
let [sendcstatus, getcstatus] = room.makeAction('cstatus')

document.getElementById('createroom').addEventListener('click', createroom);

function globalroom(){
    
}

let roomval = `joinRoom(config,'room${globalroomid}')`

function createroom(){
    gameroom = joinRoom(config,`room${globalroomid}`);
    gamerooms.push(gameroom);
    let pname = document.getElementById("playername").value
    sendroom({addroom: roomval, gamerooms, pname, globalroomid});
    appendserverlist(pname);
    document.cookie = `joinRoom(config,'room${globalroomid}') ${selfId} ${pname}`;
    setTimeout(function(){
        window.location = 'board.html'
    }, 100);
}


//data received

let peer  = "";

let info;

getroom((data, peerId) => {
    info = data;
    peer = peerId;
    let pname = data.pname;
    let gameroom = data.addroom;
    let globalroomid = data.globalroomid
    console.log(gamerooms[globalroomid]);  
    appendserverlist(pname, gameroom);
})

function appendserverlist(pname, gameroom,){
    let roomlist = document.getElementById("roomlist");
    let roomitem = document.createElement("li");
    let roomitemcont1 = document.createElement("p");
    let roomitemcont2 = document.createElement("p");
    let joinbutton = document.createElement('button');


    joinbutton.innerText = ("Join Room"); 
    joinbutton.value = (`${gameroom} ${peer}`);  
    joinbutton.id = ("joinbutton");
    joinbutton.className = (`${peer}`);
    let roomname = document.createTextNode(`${peer.slice(0, 4)}`);   
    let playername = document.createTextNode(`${pname.slice(0, 20)}`);

    roomitemcont1.appendChild(roomname);
    roomitemcont2.appendChild(playername);
    roomitem.append(roomitemcont1, roomitemcont2, joinbutton);
    roomlist.append(roomitem);
    gamerooms.push("full")
    globalroomid += 1;
};

//join sequence


let tobejoined = "nil";

let playerid;
let gameid;

document.addEventListener('click', (e) =>{
    tobejoined = e.target.value;
    if(tobejoined.includes("room")){
        document.cookie = `${tobejoined}`;
        let infoarr = tobejoined.split(" ");
        gameid = infoarr[0];
        playerid = infoarr[1];
        console.log(gameid);
        console.log(playerid);
        initiatemulti(gameid, playerid);
    }
  }
);



function initiatemulti(gameid, playerid){
    removeserverlist(playerid);
    sendcstatus({lobbyfull: playerid})
    setTimeout(function(){
        room.leave();
        setTimeout(function(){
            console.log(eval(gameid));
            room = eval(gameid);
            window.location = 'board.html';
        }, 200);
    }, 200);
}

function removeserverlist(playerid){
    sendremoveroom({removeroom: playerid});
}

getremoveroom((data) => {
    let remarr = document.getElementsByClassName(`${data.removeroom}`)
    remarr[0].parentElement.remove();
});