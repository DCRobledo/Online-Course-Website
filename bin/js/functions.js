//function declarations

/**
 * function in charge of change the state of the card's display
 * on mobile. The state open allow to show de description
 * The state close show the videos into a grid 2*2
 * @param e event triger
 * @return void
 */
function toggleStateCardView(e) {
	if (window.innerWidth >= 600) return;
	e.preventDefault();
	e.stopPropagation();
	let parent = this.parentNode;
	parent.classList.toggle("compact");
}

/**
 * function in charge of display and hidden the menu on responsive views
 * @param e event triger
 * @return void
 */
function toggleMenuView(e) {
	if (!e) {
		menu.classList.remove("active");
		hamburger.classList.remove("active");
	} else {
		e.preventDefault();
		e.stopPropagation();
		menu.classList.toggle("active");
		hamburger.classList.toggle("active");
	}
}

/**
 * function in charge of display and hidden the events and news cards on responsive views
 * @param e event triger
 * @return void
 */
function toggleNews(e) {
	if(window.innerWidth < 768) {
		if (!e) {
			news.classList.remove("active");
		} else {
			e.preventDefault();
			e.stopPropagation();
			news.classList.toggle("active");
		}
		let events = document.getElementById("events") 
		if(events.classList.contains("active")) events.classList.remove("active");
	}
}

/**
 * function in charge of display and hidden the events and news cards on responsive views
 * @param e event triger
 * @return void
 */
function toggleEvents(e) {
	if(window.innerWidth < 768) {
		if (!e) {
			events.classList.remove("active");
		} else {
			e.preventDefault();
			e.stopPropagation();
			events.classList.toggle("active");
		}
		let news = document.getElementById("news") 
		if(news.classList.contains("active")) news.classList.remove("active");
	}
}

let isChanging = false;

/**
 * function in charge of determinate the view to be display
 * @param e event triger
 * @return void
 */
function changePage(e) {
	if(isChanging) {
		e.preventDefault();
		window.location.hash = lastHash;
		return;
	}
	isChanging = true;	
	let login_cookie = getCookie("login", false);
	if(!login_cookie || login_cookie === "false") {
		goToLogOut();
	}
	else {
		goToLogIn();
		let uName = getCookie("user_name");
		let user = select("users", {"user_name": uName});
		userName.getElementsByTagName("p")[0].innerHTML = uName;
		/*
		 * se debería hacer la comprobación de que no hubiese más usuarios con el mismo user_name.
		 * dado que es una práctica académica vamos a suponer que el sistema se comporta tal y como se ha diseñado
		 * y por tanto nadie habrá editado el localstorage o las cookies para poder generar estos problemas
		 * por otra parte, sería recomendable migrar toda la gestión de los usuarios al backend
		 */

		userName.getElementsByTagName("img")[0].src = (user.length) ? user[0]["image"] : "media/img/user3.png";
	}
	let pages = {
		"home": "Inicio",
		"students": "Alumn@s",
		"foro": "Foro",
		"marks": "Notas",
		"singup": "Registro",
		"login":"Iniciar Sesion",
		"subjects": "Asignaturas",
		"workingNotEnd": "Proximamente"
	};
	toggleMenuView(null);
	let dest = window.location.hash.split("?")[0];
	if (dest && dest === lastHash) return;

	dest = (dest === "" || dest === "#") ? "home" : dest.replace("#", "");
	lastHash = (lastHash === "" || lastHash === "#") ? "home" : lastHash.replace("#", "");

	let sec = document.getElementById(lastHash);
	if (sec) $(sec).hide(750)

	let getSelector = (sel) => sel === "home" ? "" : sel;

	let selector = document.querySelectorAll(".menu a[href=\"#"+ getSelector(lastHash)+"\"]");
	if (selector) selector.forEach((s, i) => s.parentNode.classList.remove("active"));
	selector = document.querySelectorAll(".menu a[href=\"#"+ getSelector(dest) + "\"]");
	if (selector) selector.forEach((s, i) => s.parentNode.classList.add('active'));

	let title = document.getElementsByClassName("title")[0];

	title.innerText = pages[dest] || pages["workingNotEnd"];

	sec = document.getElementById(dest);
	let wne = document.getElementById("workingNotEnd");
	if (sec) {
		$(wne).hide(750);
		setTimeout(() => {
			$(sec).show(750);
		}, 750)
		setTimeout(() => isChanging = false, 2500);
		
	} else {
		setTimeout(() =>  {
			$(wne).show(750);
		}, 750);
		setTimeout(() => isChanging = false, 1000);
	}
	lastHash = dest;
}

