function Juliar(verbose) {
	//VERBOSE-DEBUG MODES
    this.verbose = verbose || 0;
	this.log = "";
	//
	//CSS Utilizer
	var csscode = "";
	this.css = (str) => {csscode+=str};
	this.getcss = () => csscode;
	this.clearcss = () => {csscode=""};
	//Create HELP HERE!
	/*var help = {};
	this.sethelp = function(obj){
		
	}
	this.gethelp = function(name){return help[name];}*/
	
	var jscode = [];
	this.index = () => jscode.length;
	this.code = code => {jscode.push(code);return jscode.length;};
	this.getcode = id => (Number(id) > -1? jscode[id]:jscode);
	this.clearcode = () => {jscode = []};
	
	var objects = {};
	this.setobject = (obj,value) => (objects[obj] = value);
	this.getobject = obj => objects[obj];
	this.checkobject = obj => (objects[obj]?  true:false);
	this.deleteobject = obj => {if(objects[obj]){objects[obj] = undefined;return true;}return false;};
	//END OF NOT TESTED
	//MODULES
	this.modules = {"main": new Juliar_main(this), "graph": new Juliar_graph,"interpreter": new Juliar_interpreter(this)};
	//
	var juliars = document.getElementsByTagName("juliar");
	for (var i = 0, juliar_length = juliars.length; i < juliar_length; i++) {
		var jselector = juliars[i];
		jselector.innerHTML = this.parser(jselector.innerHTML);
	}
	this.modules.interpreter.clearinterpreter();
	//Initialize CORE CSS
	var viewPortTag=document.createElement('meta');
	viewPortTag.name = "viewport";
	viewPortTag.content = "initial-scale=1.0, maximum-scale=1.0, user-scalable=0";
	document.getElementsByTagName('head')[0].appendChild(viewPortTag);
	if(this.getcss() != ""){
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = this.getcss();
		this.clearcss();
		document.body.appendChild(css);
	}
	if(this.index() != 0){
		for(var i=0,length=this.index();i<length;i++){
			var js = document.createElement("script");
			js.type = "text/javascript";
			js.innerHTML = this.getcode(i);
			document.body.appendChild(js);
		}
		this.clearcode();
	}
	var modules = Object.keys(this.modules);
	var i = modules.length;
	var temp = [];
	while(i--){
		for( var x in this.modules[modules[i]]) {
			if(temp.indexOf(x) == -1 && typeof this.modules[modules[i]][x] === "function") {
				temp.push({'name':x,'mods':(i>0)? modules[i] : "",'level':i});
			}
		}
	}
	temp.sort(function(a, b) {return ((a.name < b.name) ? -1 : ((a.name == b.name) ? 0 : 1))});
	this.commands = temp;
	document.dispatchEvent(new Event('juliar_done'));
	if(verbose) console.log(this.log);
};
Juliar.prototype.parser = function(str) {
	var currentindex=0, nextvalue,lastindex =0, positions = [];
	while ((currentindex = str.indexOf("*", currentindex)) !== -1) {
		if(str[currentindex-1] == "\\");
		else if (!((nextvalue = str.charCodeAt(currentindex + 1)) === 32 || nextvalue === 42 || nextvalue == 46 || nextvalue === 9 || nextvalue === 10 || isNaN(nextvalue))) {
			positions.push(currentindex);
		}
		else{
			if ((lastindex = positions.pop()) === undefined) str = "<span class='juliar_error'>Code has an extra &#42 </span><br/><em>Position: " + currentindex++ + "</em>";
			else {
				var oldstring = str.slice(lastindex, ++currentindex);
				str = str.substr(0, lastindex) + this.picker(oldstring.slice(1, -1)) + str.substr(currentindex);
				currentindex = lastindex-1;
			}
		}
		++currentindex;
	}
	if (positions.length > 0) str = "<span class='juliar_error'>Code is not properly closed </span><br/><em># of missing &#42 : "+positions.length+"</em>";
	if(this.getcss() != ""){
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = this.getcss();
		this.clearcss();
		document.body.appendChild(css);
	}
	return str.replace(/\\\*/g, "*");
};
Juliar.prototype.picker = function(str){
	var temp = str.replace(/\s/g, " ").split(' ')[0];
	var length = temp.length;
	temp = temp.split("=");
	var command = temp[0];
	var args = temp[1] === undefined ? [] : str.slice(++command.length,length).split(",");
	var first = command[0];
	if (first == '+'){ command = "add" + command.slice(1);}
	else if(first == '-'){ command = "subtract" + command.slice(1);}
	else if(first == 'x' && command[1] === undefined) command = "multiply" + command.slice(1);
	else if(first == '/') command = "divide" + command.slice(1);
	else if(first == '^') command = "power" + command.slice(1);
	else if(first == '!') command = "not" + command.slice(1);
	else if(first == '&') command = "and" + command.slice(1);
	else if(first == '|') command = "or" + command.slice(1);
	else if(first == '$') command = "root" + command.slice(1);
	else if(first == '%') command = "remainder" + command.slice(1);
	else if(first == '<') (command[1] == "=")? command = "lessthanorequalto" +command.slice(2) : command = "lessthan" + command.slice(1);
	else if(first == '>') (command[1] == "=")? command = "greaterthanorequalto" +command.slice(2) : command = "greaterthan" + command.slice(1);
	else if(first == '=') command = "equalto" + command.slice(1);
	else if(parseInt(first)) command =  ["zero","one","two","three","four","five","six","seven","eight","nine"][command[0]] + command.slice(1);
	
	var mods = Object.keys(this.modules);
	for(var i = 0, len = mods.length; i < len;i++) {
		if (typeof this.modules[mods[i]][command] === "function") {
			return this.modules[mods[i]][command](str.substr(length).trim(),args);
		}
	}
	return "<span class='juliar_error'>Unknown command '" +command + "' </span><br/><em>Arguments: " + args + " </em><br/><em>Content: "+str.substr(length).trim()+" </em>";
};
var juliar; document.addEventListener("DOMContentLoaded", () => { juliar = new Juliar();});


