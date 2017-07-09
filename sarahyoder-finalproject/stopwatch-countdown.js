window.onload = function() {
	
	//turns debug mode on and off
	document.getElementById("debugButton").onclick = function(evt) {
		if (debugMode) {
			debugMode = false;
			document.getElementById("debugButton").innerHTML = "Debug is off";
			document.getElementById("outputText").innerHTML = "";
		}
			else {
			debugMode = true;
			document.getElementById("debugButton").innerHTML = "Debug is on";
			}
	}
	
	//User selects stopwatch or countdown
	document.getElementById("selectChoice").onclick =  function(evt) {
		chooseType();
	}
	
	//Click to start stopwatch
	document.getElementById("stopwatchButton").onclick =  function(evt) {
		stopwatchButton();
	}
	
	//Click to reset stopwatch
	document.getElementById("stopwatchReset").onclick =  function(evt) {
		resetStopwatch();
	}

	//Click to start countdown
	document.getElementById("countdownButton").onclick = function(evt) {
		countdownButton();
	}
	
} // end window.onload

var debugMode = true; // global debug control variable

	// Function to choose between stopwatch and countdown
function chooseType() {
		
	if (document.getElementById("countdown").checked) {
		document.getElementById("countdownSection").style.visibility = "visible";
		document.getElementById("stopwatchSection").style.visibility = "hidden";
		if (debugMode) {
			document.getElementById("outputText").innerHTML += "<p>Choose button clicked!<br />Countdown chosen with chooseType()</p>";
		}
	}
		else if (document.getElementById("stopwatch").checked) {
			document.getElementById("stopwatchSection").style.visibility = "visible";
			document.getElementById("countdownSection").style.visibility = "hidden";
			if (debugMode) {
				document.getElementById("outputText").innerHTML += "<p>Choose button clicked!<br />Stopwatch chosen with chooseType()</p>";
			}
		}
} //end chooseType()
	
	
//STOPWATCH VARIABLES AND FUNCTIONS
var startS = true; // global variable to differentiate between uses of start/stop button
var stopwatchRun;
	
// initial value of stopwatch		
var sHundreds = 0;
var sSeconds = 0;
var sMinutes = 0;
	
function stopwatchButton() {
	
	if (startS) { // if starting stopwatch
		stopwatchRun = setInterval(startStopwatch, 10);
		startS = false;
		document.getElementById("stopwatchButton").innerHTML = "Pause";
		if (debugMode) {
			document.getElementById("outputText").innerHTML += "<p>Stopwatch start/stop button clicked!<br />Called stopwatchButton(), which called startStopwatch() with setInterval.</p>";
		}
	}
		
		else { // if stopping stopwatch
			clearInterval(stopwatchRun);
			startS = true;
			document.getElementById("stopwatchButton").innerHTML = "Start";
			if (debugMode) {
				document.getElementById("outputText").innerHTML += "<p>Stopwatch start/stop button clicked!<br />Called stopwatchButton(), which ended run of startStopwatch() with clearInterval.</p>";
			}
		}
} // end of stopwatchButton()


function startStopwatch() {
	
	//what the user sees
	var displaySHundreds = document.getElementById("sHundreds");
	var displaySSeconds = document.getElementById("sSeconds");
	var displaySMinutes = document.getElementById("sMinutes");
	
	sHundreds++;
		
	if (sHundreds < 10) {
		displaySHundreds.innerHTML = "0" + sHundreds;
	}	
		else {
			displaySHundreds.innerHTML = sHundreds;
	}
		
	if (sHundreds > 99) {
		sHundreds = 0;
		displaySHundreds.innerHTML = "0" + 0;
		sSeconds++;
	}
		
	if (sSeconds < 10) {
		displaySSeconds.innerHTML = "0" + sSeconds;
	}
		else {
			displaySSeconds.innerHTML = sSeconds;
		}
		
	if (sSeconds > 59) {
		sSeconds = 0;
		displaySSeconds.innerHTML = "0" + 0;
		sMinutes++;
	}
		
	if (sMinutes < 10) {
		displaySMinutes.innerHTML = "0" + sMinutes;
	}
		else {
			displaySMinutes.innerHTML = sMinutes;
		}
}// end startStopwatch()
	

function resetStopwatch() { // stop stopwatch, clear count, reinitialize start/stop button variable
		
	clearInterval(stopwatchRun);
	sHundreds = 0;
	sSeconds = 0;
	sMinutes = 0;
	document.getElementById("sHundreds").innerHTML = "00";
	document.getElementById("sSeconds").innerHTML = "00";
	document.getElementById("sMinutes").innerHTML = "00";
	startS = true;
	document.getElementById("stopwatchButton").innerHTML = "Start";
	if (debugMode) {
		document.getElementById("outputText").innerHTML += "<p>Reset button clicked!<br />Stopwatch reset with resetStopwatch()</p>";
	}
}// end resetStopwatch()
	
	
//COUNTDOWN VARIABLES AND FUNCTIONS
var startC = true; // to differentiate between start/stop with single button
var countdownRun;	
var countdownState = null; // to identify first click vs future clicks
	
