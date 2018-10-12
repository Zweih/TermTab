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

function selectTheme(cssNum) {
    switch(cssNum) {
        case 0:
            document.getElementById("bannerpic").src = "assets/0.jpg";
            break;

        case 1:
            document.getElementById("bannerpic").src = "assets/1.jpg";
            break;

        case 2:
            document.getElementById("bannerpic").src = "assets/2.jpg";
            break;
    }
}

var fileNum = document.getElementsByTagName("link")[2].getAttribute("href").slice(-5, -4);
selectTheme(parseInt(fileNum));