/**
 * function in charge of change the header to display
 * the logout view. Its mean, when the user is not login
 * @return void
 */

function goToLogOut() {
	let public = ["#singup", "#login"];
	let pos;
	if ((pos = public.indexOf(window.location.hash)) === -1) {
		window.location.hash = "login";
	} else {
		let link = document.getElementById("toggleLogout").getElementsByTagName("a")[0];
		switch (pos) {
			case 0:
				link.innerHTML = "Iniciar Sesion";
				link.href = "#login";
				break;
			case 1:
			default:
				link.innerHTML = "Registrarse";
				link.href = "#singup";
				break;
		}


	}
		
	let header = document.getElementsByTagName("header")[0];
	header.classList.add("logout");
	header.getElementsByClassName("logout")[0].classList.remove("hidden");

	let wrap = document.getElementsByClassName("wrap")[0];
	wrap.classList.add("logOut");
}

/**
 * function in charge of change the header to display
 * the logoin view
 * @return void
 */
function goToLogIn() {
	let header = document.getElementsByTagName("header")[0];
	header.classList.remove("logout");
	header.getElementsByClassName("logout")[0].classList.add("hidden");

	let wrap = document.getElementsByClassName("wrap")[0];
	wrap.classList.remove("logOut");
}

/**
 * function in charge of make small animation
 * to collaps or expand the cards'list
 * it make select the information you want to analyce
 * @param e event triger
 * @return void
 */
function toggle_compact_card(e) {
	e.stopPropagation();
	e.preventDefault();
	e.currentTarget.parentNode.classList.toggle("compact");
}


/**
 * function in charge of set the top position
 * of the index, reducing the space between the top
 * of the page and it when it is not necesary
 * @param e event triger
 * @return void
 */
function moveIndex(e) {
	if(window.innerWidth > 600 && window.innerWidth < 768) {
		let elements = [];
		let menu = document.getElementsByClassName('menu')[0];
		elements.push(menu);
		let news = document.getElementById("news");
		elements.push(news);
		let events = document.getElementById("events");
		elements.push(events);


		elements.forEach((elem) => {
			if (window.scrollY >= 200) {
			if (!elem.classList.contains("ontop"))
				elem.classList.add("ontop");
			}
			else
				elem.classList.remove("ontop");
		});
	}
}

let isBigger = window.innerWidth >= 600;
let isTablet = (window.innerWidth<=768 && window.innerWidth >= 600);
/**
 * function in charge of change the class when the window
 * is resize and it is bigger than 600
 * @return null;
 */
function removeCompactClass() {
	if(!isBigger && window.innerWidth >= 600) {
		for(let e of document.getElementsByClassName("compact"))
			e.classList.remove("compact")
		menu.classList.remove("active");
		isBigger = true;
	} else if (isBigger && window.innerWidth < 600) isBigger =  false;
	activateEvents();
}

/**
 * function in charge of managing the visibility of the events card on tablet view
 * when view is smaller than 768 and bigger than 600 and the window is resizing
 * @return void
 */
function activateEvents() {
	if(!isTablet && window.innerWidth<=768 && window.innerWidth >= 600) {
		document.getElementById("events").classList.add("active");
		isTablet = true;	
	} else if (isTablet && (window.innerWidth>768 || window.innerWidth < 600)) isTablet = false;
}

/**
 * function in charge of display the pop up when user whant to logout
 * @param e event trigger
 * @return void
 */
function display_popUp(e) {
	e.preventDefault();
	e.stopPropagation();
	pop_up.classList.remove("hidden");
	panel_overlay.classList.remove("hidden");
}

/**
 * function trigger when user confirm that whant to logout
 * @param e event trigger
 * @return void
 */
function ok_logout(e) {
	e.preventDefault();
	e.stopPropagation();
	document.cookie = "login=false";
	document.cookie = "user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
	window.location.hash = "#login";
	panel_overlay.classList.add("hidden");
	pop_up.classList.add("hidden");
}

/**
 * function in charge of hidden the pop up when user cancel it or click into out area
 * trigger when user whant to cancel logout
 * @param e event trigger
 * @return void
 */
