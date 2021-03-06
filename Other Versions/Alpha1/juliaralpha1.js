function juliar_core_version() {
	return "Language: \\*Juliar \\* <br>" +
	"Moto: 'Language for an artistic mind' <br>" +
	"Type: Main <br>" +
	"Version: 0.1 <br>" +
	"First Published: 4/12/2015 <br>" +
	"Creator: Andrei Makhanov <br>" +
	"Official Repository: https://github.com/juliarLang <br>" +
	"Official Website: http://juliar.elementfx.com <br>" +
	"Comment: <br>" +
	"I created this programming language for Julia hence the name of the language juliar. <br>" +
	"She has an artistic mind and thus, it's difficult for her to code in language, let alone javascript and css. <br>" +
	"This language is simple to use and people with a nonlogical mind will be able to use it quickly and easily.<br>" +
	"Juliar can be easily  integrated into other sites simply by using <juliar></juliar> tags.<br>" +
	"This language is inspired by BBCode, Python, HTML 3.2, and AngularJS.<br>" +
	"If you have an improvement to the language i.e. improved code or a new function please commit it on github <br>" +
	"and I will gladly 'pull' your request. <br>" +
	"Please consider donating, all the money will go into an upkeep of the website and improvement of the language.<br>" +
	"Licensed under GPL 3.0";
}
var juliar_core_globals = {}, juliar_core_module = [], juliar_core_history_index = 0, juliar_core_history_arr = [], ijuliar_js = "";

function ijuliar_injectcss() {
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = "body{font-family: Tahoma, Geneva, sans-serif;background-repeat:no-repeat;background-size:cover;}p:first-child:first-letter { float: left; color: #903; font-size: 75px; line-height: 60px; padding-top: 4px; padding-right: 8px; padding-left: 3px; }.smaller{font-size:85%}.larger{font-size:115%}.subscript{vertical-align: sub;font-size: smaller;}.superscript{vertical-align: super;font-size: smaller;}.underline{text-decoration: underline;}.bold{font-weight: bold;}.italics{font-style: italic;}.crossout{text-decoration: line-through;}.overline{text-decoration: overline;}";
    css.innerHTML += ".marquee{margin: 0 auto;overflow: hidden;white-space: nowrap; box-sizing: border-box;}";
	css.innerHTML += ".marquee:hover{animation-play-state: paused}@keyframes marquee{0%{ text-indent: 27.5em }100%{ text-indent: -105em }}";
	css.innerHTML += ".progress-bar{background-color: #1a1a1a;height: 25px;padding: 5px;width: 350px;margin: 50px 0;border-radius: 5px;box-shadow: 0 1px 5px #000 inset, 0 1px 0 #444;}";
	css.innerHTML += ".progress-bar span{display: inline-block;height: 100%;border-radius: 3px;box-shadow: 0 1px 0 rgba(255, 255, 255, .5) inset;transition: width .4s ease-in-out;}";
	css.innerHTML += "input[type='text'].searchable{background: url('data:image/png;base64,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') no-repeat 10px 6px #444;border: 0 none;";
	css.innerHTML += "font: bold 12px Arial,Helvetica,Sans-serif; color: #777;width: 150px;padding: 6px 15px 6px 35px;border-radius: 20px;";
	css.innerHTML += "text-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2) inset;";
	css.innerHTML += "transition: all 0.7s ease 0s;}input[type='text'].searchable:focus{width: 200px;}";
	document.body.appendChild(css);
	var viewPortTag=document.createElement('meta');
	viewPortTag.name = "viewport";
	viewPortTag.content = "initial-scale=1.0, maximum-scale=1.0, user-scalable=0";
	document.getElementsByTagName('head')[0].appendChild(viewPortTag);
}

function ijuliar_injectjs(){
	var fileref=document.createElement("script");
	fileref.type = "text/javascript";
	fileref.textContent = ijuliar_js;
	document.head.appendChild(fileref);
}

