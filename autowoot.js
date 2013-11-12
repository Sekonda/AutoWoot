/*
 * AutoWoot Bot by Simon White
 *
 * Source: https://github.com/Sekonda/AutoWoot/
 * Twitter: https://twitter.com/Sekonda_
 *
 */

// Variable Setup
var version = '0.1.3', lastSong = 'N/A', currentSong = API.getMedia().title, wootID = '#woot', timer = 5000, wooted = false, jQuery = '//code.jquery.com/jquery-2.0.3.min.js', debug, runner, welcome = '<span class="from you">Running AutoWoot Version: ' + version + '.</span><br /><br /><strong>Commands:</strong><br /><span style="color:#ac76ff">/aw start</span> - This will restart the bot.<br /><span style="color:#ac76ff">/aw kill</span> - This will stop the autowooting.';

function runAutoWoot() {
	console.log('Updates every ' + timer + 'ms');
	runner = setInterval(function(){ 
    			doUpdate();
			}, 5000);
	message(welcome);

	// Enable API Commands from Plug.DJ
	API.on(API.CHAT_COMMAND, AWCommands);

}

function killAutoWoot() {
	clearInterval(runner);
	message('AutoWoot disabled. Use \'/aw start\' to start it again.');
}

// Commands that can be run. 
function AWCommands(value) {
	if(value === "/aw kill") {
		killAutoWoot();
	} else if(value === "/aw start") {
		loadAutoWoot();
	} else if(value === "/aw") {
		message(welcome);
	}
	
}

// Processes the Song Updates
function doUpdate() {
	wooted = $(wootID).hasClass('selected');

	if(wooted == false) {
		// Update Variables any way... 
		if(currentSong != API.getMedia().title) {
			lastSong = currentSong;
			currentSong = API.getMedia().title;
		}

		$(wootID).click();
		console.log('Wooted');
		message('Song Wooted.');
		wooted = true;
		toReturn = true;
	} 
}

function message(contents) {
	var msg = '<div class="message"><i class="icon icon-chat-admin"></i><span class="from admin ">[AutoWoot] </span><span class="text">&nbsp;' + contents + '</span></div>';
	$('#chat-messages').append(msg);
}

// loadAutoWoot() handles everything that needs to be done at the start. 
function loadAutoWoot() {
	if(window.location.hostname === "plug.dj") { 
		// Get jQuery
		$.getScript(jQuery).done(function(){
			// Run the script
			runAutoWoot();
		});
	} else {
		alert('This script can only run on Plug.DJs website.');
	}
}