function Juliar_main(juliar){
	var css = "body{font-family: Tahoma, Geneva, sans-serif;background-repeat:no-repeat;background-size:cover;}";
	css += "li>a{color:#557FBB;text-decoration:none}li>a:visited{color:#557FBB}li>a:link{color:#557FBB}li>a:hover{color:grey}";
	css += ".center{text-align:center;}.left{text-align:left}.right{text-align:right}.middle{display:block;margin-left:auto;margin-right:auto;}";
	css += ".smaller{font-size:95%}.larger{font-size:105%}.subscript{vertical-align: sub;font-size: smaller;}.superscript{vertical-align: super;font-size: smaller;}";
	css += ".underline{text-decoration: underline;}.bold{font-weight: bold;}.italics{font-style: italic;}.crossout{text-decoration: line-through;}.overline{text-decoration: overline;}";
	css += ".chapter:first-child:first-letter { float: left; color: #903; font-size: 75px; line-height: 60px; padding-top: 4px; padding-right: 8px; padding-left: 3px; }";
	css += ".marquee{margin: 0 auto;overflow: hidden;white-space: nowrap; box-sizing: border-box;}";
	css += ".marquee:hover{animation-play-state: paused}@keyframes marquee{0%{ text-indent: 100% }100%{ text-indent: -25% }}";
	css += ".progress-bar{background-color: #1a1a1a;height: 25px;padding: 5px;width: 350px;margin: 50px 0;border-radius: 5px;box-shadow: 0 1px 5px #000 inset, 0 1px 0 #444;}";
	css += ".progress-bar span{display: inline-block;height: 100%;border-radius: 3px;box-shadow: 0 1px 0 rgba(255, 255, 255, .5) inset;transition: width .4s ease-in-out;}";
	css += "text-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2) inset";
	css += "transition: all 0.7s ease 0s;}input[type='text'].searchable:focus{width: 200px;}";
	css += ".juliar_error{color:red}";
	css += ".juliar_block{display:block;box-shadow:0 1px 6px rgba(0,0,0,.12);background-color:white;margin: 24px 20px;padding: 10px;animation: fadein 2s;}";
	css += "@keyframes fadein {from { opacity: 0;bottom:-100px;position:relative; }to   { opacity: 1;bottom:0px;position:relative;}}";
	css += "@keyframes blink {0%{opacity: 1;}50%{opacity: 0;}100%{opacity: 1;}}";
	css += "juliar_menu li,juliar_menu ul{list-style:none;margin:0 0 -2px;padding:0;background-color:#333;}"+
	"juliar_menu ul{text-align:left;position:relative;z-index:597;text-transform:uppercase}juliar_menu ul li{float:left;min-height:1px;vertical-align:middle}"+
	"juliar_menu ul li.hover,juliar_menu ul li:hover{position:relative;z-index:599;cursor:default}juliar_menu ul ul{visibility:hidden;position:absolute;"+
	"top:100%;z-index:598;width:100%;bottom:0;left:0;margin-top:0;border-top:4px solid #1b9bff;text-transform:none;min-width:190px}"+
	"juliar_menu ul ul li{float:none;font-weight:400;position:relative}juliar_menu,juliar_menu a{background:#333;font-size:14px;font-weight:700}"+
	"juliar_menu ul ul ul{top:0;left:auto;right:-99.5%;border-top:0 none}juliar_menu ul li:hover>ul{visibility:visible}"+
	"juliar_menu a{display:block;line-height:1em;text-decoration:none;color:#CBCBCB;padding:0 15px;margin-right:0}"+
	"juliar_menu{padding:0;margin:0;border:0;border-bottom:4px solid #1b9bff}juliar_menu>ul{display:inline-block}"+
	"juliar_menu ul:after,juliar_menu:after{content:&#39;&#39;;display:block;clear:both}"+
	"juliar_menu ul ul a{color:#FFF;border:1px solid #0082e7;border-top:0 none;line-height:150%;padding:16px 20px}"+
	"juliar_menu>ul>li>a{line-height:48px;color:white}juliar_menu>ul>li>a:visited{color:white}juliar_menu>ul>li>a:link{color:white}juliar_menu ul ul li:first-child>a{border-top:1px solid #0082e7}"+
	"juliar_menu ul ul li:hover>a{background:#35a6ff}juliar_menu ul ul li:last-child>a{border-radius:0 0 3px 3px;box-shadow:0 1px 0 #1b9bff}"+
	"juliar_menu ul ul li:last-child:hover>a{border-radius:0 0 0 3px}juliar_menu ul ul li.has-sub>a:after{content:&#39;+&#39;;position:absolute;top:50%;right:15px;margin-top:-8px}"+
	"juliar_menu ul li.active>a,juliar_menu ul li:hover>a{background:#1b9bff;color:#FFF}juliar_menu ul li.has-sub>a:after{content:&#39;+&#39;;margin-left:5px}"+
	"juliar_menu ul li.last ul{left:auto;right:0}juliar_menu ul li.last ul ul{left:auto;right:99.5%}";
	css += "footer{background-color:#333;padding:15px;text-align:center;color:white;}";
	css += "juliar_menu>ul{margin-top:-8px;margin-left:-8px;}";
	juliar.css(css);
	
	this.block = (str,args) => {if(args[0]) return "<span class='juliar_block' style='width:"+args[0]+"'>"+str+"</span>";return "<span class='juliar_block'>"+str+"</span>";};
	
	this.section = (str,args) => {
		var width = args[0] || "auto";
		var height = args[1] || "auto";
		var marginx = args[2] || "0";
		var marginy = args[3] || "auto";
		var backcolor = args[4] || "transparent";
		return "<section style='width:"+width+";height:"+height+";margin: "+marginx+" "+marginy+";background-color:"+backcolor+"'>"+str+"</section>";
	};
	
	this.version = () => "Language \\*Juliar \\* version Alpha 4. Running on " + navigator.userAgent;
	this.help = str => {
		if(str == "") return "<span class='juliar_error'>Type \\*help  'command name' \\* to see help for the command</span>";
		var found = juliar.gethelp(str.trim());
		if(found !== undefined) return found;
		return "<span class='juliar_error'>Help could not be found for '"+str+"' </span>";	
	};
	this.loop = this.repeat = (str,args) => {
		var temp = args[0] || 2;
		var output = str;
		for(var i=1; i<temp; ++i){
			output += " "+str+" ";
		}
		return output;
	};
	this.factorial = (str,args) => {
		args[0] = args[0] || 1;
		return (parseInt(str) <= 1)? parseInt(args[0]) : this.factorial(parseInt(str) - 1, [parseInt(args[0]) * parseInt(str)]);
	};
	this.evaluate = str => eval(str);
	this.condition = (str,args) => {
		if(args[0] === undefined) return str;
		for (var i = 0, length = args.length; i < length; ++i) {
			if (eval(args[i])) return str;
		}
		return "";
	};
	this.or = str => {
		var temp = str.split(" ");
		for (var i = 0, length = temp.length; i < length; ++i) {
			if (JSON.parse(temp[i]) != false) return true;
		}
		return false;
	};
	this.not = str => {
		return str.split(" ").every(function(el){
			return JSON.parse(el) == false;
		});
	};
	this.and = str => { //AND conditional to be used with condition
		return str.split(" ").every(function(el){
			return JSON.parse(el) != false;
		});
	};
	this.lessthan = str => {
		var out = str.split(" ");
		var element = out.shift();
		return out.every(el => (element < el));
	};
	this.lessthanorequalto = str => {
		var out = str.split(" ");
		var element = out.shift();
		return out.every(el => (element <= el));
	};
	this.greaterthan = str => {
		var out = str.split(" ");
		var element = out.shift();
		return out.every(el => (element > el));
	};
	this.greaterthanorequalto = str => {
		var out = str.split(" ");
		var element = out.shift();
		return out.every(el => (element >= el));
	};
	this.equalto = str => {
		var out = str.split(" ");
		var element = out.shift();
		return out.every(el => (element == el));
	};
	this.code = str => str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
	this.hide = () => "";
	var repolink = "http://juliar.elementfx.com/repo/?juliar=&package=";
	this.repo = str => {
		if(str.trim() == "") return repolink;
		repolink = str;
		return "The repo has been now set to "+repolink;
	};
	this.checkrepo = str => {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", repolink, !1);
		return (xmlhttp.status=200)? "The repo <strong>"+repolink+"</strong> has a pulse" : "<juliar_error>repo does not appear to be active! Try changing repo via \\*repo \\*</juliar_error>";
	};
	this.update = () => {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", repolink+"&versions="+Object.keys(juliar.modules).toString(), !1);
		return (xmlhttp.status==200)? xmlhttp.responseText : "<juliar_error>Could not get the updates! Make sure that the repo is active by typing \\*checkrepo \\*</juliar_error>";
	};
	this.download = str => {
		var name = str.split("/").pop();
		if(window.location.protocol == 'file:') return "This command cannot run in a local environment";
		else if(str.indexOf("//") === -1){
			var temp = str.split("/");
			str = repolink+name;
		}
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", str, !1);
		xmlhttp.send();
		if(xmlhttp.status!=200) return "<juliar_error>Cannot download the module. Make sure that you spell the package name correctly.</juliar_error>";
		var fileref=document.createElement("a");
		fileref.download =  name+".juliar";
		fileref.href = 'data:text/plain;base64,'+btoa(xmlhttp.responseText);
		document.body.appendChild(fileref);
		fileref.click();
		fileref.parentNode.removeChild(fileref);
		return "Downloading '"+name+"' from <a href='"+str+"'>"+str+"</a>";
	};
	function countcommands(){
		var modules = Object.keys(juliar.modules);
		var i = modules.length;
		var temp = [];
		while(i--){
			for( var x in juliar.modules[modules[i]]) {
				if(temp.indexOf(x) == -1 && typeof juliar.modules[modules[i]][x] === "function") {
					temp.push({'name':x,'mods':(i>0)? modules[i]:"",'level':i});
				}
			}
		}
		temp.sort((a, b) => ((a.name < b.name) ? -1 : ((a.name == b.name) ? 0 : 1)));
		juliar.commands = temp;	
	}
	this.deport = a => ((juliar.modules[a] === undefined)? '<juliar_error>Module "' + a + '" does not exists</juliar_error>':(delete juliar.modules[a],countcommands(),document.dispatchEvent(new Event('deleted '+a)),'Deported Module "' + a + '"'));
	this.javascript = str => {
		if(str.split(" ")[0].indexOf(".js") !== -1){ 
			var fileref=document.createElement("script");
			fileref.src = str;
			document.head.appendChild(fileref);
			return "";
		}
		juliar.code(str);
		return "";
	};
	this.import = (str,args) => {
		var alias = args[0] || null;
		if(str.trim() === "") return "<juliar_error>You Did not specify what to import! Cannot Continue to Import</juliar_error>";
		var ext = str.slice((str.lastIndexOf(".") - 1 >>> 0) + 2) || "juliar";
		var name = str.trim().split("/").pop();
		if(ext == "juliar" && eval("typeof Juliar_"+name) == "function"){ //cache
			delete juliar.modules[name];
			alias? juliar.modules[alias] = eval("new Juliar_"+name) : juliar.modules[name] = eval("new Juliar_"+name); 
			countcommands();
			return "Successfully imported module '"+name+"' from cache";
		} 
		else if(window.location.protocol == 'file:'){
			var fileref=document.createElement("input");
			fileref.type = "file";
			fileref.onchange = function(evt)
			{
				f = evt.target.files[0];
				var reader = new FileReader();
				reader.onload = function(e){
					var contents = e.target.result;
					var index = f.name.lastIndexOf(".");
					var name = f.name.slice(0,index);
					if(f.name.slice(index) == ".juliar"){
						eval(contents);
						alias? juliar.modules[alias] = eval("new Juliar_"+name) : juliar.modules[name] = eval("new Juliar_"+name); 
						countcommands();
					}
					else if(f.name.slice(index) == ".jss"){
						var css = document.createElement("style");
						css.type = "text/css";
						css.innerHTML = juliar.parser(contents);
						document.body.appendChild(css);
					}
					else if(f.name.slice(index) == ".j"){
						var div = document.createElement("juliar");
						div.innerHTML = juliar.parser(contents);
						document.body.appendChild(div);
					}
					else{
						alert("This file type is currently not supported");
					}
				}
				reader.readAsText(f);
				fileref.parentNode.removeChild(fileref);
			}
			document.body.appendChild(fileref);
			fileref.click();
			return "Let's try to import "+("<em>'"+str+"'</em>" || "the file")+" locally...";
		}
		else{
			if(ext == "juliar"){
				var repo = args[1] || true;
				var http = new XMLHttpRequest();
				str.indexOf("//") != -1 ? http.open("GET", str, !1): http.open("GET", "modules/"+str+".juliar", !1);
				http.send();
				if(http.status!=200 || http.responseText.indexOf("Juliar_"+name) == -1){
					if(repo==false)return "<juliar_alert>Failed to Load the module '"+name+"'</juliar_alert>";
					http = new XMLHttpRequest();
					http.open("GET", repolink+name, !1);
					http.send();
					if(http.status!=200) return "<juliar_alert>Failed to Load the module '"+name+"' from Juliar repo</juliar_alert>";
				}
				var fileref=document.createElement("script");
				fileref.type = "text/javascript";
				fileref.textContent = http.responseText;
				document.head.appendChild(fileref);
				(alias)? juliar.modules[alias] = eval("new Juliar_"+name) : juliar.modules[name] = eval("new Juliar_"+name); 
				countcommands();
				return "Successfully imported module '"+name+"'";
			}
			else if(ext == "jss"){
				var http = new XMLHttpRequest();
				str.indexOf("//") != -1 ? http.open("GET", str, !1): http.open("GET", "modules/"+str+".jss", !1);
				http.send();
				if(http.status!=200) return "<juliar_alert>Failed to Load JSS '"+name+"'</juliar_alert>";
				var css = document.createElement("style");
				css.type = "text/css";
				css.innerHTML = juliar.parser(http.responseText);
				document.body.appendChild(css);
				return "Successfully loaded JSS '"+name+"'";
			}
			else if(ext == "j"){
				var http = new XMLHttpRequest();
				str.indexOf("//") != -1 ? http.open("GET", str, !1): http.open("GET", "modules/"+str+".jss", !1);
				http.send();
				if(http.status!=200) return "<juliar_alert>Failed to Load Juliar File '"+name+"'</juliar_alert>";
				var div = document.createElement("div");
				div.innerHTML = juliar.parser(http.responseText);
				document.body.appendChild(div);
				return "Successfully loaded Juliar File '"+name+"'";
			}
		}
	};
	this.commands = (str,args) => { //List commands
		var command = str.trim() || false;
		var names = [];
		var keys = Object.keys(juliar.modules);
		for(var i=0;i<args.length;i++){
			if(Number(args[i])){
				names.push(keys[args[i]]);
			}
			else if(keys.indexOf(args[i]) != -1){
				names.push(args[i]);
			}
		}
		var list = juliar.commands;
		var y = list.length;
		var functions = "";
		for(i=0;i<y;i++){
			if((!command && names.length == 0) || (command && list[i].name.indexOf(command) == 0) || (names.indexOf(list[i].mods) != -1)){
				functions += " \\*"+list[i].name +" "+"\\* ";
				if(list[i].mods != "") functions += "<em>>> IMPORTED from <strong>"+list[i].mods +"</strong><span class='juliar_error'> level: "+list[i].level+"</span></em>";
				functions += "<br>";
			}
		}
		
		return functions;
	};
	this.count = str => ((str.split(",").length > 1)? str.split(",").length : str.split(" ").length);
	this.modules = () => Object.keys(juliar.modules);
	//Redirection
	this.link = (str,args) => {
		str = str.trim() || args[0];
		args[0] = args[0] || str;
		var temp = !(args[1]) == true ? "_blank" : "_self";
		return "<a href='"+args[0]+"' target='"+temp+"'>"+str+"</a>";
	};
	this.mail = (str,args) => {str = str || args[0];args[0] = args[0] || str;return "<a href='mailto:"+args[0]+"'>"+str+"</a>";};
	this.store = (str,args) => {localStorage.setItem(args[0], str);return str;};
	this.restore = str => localStorage.getItem(str.trim());
	//
	//Symbol Stuff
	this.symbol = (str) => {
		switch(str){
			case "sigma": return "&Sigma;";
			case "delta": return "&Delta;";
			case "integral": return "";
			case "plusminus": return "&plusmn;";
			case "leftright": return "&harr;";
			case "up": return "&uarr;";
			case "down": return "&darr;";
			case "left": return "&larr;";
			case "right": return "&rarr;";
			case "doubleleftright": return "&hArr;";
			case "doubleup": return "&uArr;";
			case "doubledown": return "&dArr;";
			case "doubleleft": return "&lArr;";
			case "doubleright": return "&rArr;";
			default: return "unknown";
		}
	};
	//
	//3D Stuff
	this.threed = (str,args) => {
		args[0] = args[0] || "0.06em";
		return "<span style='text-shadow: -"+args[0]+" 0 red,  "+args[0]+" 0 cyan;'>"+str+"</span>";
	};
	//
	//DOM Stuff
	/*this.submit = function(str,args){
		var form = document.createElement("form");
		form.setAttribute("method", "post");
		form.setAttribute("action", str || "");
		for(var i=0, length = args.length; i<length;++i){
		var hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", args[i]);
		hiddenField.setAttribute("value", juliar.getobject(args[i]));
		form.appendChild(hiddenField);  
		}
		document.body.appendChild(form);
		form.submit();
		return "";
	}*/
	this.columns = (str,args) => {
		var temp = 100/(args[0] || 1) | 0;
		var type = "table-cell";
		if(args[1] == 1) type = "inline-block";
		return "<div style='vertical-align:top;display:"+type+";width:"+temp+"%;box-shadow: 1px 0px 1px #888888'>"+str+"</div>";
	};
	this.newline = str => {str = JSON.parse(str) || 1;var temp;for(var i=0;i<str;i++){temp+="<br>";};return temp;};
	this.float = (str,args) => {
		args[0] = args[0] || "right";
		return "<span style='float:"+args[0]+";'>"+str+"</span>";
	};
	this.sticky = (str,args) => {
		args[0] = args[0]  || "initial";
		args[1] = args[1]  || "initial";
		var x = args[0] < 0 ? "bottom:" : "top:";
		var y = args[1] < 0 ? "right:" : "left:";
		return "<span style='position:fixed;"+x+args[0]+";"+y+args[1]+"'>"+str+"</span>";
	};
	this.spoiler = (str,args) => {
		var temp = args[0] || "black";
		var front = args[1] || "black";
		var back = args[2] || "white";
		juliar.css('.juliar_spoiler_'+temp+'{ background-color:'+temp+';color:'+temp+'}.juliar_spoiler_'+temp+':hover{background-color:'+front+';color:'+back+'}');
		return "<span class='juliar_spoiler_"+temp+"'>"+str+"</span>";
	};
	this.bullet = str => {
		var category = juliar.index();
		var list = "var listcat= document.getElementsByTagName(\"juliar_bullet_"+category+"\")[0];var temp = document.createElement(\"li\");temp.style.marginLeft=\"-20px\";temp.innerHTML = \""+str+"\";if(listcat.previousElementSibling.nodeName != \"UL\"){";
		list += "temp2 = document.createElement(\"UL\");listcat.parentNode.insertBefore(temp2, listcat);temp2.appendChild(temp);}";
		list += "else{listcat.previousElementSibling.appendChild(temp);}";
		list += "listcat.parentNode.removeChild(listcat);"
		juliar.code(list);
		return "<juliar_bullet_"+category+"></juliar_bullet_"+category+">";
	};
	
	this.visibility = (str,args) => {var temp = args[0] || 40;return "<div style='opacity: "+temp/100+";filter: alpha(opacity="+temp+");'>"+str+"</div>";};
	this.color = (str,args) => {
		var temp = args[0] || 'inherit';
		if(args.length < 2) return "<span style='color: " + temp + "'> " + str + "</span>";
		var output = "";
		var words = str.split(" ");
		var index = 0;
		var escaper = 0;
		var found = 0;
		for(var i=0,length = words.length;i<length;i++){
			if(index==args.length) index = 0;
			if(words[i].indexOf("<") != -1){escaper = 1;}
			if(escaper == 0) output += "<span style='color: " + args[index++] + "'> "+words[i]+" </span>";
			else{output+= " "+words[i];}
			if(words[i].indexOf(">") != -1){
				var left = words[i].split("<").length;
				var right = words[i].split(">").length; 
				if(left > right) escaper = 1;
				if(right > left) escaper = 0;
			}
		}
		return output;
	};
	this.backgroundcolor = (str,args) => {args[0] = args[0] || "#428bca";return "<span style=\"background-color:"+args[0]+"\">"+str+"</span>";};
	this.menu = (str,args) => {var name = args[0] || null;return "<juliar_menu name="+name+"><ul>"+str+"</ul></juliar_menu>";};
	this.menuitem = (str,args) => {
		var str = str || "&nbsp;";
		var url = args[0] || "#";
		var type = args[1] || "0";
		var picture = args[2] || "";
		if(picture) picture = "style=\"background: url("+picture+") no-repeat center center;padding-left:40px;background-size:100%;\"";
		var position = 0;
		if((position = str.indexOf("<li>")) == -1){
			switch(type){
				case "0":
					return '<li><a href="'+url+'" '+picture+'>'+str+'</a></li>';
				case "1":
					return '<li><a target="_blank" href="'+url+' '+picture+' ">'+str+'</a></li>';
				default:
					juliar.setobject(args[0],str);
					return '<li><a href="#" '+picture+'>'+str+'</a></li>';
			};
		}
		return '<li><a href="#">'+str.slice(0,position)+' + </a><ul>'+str.slice(position)+'</ul></li>';		
	};
	this.padding = (str,args) => {
		var size = args[0] || "5px";
		var pad = args[1] || "all";
		switch(pad){
			case "all":
			return "<div style='padding:"+size+"'>"+str+"</div>";
			case "top":
			return "<div style='padding-top:"+size+"'>"+str+"</div>";
			case "bottom":
			return "<div style='padding-bottom:"+size+"'>"+str+"</div>";
			case "left":
			return "<div style='padding-left:"+size+"'>"+str+"</div>";
			case "right":
			return "<div style='padding-right:"+size+"'>"+str+"</div>";
			case "sides":
			return "<div style='padding-left:"+size+";padding-right:"+size+"'>"+str+"</div>";
			case "vertical":
			return "<div style='padding-left:"+size+";padding-right:"+size+"'>"+str+"</div>";
			default:
			return "<div style='padding:"+size+"'>"+str+"</div>";
		}
	};
	this.notice = (str,args) => {
		var bgcolor = args[0] || "#428bca";
		var color = args[1] || "white";
		var fontsize = args[2] || "16px";
		var padding = args[3] || "5px";
		return "<div style='background-color:"+bgcolor+";color:"+color+";font-size:"+fontsize+";padding:"+padding+";'>"+str+"</div>";
	};
	this.ask = (str,args) => {var temp = args[0] || "";return prompt(str, temp);};
	this.error = str => {alert(str);return "<span class=\"juliar_error\">Error invoked: "+str+"</span>";};
	this.globalbackground = str => {
		if(str.indexOf(".") != -1 || str.indexOf("/") != -1) juliar.code("document.body.style.backgroundImage = \"url("+str.replace(/\s/g, "")+")\"");
		else{ 
			var temp = str.split(" ");
			temp.length == 2 ?  juliar.code("document.body.style.background = \"linear-gradient( to left top, "+temp[1]+", "+temp[0]+") fixed\"") : juliar.code("document.body.style.background = "+temp[0]);
		}
		return "Background Changed using the following attribute <em>'" + str+"'</em>";
	};
	this.background = (str,args) => {
		var style;
		args[0] = args[0] || "red";
		if(args[0].indexOf(".") != -1 || args[0].indexOf("/") != -1) style = "background-image: url("+args[0].replace(/\s/g, "")+")";
		else{ 
			style = args.length == 2 ? "background: linear-gradient( to left top, "+args[1]+", "+args[0]+") fixed" : "background:"+args[0];
		}
		return "<div style='"+style+"'>"+str+"</div>";
	};
	this.list = (str,args) => {
		var temp  = args[0] || "decimal";
		var category = juliar.index();
		temp = {"decimal":1,"lowercase":'a',"uppercase":'A',"roman":'i',"uppercaseroman":'I'}[temp] || 1;
		var list = "var listcat= document.getElementsByTagName(\"juliar_list_"+category+"\")[0];var temp = document.createElement(\"li\");temp.innerHTML = \""+str+"\";if(listcat.previousElementSibling.nodeName != \"OL\"){";
		list += "temp2 = document.createElement(\"OL\");temp2.type = \""+temp+"\";listcat.parentNode.insertBefore(temp2, listcat);temp2.appendChild(temp);}";
		list += "else{listcat.previousElementSibling.appendChild(temp);}";
		list += "listcat.parentNode.removeChild(listcat);"
		juliar.code(list);
		return "<juliar_list_"+category+"></juliar_list_"+category+">";
	};
	this.button = (str,args) => {
		var str = str || "#";
		var name = args[0] || "Submit";
		var color = args[1] || 'SteelBlue';
		juliar.css('.juliar_button_'+color+'{background-color:'+color+';color:white;text-decoration: none;padding: 10px 15px;}')
		return "<a href='"+str+"' class='juliar_button_"+color+"'>"+name+"</a>";
	};
	//
	//History Manipulation
	this.history = () => window.history.length;
	this.statehistory = () => history.state;
	this.sethistory = (str,args) => {
		var temp = args[0] || null;
		history.pushState(temp, null, str);
	};
	this.gethistory = str => (IsNumeric(str) ? window.history.go(str) : window.history.go(juliar_core_globals(str)));
	this.replacehistory = str => {var temp = args[0] || null;history.replaceState(temp, null, str);};
	//
	//Array Manipulation
	this.pick = (str,args) => {
		var picktype = args[1] || 1;
		var pickings = [];
		var pickstore = "";
		var temp = str.split(" ").filter(n => (n !== ""));
		var temp2 = args[0];
		if(temp2 == undefined)  return temp[Math.random() * temp.length |0];
		if(JSON.parse(picktype) == false && temp.length < temp2) return "<span class=\"juliar_error\">Not enough elements to pick from</span>";
		var output = "";
		for(var i=0;i<temp2;++i){
			if(JSON.parse(picktype) == false){
				while(pickings.indexOf((pickstore = temp[Math.random() * temp.length |0])) != -1);
				output += pickstore + " ";
				pickings.push(pickstore);
			}
			else
			{
				output += temp[Math.random() * temp.length |0] + " ";
			}
		}
		return output;
	};
	this.randomize = str => {
		var arr = str.split(" ").filter(n => (n !== ""));
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
	};
	//
	//Text Effects
	this.left = str => "<div class='left'>" + str + "</div>";
	this.right = str => "<div class='right'>" + str + "</div>";
	this.center = str => "<div class='center'>" + str + "</div>";
	this.middle = str => "<div class='middle'>" + str + "</div>";
	this.bold = str => "<span class='bold'>" + str + "</span>";
	this.italics = str => "<span class='italics'>" + str + "</span>";
	this.crossout = str => "<span class='crossout'>" + str + "</span>";
	this.overline = str => "<span class='overline'>" + str + "</span>";
	this.subscript = str => "<span class='subscript'>" + str + "</span>";
	this.superscript = str => "<span class='superscript'>" + str + "</span>";
	this.underline = str => "<span class='underline'>" + str + "</span>";
	this.uppercase = str => "<span style='text-transform: uppercase;'>"+str+"</span>";
	this.lowercase = str => "<span style='text-transform: lowercase;'>"+str+"</span>";
	this.alternatecase = str => {
		var index = 0;
		var output = "";
		var escaper = 0;
		for(var i=0, length = str.length; i<length;++i){
			if(str[i] == '<') escaper = 1;
			else if(escaper === 0){
				if (str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) {
					output += str[i].toLowerCase();
				}
				else{
					output += str[i].toUpperCase();
				}
			}
			else {output += str[i];}
			if(str[i] == '>') escaper = 0;
		}
		return output;  
	};
	this.capitalize = str => "<span style='text-transform: capitalize;'>"+str+"</span>";
	this.blur = (str,args) => {
		var temp = args[0] || 'black';
		return "<span style='text-shadow: 0 0 3px "+temp+";color: transparent;'>"+str+"</span>";
	};
	this.smaller = str => "<span class='smaller'>" + str + "</span>";
	this.larger = str => "<span class='larger'>" + str + "</span>";
	this.shrink = str => {
		var output = "", escaper = 0, counter = 0;
		for (var i = 0, length = str.length; i < length; ++i){
			if(str[i] == '<') escaper = 1;
			if(escaper === 0){ output += "<span class='smaller'>" + str[i]; counter++;}
			else{ output += str[i];}
			if(str[i] == '>') escaper = 0;
		}
		for (i = 0; i < counter; i++) output += "</span>";
		return output;
	};
	this.grow = str => {
		var output = "", escaper = 0, counter = 0;
		for (var i = 0, length = str.length; i < length; ++i){
			if(str[i] == '<') escaper = 1;
			if(escaper === 0){ output += "<span class='larger'>" + str[i]; counter++;}
			else{ output += str[i];}
			if(str[i] == '>') escaper = 0;
		}
		for (i = 0; i < counter; i++) output += "</span>";
		return output;
	};
	this.highlight = (str,args) => {
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
	};
	this.rainbow = (str,args) => { 
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
	};
	this.size = (str,args) => { 
		var temp = args[0] || 'inherit';
		return "<span style='font-size: " + temp + "'> " + str + "</span>";
	};
	this.font = (str,args) => { //May needtomodify to prevent scripts... DEFINITELY NEEDS MODIFYING
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
	};
	this.rotate = (str,args) => {
		var temp = args[0] || 350;
		args[0] = args[0]  || "inherit";
		args[1] = args[1]  || "inherit";
		var x = args[0] < 0 ? "bottom:" : "top:";
		var y = args[1] < 0 ? "right:" : "left:";
		return "<div style='transform: rotate("+temp+"deg);position:relative;"+x+args[0]+";"+y+args[1]+"'>" + str + "</div>";
	};
	this.reflect = (str,args) => {
		var temp = args[0] || "X";
		return "<div style='transform: scale"+temp.toUpperCase()+"(-1);'>" + str + "</div>";
	};
	this.reverse = str => {for (var i = str.length, o = ''; i > 0; o += str[--i]);return o;};
	this.border = (str,args) => {
		var color = args[0] || "black";
		var size = args[1] || 1;
		var style = args[2] || "solid";
		return "<span style='border: "+size+"px "+style+" "+color+"'>"+str+"</span>";
	};
	this.outline = (str,args) => {
		var temp = args[0] || 'orange';
		return "<span style='text-shadow:-1px -1px 0 "+temp+",1px -1px 0 "+temp+",-1px 1px 0 "+temp+",1px 1px 0 "+temp+"'>"+str+"</span>";
	};
	this.blink = (str,args) => {
		var sec = args[0] || 2;
		var steps = args[1] || 4;
		return "<juliar_blink style='animation: blink "+sec+"s steps("+steps+") infinite;'>"+str+"</juliar_blink>";
	};
	//
	//Date & Time
	this.completedate = () => {
		var now = new Date();
		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		var year = now.getYear();
		var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
		return days[now.getDay()]+", "+months[now.getMonth()]+" "+date+", "+((year < 1000) ? year + 1900 : year);
	};
	this.date = () => {
		var now = new Date();
		return ("0"+(now.getMonth()+1)).slice(-2)+"/"+("0"+now.getDate()).slice(-2)+"/"+now.getFullYear();
	};
	this.time = () => {
		var now = new Date();
		return ("0"+now.getHours()).slice(-2)+ ":" + ("0"+now.getMinutes()).slice(-2) + ":" + ("0"+now.getSeconds()).slice(-2);
	};
	this.timezone = () => {
		var d = new Date().getTimezoneOffset()/60;
		return d > 0 ? "GMT-"+d : 'GMT+'.Math.abs(d); 
	};
	this.ip = str => {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "http://ip-api.com/json/"+str, false);
		xmlhttp.send();
		return JSON.parse(xmlhttp.responseText).query;
	};
	this.zipfromip = str => {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "http://ip-api.com/json/"+str, false);
		xmlhttp.send();
		return JSON.parse(xmlhttp.responseText).zip;
	};
	this.zonefromip = str => {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "http://ip-api.com/json/"+str, false);
		xmlhttp.send();
		return JSON.parse(xmlhttp.responseText).timezone;
	};
	this.regionfromip = str => {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "http://ip-api.com/json/"+str, false);
		xmlhttp.send();
		return JSON.parse(xmlhttp.responseText).regionName;
	};
	this.locationfromip = str => {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "http://ip-api.com/json/"+str, false);
		xmlhttp.send();
		return JSON.parse(xmlhttp.responseText).lat +" "+ JSON.parse(xmlhttp.responseText).lon;
	};
	this.countryfromip = str => {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "http://ip-api.com/json/"+str, false);
		xmlhttp.send();
		return JSON.parse(xmlhttp.responseText).country;
	};
	this.cityfromip = str => {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "http://ip-api.com/json/"+str, false);
		xmlhttp.send();
		return JSON.parse(xmlhttp.responseText).city;
	};
	this.isp = str => {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "http://ip-api.com/json/"+str, false);
		xmlhttp.send();
		return JSON.parse(xmlhttp.responseText).isp;
	};
	//
	//News Related
	this.newsbanner = (str,args) => {
		var temp = args[0] || 15;
		return "<div class='marquee' style='animation: marquee "+temp+"s linear infinite;'>"+str+"</div>";
	};
	this.newspaper = (str,args) => {
		var st = args[0] || 2;
		var style = "-webkit-column-count: "+st+";-moz-column-count: "+st+";column-count: "+st+";";
		style += "-webkit-column-gap: 40px;-moz-column-gap: 40px;column-gap: 40px;";
		style += "-webkit-column-rule: 1px solid lightblue;-moz-column-rule: 1px solid lightblue;column-rule: 1px solid lightblue;";
		return "<div style='"+style+"'>"+ str +"</div>";
	};
	this.chapter = str => "<p class='chapter'>"+ str +"</p>";
	this.picture = (str,args) => { 
		var width = args[0] || "100%";
		var height = args[1] || "auto";
		return "<img style='max-width: 100%;width:"+width+";height:"+height+";margin:0 auto;' src='" + str + "'/>";
	};
	//
	//Media
	this.pdf = this.flash = this.java =  (str,args) => {
		if(window.location.protocol == 'file:') return "This command cannot run in a local environment";
		var width = args[0] || 420;
		var height = args[1] || 315;
		return "<object width='"+width+"' height='"+height+"' data='"+str+"'></object>"
	};
	this.video = (str,args) => {
		if(window.location.protocol == 'file:') return "This command cannot run in a local environment";
		var width = args[0] || 420;
		var height = args[1] || 315;
		var autoplay = args[2] || 0;
		if(str.indexOf("//www.youtube.com/watch?v=") != -1) return '<iframe width='+width+' height='+height+' src="//www.youtube.com/embed/'+str.split('?v=')[1]+'?autoplay='+{true:1,false:0}[!!JSON.parse(autoplay)]+'&t='+(args[3] || 0)+'" frameborder="0" allowfullscreen></iframe>';
		else if(str.indexOf("//youtu.be/") != -1) return '<iframe width='+width+' height='+height+' src="//www.youtube.com/embed/'+str.split('youtu.be/')[1]+'?autoplay='+{true:1,false:0}[!!JSON.parse(autoplay)]+'&t='+(args[3] || 0)+'" frameborder="0" allowfullscreen></iframe>';
		else if(str.indexOf("//vimeo.com/") != -1) return '<iframe width='+width+' height='+height+' src="//player.vimeo.com/video/'+str.split("/").pop()+'?autoplay='+{true:1,false:0}[!!JSON.parse(autoplay)]+'#t='+(args[3] || 0)+'" frameborder="0" allowfullscreen></iframe>';
		else if(str.indexOf("//www.twitch.tv/") != -1) return '<iframe width='+width+' height='+height+' src="//www.twitch.tv/'+str.split("/").pop()+'/embed" frameborder="0"></iframe>';
		return '<video src="' + str + '" controls="controls">Your browser does not support HTML Video</video>';
	};
	this.music = str => '<audio src="' + str + '" controls="controls">Your browser does not support HTML Audio</audio>';
	//
	//Max,Min & Absolute
	this.randomnumber = (str,args) => {
		var times = args[0] || 1;
		var temp = (Math.random() * (parseInt(str) || 100)) + 1 |0;
		while(--times){
			temp += "	 "+Math.floor((Math.random() * (parseInt(str) || 100)) + 1);
		}
		return temp;
	};
	this.removewhitespace = this.rw = str => str.replace(/\s/g, '');
	this.convertwhitespace = this.cw = str => str.replace(/\s/g,"&nbsp;").trim();
	this.largenumber = () => Number.MAX_VALUE;
	this.smallnumber = () => Number.MIN_VALUE;
	this.maximum = str => Math.max.apply(Math, str.split(" "));
	this.minimum = str => Math.min.apply(Math, str.split(" "));
	this.absolute = str => str.split(" ").map(Math.abs).join(" ");
	//
	//Header & Title
	this.killframes = () => {if (top.location != location) top.location.href = document.location.href;};
	this.favicon = str => {
		juliar.code("var favicon = document.createElement('link');"+
		"favicon.rel = 'shortcut icon';"+
		"favicon.href = '"+str+"';"+
		"document.getElementsByTagName('head')[0].appendChild(favicon)");    
		return "Favicon changed to '"+str+"' ";
	};
	this.pagetitle = str => {
		juliar.code("document.title = \""+str+"\"");
		return "Pagetitle changed to '"+str+"' ";
	};
	this.header = str => "<header>"+str+"</header>";
	this.footer = str => "<footer>"+str+"</footer>";
	this.banner = str => {
		var width = args[0] || "100%";
		var height = args[1] || "200px";
		return "<img style='max-width: 100%;width:"+width+";height:"+height+";' src='" + str + "'/>";
	};
	this.subtitle = str => "<h2 style='color:#557FBB'>"+str+"</h2>";
	this.title = str => "<h1 style='text-align:center'>" + str + "</h1>";
	this.decimalcount = str => {
		var match = (''+str).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
		if (!match) { return 0; }
		return Math.max(0,(match[1] ? match[1].length : 0)- (match[2] ? +match[2] : 0));
	};	
	this.author = str => "<h2 style='text-align:center'>" + str + "</h2>";
	//Sockets
	this.socket = (str,args) => {
		var temp = args[0] || null;
		var Socket = new WebSocket("wss://"+str);
		juliar.setobject("juliar_core_socket_"+temp, Socket);
		return "Socket Created";
	};
	this.setsocket = (str,args) => {
		var temp = args[0] || null;
		juliar.getobject("juliar_core_socket_"+temp).send(str);
		return "Sent "+str;
	};
	this.getsocket = str => {
		var rand = juliar.index();
		juliar.code('juliar_core_globals["juliar_core_socket_'+str+'"].onmessage = function (event) {'+
		'document.getElementsByTagName("juliar_core_sockets_'+rand+')[0].innerHTML = event.data;'+
		'};');
		return "<juliar_core_sockets_"+rand+"></juliar_core_sockets_"+rand+">";
	};
	//
	//Variables and Dynamics
	this.set = (str,args) => juliar.setobject(args[0],str);
	this.get = str => juliar.getobject(str.trim());
	this.fetch = str => {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", str, false);
		xmlhttp.send();
		return xmlhttp.responseText;
	};
	this.dynamicset = (str,args) => {
		var temp = args[0] || null;
		juliar.code("var h2s = document.getElementsByTagName('juliar_dynamic_"+temp+"');"+
		"for(var h = 0, length = h2s.length; h < length; h++ ) {h2s[h].innerHTML = '"+str+"';}");
		juliar.setobject(temp,str);
		return "<juliar_dynamic_"+temp+">"+str+"</juliar_dynamic_"+temp+">";
	};
	this.dynamicget = str => "<juliar_dynamic_"+str+">"+juliar.getobject(str.trim())+"</juliar_dynamic_"+str+">";
	this.dynammicfetch = str => {
		var randomj = "juliar_dynamicfetch_"+juliar.index();
		var xmlhttp = new XMLHttpRequest();
		juliar.code('xmlhttp.onreadystatechange=function(){if (xmlhttp.readyState==4 && xmlhttp.status==200){document.getElementById('+randomj+').innerHTML=xmlhttp.responseText;}};)'+
		'xmlhttp.open("GET",str,true);xmlhttp.send();');
		return "<span id='"+randomj+"'></span>";
	};
	this.dynamicinput = (str,args) => "<input onblur='juliar_core_dynamicset(this.value,\""+args[0]+"\")' type='text' value='"+str+"' style='width: 600px;border-top: 0;border-right: 0;border-left: 0;background: transparent;border-color:rgba(0,0,0,0.3)'>";
	//Math Functions
	//constants
	this.e = str => Math.exp(Number(str) || 1);
	this.log = (str,args) => {
		if(!args[0]) return Math.log(Number(str) || 1);
		return Math.log(Number(str) || 1)/Math.log(Number(args[0]) || 10);
	};
	this.pi = () => '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089';
	this.pythagoras = () => '1.4142135623730951';
	this.aperys = () => '1.2020569';
	this.goldenratio = () => '1.618033988749895';
	this.mascheroni = () => '0.57721';
	this.conways = () => '1.30357';
	this.khinchins = () => '2.6854520010';
	this.kinkelin = () => '1.2824271291';
	this.gravity = (str,args) => {
		str = args[0] || str.trim().toLowerCase(); 
		switch(str){
			case "sun":
			return 274;
			case "jupiter":
			return 24.92;
			case "nepture":
			return 11.15;
			case "saturn":
			return 10.44;
			case "uranus":
			case "venus":
			return 8.87;
			case moon:
			return 1.622;
			case "mars":
			return 3.71;
			case "mercury":
			return 3.7;
			case "pluto":
			return 0.58;
			case "earth":
			default:
			return 9.798;
		}
	}
	this.gravitational = () => 6.674e-11;
	this.epsilon = str => {
		switch(str){
			case "Vacuum":
			return 1;
			case "Air":
			return "1.00058986";
			case "Methanol":
			return "30";
			case "Water":
			return "80";
			default:
			return 1;
		}
	};
	//trig
	this.sine = this.sin = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? Math.sin(str*Math.PI / 180) : Math.sin(str);
	this.cosine = this.cos = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? Math.cos(str*Math.PI / 180) : Math.cos(str);
	this.tangent = this.tan = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? Math.tan(str*Math.PI / 180) : Math.tan(str);
	this.secant = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? 1/Math.cos(str*Math.PI / 180) : 1/Math.cos(str);
	this.cosecant = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? 1/Math.sin(str*Math.PI / 180) : 1/Math.sin(str);
	this.cotangent = this.cot = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? 1/Math.tan(str*Math.PI / 180) : 1/Math.tan(str);
	this.asin = this.arcsin = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? Math.asin(str)*180/Math.PI : Math.asin(str);
	this.acos = this.arccos = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? Math.acos(str)*180/Math.PI : Math.acos(str);
	this.atan = this.arctangent = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? Math.atan(str)*180/Math.PI : Math.atan(str);
	this.arcsec = this.arcsecant = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? Math.acos(1/str)*180/Math.PI :Math.acos(1/str);
	this.arccsc = this.arccosecant = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? Math.asin(1/str)*180/Math.PI : Math.asin(1/str);
	this.arccot = this.arccotangent = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? Math.atan(1/str)*180/Math.PI : Math.atan(1/str);
	//Hyperbola Functions
	this.cosh = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? Math.cosh(str*Math.PI / 180) : Math.cosh(str);
	this.sinh = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? Math.sinh(str*Math.PI / 180) : Math.sinh(str);
	this.tanh = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? Math.tanh(str*Math.PI / 180) : Math.tanh(str);
	this.coth = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? 1/Math.tanh(str*Math.PI / 180) : 1/Math.tanh(str);
	this.sech = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? 1/Math.cosh(str*Math.PI / 180) : 1/Math.cosh(str);
	this.csch = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? 1/Math.sinh(str*Math.PI / 180) : 1/Math.sinh(str);
	this.asinh = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? Math.asinh(str)*180/Math.PI : Math.asinh(str);
	this.acosh = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? Math.acosh(str)*180/Math.PI : Math.acosh(str);
	this.atanh = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? Math.atanh(str)*180/Math.PI : Math.atanh(str);
	this.asech = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? Math.acosh(1/str)*180/Math.PI : Math.acosh(1/str);
	this.acsch = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? Math.asinh(1/str)*180/Math.PI : Math.asinh(1/str);
	this.acotanh = (str,args) => (args[0] == "degrees" || args[0] == "360" || args[0])? Math.atanh(1/str)*180/Math.PI : Math.atanh(1/str);
	this.toDegrees = str => str*180/Math.PI;
	this.toRadians = str => str*Math.PI/180;
	this.temperature = (str,args) => {
		var num = Number(str.trim()) || null;
		var unit = args[0] || 'K';
		var cto = args[1] || 'C'
		switch(unit){
			case "F":
			return cto == 'C'? (num-32)*5/9: cto == 'K'? (num+459.67)*5/9 : num;
			case "C":
			return cto == 'K'? num+273.15: cto == 'F'? num*9/5+32 : num;
			case "K":
			return cto == 'C'? num-273.15: cto == 'F'? num*9/5-459.67: num;
			default:
			return "<span class=\"juliar_error\">Cannot convert temperature</span>";
		}
	}
	//
	this.root = (str,args) => {
		var root = args[0] || 2;
		var y = Math.pow(Math.abs(str), 1/root);
		if(root%2)return str < 0 ? -y : y;
		return str < 0 ? y+"i" : y;
	};
	this.power = str => {
		var temp;
		str.split(" ").forEach(function(element) {
			Number(element)&&(temp=null==temp?Number(element):Math.pow(temp, element));
		});
		return temp;
	};
	this.divide = str => {
		var temp;
		str.split(" ").forEach(function(element) {
			Number(element)&&(temp=null==temp?Number(element):temp/Number(element));
		});
		return temp;
	};
	this.remainder = str => {
		var temp;
		str.split(" ").forEach(function(element) {
			Number(element)&&(temp=null==temp?Number(element):((temp%(Number(element)))+Number(element))%Number(element));
		});
		return temp;
	};
	this.multiply = str => {
		var temp = 1;
		str.split(" ").forEach(function(element) {
			Number(element) && (temp *= element);
		});
		return temp;
	};
	this.add = str => {
		var temp = 0;
		str.split(" ").forEach(function(element) {
			Number(element) && (temp += Number(element));
		});
		return temp;
	};
	this.subtract = str => {
		var temp;
		str.split(" ").forEach(function(element) {
			Number(element)&&(temp=null==temp?Number(element):temp-Number(element));
		});
		return temp;
	};
	function gcdcalc(a, b)
	{
		while (b > 0)
		{
			var temp = b;
			b = a % b; // % is remainder
			a = temp;
		}
		return a;
	}
	this.gcd = str => {
		var input = str.trim().split(" ");
		var result = input[0];
		for(var i = 1; i < input.length; i++) result = gcdcalc(result, input[i]);
		return result;
	};
	function lcmcalc(a,b)
	{
		return a * (b / gcdcalc(a, b));
	}
	this.lcm = str => {
		var input = str.trim().split(" ");
		var result = input[0];
		for(var i = 1; i < input.length; i++) result = lcmcalc(result, input[i]);
		return result;
	};
	////
	this.trash = () => juliar.getobject('null') || juliar.getobject('undefined');
	//Experimental
	this.newwindow = str => {
		str = str || "http://www.juliar.org"; window.open(str,"newWindow");
		return "Opened "+str+" in new window!";
	};
	this.warnonclose = (str,args) => {
		str = str.trim() || args[0] || true;
		if(JSON.parse(str) != false){
			window.onbeforeunload = function (e) {
				var e = e || window.event;
				if (e) {
					e.returnValue = 'Are you sure?';
				}
				return 'Are you sure?';
			};
			return "Browser will warn on close!";
		}
		window.onbeforeunload = "";
		return "Browser will normally close!";
	};
	this.urlparameters = () => {
		var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
		return (results && results[1]) || undefined;
	};
	this.backbutton = str => '<a href="javascript:history.back(1)">'+(str || 'Go Back')+'</a>';
}

