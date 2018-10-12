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

							
$(document).ready(function() {
	"use strict";

	// UTILITY
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	// END UTILITY

	// COMMANDS
	function clear() {
		terminal.text(loginStr);
	}

	function help() {
		terminal.append("There is no help, friend. :3c\n");
		terminal.append("Commands:\n");
		terminal.append("clear -- wipes terminal\n");
		terminal.append("echo -- prints args back into terminal\n");
		terminal.append("fortune -- prints a random fortune (doesn't work in Chrome)\n");
		terminal.append("g -- opens and searches google.com for args\n");
		terminal.append("gl -- uses 'I'm Feeling Lucky' function on Google and goes to first site with args\n");
		terminal.append("d -- opens and searches duckduckgo.com for args\n");
		terminal.append("yt -- opens and searches youtube.com for args\n");
		terminal.append("wiki -- opens and searches wikipedia.com for args\n");
		terminal.append("site -- opens site from args\n");
		terminal.append("r -- opens and reddit.com and goes to subreddit specified by args\n");
		terminal.append("cat -- prints a sleepy cat :)\n");
	}

	function echo(args) {
		var str = args.join(" ");
		terminal.append(str + "\n");
	}

	function fortune() {
		var sBrowser, sUsrAg = navigator.userAgent;

		if(sUsrAg.indexOf("Chrome") > -1) {
			terminal.append("This command doesn't work in Chrome. :(\nTry Firefox instead! >:3c\n");
		} 
		else {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'https://cdn.rawgit.com/bmc/fortunes/master/fortunes', false);
			xhr.send(null);

			if (xhr.status === 200) {
				var fortunes = xhr.responseText.split("%");
				var fortune = fortunes[getRandomInt(0, fortunes.length)].trim();
				terminal.append(fortune + "\n");
			}		
		}
	}
	
	function gSearch(args) {
		var str1 = args.join("+");
		var str2 = args.join(" ");
		terminal.append("http://www.google.com/search?q=" + str1 + "\n");
		
		console.log("Googling \"" + str1 + "\"");
		console.log("Encoded query: \n" + encodeURIComponent(str2));
		document.location.href = "http://www.google.com/search?q=" + encodeURIComponent(str2);
	}
	
	function gSearchLucky(args) {
		var str = args.join(" ");
		terminal.append("https://www.google.com/webhp?#q=" + encodeURIComponent(str) + "&btnI=I\n");
		document.location.href = "https://www.google.com/webhp?#q=" + encodeURIComponent(str) + "&btnI=I";
	}
	
	function dSearch(args) {
		var str1 = args.join("+");
		var str2 = args.join(" ");
		terminal.append("https://duckduckgo.com/?q=" + str1 + "\n");
		
		console.log("Searching DuckDuckGo \"" + str1 + "\"");
		console.log("Encoded query: \n" + encodeURIComponent(str2));
		document.location.href = "https://duckduckgo.com/?q=" + encodeURIComponent(str2);
	}
	
	function yt(args) {
		var str1 = args.join("+");
		var str2 = args.join(" ");
		terminal.append("https://www.youtube.com/results?search_query=" + str1 + "\n");
		
		console.log("yt searching \"" + str1 + "\"");
		console.log("Encoded query: \n" + encodeURIComponent(str2));
		document.location.href = "https://www.youtube.com/results?search_query=" + encodeURIComponent(str2);
	}
	
	function wiki(args) {
		var str1 = args.join("+");
		var str2 = args.join(" ");
		terminal.append("https://en.wikipedia.org/wiki/Special:Search?search=" + str1 + "\n");
		
		console.log("wiki searching \"" + str1 + "\"");
		console.log("Encoded query: \n" + encodeURIComponent(str2));
		document.location.href = "https://en.wikipedia.org/wiki/Special:Search?search=" + encodeURIComponent(str2);
	}
	
	function site(args) {
		var str = args.join(" ");
		terminal.append("http://" + str + "\n");
		document.location.href = "http://" + encodeURIComponent(str);
	}
	
	function subreddit(args) {
		var str = args.join(" ");
		terminal.append("https://reddit.com/r/" + str + "\n");
		
		console.log("wiki searching \"" + str + "\"");
		document.location.href = "https://reddit.com/r/" + encodeURIComponent(str);
	}
	
	function cat() {
		terminal.append("Zzzzz  |\\      _,,,--,,_       +--------+\n");
		terminal.append("       /,`.-'`'   ._  \\-;;,_   | SOFTY! |\n")
		terminal.append("      |,4-  ) )_   .;.(  `'-'  +--------+\n");
		terminal.append("     '---''(_/._)-'(_\\_)        \n");
	}
	
	// END COMMANDS

	var terminal = $(".terminal");
	var prompt = "/usr/zweih";
	var path = ">";

	var commandHistory = [];
	var historyIndex = 0;

	var command = "";

	function processCommand() {
		var isValid = false;

		// Create args list by splitting the command
		// by space characters and then shift off the
		// actual command.

		var args = command.split(" ");
		var cmd = args[0];
		args.shift();

		//execute command and mark isValid as true if match is found
		switch(cmd) {
			//terminal functions
			case "echo":
				echo(args);
				isValid = true;
				break;
			
			case "clear":
				clear();
				isValid = true;
				break;
			
			case "help":
				help();
				isValid = true;
				break;
				
			case "cat":
				cat();
				isValid = true;
				break;
				
			//calls to external sites that return data to terminal
			case "fortune":
				fortune();
				isValid = true;
				break;
			
			//search queries that redirect to external sites
			case "g":
				gSearch(args);
				isValid = true;
				break;
				
			case "gl":
				gSearchLucky(args);
				isValid = true;
				break;
			
			case "d":
				dSearch(args);
				isValid = true;
				break;
			
			case "yt":
				yt(args);
				isValid = true;
				break;
			
			case "wiki":
				wiki(args);
				isValid = true;
				break;
				
			//specific areas on sites
			case "site":
				site(args);
				isValid = true;
				break;
			
			case "r": 
				subreddit(args);
				isValid = true;
				break;
		}

		// No match was found...
		if(!isValid) {
			terminal.append("zsh: command not found: " + command + "\n");
		}

		// Add to command history and clean up.
		commandHistory.push(command);
		historyIndex = commandHistory.length;
		command = "";
		updateScroll();
	}

	function updateScroll(){
		var element = (document.getElementsByClassName("terminal"))[0];
		element.scrollTop = element.scrollHeight;
	}

	function displayPrompt() {
		terminal.append("<span class=\"prompt\">" + prompt + "</span>");
		terminal.append("<span class=\"path\">" + path + "</span> ");
	}

	// Delete n number of characters from the end of our output
	function erase(n) {
		command = command.slice(0, -n);
		terminal.html(terminal.html().slice(0, -n));
	}

	function clearCommand() {
		if (command.length > 0) {
			erase(command.length);
		}
	}

	function appendCommand(str) {
		terminal.append(str);
		command += str;
	}

	// catch special keys to prevent browser events
	$(document).keydown(function(e) {
		e = e || window.event;
		var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

		switch(keyCode) {
			case 8: // backspace, prevent from going back a page
				if(keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
					e.preventDefault();
					
					if (command !== "") {
							erase(1);
					}
				}
				break;

			case 38: // up arrow key, recall previous command in history
				historyIndex--;
				
				if (historyIndex < 0) {
						historyIndex++;
				}

				var cmd = commandHistory[historyIndex];

				if(cmd !== undefined) {
					clearCommand();
					appendCommand(cmd);
				}
				break;

			case 39: // down arrow key, show next command in history
				historyIndex++;
				
				if(historyIndex > commandHistory.length - 1) {
					historyIndex--;
				}

				var cmd = commandHistory[historyIndex];

				if(cmd !== undefined) {
					clearCommand();
					appendCommand(cmd);
				}
				break;

			case 191: // forward slash, prevent find from being opened in browser
				if(!e.shiftKey) {
					e.preventDefault();
					appendCommand("/");
				}
				break;

			case 222: // single quote, prevent find from being opened in browser
				if(!e.shiftKey) {
					e.preventDefault();
					appendCommand("'");
				}
				break;
		}
	});

	$(document).keypress(function(e) {
		// Make sure we get the right event
		e = e || window.event;
		var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

		// Which key was pressed?
		switch (keyCode) {
			// ENTER
			case 13:
			{
				terminal.append("\n");

				processCommand();
				displayPrompt();
				break;
			}
			default:
			{
				appendCommand(String.fromCharCode(keyCode));
			}
		}
	});

	// Get the date for our fake last-login
	var date = new Date().toString(); date = date.substr(0, date.indexOf("GMT") - 1);

	// Display last-login and promt
	var loginStr = "Last login: " + date + " on zweih@bird_machine\n";
	terminal.append(loginStr); 
	displayPrompt();
});