function juliar_core_import(str){
	if(str.indexOf("//") != -1){
		var http = new XMLHttpRequest();
		http.open("GET", str, !1);
		http.send();
		if(http.status!=200) return "Cannot load module from \""+str;
		var outp = http.responseText;
	}
	else{
		var http = new XMLHttpRequest();
		http.open("GET", "juliar_modules/"+str+".juliar", !1);
		http.send();
		if(http.status!=200){
			var temp;
			if((temp = str.split("/")).length > 2){
				http.open("GET", "http://github-raw-cors-proxy.herokuapp.com/"+temp.shift()+"/"+temp.shift()+"/master/"+temp.join("/")+".juliar", !1);
				http.send();
				if(http.responseText.indexOf("Not Found") == 1) return "Cannot load module \""+str+"\" Github and Local module does not exist";
				var outp =	JSON.parse(http.responseText);
			}
			else{
				return "Cannot load module \""+str+"\". NOTE: local modules are stored in juliar_modules/";
			}
		}
		else{
			var outp = http.responseText;
		}
	}
	str = str.split("/").pop().split(".")[0];
	var fileref=document.createElement("script");
	fileref.type = "text/javascript";
	fileref.textContent = outp;
	document.head.appendChild(fileref);
	var index = juliar_core_module.indexOf(str);
	-1 < index && juliar_core_module.splice(index, 1);
	juliar_core_module.unshift(str);
	var str2 = window["juliar_"+str+"_init"];
	"function" === str2 && str2();
	return "Imported Module \""+str+"\"";
}

function juliar_core_deport(a) {
	var b = juliar_core_module.indexOf(a);
	return -1 < b ? (juliar_core_module.splice(b, 1), 'Deported Module "' + a + '"') : 'Module "' + a + '" does not exists';
}

function juliar_core_download(str){
	if(str.indexOf("//") === -1){
		var temp = str.split("/");
		str = "http://github-raw-cors-proxy.herokuapp.com/"+temp.shift()+"/"+temp.shift()+"/master/"+temp.join("/")+".juliar";
	}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", str, !1);
	xmlhttp.send();
	if(xmlhttp.status!=200) return "Cannot download the module. Make sure you provide correct link";
	if(xmlhttp.responseText.indexOf("Not Found") == 1) return "Cannot download module from GitHub. Make sure that the file exists";
	var fileref=document.createElement("a");
	fileref.download = str.split("/").pop();
	fileref.href = 'data:text/plain;base64,'+btoa(JSON.parse(xmlhttp.responseText));
	document.body.appendChild(fileref);
	fileref.click();
	return "";
}

function juliar_core_modules(){
	return juliar_core_module.toString();
}

function juliar_core_plusminus(){
	return "&plusmn;";
}

function juliar_core_submit(str,args){
	var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", str || "");
	for(var i=0, length = args.length; i<length;++i){
		var hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", args[i]);
		hiddenField.setAttribute("value", juliar_core_globals(args[i]));
		form.appendChild(hiddenField);  
	}
    document.body.appendChild(form);
    form.submit();
	return "";
}

function juliar_core_sticky(str,args){
	args[0] = args[0]  || "initial";
	args[1] = args[1]  || "initial";
	var x = args[0] < 0 ? "bottom:" : "top:";
	var y = args[1] < 0 ? "right:" : "left:";
	return "<span style='position:fixed;"+x+args[0]+";"+y+args[1]+"'>"+str+"</span>";
}

function juliar_core_columns(str,args){
	var temp = 100/(args[0] || 1);
	return "<div style='float:left;width:"+temp+"%'>"+str+"</div>";
}

function juliar_core_threed(str){
	return "<span style='text-shadow: -0.06em 0 red,  0.06em 0 cyan;'>"+str+"</span>";
}

function juliar_core_spoiler(str,args){
	var temp = args[0] || "black";
	var front = args[1] || "black";
	var back = args[2] || "white";
	return "<style>.juliar_spoiler_"+temp+"{ background-color:"+temp+";color:"+temp+"}.juliar_spoiler_"+temp+":hover{background-color:"+front+";color:"+back+"}</style><span class='juliar_spoiler_"+temp+"'>"+str+"</span>";
}

function juliar_core_figure(str,args){
	var temp = args[0] || null;
	var val = juliar_core_globals["juliar_core_counter_"+str] ?  ++juliar_core_globals["juliar_core_counter_"+str] : juliar_core_globals["juliar_core_counter_"+str] = 1;
	juliar_core_globals[temp] = val;
	return val;
}

function juliar_core_reference(str){
	return "<span class='superscript'>" + juliar_core_globals[str] + "</span>";
}

function juliar_core_socket(str,args){
	var temp = args[0] || null;
	var Socket = new WebSocket("wss://"+str);
	juliar_core_globals["juliar_core_socket_"+temp] = Socket;
	return "Socket Created";
}

function juliar_core_setsocket(str,args){
	var temp = args[0] || null;
	juliar_core_globals["juliar_core_socket_"+temp].send(str);
	return "Sent "+str;
}

function juliar_core_getsocket(str,args){
	var rand = Math.random() * 100000 |0;
	juliar_core_globals["juliar_core_socket_"+str].onmessage = function (event) {
		document.getElementsByTagName("juliar_core_sockets_"+rand)[0].innerHTML = event.data;
	};
	return "<juliar_core_sockets_"+rand+"></juliar_core_sockets_"+rand+">";
}

