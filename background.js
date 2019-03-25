'use strict';
var successURL = 'https://www.facebook.com/connect/login_success.html';

function onFacebookLogin() {
    console.log("Logging in...");
    if (!localStorage.accessToken) {
        chrome.tabs.getAllInWindow(null, function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
                console.log(tabs[i].url);
                if (tabs[i].url.indexOf(successURL) == 0) {
                    console.log("FB Connect Page Found");
                    var params = tabs[i].url.split('#')[1];
                    var access = params.split('&')[0];
                    console.log(access);
                    //TODO: figure out a more secure way to store access token 
                    localStorage.accessToken = access;
                    chrome.tabs.onUpdated.removeListener(onFacebookLogin);
                    console.log(ad_links);
                    return;
                }
            }
        });
    }
}

// Remove the previous accessToken
chrome.runtime.onInstalled.addListener(function() {
  console.log("Removing Previous accessToken...");
  localStorage.removeItem("accessToken");
}); 

// Run FB Login script whenever there is an update in the browser tabs
chrome.tabs.onUpdated.addListener(onFacebookLogin);

var hello = document.createElement('a');
var helloText = document.createTextNode('hello1');
hello.appendChild(helloText);
document.getElementsByTagName('body')[0].appendChild(hello);

