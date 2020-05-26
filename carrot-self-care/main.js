"use strict";
//Amrutha Final Project Self-care app
$(document).ready(function() {   

//Lets write today's date 
	var d = new Date();
	document.getElementById("todaysdate").innerHTML = "Today is " + d.toUTCString();
	
	
//Create unique date string		
	//Turn today's month into string
    var month = d.getMonth();
    month = month + 1;
    if (month < 10) {
    	var month  = "0" + new String(month);
    }
    else {
    	var month  = month;
    }
    
    //Turn today's date into string
    if (d.getDate() < 10) {
    	var date = "0" + new String(d.getDate());
    }
    else {
    	var date = new String(d.getDate());
    }
    
    //Turn today's year into string
    var fullYear = new String(d.getFullYear());
    
    //Create unique string for today called newdate
    var newdate = month + date + fullYear;


//Let's manipulate the Choose Date settings
	//First set the date field equal to today's date, according to Mozilla Developer Network documentation
	//The date is a string of the type YYYY-MM-DD
	document.querySelector('input[type="date"]').value = new String(fullYear + "-"	+ month + "-" + date);
	

//IMPORTANT: THIS SECTION IS FOR ADDING AND DELETING GOALS FROM DAILY CHECKLIST
//Every time add is clicked, a new item is added to checklist with a delete ('X') button, checklist is displayed	
	$("#addgoal").click(function(evt) {
		var goalName = $("#goal").val();
		$("#checklist").prepend("<div>" + "<label class=" + "container" + ">" + "<input type=" + "checkbox" + ">" + goalName + 
		"<img src=" + "img/minus-1270000_1280.png" + " style=" + "width:17px;height:17px;margin-left:5px;" + " class=" + "delete" + ">" + 
		"<span class=" + "checkmark" +">" + "</span>" + "</label>" + " " + "</div>");
		$("#checklistTitle").show();
		$("#checklist").show();
		$("#checklist div").show();
		$("#nogoals").hide();
		
		//Every time an item is added, all present delete 'X' buttons get activated and clicking 'X' will remove item
		$.each($("#checklist div .delete"), function(){
    	//console.log("Hello, I'm a delete button");
	    	$(this).click(function(evt) {
	    		//console.log(new String($(this).parent().html()));
	    		$(this).parent().remove();
	    	});
		});
        evt.preventDefault();
    }); // end click
    
    
//This button permanently deletes any goal from dropdown
    $("#deletegoal").click(function(evt) {
    	var goalName = $("#goal").val();
    	console.log(goalName);
    	$.each($("#goals option"), function(){ 
    		console.log(new String($(this).html()));           
        	if ($(this).html() == goalName) {
        		console.log("Goal match detected");
        		$(this).remove();
        	}
        });
        $("#goal").val("");
        evt.preventDefault();
    });


//Checked items can be saved to the dropdown menu, exceptions are redundant goals handled below
    $("#savegoal").click(function(evt) {
		
		//Create an array out of the current goals in the dropdown menu
		var dropDown = [];
		$.each($("#goals option"), function(){            
        	dropDown.push($(this).html());
        });
        console.log(dropDown.length);
        console.log(dropDown.toString());
        
        //Create an array of the checked goals to be saved to menu
		var savedGoals = [];
		$.each($("input:checked"), function(){   
			savedGoals.push($(this).parent().text());         
        	//savedGoals.push($(this).next().html());
        	//$("#goals").prepend("<option>" + "<label>" + $(this).next().html() + "</label>" + "<br>");	
        });
        console.log(savedGoals.length);
		console.log(savedGoals.toString());
		
		//Create a function that will prepend all saved goals to the menu
		function prependGoals(item) {
			$("#goals").prepend("<option>" + item + "</option>" + "<br>");
			console.log("<option>" + item + "</option>" + "<br>");
		}
		
		//Function checks each menu goal (called ELEMENT) against each saved goal (called ITEM)
		var counter = 0;
		savedGoals.forEach(myFunction);
		function myFunction(item) {
			//console.log(new String("Saved goals are " + item));
			dropDown.forEach(myOtherFunction);
			function myOtherFunction(element) {
				//console.log(new String("Old goals are " + element));
				
				//If any menu goal matches any saved goal, user gets alert and counter increments up
				if (item == element) {
					//console.log("REDUNDANCY DETECTED");
					counter += 1;
					//console.log(new String(counter));
					var dialog = confirm("One or more of your new goals is already on the list. Save anyway?");
					
        			if (dialog == true) { //If the user okay'ed the alert, prepend the saved goals to menu
    					//console.log("Prepend the saved goals to menu here!");
    					savedGoals.forEach(prependGoals);		
  					}
				}
				//Once the program reaches the very last comparison of goals between arrays AND the counter has remained at 0,
				//meaning no other goals have been matched as identical in the past, all saved goals will be added to the menu.
				else if (item == savedGoals[savedGoals.length-1] && 
						element == dropDown[dropDown.length-1] && 
						item !== element &&
						counter == 0) {
					//console.log(new String(counter));
					//console.log("Congrats, these goals are brand new!");
					savedGoals.forEach(prependGoals);
					counter += 1;
					alert("New goals have been saved!");
				}
			}
		}
		$("#checklist").show();		
        evt.preventDefault();
    }); // end click

//User history and log button local storage begins//////////////////////////////////////////////////////////
	
	//FULL CODE EXAMPLE:
	/*
	//Save data as an array of objects
	var storedData = [];
	
	//Must store object as a string within localStorage() key storedData
	localStorage.setItem("storedData", JSON.stringify(storedData));
	
	//Get the localStorage key storedData and store in new var existing
	var existing = localStorage.getItem('storedData');
	
	// If existing exists, JSON-parse 'existing' into an array. Else, create a new object
	existing = existing ? JSON.parse(existing) : {};
					
	existing.push({ submitDate: new Date(fullDate), goals: logGoals.toString()});
	
	// Save back to localStorage
	localStorage.setItem('storedData', JSON.stringify(existing));
	console.log(localStorage.storedData);
	*/
	
	function getNewId() {
		//We will store unique div id's as a key/value pair for each goal submission
		
		//First, let var logDate be the received date YYYY-MM-DD
		var logDate = document.querySelector('input[type="date"]').value;
		//console.log(logDate);
		
		//Convert the date string into an array of characters
		var logDateArray = Array.from(logDate);
		//console.log(logDateArray);
		
		
		
		//Create year string, create year number from that
		var logYear = new String(logDateArray[0] + logDateArray[1] + logDateArray[2] + logDateArray[3]);
		var logYearNum = Number(logYear);
		
		//Create year string
		var stringYear = new String(logYearNum);
		
		
		
		//Obtain the month string from the logDate Array
		var logMonth = new String(logDateArray[5] + logDateArray[6]);
		//Convert month string into a number
		var logMonthNum = Number(logMonth);
		
		//Create month strings; we will need this later to create unique div id's
		if (logMonthNum < 10) { 
			var stringMonth = "0" + new String(logMonthNum);
		}
		else {
			var stringMonth = new String(logMonthNum); 
		}
				
		
		
		//Create date string, create year number from that
		var logDay = new String(logDateArray[8] + logDateArray[9]);
		var logDayNum = Number(logDay);
		
		//Create day strings; we will need this later to create unique div id's
		if (logDayNum < 10) { 
			var stringDay = "0" + new String(logDayNum);
		}
		else {
			var stringDay = new String(logDayNum); 
		}
		
		
		
		//Add newId var
		var newId = new String(stringYear + stringMonth + stringDay);
		return newId;
	}
		console.log(getNewId());
		
	
	
	function getFullDate() {
		//User may have changed date or not- either way we've got to retrieve that date once goals are logged!
		
		//First, let var logDate be the received date YYYY-MM-DD
		var logDate = document.querySelector('input[type="date"]').value;
		//console.log(logDate);
		
		//Convert the date string into an array of characters
		var logDateArray = Array.from(logDate);
		//console.log(logDateArray);
		
		
		
		//Obtain the month string from the logDate Array
		var logMonth = new String(logDateArray[5] + logDateArray[6]);
		//Convert month string into a number
		var logMonthNum = Number(logMonth);
		
		
				
		//Create year string, create year number from that
		var logYear = new String(logDateArray[0] + logDateArray[1] + logDateArray[2] + logDateArray[3]);
		var logYearNum = Number(logYear);
		
		
		
		//Create date string, create year number from that
		var logDay = new String(logDateArray[8] + logDateArray[9]);
		var logDayNum = Number(logDay);
		
		
		
		//Fulldate
		var fullDate = new String(logYearNum + ", " + logMonthNum + ", " + logDayNum);
		return fullDate;
	}
		console.log(getFullDate());
	


//Load user history on page load

	var existingTwo = [];
	var existingTwo = localStorage.getItem('storedData');

	//If existing exists, JSON-parse 'existing' into an array. Else, create a new object
	existingTwo = existingTwo ? JSON.parse(existingTwo) : {};
	
	//Write updated user history to the page
	document.getElementById("history").innerHTML = "";
	for (let i = 0; i < existingTwo.length; i++) {
		console.log(Number(i));
		var thisDate = existingTwo[i]["submitDate"];
		
		var displayDate = new Date(thisDate).toDateString();
		
		var newId = existingTwo[i]["id"];
		
		$("#history").append("<div id=" + newId + ">" + "Date: " + "<span class=" + "history" + ">" + displayDate + "</span>" +
		"<br>" + "Completed: " + "<span class=" + "history" + ">" + existingTwo[i]['goals'] + "</span>" + "</div>" + "<br>");
	}
	
	//Save existing array back to localStorage for permanent memory
	localStorage.setItem('storedData', JSON.stringify(existingTwo));
	console.log(localStorage.storedData);		



//Delete user history button
	$("#delhistory").click(function(evt) {
		//Save data as an array of objects
		var dialog = confirm("Are you sure you want to permanently delete your history?")
		if (dialog == true) {
			var storedData = [];
			//storedData.push({ submitDate: getFullDate(), goals: "Testing123", id: getNewId()});
			//Must store object as a string within localStorage() key storedData
			localStorage.setItem("storedData", JSON.stringify(storedData));
			console.log(localStorage.storedData);
		}
	});



//Hide user history on page load
	$("#history").hide();
	
//Create display/hide user history on click for white plus/minus
	$("#whiteplus").click(function(evt) {
		var imgSrc = $(this).attr("src")
		if (imgSrc == "img/whiteplus.png") {
			$(this).attr("src", "img/whiteminus.png");
			$("#history").show([600]);
		}
		else if (imgSrc == "img/whiteminus.png") {
			$(this).attr("src", "img/whiteplus.png");
			$("#history").hide([600]);
		}
		evt.preventDefault();	
	});
	
	
	
//Activate log button
	$("#log").click(function(evt) {
	
		console.log(getFullDate());
			
	//Create an array of the checked goals to be logged from the checklist	
		var logGoals = [];
		$.each($("input:checked"), function(){   
			logGoals.push($(this).parent().text());
			//Remove logged goal from checklist
			$(this).parent().remove();         
        });
		//console.log("Array logGoals contains: " + logGoals.toString());
		
		
	//Retrieve and change localStorage key storedData, then re-save
		//Get the localStorage key storedData and store in new var existing
		var existing = localStorage.getItem('storedData');

		//If existing exists, JSON-parse 'existing' into an array. Else, create a new object
		existing = existing ? JSON.parse(existing) : {};
		
					
		//Adding new goal submission as a new object to the existing array looks like this:		
		//existing.push({ submitDate: getFullDate(), goals: logGoals.toString(), id: getNewId()});
		
		//For loop that runs to check whether date of new goal submission matches existing entries before showing decision tree
		//This is where new goal submissions are written to user history in the existing array!
		
		if (existing.length == 0) {
			existing.push({ submitDate: getFullDate(), goals: logGoals.toString(), id: getNewId()});		
		}
		else {
			var counter = 0;
			var counterTwo = 0;
			console.log("FOR LOOP HERE");
			console.log("fullDate is: " + getFullDate());
			for (let i = 0; i < existing.length; i++) {
				var oldDate = new Date(existing[i]["submitDate"]).toDateString();
				var newDate = new Date(getFullDate()).toDateString();
				if (counter == 0 && newDate == oldDate) {
					console.log("If fulfilled: " + Number(i));
					var j = Number(i);
					var dialog = confirm("You already logged goals for this day. Overwrite goals? 'OK' to overwrite goals, 'Cancel' for more options.");
	        			if (dialog == true) { //If the user okay'ed the alert, overwrite the goals!
	    					existing[j]["goals"] = logGoals.toString();
	    					console.log("Goals overwritten");		
	  					}
	  					else{
	  						var dialog2 = confirm("Add goals to existing entry? 'OK' to add goals, 'Cancel' to return to app.");
	  						if (dialog2 == true) {
	  							existing[j]["goals"] = existing[j]["goals"] + "," + logGoals.toString();
	  							console.log("Goals added");
	  						}
	  						else {
	  							console.log("DONE");
	  							counterTwo = counterTwo + 1;
	  						}
	  					}
				} 
				else if (counterTwo == 0 && i == existing.length - 1 && newDate !== oldDate) {
					counter = counter + 1;
					console.log("Else if fulfilled: " + Number(i));
					console.log(oldDate);
					console.log(newDate);
					
					existing.push({ submitDate: getFullDate(), goals: logGoals.toString(), id: getNewId()});
					console.log("New submission made");
				}
			}
		}
		
		
		//Sort array by date in DESCENDING order (most recent to oldest)
		existing.sort(function (a, b) {
		  if (a.submitDate > b.submitDate) return -1;
		  if (a.submitDate < b.submitDate) return 1;
		  return 0;
		});
		
		//Write updated user history to the page
		document.getElementById("history").innerHTML = "";
		for (let i = 0; i < existing.length; i++) {
			console.log(Number(i));
			var thisDate = existing[i]["submitDate"];
			
			var displayDate = new Date(thisDate).toDateString();
			
			var newId = existing[i]["id"];
			
			$("#history").append("<div id=" + newId + ">" + "Date: " + "<span class=" + "history" + ">" + displayDate + "</span>" +
			"<br>" + "Completed: " + "<span class=" + "history" + ">" + existing[i]['goals'] + "</span>" + "</div>" + "<br>");
		}
		
		//Save existing array back to localStorage for permanent memory
		localStorage.setItem('storedData', JSON.stringify(existing));
		console.log(localStorage.storedData);		
		
		
		
		//User history toggle date list


	});	    
////////////////////////////////////////////////////////////////////////////////////////////
	
//Start off with checklist hidden	
	$("#checklist").hide();
	$("#checklistTitle").hide();

//When textbox is clicked, text goes away	
	$("#goal").focus(function(evt) {
		$("#goal").val("");
        evt.preventDefault();
    }); // end click
            
}); // end ready