function juliar_core_list(str,args){
	var temp  = args[0] || "decimal";
	switch (temp) {
		case "decimal":
		temp = 1;
		case "lowercase":
		temp = 'a';
		break;
		case "uppercase": 
		temp = 'A';
		break;
		case "roman":
		temp = 'i';
		break;
		case "uppercaseroman":
		temp = 'I';
		break;
		default:
		temp = 1;
	}
	var list = "var temp = document.createElement(\"li\");temp.innerHTML = \""+str+"\";if(this.previousElementSibling.nodeName != \"OL\"){";
	list += "temp2 = document.createElement(\"OL\");temp2.type = \""+temp+"\";this.parentNode.insertBefore(temp2, this);temp2.appendChild(temp);}";
	list += "else{this.previousElementSibling.appendChild(temp);}";
	list += "this.parentNode.removeChild(this);"
	return "<img src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' onload='"+list+"'>";
}


function juliar_core_link(str,args){
	args[0] = args[0] || str;
	var temp = !(args[1]) == true ? "_blank" : "_self";
	return "<a href='"+str+"' target='"+temp+"'>"+args[0]+"</a>";
}

function juliar_core_mail(str,args){
	args[0] = args[0] || str;
	return "<a href='mailto:"+str+"'>"+args[0]+"</a>";
}

function juliar_core_history(){
	return window.history.length;
}

function juliar_core_statehistory(){
	return window.state;
}

function juliar_core_sethistory(str,args){
	var temp = args[0] || null;
	history.pushState(temp, null, str);
}

function juliar_core_gethistory(str){
	return IsNumeric(str) ? window.history.go(str) : window.history.go(juliar_core_globals(str));
}

function juliar_core_replacehistory(str){
	var temp = args[0] || null;
	history.replaceState(temp, null, str);
}

function juliar_core_code(str){
	return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
	function juliar_core_splitwork(str){
	 if(window.Worker) {
	        var temp = Math.random() * 1000000 |0;
	 	var w = new Worker("juliar.js");
	 	w.postMessage(str);
	 	w.onmessage = function(event) {
        		document.getElementsByTagName("juliar_worker_"+temp)[0] = event.data;
        		W.terminate();
		};
		return "<juliar_worker_"+temp+"></juliar_worker_"+temp+">";
	 }
	 return str;
	 
	 self.addEventListener('message', function(e) {
  		 self.postMessage(ijuliar_parser(e.data));
  		 self.close();
	 }, false);
	
}
/*function juliar_core_graph(str,args){
	var canvas = document.createElement('canvas');
	canvas.id     = "CursorLayer";
	canvas.width  = 500;
	canvas.height = 768;
	canvas.style.zIndex   = 8;
	canvas.style.position = "absolute";
	canvas.style.border   = "1px solid";
	document.body.appendChild(canvas);
	return "";
}*/

/*function juliar_core_setmatrix(str,args){ //NOT READY YET!
	var temp = str.split("|");
	var arr = [];
	for(var i=1, length = temp.length; i<length; i+=2){
	arr.push(temp[i].split(" ").filter(function(e){return e != "";}));
	}
	juliar_core_globals[args[0]] = arr;
	return "";
}*/

function juliar_core_getmatrix(str){ //NOT READY YET!
	var temp = juliar_core_globals[str];
	var output = "<p style='width:88px;'><span style='float:left;font-size:260px;line-height:230px;'>[</span>";
	//output += "<span style='float:right;font-size:110px;line-height:80px;'>]</span>";
	output += "<div style='padding-top:20px;font-size:20px;line-height:20px;word-spacing:20px'>";
	output += "1<br>";
	output += "1<br>";
	output += "1<br>";
	output += "1<br>";
	output += "1<br>";
	output += "1<br>";
	output += "1<br>";
	output += "1<br>";
	output += "1<br>";
	output += "1<br>";
	output += "1<br>";
	output += "</div>";
	output += "</p>";
	return output;
}

function juliar_core_bullet(str){
	return "<ul><li>" + str + "</li></ul>";
}

function juliar_core_story(str){
	return "<p>"+ str +"</p>";
}

function juliar_core_newspaper(str,args){
	var st = args[0] || 2;
	var style = "-webkit-column-count: "+st+";-moz-column-count: "+st+";column-count: "+st+";";
	style += "-webkit-column-gap: 40px;-moz-column-gap: 40px;column-gap: 40px;";
	style += "-webkit-column-rule: 1px solid lightblue;-moz-column-rule: 1px solid lightblue;column-rule: 1px solid lightblue;";
	return "<div style='"+style+"'>"+ str +"</div>";
}

function juliar_core_left(str) {
    return "<div style='text-align:left'>" + str + "</div>";
}

function juliar_core_right(str) {
    return "<div style='text-align:right'>" + str + "</div>";
}

function juliar_core_middle(str) {
    return "<div style='text-align:center'>" + str + "</div>";
}

function juliar_core_trash(){
	return juliar_core_globals.null || juliar_core_globals.undefined;
}

function juliar_core_input(str,args){
	return "<input onblur='juliar_core_dynamicset(this.value,\""+args[0]+"\")' type='text' value='"+str+"' style='width: 600px;border-top: 0;border-right: 0;border-left: 0;background: transparent;border-color:rgba(0,0,0,0.3)'>";
}

function juliar_core_dynamicset(str,args){
	var temp = args[0] || null;
	var h2s = document.getElementsByTagName("juliar_dynamic_"+temp);
	for(var h = 0, length = h2s.length; h < length; h++ ) {
		h2s[h].innerHTML = str;
	} 
	return "<juliar_dynamic_"+temp+">"+(juliar_core_globals[temp] = str)+"</juliar_dynamic_"+temp+">";
}

function juliar_core_dynamicget(str){
	return "<juliar_dynamic_"+str+">"+juliar_core_globals[str]+"</juliar_dynamic_"+str+">";
}

function juliar_core_loadingbar(str,args){
	var color1 = args[0] || "orange";
	var color2 = args[1] || "orange";
	var background = args[2] || "black";
	var temp = isFinite(String(str)) ? "<span style='width: "+str+"%;background-color: orange;color:black;text-align:center'>"+str+"%</span>" : 
	"<juliar_dynamic_"+str+">"+juliar_core_globals[str]+"</juliar_dynamic_"+str+">";
	return "<div class='progress-bar'>"+temp+"</div>";
}

function juliar_core_dynamicfetch(str){
	var randomj = "juliar_dynamicfetch_"+Math.random();
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			document.getElementById(randomj).innerHTML=xmlhttp.responseText;
		}
	};
	xmlhttp.open("GET",str,true);
	xmlhttp.send();
    return "<span id='"+randomj+"'></span>";
}


