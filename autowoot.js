/*
 * AutoWoot Bot by Simon White
 *
 * Source: https://github.com/Sekonda/AutoWoot/
 * Twitter: https://twitter.com/Sekonda_
 *
 */

// Variable Setup
var lastSong = 'N/A', currentSong = API.getMedia().title, wootID = '#woot', timer = 5000, wooted = false, jQuery = '//code.jquery.com/jquery-2.0.3.min.js', debug;

function runAutoWoot() {
	console.log('Updates every ' + timer + 'ms');
	runner = setInterval(function(){ 
    			doUpdate();
			}, 5000);
	console.log('Started Updated Process');
}

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
	// Get jQuery
	$.getScript(jQuery).done(function(){
		runAutoWoot();
	});
}