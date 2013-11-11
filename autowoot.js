/*
 * AutoWoot Bot by Simon White
 *
 * Source: https://github.com/Sekonda/AutoWoot/
 * Twitter: https://twitter.com/Sekonda_
 *
 */

// Variable Setup
var lastSong = 'N/A', currentSong = API.getMedia().title, wootID = '#woot', timer = 5000, wooted = false, jQuery = '//code.jquery.com/jquery-2.0.3.min.js', debug, runner;

function runAutoWoot() {
	console.log('Updates every ' + timer + 'ms');
	runner = setInterval(function(){ 
    			doUpdate();
			}, 5000);
	console.log('AutoWoot running in background.');
	alert('AutoWoot is running. Use: \'/aw kill\' to stop');

	// Enable API Commands from Plug.DJ
	API.on(API.CHAT_COMMAND, AWCommands);

}

function killAutoWoot() {
	clearInterval(runner);
	alert('AutoWoot disabled. Use \'/aw start\' to start it again.');
	console.log('AutoWoot disabled via command.');
}

// Commands that can be run. 
function AWCommands(value) {
	if(value === "/aw kill") {
		killAutoWoot();
	} else if(value === "/aw start") {
		runAutoWoot();
	}
	
}

// Processes the Song Updates
function doUpdate() {
	wooted = $(wootID).hasClass('selected');

	if(wooted == false) {
		console.log('\n\n --- Runing Update --- ');
		console.log('Current Song: ' + currentSong);
		console.log('Last Song: ' + lastSong);
		console.log('Wooted: ' + wooted);

		// Update Variables any way... 
		if(currentSong != API.getMedia().title) {
			lastSong = currentSong;
			currentSong = API.getMedia().title;
		}

		$(wootID).click();
		console.log('Wooted');
		wooted = true;
		toReturn = true;
	} 
}

// loadAutoWoot() handles everything that needs to be done at the start. 
function loadAutoWoot() {
	if(window.location.hostname === "plug.dj") { 
		// Get jQuery
		$.getScript(jQuery).done(function(){
			// Run the script
			runAutoWoot();
		});
	}
}