function cancel_logout(e) {
	e.preventDefault();
	e.stopPropagation();
	panel_overlay.classList.add("hidden");
	pop_up.classList.add("hidden");
	pop_up_alert.classList.add("hidden");
}

/**
 * function in charge of return the value of the cookie with the key
 * pass by arguments
 * @param key the name of the cookie
 * @param defaultValue the default value to retunr in case of the cookie dont exists
 * @return string the value of the cookie
 */
function getCookie(key, defaultValue) {
	cookies = document.cookie.split(";");
	cookies = cookies.map(c => c.trim().split("="));
	cookies = Object.fromEntries(cookies);
	return cookies[key] || defaultValue;
}

/**
 * function trigger when user submit the form of sing up
 * this function prepare the data to check is the user alredy exists
 * and in case of not, store in passing the data as object
 * the return of the function is only for logical aproax. This value never
 * could be get
 * @param e event trigger;
 * @return true if the user is singup or false in case of something go bad
 */
function singUp(e) {
	e.preventDefault();
	let form = e.currentTarget;
	if(!validateForm(true, form)) {
		displayAlert("Algunos campos no se han rellenado correctamente");
		return false;
	}
	if (select("users", { "email": form.elements["email"].value}).length || select("users", {"user_name": form.elements["user_name"].value}).length) {
		displayAlert("Este usuario ya existe");
		return false;
	}
	let items = Object.assign({}, ...columns.map(c =>  { return ({[c]: form.elements[c].value});}));
	let reader = new FileReader()
	if(form.elements["image"].files.length !== 0) {
		reader.onload = (e) => {
			items["image"] = e.target.result;
			appendValue("users", items);
			acceptUser("Usuario creado correctamente", items["user_name"]);
		};
		reader.readAsDataURL(form.elements["image"].files[0]);
	}
	else {
		items["image"] = "media/img/user3.png";
		appendValue("users", items);
		acceptUser("Usuario creado correctamente", items["user_name"]);
	}
	return true;
}

/**
 * function trigger when user submit the form of login
 * this function check if the user alredy exists on the same way as the sing up
 * and whith this value get the user name and update/create the cookie associate to this value
 * the return of the function is only for logical aproax. This value never
 * could be get
 * @param e event trigger
 */
function login(e) {
	e.preventDefault();
	let form = e.currentTarget;
	if(!validateForm(false, form)) {
		displayAlert("Algunos campos no se han rellenado correctamente");
		return false;
	}
	
	let user = select("users", { "email": form.elements["email"].value, "psswrd": form.elements["psswrd"].value})
	if (user.length > 0) {
		if (user.length !== 1) {
			displayAlert("Fallo en el sistema. Vuelva a introducir sus datos");
			return false;
		}
		user = user[0]
		let d = new Date();
		d.setMonth(d.getMonth()+1);
		document.cookie = `user_name=${user["user_name"]}; expires=${d.toUTCString()}`;
		document.cookie = `login=true; expires=${d.toUTCString()}`;
		document.cookie = `mode=${user["rol"]}`;
		changeRol(user["rol"]);
		goToLogIn();
		document.getElementsByClassName("profile_image")[0].getElementsByTagName("img")[0].src = user["image"];
		window.location.hash = "#";
		return true;
	}
	else displayAlert("Correo o contraseña incorrectos");
	return false;
}

/**
 * function in charge of evalute if all fields of the form has been insert rigth
 * It is only for browser that dont allow the default validation of html, because that,
 * this functionality is only for support
 * @param singup [boolean] if true validate the singup form, else the login form
 * @param form [dom-object] the form to be evaluate
 * @return [boolean] if all fields are right
 * */