function juliar_core_set(str,args) {
	return juliar_core_globals[args[0]] = str;
}

function juliar_core_get(str) {
    return juliar_core_globals[str];
}

function juliar_core_store(str,args) {
    localStorage.setItem(args[0], str);
	return str;
}

function juliar_core_restore(str) {
    return localStorage.getItem(str);
}

function juliar_core_rotate(str,args){
	var temp = args[0] || 350;
	args[0] = args[0]  || "inherit";
	args[1] = args[1]  || "inherit";
	var x = args[0] < 0 ? "bottom:" : "top:";
	var y = args[1] < 0 ? "right:" : "left:";
	return "<div style='transform: rotate("+temp+"deg);position:relative;"+x+args[0]+";"+y+args[1]+"'>" + str + "</div>";
}

function juliar_core_reflect(str,args){
	var temp = args[0] || "X";
	return "<div style='transform: scale"+temp.toUpperCase()+"(-1);'>" + str + "</div>";
}

function juliar_core_uppercase(str){
	return "<span style='text-transform: uppercase;'>"+str+"</span>";
}

function juliar_core_lowercase(str){
	return "<span style='text-transform: lowercase;'>"+str+"</span>";
}

function juliar_core_capitalize(str){
	return "<span style='text-transform: capitalize;'>"+str+"</span>";
}

function juliar_core_blink(str,args){
	var rate = args[0] || 500;
	var temp = Math.random() * 1000000 |0;
	var handler = function() {
		document.removeEventListener("juliar_done",handler,false);
		var f = document.getElementsByTagName("juliar_blink_"+temp)[0];
		setInterval(function() {
			f.style.visibility = (f.style.visibility == 'hidden' ? '' : 'hidden');
		}, rate);
	}
	document.addEventListener("juliar_done",handler , false);
	return "<juliar_blink_"+temp+">"+str+"</juliar_blink_"+temp+">";
}

function juliar_core_banner(str,args){
	var temp = args[0] || 50;
	return "<div class='marquee' style='animation: marquee "+temp+"s linear infinite;'>"+str+"</div>";
}

function juliar_core_border(str,args){
	var color = args[0] || "black";
	var size = args[1] || 1;
	var style = args[2] || "solid";
	return "<span style='border: "+size+"px "+style+" "+color+"'>"+str+"</span>";
}

