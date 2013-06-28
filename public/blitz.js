preload = {}
function goTo(page){ 
	window.history.pushState({}, "Title", page)
	loadContent(window.location.pathname)
}
function loadContent(page){
	var content = preload[page] || httpOptions(page)
	document.body.innerHTML = content
	setTimeout(preloadLinks,0)
}
function preloadLinks(){
	$("a").click(function(event){
		if(!!$(this).attr("preload") && !event.metaKey){
			event.preventDefault()
			goTo($(this).attr("href"))
		}
	})
	$("a").each(function(index, link){
		setTimeout(function(){
			if(!!link.getAttribute("preload")){
				var url = link.getAttribute("href")
				preload[url] = httpOptions(url) 
			}
		}, 0)
	})
}
window.onpopstate = ps
function ps(){
	console.log(window.location.pathname)
	setTimeout(function(){loadContent(window.location.pathname)},0)
}
function httpOptions(theUrl){
	var xmlHttp = null
	xmlHttp = new XMLHttpRequest()
	xmlHttp.open( "OPTIONS", theUrl, false )
	xmlHttp.send( null )
	return xmlHttp.responseText
}