function validateForm(singup, form) {
	if (singup) {
		for (key of columns) {
			if (form[key].required)
				if (!form[key].value || form[key].value.length === 0) return false;
			switch (key) {
				case "NIA":
					let n = parseInt(form[key].value);
					if (n < 100000000 || n > 100999999) return false;
					break;
				case "psswrd":
					if (!/[a-zA-Z0-9]/.test(form[key].value)) return false;
					break;
				case "email":
					if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form[key].value)) return false;
					break;
				case "DNI":
					if (!/[0-9]{8}[A-Z]/.test(form[key].value)) return false;
					break;
				case "rol":
					if (!/^admin$|^profe$|^student$/.test(form[key].value)) return false;
					break;
				case "grade":
					if (!/^inf$|^ade$|^der$|^eco$|^rrrii$/.test(form[key].value)) return false;
					break;
				case "lang":
					if (!/^spanish$|^english$|^italian$/.test(form[key].value)) return false;
					break;
			}
		}
		return form["condition"].value === "on";

	} else {
		let col = ["email", "psswrd"];
		for (let key of col) {
			if (form[key].required)
				if (!form[key].value || form[key].value.length === 0) return false;
			switch (key) {
				case "psswrd":
					if (!/[a-zA-Z0-9]/.test(form[key].value)) return false;
					break;
				case "email":
					if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form[key].value)) return false;
					break;
			}
		}
		return true;
	}
}

/**
 * function in charge of display an alert with information for the user
 * @param message the content of the message to be display
 * @return void
 */
function displayAlert(message) {
	pop_up_alert.getElementsByTagName("h3")[0].innerHTML = message;
	pop_up_alert.classList.remove("hidden");
	panel_overlay.classList.remove("hidden");
}

/**
 * function in charge of the user's confirmation about a pop-up navigation
 * @param message message to display on the pop-up
 * @param user id of the user
 * @return void
 */
function acceptUser(message, user){
	let f = (e) => {
		window.location.hash = "#login";
		cancel_logout(e);
		e.currentTarget.removeEventListener("click", f, true);
	}
	document.getElementById("confirm").addEventListener("click", f, {once: true});
	displayAlert(message);
}

/**
 * function in charge of changing the visual style of the forum card section when an user 
 * wants to add a new comment
 * @param e event trigger
 * @return void
 */
function addQuestion(e) {
	let card = e.currentTarget.parentElement.parentElement.parentElement;
	card.getElementsByClassName("textArea")[0].classList.remove("hidden");
}

/**
 * function in charge of attaching a new forum message 
 * @param e event trigger
 * @return void
 */
function appendComment(e) {
	let li = document.createElement("li");
	li.classList.add("message");

	let image_content = document.createElement("div")
	let image = document.createElement("img");
	let uName = getCookie("user_name");
	let user = select("users", {"user_name": uName}); 
	image.src = (user.length) ? user[0]["image"] : "media/img/user3.png";
	user = user[0];
	image_content.appendChild(image);
	li.appendChild(image_content);


	let data = document.createElement("div");
	data.classList.add("data");
	let time = document.createElement("p");
	let name = user.name.split(" ");
	name = name[0].slice(0, 2) + name[1].slice(0, 2);
	let date = new Date();
	time.innerHTML = `${name.toLowerCase()} - ${date.getHours().toString().padStart(2, "0")} : ${date.getMinutes().toString().padStart(2, "0")} | ${date.getDate()}/${date.getMonth().toString().padStart(2, "0")}/${date.getFullYear()}`;
	data.appendChild(time);
	let message = document.createElement("p");
	let item = e.currentTarget;
	message.innerText = item.parentElement.getElementsByTagName("textarea")[0].value;
	data.appendChild(message);
	li.appendChild(data);
	let ul = item.parentElement.parentElement.parentElement.getElementsByTagName("ul")[0];
	ul.insertBefore(li, ul.getElementsByClassName("add")[0]);
	let metaInfo = ul.getElementsByTagName("li")[0]
	let n_message = metaInfo.getElementsByTagName("div")[0].getElementsByTagName("p")[1];
	n_message.innerText = 
		n_message.innerText.split(" ")[0] + " " + 
		(parseInt(n_message.innerText.split(" ")[1])+1).toString();
	resetComment(e);

}

/**
 * function of reseting the comment addition feature element when an user has finished adding a
 * new comment to the forum
 * @param e event trigger
 * @return void
 */
function resetComment(e) {
	let item = e.currentTarget;
	item.parentElement.getElementsByTagName("textarea")[0].value = "";
	item.parentNode.classList.add("hidden");
}

/**
 * function in charge of managing the page mode modification based on the user's role
 * @param mode role to change the page to
 * @return void 
 */
