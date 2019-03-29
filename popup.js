
if (localStorage.accessToken) {
    console.log(localStorage.accessToken);
    var graphUrl = "https://graph.facebook.com/me?fields=id,name,gender,location,age_range,education,likes&" + localStorage.accessToken + "&callback=displayUser";
    console.log(graphUrl);

    chrome.storage.local.set({'graphAPI_result': graphUrl},function() {
      console.log('graphAPI_result value is set to ' + graphUrl);
    });

    //Set up link in popup panel to see scraping result
    //This can be removed later; only for debugging purposes
    var link = document.createElement('a');
    var linkText = document.createTextNode("See Scraping Result");
    link.appendChild(linkText);
    link.title = "See Scraping Result";
    link.href = graphUrl;
    link.target = "_blank";
    document.getElementsByTagName('body')[0].appendChild(link);

}


async function getDemographicInfo(url){
    url += "&callback";
    var userinfo = {};

    await $.getJSON(url, function(data) {
        //console.log("buffer");
        userinfo.userName = data.name;
        userinfo.gender = data.gender;
        userinfo.age = (data.age_range.max + data.age_range.min)/2;
        userinfo.location = data.location.name;

    });

    return userinfo;

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

    // Gather User Data first in a dictionary
    chrome.storage.local.get(null, async function(result) {
        //First get the link to user's demographic info
        var url =result.graphAPI_result;
        

        //var data = userinfo;
        data = await getDemographicInfo(url);
        alert("The URL returns " + JSON.stringify(data));

        //We still add the demographic link for reference
        data.demographicLink = url;

        //TODO: change this to storage.local rather than localstorage
        data.accessToken = localStorage.accessToken;

        //Add targeting ads
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