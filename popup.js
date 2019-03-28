
if (localStorage.accessToken) {
    console.log(localStorage.accessToken);
    var graphUrl = "https://graph.facebook.com/me?fields=id,name,gender,location,age_range,education,likes&" + localStorage.accessToken + "&callback=displayUser";
    console.log(graphUrl);

    chrome.storage.local.set({'graphAPI_result': graphUrl},function() {
      console.log('graphAPI_result value is set to ' + graphUrl);
    });

    // localStorage.graphResult = graphUrl;

    // //record FB Graph API result in local storage
    // console.log("Graph Result is " + localStorage.graphResult);

    var link = document.createElement('a');
    var linkText = document.createTextNode("See Scraping Result");
    link.appendChild(linkText);
    link.title = "See Scraping Result";
    link.href = graphUrl;
    link.target = "_blank";
    document.getElementsByTagName('body')[0].appendChild(link);

    function displayUser(user) {
        console.log(user);
    }
}


function talkToPHP(){
    $.ajax
    (
        {
            type: "POST",
            url: "http://localhost:8080/action.php",
            data: 
            {               
                userName: 'JohnDoe',
                accessToken: "e9nf93jdo1",
                demographic: "someJSONstring",
                ads: "no ads yet"
            },
            success: function(msg)
            {
                alert("Successfully posted!");
            }//end function
        }
    );//End ajax 
}


$('#submit').on('click', function(){
    $.ajax
    (
        {
            type: "POST",
            url: "http://localhost:8080/action.php",
            // dataType:'json',
            data: 
            {               
                userName: "JohnDoe",
                accessToken: "e9nf93jdo1",
                demographic: "someJSONstring",
                ads: "no ads yet"
            },
            success: function(data, status, xhr){
                alert(xhr.responseText);
                return(true);
            },
            error: function(data, status, xhr) {
                alert("failed");
                alert(xhr.responseText);
                return(false);
            }
        }
    );//End ajax 
});




// chrome.storage.onChanged.addListener(function(changes, namespace) {
//     console.log('Storage content is changed');
//     for (var key in changes) {
//       var storageChange = changes[key];
//       var changeLog = document.createElement('p1');
//       var logText = document.createTextNode('Storage key "%s" in namespace "%s" changed. ',
//                   'New value is "%s".',
//                   key,
//                   namespace,
//                   storageChange.newValue);
//       changeLog.appendChild(logText);
//       document.getElementsByTagName('body')[0].appendChild(changeLog);
      
//     }
// });
