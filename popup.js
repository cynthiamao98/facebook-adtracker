
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

function postToDB(userdata){
    $.ajax
    (
        {
            type: "POST",
            url: "http://localhost:8080/action.php",
            // dataType:'json',
            data: userdata,
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
    
}


function submitUserData(){
    var data = {};
    //First add name
    data.userName = 'placeholder';
    //Then add accessToken
    data.accessToken = localStorage.accessToken;
    
    
    chrome.storage.local.get(null, function(result) {
        //Then add demographic result
        data.demographic =result.graphAPI_result;
        if (result.ads != null){
            data.ads = JSON.stringify(result.ads);
        }else{
            data.ads = "empty";
        }
        
        alert("The final data form is " + JSON.stringify(data));
        //TODO: return true if data is successfully submitted, false otherwise
        postToDB(data);
    });
}




$('#submit').on('click', function(){
    //TODO: make this update rather than insert if there's already records
    submitUserData();
});
