function validateForm(){
	var firstName = document.forms["contact-form"]["firstName"].value;
	var lastName = document.forms["contact-form"]["lastName"].value;
	var email = document.forms["contact-form"]["email"].value;
	var message = document.forms["contact-form"]["message"].value;
	if(firstName===""){
		alert("Please enter first name");
		return false;
		}
	else if(lastName===""){
		alert("Please enter last name");
		return false;
	}
	else if(email===""){
		alert("Please enter email address");
		return false;
	}
	else if(message===""){
		alert("Please enter the message");
		return false;
	}
	else{
		alert("Form is submitted");
}
}