function changeRol(mode) {
	let togle = (slug, name) => {
		variable_index_buttom.forEach((e, i) => e.href = "#"+slug);
		variable_index_buttom.forEach((e, i) => e.innerHTML = name);
	}
	switch(mode) {
		case "student":
			togle("subjects", "Asignaturas");
			break;
		case "admin":
		case "profe":
		default:
			togle("students", "Alumn@s");
			break;
	}
	togleMarks(mode === "student")
}

/**
 * function in charge of managing the mark page mode modification based on the user's role
 * it modifies the html marks content randomdly
 * @param isStudent boolean representing whether or not the user has the student role associated
 * @return void 
 */
function togleMarks(isStudent) {
	let section_admin = Array(...document.getElementById("marks").getElementsByClassName("admin_teach_view"))
	let section_students = Array(...document.getElementById("marks").getElementsByClassName("students_view"))
	if (isStudent) {
		section_admin.forEach((sel, ind) => sel.classList.add("hidden"));
		section_students.forEach((sel, ind) => sel.classList.remove("hidden"));
		let ul = section_students[0].getElementsByTagName("ul")[0];
		let notes = 6;
		let total = 0;
		for (let i = 0; i< notes; i++) {
			let li = document.createElement("li");
			li.classList.add("grades");
			let divs = [document.createElement("div"),
				    document.createElement("div"),
				    document.createElement("div"),
				    document.createElement("div"),
				    document.createElement("div")];
			divs[0].classList.add("name");
			let notes = [parseInt(Math.random()*50)+4];
			notes.push(Math.random()*notes[0]);
			notes.push(notes[1]*10/notes[0]);
			total +=notes[2];
			divs[0].innerText = "Práctica " + (i+1);
			li.appendChild(divs[0]);
			for (let j = 1; j < divs.length-1; j++){
				divs[j].innerText = notes[j-1].toFixed(1);
				li.appendChild(divs[j]);
			}
			divs[4].innerText = total.toFixed(1);
			li.appendChild(divs[4]);
			ul.appendChild(li);
		}
	}
	else {
		section_admin.forEach((sel, ind) => sel.classList.remove("hidden"));
		section_students.forEach((sel, ind) => sel.classList.add("hidden"));
	}
}


/**
 * function in charge of managing the event calendar plugin
 * @return void 
 */
function eventCalendar() {
	$(function(){
		$("#calendar").simpleCalendar();
	});

	$("#calendar").simpleCalendar({

		// displays events
		displayEvent: true,
	  
		// event dates
		events: [
		  {
			startDate: new Date(2020, 10, 20).toDateString(),
			endDate: new Date(2020, 10, 20).toISOString(),
			summary: 'Charla sobre AWS'
		  },		  
		  {
			startDate: new Date(2020, 10, 15).toDateString(),
			endDate: new Date(2020, 10, 15).toISOString(),
			summary: 'Introduccion al Virtual DOM'
		  },
		  {
			startDate: new Date(2020, 10, 12).toDateString(),
			endDate: new Date(2020, 10, 12).toISOString(),
			summary: 'Entrega Practica 1'
		  },
		  {
			startDate: new Date(2020, 10, 10).toDateString(),
			endDate: new Date(2020, 10, 10).toISOString(),
			summary: 'Reunion de grupo'
		  },
		  {
			startDate: new Date(2020, 11, 5).toDateString(),
			endDate: new Date(2020, 11, 5).toISOString(),
			summary: 'Entrega Practica CSS'
		  },
		  {
			startDate: new Date(2020, 11, 2).toDateString(),
			endDate: new Date(2020, 11, 2).toISOString(),
			summary: 'Reunion de grupo REACT'
		  }
		],
	  
		// disable showing event details
		disableEventDetails: false,
	  
		// disable showing empty date details
		disableEmptyDetails: false,

		displayYear: true,
	  
		months: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
		days: ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'],

		fixedStartDay: true,

		// called after init
		onInit: function (calendar) {}, 
	  
		// called on month change
		onMonthChange: function (month, year) {},
	  
		// called on date selection
		onDateSelect: function (date, events) {}
	});
}

/**
 * function in charge of managing the note excel exporting feature
 * @param  e event trigger
 * @return void 
 */
function notesExport(e) {
	let parent = $(this).parent();
	let title = parent.parent().find("h3").html();
	parent.find("ul").table2excel({
		// exclude CSS class
		exclude: ".noExl",
		name: "Worksheet Name",
		filename: title, //do not include extension
		fileext: ".xls" // file extension
	}); 
}