function juliar_core_outline(str,args){
	var temp = args[0] || 'orange';
	return "<span style='text-shadow:-1px -1px 0 "+temp+",1px -1px 0 "+temp+",-1px 1px 0 "+temp+",1px 1px 0 "+temp+"'>"+str+"</span>";
}

function juliar_core_search(str){
	return "<input class='searchable' name='q' type='text' size='40' placeholder='Search...' />";
}

function juliar_core_button(str,args){
	var str = str || "#";
	var color = args[0] || 'green';
	return "<a href='"+str+"' class='juliar_button_"+color+"'>HELLO</a><style>.juliar_button_"+color+"{background-color:"+color+";color:white;}</style>";
}

/*function juliar_core_table(str){}
function juliar_core_slider(str){}
function juliar_core_tab(str){}
function juliar_core_theme(str){}
function juliar_core_menu(str){}
function juliar_core_slideshow(str){}
*/

function juliar_core_date(){
	var now = new Date();
	return ("0"+(now.getMonth()+1)).slice(-2)+"/"+("0"+now.getDate()).slice(-2)+"/"+now.getFullYear();
}

function juliar_core_time(){
	var now = new Date();
	return ("0"+now.getHours()).slice(-2)+ ":" + ("0"+now.getMinutes()).slice(-2) + ":" + ("0"+now.getSeconds()).slice(-2);
}

function juliar_core_blur(str,args){
	var temp = args[0] || 'black';
	return "<span style='text-shadow: 0 0 3px "+temp+";color: transparent;'>"+str+"</span>";
}

function juliar_core_visibility(str,args){
	var temp = args[0] || 40;
	return "<span style='opacity: "+temp/100+";filter: alpha(opacity="+temp+");'>"+str+"</span>";
}

function juliar_core_color(str,args) {
	var temp = args[0] || 'inherit';
	return "<span style='color: " + temp + "'> " + str + "</span>";
}

function juliar_core_background(str) {
	if(str.indexOf("//") != -1) document.body.style.backgroundImage = "url("+str+")";
	else{ 
		var temp = str.split(" ");
		document.body.style.background = temp[0];
		if(temp.length === 2) document.body.style.background = "linear-gradient( to left top, "+temp[1]+", "+temp[0]+")";
	}
	return "";
}

function juliar_core_arrow(str,args){
	return args[0] == undefined? "&rarr;" : {leftright:"&harr;",up:"&uarr;",down:"&darr;",left:"&larr;",right:"&rarr;"}[args[0].toString()];
}

function juliar_core_doublearrow(str,args){
	return args[0] == undefined? "&rArr;" : {leftright:"&hArr;",up:"&uArr;",down:"&dArr;",left:"&lArr;",right:"&rArr;"}[args[0].toString()];
}

function juliar_core_size(str,args) { 
	var temp = args[0] || 'inherit';
	return "<span style='font-size: " + temp + "'> " + str + "</span>";
}

function juliar_core_font(str,args) {
	var temp = args[0] || 'inherit';
	WebFontConfig = {
		google: { families: [ temp.split(/(?=[A-Z])/).join(" ")+'::latin' ] }
	};
	var wf = document.createElement('script');
	wf.src = '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
	return "<span style=\"font-family: '" + temp.split(/(?=[A-Z])/).join(" ") + "'\"> " + str + "</span>";
}

function juliar_core_condition(str,args) {
	if(args[0] === undefined) return str;
	for (var i = 0, length = args.length; i < length; ++i) {
		if (eval(args[i])) return str;
	}
	return "";
}

//Header & Title
function juliar_core_title(str) {
	return "<h1 style='text-align:center'>" + str + "</h1>";
}

function juliar_core_author(str) {
	return "<h2 style='text-align:center'>" + str + "</h2>";
}

function juliar_core_loop(str,args) {
	var temp = args[0] || 1;
	var output = str;
	for(var i=1; i<temp; ++i){
		output += " "+str+" ";
	}
	return output;
}

function juliar_core_hide() {
	return "";
}

function juliar_core_picture(str,args) { 
	var width = args[0] || "100%";
	var height = args[1] || "auto";
	return "<img style='max-width: 100%;width:"+width+";height:"+height+";margin:0 auto;' src='" + str + "'/>";
}

var juliar_core_pdf = juliar_core_flash = juliar_core_java = function(str,args){
	var width = args[0] || 420;
	var height = args[1] || 315;
	return "<object width='"+width+"' height='"+height+"' data='"+str+"'></object>"
}

