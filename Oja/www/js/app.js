document.addEventListener("DOMContentLoaded", event=>{

	const app = firebase.app() ;
	
	
});

var db = firebase.firestore();
var status ;

function googleLogin(){
	const provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider)
			.then(result =>{
				const user = result.user ;
				const panel = document.getElementById("fname-panel") ;
				panel.innerHTML = user ;
				window.location.href = "#Home-page" ;
			})
}

function emailLogin(){

	email = document.getElementById("email").value ;
	password = document.getElementById("pwd").value ;

	if(email == "" || password == ""){
		//do something
		error = document.getElementById("error-login") ;
		error.innerHTML = "email or password is empty" ;
	
	} else{

		firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
			window.location.href = "#Home-page" ;
		}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			var error = document.getElementById("error-login") ;
			error.innerHTML = errorMessage ;
			// ...
		});


	}

			

}

function emailSignUp(){

	firstname = document.getElementById("fname").value ;
	lastname = document.getElementById("lname").value ;
	email = document.getElementById("email-register").value ;
	password = document.getElementById("pwd-register").value ;
	cPassword = document.getElementById("cpwd").value ;

	console.log(password + " " + cPassword) ;
	if(cPassword == password && password > 6){

		db.collection("users").add({
			first: firstname,
			last: lastname,
			email: email,
			password: password
		})
		.then(function(docRef) {

			firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
				window.location.href = "#Home-page" ;

			}).catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				var error = document.getElementById("error-register") ;
				error.innerHTML = errorMessage ;
			  });
			
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
		});
		  
	}else{
		//do something 
		var error = document.getElementById("error-register") ;
		error.innerHTML = "passwords do not match"
	}

}

function LogOut(){
	firebase.auth().signOut().then(function() {
		// Sign-out successful.
		window.location.href = "#login-page" ;
	  }).catch(function(error) {
		// An error happened.
		console.log(error) ;
	  });
}