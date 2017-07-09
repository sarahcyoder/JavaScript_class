// JavaScript Document

window.onload = function() {
	document.getElementById("userButton").onclick = function(evt) {
		outputMessage();
	} // userBotton onclick event
	
} // end window.onload

		
function outputMessage() { //begin function to output message to user
	var computerMessage = testPalindrome(document.getElementById("userInput").value);
				
	document.getElementById("output").innerHTML = computerMessage;
} // end function outputMessage
		
			
function testPalindrome(userInputX) { //begin function to test palindrome validity and return result
	var result;
	var validMessage = testInput(document.getElementById("userInput").value);

	if (validMessage == true) {
		result = "Your input is valid. Great job!<br />";
	}
		else if (validMessage == false) {
			result = "Your input is not valid.";
			return(result);
		}

	var reversedUserInput = reverseInput(document.getElementById("userInput").value);
						
	if (reversedUserInput == userInputX) {
		result += "AND, your input is a palindrome!";
	}
		else {
			result += "But, your input is NOT a palindrome!";
		}
					
	return (result);
}// end palindrome test function


function testInput(userInputY) {//begin test for valid user entry
	var validInput;
	
	if (userInputY.length > 10 || userInputY.length == 0) { 
		validInput = false;
	}
		//else if (userInputY.indexOf(' ') > 0) {
			//validInput = false;
		//}
			else validInput = true;
		
	return(validInput);
}//end test for valid user entry
		
		
function reverseInput(userInputZ) {  //begin function to return inverse of input			
	var inputBackward = "";	
	var i;
				
	for (i = userInputZ.length-1; i >= 0; i--) {
		inputBackward += userInputZ[i];
	}
	return (inputBackward);		
}// end reverse input function