function juliar_core_video(str,args) {
	var width = args[0] || 420;
	var height = args[1] || 315;
	var autoplay = args[2] || 0;
	if(str.indexOf("//www.youtube.com/watch?v=") != -1) return '<iframe width='+width+' height='+height+' src="//www.youtube.com/embed/'+str.split('?v=')[1]+'?autoplay='+{true:1,false:0}[!!JSON.parse(autoplay)]+'&t='+(args[3] || 0)+'" frameborder="0" allowfullscreen></iframe>';
	else if(str.indexOf("//youtu.be/") != -1) return '<iframe width='+width+' height='+height+' src="//www.youtube.com/embed/'+str.split('youtu.be/')[1]+'?autoplay='+{true:1,false:0}[!!JSON.parse(autoplay)]+'&t='+(args[3] || 0)+'" frameborder="0" allowfullscreen></iframe>';
	else if(str.indexOf("//vimeo.com/") != -1) return '<iframe width='+width+' height='+height+' src="//player.vimeo.com/video/'+str.split("/").pop()+'?autoplay='+{true:1,false:0}[!!JSON.parse(autoplay)]+'#t='+(args[3] || 0)+'" frameborder="0" allowfullscreen></iframe>';
	else if(str.indexOf("//www.twitch.tv/") != -1) return '<iframe width='+width+' height='+height+' src="//www.twitch.tv/'+str.split("/").pop()+'/embed" frameborder="0"></iframe>';
	return '<video src="' + str + '" controls="controls">Your browser does not support HTML Video</video>';
}

function juliar_core_music(str) { 
	return '<audio src="' + str + '" controls="controls">Your browser does not support HTML Audio</audio>';
}

function juliar_core_highlight(str,args) {
	var index = 0;
	var output = "";
	var escaper = 0;
	args[0] = args[0] || "orange";
	for(var i=0, length = str.length; i<length;++i){
		if(index == args.length) index = 0;
		if(str[i] == '<') escaper = 1;
		if(str[i] == "\\" && str[i+1] == "*"){ output +="<span style='background-color:" + args[index++] + "'>\\*</span>";++i;}
		else if(escaper === 0) output += "<span style='background-color:" + args[index++] + "'>" + str[i] + "</span>";
		else {output += str[i];}
		if(str[i] == '>') escaper = 0;
	}
	return output;  
}

function juliar_core_rainbow(str,args) { 
	var index = 0;
	var output = "";
	var escaper = 0;
	args[0] = args[0] || "orange";
	for(var i=0, length = str.length; i<length;++i){
		if(index == args.length) index = 0;
		if(str[i] == '<') escaper = 1;
		if(str[i] == "\\" && str[i+1] == "*"){ output +="<span style='color:" + args[index++] + "'>\\*</span>";++i;}
		else if(escaper === 0) output += "<span style='color:" + args[index++] + "'>" + str[i] + "</span>";
		else {output += str[i];}
		if(str[i] == '>') escaper = 0;
	}
	return output;  
}

function juliar_core_commands() { //List commands
	var functions = "";     
	for( var x in window) {
		if(typeof window[x] === "function" && x.indexOf("juliar_") === 0) {
			functions += "\\*"+x.split("_").pop() + " \\*";
			if(x.indexOf("juliar_core_") == -1) functions += " >> IMPORTED from "+x.split("_")[1];
			functions += "<br>";
		}
	}
	return functions;
}

function juliar_core_help(str) { //Opens Documentation for the commands
	return "Type \\* help + command  to see help";
}



//Max,Min & Absolute
function juliar_core_randomnumber(str) {
	return (Math.random() * (parseInt(str) || 100)) + 1 |0;
}


function juliar_core_largestnumber() {
	return Number.MAX_SAFE_INTEGER;
}

function juliar_core_smallestnumber() {
	return Number.MIN_SAFE_INTEGER;
}

function juliar_core_maximum(str) {
	return Math.max.apply(Math, str.split(" "));
}

function juliar_core_minimum(str) {
	return Math.min.apply(Math, str.split(" "));
}

function juliar_core_absolute(str) {
	return str.split(" ").map(Math.abs).join(" ");
}

function juliar_core_ask(str,args) {
	var temp = args[0] || "";
	return prompt(str, temp);
}

function juliar_core_error(str) {
	alert(str);
	return "";
}

function juliar_core_pick(str,args) {
	var temp = str.split(" ").filter(function(n) {
		return n !== "";
	});
	var temp2;
	if((temp2 = args[0]) == undefined)  return temp[Math.random() * temp.length |0];
	var output = "";
	for(var i=0;i<temp2;++i){
		output += temp[Math.random() * temp.length |0] + " ";
	}
	return output;
}

