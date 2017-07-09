window.onload = function() {
	
	document.getElementById("processDate").onclick = function(evt) {//write date output on process button click
		addDateOutput(document.getElementById("dateUserInput").value);
	}
	
		document.getElementById("processNumber").onclick = function(evt) {//write number output on process button click
		addNumberOutput(document.getElementById("integerUserInput").value);
	}
	
		document.getElementById("processText").onclick = function(evt) {//write string output on process button click
		addTextOutput(document.getElementById("textUserInputOne").value, document.getElementById("textUserInputTwo").value);
	}
	
} // end window.onload


function addDateOutput(inputDate) { //function to test date input and output date into string

	var dateInput = document.getElementById("dateUserInput").value; // get user input of date
	var regex = /^\d{2}\/\d{2}\/\d{4}$/; // XX/XX/XXXX
	
	var todaysDate = new Date();
	var month = todaysDate.getMonth() + 1;
	var day = todaysDate.getDate();
	
	if (month < 10) { //ensure 2 digits in this month's display
		month = "0" +  month;
	}
	
	if (day < 10) { //ensure 2 digits in today's date display
		day = "0" + day;
	}

	var todaysDateFormatted = month + "/" + day + "/" + todaysDate.getFullYear();
	
	var difference = daysBetween(todaysDate, dateInput); //call function to calculate difference between dates
	
	if (regex.test(dateInput)) { //test input with RegExp and output data if correct or error message if not
		document.getElementById("outputFormattedDate").innerHTML = "Current Date: " + todaysDateFormatted + "<br />" + "Your Date: " + inputDate + "<br /> There are " + difference + " days between those two dates.";
		}
		else {
			document.getElementById("outputFormattedDate").innerHTML = "Error: Please enter your date in XX/XX/XXXX format.";
		}
} // end function for date output text


function daysBetween(today, dateInput) { // calculate numbers of days between input date and today

	var dateInput = document.getElementById("dateUserInput").value; // get user input of date
	
	//format user input date so that it can be converted into milliseconds since Jan 1, 1970
	var reformattedUserDate = dateInput[6] + dateInput[7] + dateInput[8] + dateInput[9] + "," + dateInput[0] + dateInput[1] + "," + dateInput[3] + dateInput[4];
	
	var input = new Date(reformattedUserDate);

	var todaysDate = new Date();
	
	var oneDay = 86400000; //one day in milliseconds
	
	var difference = Math.round(Math.abs((todaysDate - input)/oneDay));
	
	return(difference);
	
}// end of function to calculate number of days between input date and today


function addNumberOutput(outputNumber) { //validate number input and output random number

	var numberInput = document.getElementById("integerUserInput").value;
	
	var randomNumberOutput = randomNumber(numberInput);
	
	var regex = /^\d{1,2}$/;
	if (regex.test(numberInput) && numberInput > 9) {
		document.getElementById("outputRandomInteger").innerHTML = randomNumberOutput;
	}
		else {
			document.getElementById("outputRandomInteger").innerHTML = "Error: " + numberInput + " is not an integer from 10 to 99.";
		}
		
}// end of function to validate number input and output random number


function randomNumber(maxNumber) { // generate random number from 10 to max (number input)

	var maxNumber = document.getElementById("integerUserInput").value;
	var randomNumberOutput = Math.floor(Math.random() * (maxNumber - 10 + 1) + 10);
	console.log(randomNumberOutput);
	return(randomNumberOutput); 
	
}// end function to generate random number from 10 to max


function addTextOutput(textOne, textTwo) { //test if string field one input is a substring of field two input and output result

	var textOne = document.getElementById("textUserInputOne").value;
	var textTwo = document.getElementById("textUserInputTwo").value;
	
	if (textTwo.includes(textOne)) {
		document.getElementById("outputTextMessage").innerHTML = "Text Field 1: " + textOne + "<br /> Text Field 2: " + textTwo + "<br /> The input from the first field IS a substring of the input from the second field!"
	}
		else {
			document.getElementById("outputTextMessage").innerHTML = "Text Field 1: " + textOne + "<br /> Text Field 2: " + textTwo + "<br /> The input from the first field is NOT a substring of the input from the second field!"
		}
		
}// end function to test string input