function Juliar_graph(juliar){
	this.graph = (str,args) => {
		//Test of generating x^2
		x_val = [];
		y_val = [];
		for(var i=0;i<1000;i++){
			x_val.push(i);
			y_val.push(i);
		}
		var temp = "";
		temp += '<svg width=500px height=500px viewBox="0 0 1000 1000">';
		temp += '<g>';
		temp += '<line x1="0" y1="500" x2="1000" y2="500" style="stroke:#40454f;stroke-width:2" />';
		temp += '<line x1="500" y1="0" x2="500" y2="1000" style="stroke:#40454f;stroke-width:2" />';
		for(var j=0;j<x_val.length;j++){
			temp += '<circle cx="'+(x_val[j])+'" cy="'+(1000-y_val[j])+'" r="5" stroke="black" stroke-width="1" fill="red" />';
		}
		temp += '</g>';
		temp += '</svg>';
		return temp;
	};
	function caretReplace(a) {
		if (-1 < a.indexOf("^")) {
			for (var c = [];-1 < a.indexOf("(");) {
				a = a.replace(/(\([^\(\)]*\))/g, (a,b) => {
					c.push(b);
					return "___juliar___" + (c.length - 1);
				});
			}
			c.push(a);
			for (a = "___juliar___" + (c.length - 1);-1 < a.indexOf("___juliar___");) {
				a = a.replace(RegExp("___juliar___(\\d+)", "g"), (a,b) => {
					return c[b].replace(/(\w*)\^(\w*)/g, "Math.pow($1,$2)");
				});
			}
		}
		return a;
	};
	this.derivative = (str,args) => {
		var at = Number(args[0]) || 0;
		str =  caretReplace(str.trim().replace(/\\\*/g,"*"));
		var stack = [];
		var output = "";
		str = str.replace(/sin/g,"Math.sin").replace(/cos/g,"Math.cos").replace(/tan/g,"Math.tan").replace(/log/g,"Math.log").replace(/sqrt/g,"Math.sqrt");
		for(var i=0;i<str.length;i++){
			if(str[i] == "x" && ((!isNaN(parseFloat(str[i-1])) && isFinite(str[i-1])) || (str[i-1] >= "A" && str[i-1] <= "Z") || (str[i-1] >= "a" && str[i-1] <="z") || str[i-1] == ")" )){
				str= str.slice(0,i) + "*"+str.slice(i++);
			}
		}
		f1 = str.replace(/x/g,at+0.00000000001);
		f2 = str.replace(/x/g,at);
		return eval("("+f1+"-"+f2+")/0.00000000001");
	};
	function dotproduct(n,r){for(var t=0,u=Math.min(n.length,r.length),e=0;u>e;e++)t+=n[e]*r[e];return t}
	function log(n){return Math.log(n)}function exp(n){return Math.exp(n)}
	function transpose(n){return n[0].map(function(r,t){return n.map(function(r,u){return n[u][t]})})}
	function multiplyMatrices(){var n=Array.prototype.slice.call(arguments,0),r=transpose(n.pop()),t=n.length>1?multiplyMatrices(n):n[0];return t.map(function(n){return r.map(function(r){return r.reduce(function(r,t,u){return r+t*n[u]},0)})})}
	function zeros(n,r){for(var t=[],u=[];r--;)u.push(0);for(;n--;)t.push(u.slice(0));return t}
	function inv(f){if(f.length===f[0].length){var r=0,n=0,o=0,e=f.length,t=0,i=[],g=[];for(r=0;e>r;r+=1)for(i[i.length]=[],g[g.length]=[],o=0;e>o;o+=1)i[r][o]=r==o?1:0,g[r][o]=f[r][o];for(r=0;e>r;r+=1){if(t=g[r][r],0==t){for(n=r+1;e>n;n+=1)if(0!=g[n][r]){for(o=0;e>o;o++)t=g[r][o],g[r][o]=g[n][o],g[n][o]=t,t=i[r][o],i[r][o]=i[n][o],i[n][o]=t;break}if(t=g[r][r],0==t)return}for(o=0;e>o;o++)g[r][o]=g[r][o]/t,i[r][o]=i[r][o]/t;for(n=0;e>n;n++)if(n!=r)for(t=g[n][r],o=0;e>o;o++)g[n][o]-=t*g[r][o],i[n][o]-=t*i[r][o]}return i}}
	function sumMatrices(){for(var r,e,n=arguments,t=[],u=n[0].length,a=n.length,f=0;u>f;){for(r=0,e=0;a>e;)r+=Number(n[e++][f]);t[f++]=r}return t}
	function mean(a){
		var count=0;
		var length = a.length;
		for (var i=a.length; i--;) {
			if(a[i] == null){
				length--;
			}
			else{
				count+=Number(a[i]);
			}
		}
		if(length > 0 ) return count/length;
		return null;
	}
	
	function standardDeviation(a){
		a = a.filter(Number);
		n = a.length;
		var avg = mean(a);
		var squareDiffs = a.map(function(value){
			var diff = value - avg;
			var sqrDiff = diff * diff;
			return sqrDiff;
		});
		var count=0;
		for (var i=squareDiffs.length; i--;) {
			count+=squareDiffs[i];
		}
		var avgSquareDiff = count/(n-1);
		if(isNaN(avgSquareDiff)) return null;
		return Math.sqrt(avgSquareDiff);
	}
	function standarderror(a){
		var x = standardDeviation(a);
		if(x == null) return null;
		return x/Math.sqrt(a.length);
	}
}

