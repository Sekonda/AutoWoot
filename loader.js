/*
 * AutoWoot Bot by Simon White
 *
 * Source: https://github.com/Sekonda/AutoWoot/
 * Twitter: https://twitter.com/Sekonda_
 *
 */

var latest = 'https://raw.github.com/Sekonda/AutoWoot/master/autowoot.js';

/* 
 * Rather than loading it locally here, we load the latest update from GitHub. 
 * Alternatively download and run the file listed above instead.
 */

$.getScript(latest).done(function(){
	loadAutoWoot();
});