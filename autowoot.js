/*
 * AutoWoot Bot by Simon White
 *
 * Source: https://github.com/Sekonda/AutoWoot/
 * Twitter: https://twitter.com/Sekonda_
 *
 */

// Variable Setup
var version = '0.1.4', wootID = '#woot', timer = 5000, wooted = false, jQuery = '//code.jquery.com/jquery-2.0.3.min.js';
var welcome = '<span class="from you">Running AutoWoot Version: ' + version + '.</span><br /><br /><strong>Commands:</strong><br /><span style="color:#ac76ff">/aw start</span> - This will restart the bot.<br /><span style="color:#ac76ff">/aw kill</span> - This will stop the autowooting.<span style="color:#ac76ff"><br />/aw woot start</span> - This will start the autowooting.<br /><span style="color:#ac76ff">/aw woot stop</span> - This will stop the autowooting.<br /><span style="color:#ac76ff">/aw join start</span> - This will start <em>trying</em> to get you into the waitlist when the DJ changes.<br /><span style="color:#ac76ff">/aw join stop</span> - This will stop trying to get you into the waitlist.';

function runAutoWoot() {
	//console.log('Updates every ' + timer + 'ms');
	
	// Enable API Commands from Plug.DJ
	API.on(API.CHAT_COMMAND, AWCommands);
	message(welcome);

	API.sendChat("/aw woot start");
	API.sendChat("/aw join start");

}

function killAutoWoot() {
	doCMD("off","autoWoot()", "HISTORY_UPDATE", "AutoWoot Turned Off.");
	doCMD("off","autoJoin()", "DJ_UPDATE", "AutoJoin Turned Off.");
	message('AutoWoot disabled. Use \'/aw start\' to start it again.');
}

// Commands that can be run. 
function AWCommands(value) {
	if(value === "/aw stop") {
		killAutoWoot();
	} else if(value === "/aw start") {
		loadAutoWoot();
	} else if(value === "/aw woot start") {
		doCMD("on","autoWoot", "HISTORY_UPDATE", "AutoWoot Turned On.");
	} else if(value === "/aw woot stop") {
		doCMD("off","autoWoot", "HISTORY_UPDATE", "AutoWoot Turned Off.");
	} else if(value === "/aw join start") {
		doCMD("on","autoJoin", "DJ_UPDATE", "AutoJoin Turned On.");
	} else if(value === "/aw join stop") {
		doCMD("off","autoJoin", "DJ_UPDATE", "AutoJoin Turned Off.");
	} else if(value === "/aw") {
		message(welcome);
	}
	
}


// Processes the Song Updates
function autoWoot() {
	wooted = $(wootID).hasClass('selected');

	if(wooted == false) {
		$(wootID).click();
		console.log('Wooted');
		message('Song Wooted.');
		wooted = true;
	} 
}

// Handles the autoJoining process
function autoJoin(users) { // Users is never used, but Plug.DJ sends it anyway
	if(API.getWaitListPosition() == -1) {
		
		if(API.getWaitList().length < 49) {
			API.djJoin();
			message('You have been added to the waitlist!');
		} 
	}
}


// Used to send messages to the chat.
function message(contents) {
	var msg = '<div class="message"><i class="icon icon-chat-admin"></i><span class="from admin ">[AutoWoot] </span><span class="text">&nbsp;' + contents + '</span></div>';
	$('#chat-messages').append(msg);
}

// Used to send commands to the API.
function doCMD(val, method, option, msg) {
	var cmd = "API." + val + "(API." + option + ", "+method + ");";
	console.log('Running : ' + cmd);
	eval(cmd);
	message(msg);
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