function Juliar_interpreter(juliar){
	var css = ".juliar-console{width:99%;background-color: white;font-size:21px;color:#aaa;position:relative;margin-left:14px;}";
	css += ".juliar-console input{font-size:21px;width:100%;margin: 0px;padding:0px;box-shadow: none;}";
	css += ".juliar-console .background{color:#93969b;background-color:white;outline: 0px;position:absolute;left:0px;border: 0px transparent;}";
	css += ".juliar-console .foreground{position:relative;background-color:transparent;outline: 0px;border: 0px;color:#3498db;}";
	css += ".juliar-console .bar{z-index:-1;line-height:23px;left:-14px;font-size:21px;color:#93969b;position:absolute;background-color:white;padding-bottom:3px;}";
	css += "ijuliar{display:inline-block;width:100%;}";
	css += "ijuliar .realblock{box-shadow:0 1px 6px rgba(0,0,0,.12);background-color:white;margin: 24px 20px;padding: 10px;animation: fadein 2s;}";
	css += "@keyframes fadein {from { opacity: 0;bottom:-100px;position:relative; }to   { opacity: 1;bottom:0px;position:relative;}}";
	css += "ijuliar .commandused{font-style: italic;color:#1abc9c;display:inline;}";
	css += "ijuliar .commandused:hover{border-bottom: 1px dotted #b6adad;cursor:pointer;padding-bottom:2px;}";
	css += "ijuliar .time{float:right;color:#D2D5DA;font-style:italic;font-size: 12px;margin-right:5px;}";
	css += "ijuliar .realblock:hover .juliar_close_btn{display:block;}";
	css += "ijuliar .juliar_close_btn{float:right;font-size:14px;cursor:pointer;color:#9b9da2;display:none;padding: 0px 20px}";
	css += "ijuliar .juliar_close_btn:hover{background-color:#40454f;color:white;}";
	css += "ijuliar .jcontent{transition: opacity 0.5s linear;opacity: 1;height:auto}";
	juliar.css(css);
	
	this.clearinterpreter = () => {
		var ijuliars = document.getElementsByTagName("ijuliar"),len = ijuliars.length;
		if(len != 0){ juliar.history = [];juliar.historyindex = 0;juliar.historytemp = "";}
		while(len--){
			var jselector = ijuliars[len];
			jselector.innerHTML = '<div class="juliar-console"><div class="bar">></div><input class="background"><input class="foreground" placeholder="Enter *Juliar * command here..."></div>';
			jselector.addEventListener("keyup", keyUp);
		}
		if (sessionStorage.getItem("juliar_interpreter_history")) {
			juliar.history = sessionStorage.getItem("juliar_interpreter_history").split("*!!!!*");
		}
	};
	this.deleteinterpreter = () => {
		var x = document.activeElement.parentNode.parentNode;
		x.parentNode.removeChild(x);
		return "";
	};
	this.downloadcommands = (str,args) => {
		var type = args[0] || 1;
		type = JSON.parse(type);
		var name = str.trim() || "output";
		var a = document.activeElement.parentNode.parentNode.getElementsByClassName("commandused");
		var content = type == 1? "<script src='juliar.js'>\r\n<juliar>\r\n" : "";
		for (var i = 0; i < a.length; ++i) {
			content += a[i].innerHTML +"\r\n";
		}
		content += type == 1? "</juliar>": "";
		var fileref=document.createElement("a");
		fileref.download =  type == 1? name+".html": name+".j";
		fileref.href = 'data:text/plain;base64,'+btoa(content);
		document.body.appendChild(fileref);
		fileref.click();
		fileref.parentNode.removeChild(fileref);
		return "Downloading content from interpreter";
	};
	function find(key, array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].name.indexOf(key) == 0) {
				return array[i].name;
			}
		}
		return "";
	};
	var keyUp = e => {
		var keyCode = e.keyCode;
		var target = e.target;
		var inp = String.fromCharCode(keyCode);
		if (keyCode === 13 && target.value != "") {
			juliar.historytemp = "";
			juliar.clearcode();
			var str = target.value;
			juliar.history.unshift(str);
			juliar.historyindex = 0;
			var temp = document.createElement("div");
			temp.className = "realblock";
			var now = new Date();
			temp.innerHTML = "<span onclick='(function(element){element.parentNode.removeChild(element);})(this.parentNode)' class='juliar_close_btn'> &#10006;</span>"+
			"<span onclick='(function(element){var el=element.getElementsByClassName(\"jcontent\")[0];if(el.style.opacity == 1){el.style.opacity=0;el.style.height=0;}else{el.style.opacity=1;el.style.height=\"auto\";}})(this.parentNode)' class='juliar_close_btn'> &boxminus; </span>"+
			"<span class='time'>"+("0"+now.getHours()).slice(-2)+ ":" + ("0"+now.getMinutes()).slice(-2) + ":" + ("0"+now.getSeconds()).slice(-2)+"</span>"+
			"<div class='commandused' onclick='(function(element){var el = element.parentNode.parentNode.getElementsByClassName(\"foreground\")[0];el.value = element.innerHTML;el.focus();})(this)'>"+str+"</div><hr><div class='jcontent' style='opacity:1'>"+juliar.parser(str)+"</div>";
			target.parentElement.parentNode.insertBefore(temp, target.parentElement);
			target.value = "";
			target.parentNode.getElementsByClassName("background")[0].value = "";
			target.scrollIntoView(true);
			
			for(var i=0,j=juliar.index();i<j;i++){
				var fileref=document.createElement("script");
				fileref.type = "text/javascript";
				fileref.textContent =juliar.getcode(i);
				document.head.appendChild(fileref);
			}
			if (sessionStorage.getItem("juliar_interpreter_history")) {
				sessionStorage.setItem("juliar_interpreter_history", sessionStorage.getItem("juliar_interpreter_history")+"*!!!!*"+str);
				}else{
				sessionStorage.setItem("juliar_interpreter_history",str);
			}
			document.dispatchEvent(new Event('juliar_done'));
		}
		else if (keyCode === 38) {
			if (juliar.history.length !== 0) {
				++juliar.historyindex;
				if(juliar.historyindex > juliar.history.length){
					target.value = juliar.historytemp;
					juliar.historyindex = 0;
				}
				else{
					target.value = juliar.history[juliar.historyindex-1];
				}
				target.parentNode.getElementsByClassName("background")[0].value = "";
			}
		}
		else if (keyCode === 40) {
			if (juliar.history.length !== 0) {
				--juliar.historyindex;
				if(juliar.historyindex < 0){
					juliar.historyindex = juliar.history.length;
					target.value = juliar.history[juliar.historyindex-1];
				}
				else if(juliar.historyindex == 0){
					target.value = juliar.historytemp;
				}
				else{
					target.value = juliar.history[juliar.historyindex-1];
				}
				target.parentNode.getElementsByClassName("background")[0].value = "";
			}
		}
		else if (keyCode == 39){
			var val = target.value;
			juliar.historytemp = target.value;
			juliar.historyindex = 0;
			
			var currentindex=0, positions = [];
			var temppos = [];
			while ((currentindex = val.indexOf("*", currentindex)) !== -1) {
				if(val[currentindex-1] == "\\");
				else if (!((nextvalue = val.charCodeAt(currentindex + 1)) === 32 || nextvalue === 42 || nextvalue === 9 || nextvalue === 10 || isNaN(nextvalue))) {
					positions.push(currentindex);
				}
				else{
					if ((lastindex = positions.pop()) === undefined) temppos.push(currentindex);;
				}
				++currentindex;
			}
			var foundunit = find(val.slice(val.lastIndexOf("*")+1),juliar.commands);
			if(val.length > 1 && val.length > val.lastIndexOf("*")+1 && foundunit != "" && val.slice(val.lastIndexOf("*")).length < 1+foundunit.length) target.value = val.slice(0,val.lastIndexOf("*")+1) + foundunit;
			else if(temppos.length > 0){
				var position;
				while(position = temppos.pop()){
					target.value = target.value.slice(0,position) + target.value.slice(position+1);
				}
			}
			else if(positions.length > 0){
				var countdown = positions.length;
				while(countdown--){
					target.value += " *";
				}
			}
			target.parentNode.getElementsByClassName("background")[0].value = "";
		}
		else{
			var val = target.value;
			juliar.historytemp = target.value;
			juliar.historyindex = 0;
			if(val.length > 1 && val != "" && val.length != val.lastIndexOf("*")+1){
				var foundcomm = find(val.slice(val.lastIndexOf("*")+1),juliar.commands);
				if(foundcomm){
					target.parentNode.getElementsByClassName("background")[0].value =  target.value.slice(0,val.lastIndexOf("*")+1)+foundcomm;
				}
				else{
					target.parentNode.getElementsByClassName("background")[0].value = target.value;
				}
				var currentindex=0, positions = [];
				var negcount =0;
				while ((currentindex = val.indexOf("*", currentindex)) !== -1) {
					if(val[currentindex-1] == "\\");
					else if (!((nextvalue = val.charCodeAt(currentindex + 1)) === 32 || nextvalue === 42 || nextvalue === 9 || nextvalue === 10 || isNaN(nextvalue))) {
						positions.push(currentindex);
					}
					else{
						if ((lastindex = positions.pop()) === undefined) negcount++;
					}
					++currentindex;
				}
				if(negcount){
					target.parentNode.getElementsByClassName("background")[0].value += " <<ERROR: There are "+negcount+" misplaced *";
				}
				else if(positions.length > 0){
					countdown = positions.length;
					tempstr = "";
					while(countdown--)  tempstr += " *";
					target.parentNode.getElementsByClassName("background")[0].value += tempstr;
				}
			}
			else{
				target.parentNode.getElementsByClassName("background")[0].value = "";
			}
		}
	}
}