function countdownButton() {
	var userTime = document.getElementById("userInput").value;
		
	if (startC) { // start countdown on first click
				
		if (countdownState == null) { // if initial start of countdown, set minutes, seconds, hundreds to user input
			if (validateInput(userTime)) {
				startC = false;
				countdownState = true;
				countdownRun = setInterval(startCountdown, 10);						
				document.getElementById("countdownButton").innerHTML = "Pause";
				cMinutes = (userTime[0] + userTime[1]) * 1;
				cSeconds = (userTime[3] + userTime[4]) * 1;
				cHundreds = (userTime[6] + userTime[7]) * 1;
				if (debugMode) {
					document.getElementById("outputText").innerHTML += "<p>Countdown button clicked for first time!<br />Called countdownButton(), which called startCountdown() with setInterval</p>";
				}
			}
		}
				else { // if not initial start of countdown, keep global minute, second, and hundred values
					countdownRun = setInterval(startCountdown, 10);
					document.getElementById("countdownButton").innerHTML = "Pause";
					startC = false;
					if (debugMode) {
						document.getElementById("outputText").innerHTML += "<p>Countdown button clicked!<br />Called countdownButton(), which called startCountdown() with setInterval</p>";
					}
				}
	}
		
		else { // Pause countdown on every other click
			clearInterval(countdownRun);
			document.getElementById("countdownButton").innerHTML = "Start";
			startC = true;
			if (debugMode) {
				document.getElementById("outputText").innerHTML += "<p>Countdown button clicked!<br />Called countdownButton(), which ended run of startCountdown() with clearInterval</p>";
			}
		}
				
}// end function countdownButton(userTime)
	
	
function startCountdown() {
		
	// What the user sees
	var displayCHundreds;
	var displayCSeconds;
	var displayCMinutes;
	
	cHundreds--;
		
	if (cHundreds < 0) {
		cHundreds = 99;
		cSeconds--;
	}
		
	if (cSeconds < 0) {
		cSeconds = 59;
		cMinutes--;
	}
		
	if (cHundreds < 10) {
		displayCHundreds = "0" + cHundreds;
	}
		else {
		displayCHundreds = cHundreds;
		}
			
	if (cSeconds < 10) {
		displayCSeconds = "0" + cSeconds;
	}
		else {
		displayCSeconds = cSeconds;
		}
		
	if (cMinutes < 10) {
		displayCMinutes = "0" + cMinutes;
	}
		else {
		displayCMinutes = cMinutes;
		}
			
				
	document.getElementById("displayCountdownTime").innerHTML = displayCMinutes + ":" + displayCSeconds + ":" + displayCHundreds;
		
	//stop countdown and notify user time is up at 0, re-initialize countdown button variables
	if ((displayCMinutes < 1) && (displayCSeconds < 1) && (displayCHundreds < 1)) {
		alert("Time is up!");
		clearInterval(countdownRun);
		countdownState = null;
		startC = true;
		document.getElementById("countdownButton").innerHTML = "Start";
	}
		
} // end function startCountdown()
	
	
function validateInput(startTime) {
		
	var regex = /^[0-1][0-9]:[0-9][0-9]:[0-9][0-9]$/; // XX:XX:XX
		
	//ensure maximum input of 10 minutes and proper format
	if (regex.test(startTime)) {
	
		if ((startTime[3] + startTime[4]) > 59) {
			if (debugMode) {
				document.getElementById("outputText").innerHTML += "<p>The user input too many seconds!</p>";
			}
			alert("Error: Please enter 59 or fewer seconds.");
			return(false);
		}
		
			else if (((startTime[0] + startTime[1] > 9) && (startTime[3] + startTime[4] + startTime[6] + startTime[7] > 0)) || (startTime[0] + startTime[1]) > 10) {
				if (debugMode) {
					document.getElementById("outputText").innerHTML += "<p>The user's input was over 10 minutes!</p>";
				}
				alert("Error: The maximum countdown time is 10:00:00.");
				return(false);
			}
		
				else  {
					if (debugMode) {
						document.getElementById("outputText").innerHTML += "<p>The user's input was valid and formatted correctly!</p>";
					}	
					return(true);
				}
	}
		else {
			if (debugMode) {
				document.getElementById("outputText").innerHTML += "<p>The user's input was NOT formatted correctly!</p>";
			}
			alert("Error: Please enter your time in XX:XX:XX format, with a maximum of 10:00:00.");
			return(false);
		}
} // end function validateInput(startTime)