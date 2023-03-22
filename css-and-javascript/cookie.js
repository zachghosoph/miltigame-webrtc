let joinroom;
let prevarr;
let x = document.cookie;

var turnfirst = false; 

window.onload = (event) => {
    prevarr = x.split(" ");
    joinroom = prevarr[0];
    console.log(prevarr[0])
    console.log(prevarr)
    room = joinroom
    if (prevarr[1] == "origin"){
        turnfirst = true;
    }
};

import {boolarr} from './java'
export default{tur}
import {joinRoom, selfId} from 'https://cdn.skypack.dev/trystero/ipfs';
const config = { appId: 'line-up' };
let room = joinRoom(config, `${joinroom}`);
console.log(room);
room.onPeerJoin(peerId => console.log(`${peerId} joined`))
room.onPeerLeave(peerId => console.log(`${peerId} left`))

let [sendarr, getarr] = room.makeAction('array');

setInterval(function(){
    sendarr({array: boolarr});
}, 100);

getarr((data) => {
    let newarr = data.array
    for(let i = 0; i<newarr.length; i++){
        for(let m = 0; m<newarr[i].length; m++){
            if(boolarr[i][m] != newarr[i][m]){
                boolarr[i][m] = newarr[i][m];

                let canvas = document.getElementById(`${i + 1}${m + 1}`);
                let draw = canvas.getContext("2d");
                let wid = (top.innerWidth / 100);
                //( canvas.width/2, canvas.height/2, 2*wid, 0, 2 * Math.PI)
                draw.ellipse(canvas.width / 2, canvas.height / 2, 4 * wid, 2 * wid, 0, 0, Math.PI * 2)
                draw.stroke();
                if(newarr[i][m] == "red"){
                    draw.fillStyle = "#EE5151";
                }
                else if(newarr[i][m] == "blue"){
                    draw.fillStyle = "#5187EE";
                }
  
                draw.fill();
            }
        }
    }
    boolarr = newarr;
});


let [sendturn, getturn] = room.makeAction('turn');

getturn((data) => {
    turnfirst = data.turn
});