function juliar_core_randomize(str) {
	var arr = str.split(" ").filter(function(n) {
		return n !== "";
	});
	var currentIndex = arr.length,
	temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.random() * currentIndex |0;
		currentIndex -= 1;
		temporaryValue = arr[currentIndex];
		arr[currentIndex] = arr[randomIndex];
		arr[randomIndex] = temporaryValue;
	}
	return arr.join(' ');
}

//Calls
function juliar_core_javascript(str) {
	if(str.split(" ")[0].indexOf(".js") !== -1){
		var fileref=document.createElement("script");
		fileref.src = str;
		document.head.appendChild(fileref);
		return "";
	}
	var fileref=document.createElement("script");
	fileref.type = "text/javascript";
	fileref.textContent = str;
	document.head.appendChild(fileref);
	return "";
}

function juliar_core_css(str) {
	if(str.split(" ")[0].indexOf(".css") === -1) return "<style>" + str + "</style>";
	var fileref=document.createElement("link");
	fileref.rel = "stylesheet";
	fileref.href = str;
	document.head.appendChild(fileref);
	return "";
}

function juliar_core_fetch(str) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", str, false);
	xmlhttp.send();
	return xmlhttp.responseText;
}

//Effect Scripts
function juliar_core_smaller(str) {
	return "<span class='smaller'>" + str + "</span>";
}

function juliar_core_larger(str) {
	return "<span class='larger'>" + str + "</span>";
}

function juliar_core_shrink(str) {
	var output = "", escaper = 0, counter = 0;
	for (var i = 0, length = str.length; i < length; ++i){
		if(str[i] == '<') escaper = 1;
		if(escaper === 0){ output += "<span class='smaller'>" + str[i]; counter++;}
		else{ output += str[i];}
		if(str[i] == '>') escaper = 0;
	}
	for (i = 0; i < counter; i++) output += "</span>";
	return output;
}

function juliar_core_grow(str) {
	var output = "", escaper = 0, counter = 0;
	for (var i = 0, length = str.length; i < length; ++i){
		if(str[i] == '<') escaper = 1;
		if(escaper === 0){ output += "<span class='larger'>" + str[i]; counter++;}
		else{ output += str[i];}
		if(str[i] == '>') escaper = 0;
	}
	for (i = 0; i < counter; i++) output += "</span>";
	return output;
}

function juliar_core_subscript(str) {
	return "<span class='subscript'>" + str + "</span>";
}

function juliar_core_superscript(str) {
	return "<span class='superscript'>" + str + "</span>";
}

function juliar_core_overline(str) {
	return "<span class='overline'>" + str + "</span>";
}

function juliar_core_crossout(str) {
	return "<span class='crossout'>" + str + "</span>";
}

function juliar_core_underline(str) {
	return "<span class='underline'>" + str + "</span>";
}

function juliar_core_bold(str) {
	return "<span class='bold'>" + str + "</span>";
}

function juliar_core_italics(str) {
	return "<span class='italics'>" + str + "</span>";
}

//Math Functions
function juliar_core_e(str) {
	var temp = Number(str) || 1;
	return Math.exp(temp);
}
function juliar_core_pi() {
	return Math.PI;
}
function juliar_core_sin(str) {
	return Math.sin(str);
}

function juliar_core_cos(str) {
	return Math.cos(str);
}

function juliar_core_tangent(str) {
	return Math.tan(str);
}

function juliar_core_power(str) {
	var temp;
	str.split(" ").forEach(function(element) {
		Number(element)&&(temp=null==temp?Number(element):Math.pow(temp, element));
	});
	return temp;
}

function juliar_core_divide(str) {
	var temp;
	str.split(" ").forEach(function(element) {
		Number(element)&&(temp=null==temp?Number(element):temp/Number(element));
	});
	return temp;
}

function juliar_core_multiply(str) {
	var temp = 1;
	str.split(" ").forEach(function(element) {
		Number(element) && (temp *= element);
	});
	return temp;
}

function juliar_core_add(str) {
	var temp = 0;
	str.split(" ").forEach(function(element) {
		Number(element) && (temp += Number(element));
	});
	return temp;
}

function juliar_core_plusplus(str){
	str.split(" ").forEach(function(element) {
		++juliar_core_globals[element];
	});
	return "";
}

function juliar_core_minusminus(str){
	str.split(" ").forEach(function(element) {
		--juliar_core_globals[element];
	});
	return "";
}

function juliar_core_subtract(str) {
	var temp;
	str.split(" ").forEach(function(element) {
		Number(element)&&(temp=null==temp?Number(element):temp-Number(element));
	});
	return temp;
}

