var APP_ID = 571655706597986;
//var redirect_uri = "https://www.google.com"
var redirect_uri = "https://www.facebook.com/connect/login_success.html";
var login_page = "https://www.facebook.com/v3.2/dialog/oauth?client_id="+ APP_ID+
							"&response_type=token" +
							"&redirect_uri=" +redirect_uri;


function onFBLogin(){
    console.log("Logging in...")
    chrome.tabs.create({url: login_page}); // can add some call back function as parameters too
    chrome.tabs.getCurrent(function(tab) { 
    	console.log(tab.url);
	});
	alert("it ended");

}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login').addEventListener('click', onFBLogin);
});

