/*
===========================
 ______            _ _     
|___  /           (_) |    
   / /_      _____ _| |__  
  / /\ \ /\ / / _ \ | '_ \ 
./ /__\ V  V /  __/ | | | |
\_____/\_/\_/ \___|_|_| |_| 

===========================
*/

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function applyCSS(fileNum) {
    var file = "css/style" + fileNum + ".css";
    var ss = document.createElement("link");
  
    ss.type = "text/css";
    ss.rel = "stylesheet";
    ss.href = file;
  
    document.getElementsByTagName("head")[0].appendChild(ss);
}

applyCSS(randomInt(1,1));
