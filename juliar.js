/*
	Language: *Juliar *
	Moto: "Language for an artistic mind"
	Type: Main
	Version: 0.1
	First Published: 4/12/2015
	Creator: Andrei Makhanov
	Official Repository: https://github.com/juliarLang
	Official Website: http://s13.zifboards.com/juliar
	Comment:
	I created this programming language for Julia hence the name of the language juliar.
	She has an artistic mind and thus, it's difficult for her to code in language, let alone javascript and css.
	This language is simple to use and people with a nonlogical mind will be able to use it quickly and easily.
	Juliar can be easily  integrated into other sites simply by using <juliar></juliar> tags.
	This language is inspired by BBCode, Python, HTML 3.2, and AngularJS.
	If you have an improvement to the language i.e. improved code or a new function please commit it on github 
	and I will gladly "pull" your request.
	Please consider donating, all the money will go into an upkeep of the website and improvement of the language.
	Licensed under GPL 3.0
*/
var juliar_core_globals = {}, juliar_core_module = [], juliar_core_history_index = 0, juliar_core_history_arr = [];

function ijuliar_injectcss() {
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = "body{font-family: Tahoma, Geneva, sans-serif;}.smaller{font-size:85%}.larger{font-size:115%}.subscript{vertical-align: sub;font-size: smaller;}.superscript{vertical-align: super;font-size: smaller;}.underline{text-decoration: underline;}.bold{font-weight: bold;}.italics{font-style: italic;}.crossout{text-decoration: line-through;}.overline{text-decoration: overline;}";
    document.body.appendChild(css);
}

function juliar_core_version() {
    return "Juliar Version 0.1. Created by Andrei Makhanov ";
}

function juliar_core_import(str){
	var http = new XMLHttpRequest();
	http.open("GET", "juliar_modules/"+str+".juliar", !1);
	http.send(null);
	if(http.status!=200) return "Cannot load module \""+str+"\". Make sure that module is in juliar_modules/";
	var fileref=document.createElement("script");
	fileref.type = "text/javascript";
	fileref.textContent = http.responseText;
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

function juliar_core_modules(){
	return juliar_core_module.toString();
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
	return juliar_core_globals.null;
}

function juliar_core_input(str,args){
	return "<input onblur='juliar_core_dynamicset(this.value,\""+args[0]+"\")' type='text' value='"+str+"' style='width: 600px;border-top: 0;border-right: 0;border-left: 0;background: transparent;'>";
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
	var temp = str.split(" ");
	document.body.style.backgroundColor = temp[0];
	if(temp.length === 2) document.body.style.background = "linear-gradient( to left top, "+temp[1]+", "+temp[0]+")";
    return "";
}

function juliar_core_banner(str) { 
    return "<img style='width:100%;height:200px;margin:0;' src='" + str + "'/>";
}

function juliar_core_size(str,args) { 
	var temp = args[0] || 'inherit';
	return "<span style='font-size: " + temp + "'> " + str + "</span>";
}

function juliar_core_font(str,args) {
	var temp = args[0] || 'inherit';
	return "<span style='font-family: " + temp + "'> " + str + "</span>";
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

function juliar_core_picture(str) { 
    return "<img style='max-width: 100%;' src='" + str + "'/>";
}

function juliar_core_video(str) { 
	if(str.indexOf("//www.youtube.com/watch?v=") != -1) return '<iframe width="420" height="315" src="https://www.youtube.com/embed/'+str.split('?v=')[1]+'" frameborder="0" allowfullscreen></iframe>';
	else if(str.indexOf("//youtu.be/") != -1) return '<iframe width="420" height="315" src="https://www.youtube.com/embed/'+str.split('youtu.be/')[1]+'" frameborder="0" allowfullscreen></iframe>';
	else if(str.indexOf("//vimeo.com/") != -1) return '<iframe width="420" height="315" src="//player.vimeo.com/video/'+str.split("/").pop()+'" frameborder="0" allowfullscreen></iframe>';
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
		if(escaper === 0) output += "<span style='background-color:" + args[index++] + "'>" + str[i] + "</span>";
		else {output += str[i];}
		if(str[i] == '>' && escaper == 1) escaper = 0;
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
		if(escaper === 0) output += "<span style='color:" + args[index++] + "'>" + str[i] + "</span>";
		else {output += str[i];}
		if(str[i] == '>' && escaper == 1) escaper = 0;
	}
	return output;  
}

function juliar_core_commands() { //List commands
	var functions = "";     
	for( var x in window) {
		if(typeof window[x] === "function" && x.indexOf("juliar_") === 0) {
			functions += "\\*"+x.split("_").pop() + " \\*";
			if(x.indexOf("juliar_core_") == -1) functions += " >>IMPORTED";
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
	return Math.floor((Math.random() * (parseInt(str) || 100)) + 1);
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

function juliar_core_pick(str) {
	var temp = str.split(" ").filter(function(n) {
		return n !== "";
	});
	return temp[Math.floor(Math.random() * temp.length)];
}

function juliar_core_randomize(str) {
	var arr = str.split(" ").filter(function(n) {
		return n !== "";
	});
	var currentIndex = arr.length,
	temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = arr[currentIndex];
		arr[currentIndex] = arr[randomIndex];
		arr[randomIndex] = temporaryValue;
	}
	return arr.join(' ');
}

//Calls
function juliar_core_javascript(str) {
	var fileref=document.createElement("script");
	fileref.type = "text/javascript";
	fileref.textContent = str;
	document.head.appendChild(fileref);
	return "";
}

function juliar_core_css(str) {
	return "<style>" + str + "</style>";
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
		if(str[i] == '>' && escaper == 1) escaper = 0;
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
		if(str[i] == '>' && escaper == 1) escaper = 0;
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
	if (first == '+') command = "add";
	else if(first == '-') command = "subtract";
	else if(first == 'x' && command[1] === undefined) command = "multiply";
	else if(first == '/') command = "divide";
	else if(first == '^') command = "power";
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
				alert(""+str[currentindex - 2]+str[currentindex - 1]+str[currentindex]+str[currentindex + 1]+str[currentindex + 2]);
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
		jselector.innerHTML = "<br><input type='text' style='width: 600px;border-top: 0;border-right: 0;border-left: 0;background: transparent;'>";
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
	ijuliar_interpreter();
}

window.onload = ijuliar_init;
