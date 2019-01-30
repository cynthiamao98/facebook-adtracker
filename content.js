console.log("new version4");
var groupURL = "https://www.facebook.com/groups";
MutationObserver = window.MutationObserver;

var observer = new MutationObserver(function(mutations, observer) {

	let paragraph = document.getElementsByTagName('s'); //fwb fcg
	for (elt of paragraph){
		if (elt.getElementsByTagName('span').length < 9){
			continue;
		}

		// if(elt.nextSibling != null){
		// 	span = elt.nextSibling.getElementsByClassName('fsm fwn fcg');
		// 	if(span != null){
		// 		console.log(span.length);
		// 		var link = span[0].getElementsByTagName('a')[0].href;
		// 		elt.style['background-color'] = 'yellow';
		// 	}
		// }
		var feed_subtitle = elt.parentElement;

		if (feed_subtitle == null){
			console.log("feed subtitle does not exist");
			continue;
		}

		var span = feed_subtitle.getElementsByClassName("fsm fwn fcg");
		if (span == null) continue;
		var link = span[0].getElementsByTagName('a')[0].href;
		if (link.indexOf(groupURL) == 0){
			console.log("Not an ad!");
			continue;
		}
		elt.style['background-color'] = 'yellow';
		console.log(link);

	}
});

observer.observe(document, {
  subtree: true,
  //attributes: true,
  //characterData: true,
	childList: true
});
