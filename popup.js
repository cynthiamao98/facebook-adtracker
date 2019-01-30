
if (localStorage.accessToken) {
    console.log(localStorage.accessToken);
    var graphUrl = "https://graph.facebook.com/me?fields=id,name,likes&" + localStorage.accessToken + "&callback=displayUser";
    console.log(graphUrl);

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