function ijuliar_pick(str) {
	var temp = str.split(' ')[0];
	var length = temp.length;
	temp = temp.split("=");
	var command = temp[0];
	var args = temp[1] === undefined ? [] : str.slice(++command.length,length).split(",");
	var first = command[0];
	if (first == '+'){ command[1] == '+'? command = "plusplus" : command = "add" + command.slice(1);}
	else if(first == '-'){ command[1] == '-'? command = "minusminus" : command = "subtract" + command.slice(1);}
	else if(first == 'x' && command[1] === undefined) command = "multiply" + command.slice(1);
	else if(first == '/') command = "divide" + command.slice(1);
	else if(first == '^') command = "power" + command.slice(1);
	else if(parseInt(first)) command =  ["zero","one","two","three","four","five","six","seven","eight","nine","ten"][first] + command.slice(1);
	for(var i = 0, len = juliar_core_module.length; i < len;++i) {
		if (typeof window["juliar_"+juliar_core_module[i]+"_"+command] === "function") {
			return window["juliar_"+juliar_core_module[i]+"_"+command](str.substr(length).trim(),args);
		}
	}
	if (typeof window["juliar_core_"+command] === "function") {
		return window["juliar_core_"+command](str.substr(length).trim(),args);
	}
	return "Unknown command " +str;
}

function ijuliar_parser(str) {
	var currentindex, nextvalue,lastindex, positions = [];
	while ((currentindex = str.indexOf("*", currentindex)) !== -1) {
		if(str[currentindex-1] == "\\");
		else if (((nextvalue = str.charCodeAt(currentindex + 1)) > 47 && nextvalue < 58) || nextvalue === 43 || nextvalue === 45 || nextvalue === 47 || nextvalue === 94 || (nextvalue > 64 && nextvalue < 91) || (nextvalue > 96 && nextvalue < 123)) {
			positions.push(currentindex);
		}
		else{
			if ((lastindex = positions.pop()) === undefined) {
				str = "Code has an extra &#42 at position " + currentindex++ + ". Please remove the extra &#42";
			}
			else {
				var oldstring = str.slice(lastindex, ++currentindex);
				str = str.replace(oldstring, ijuliar_pick(oldstring.slice(1, -1)));
				currentindex = lastindex;
			}
		}
		++currentindex;
	}
	if (positions.length > 0) str = "Commands are not properly closed please check to make sure all commands are properly closed!";
	return str.replace(/\\\*/g, "*");
}

function ijuliar_keydown(e) {
	var keyCode = e.keyCode;
	var target = e.target;
	if (keyCode === 13) {
		var str = target.value;
		juliar_core_history_arr.unshift(str);
		juliar_core_history_index = 0;
		var temp = document.createElement("div");
		temp.innerHTML = ijuliar_parser(str);
		target.parentNode.insertBefore(temp, target);
		target.value = "";
		var event = new Event('juliar_done');
		document.dispatchEvent(event);
	}
	else if (keyCode === 38) {
		if (juliar_core_history_arr.length !== 0) {
			if (juliar_core_history_index === juliar_core_history_arr.length) {
				juliar_core_history_index = 0;
			}
			target.value = juliar_core_history_arr[juliar_core_history_index];
			juliar_core_history_index += 1;
		}
	}
	else if (keyCode === 40) {
		if (juliar_core_history_arr.length !== 0) {
			if (juliar_core_history_index === -1) {
				juliar_core_history_index = juliar_core_history_arr.length - 1;
			}
			target.value = juliar_core_history_arr[juliar_core_history_index];
			juliar_core_history_index -= 1;
		}
	}
}

function ijuliar_interpreter() {
	var ijuliars = document.getElementsByTagName("ijuliar");
	for (var i = 0, juliar = ijuliars.length; i < juliar; i++) {
		var jselector = ijuliars[i];
		jselector.innerHTML = "<br><input type='text' style='width: 600px;border-top: 0;border-right: 0;border-left: 0;background: transparent;border-color:rgba(0,0,0,0.3);'>";
		jselector.addEventListener("keydown", ijuliar_keydown);
	}
}

function ijuliar_init(){
	var juliars = document.getElementsByTagName("juliar");
	for (var i = 0, juliar = juliars.length; i < juliar; i++) {
		var jselector = juliars[i];
		jselector.innerHTML = ijuliar_parser(jselector.innerHTML);
	}
	ijuliar_injectcss();
	ijuliar_injectjs();
	ijuliar_interpreter();
	var event = new Event('juliar_done');
	document.dispatchEvent(event);
}

document.addEventListener("DOMContentLoaded", ijuliar_init);
