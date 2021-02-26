let compact_home,
	compact_cards,
	hamburger,
	menu,
	lastHash,
	panel_overlay,
	pop_up,
	userName,
	pop_up_alert,
	news_toggle_trigger,
	events_toggle_trigger,
	addButton,
	cancel_comments,
	accept_comments,
	variable_index_buttom;
let columns = ['user_name', 'NIA', 'psswrd', 'name', 'email', "bdate", "DNI", "rol", "grade", "university", "lang", "image"];
let date = new Date();

$(document).ready(function(){
	compact_home = document.querySelectorAll("#home .card h3");
	compact_cards = ["students", "foro", "marks"].map(e => document.querySelectorAll(`#${e} .card h3`));
	hamburger = document.getElementById("menu_hamburger");
	menu = document.getElementsByClassName("menu")[0];
	lastHash = "";
	panel_overlay = document.getElementById("panel_overlay");
	pop_up = document.getElementById("pop_up");
	userName = document.getElementsByClassName("profile_image")[0];
	pop_up_alert = document.getElementById("alert");
	news_toggle_trigger = document.getElementById("news").getElementsByTagName('h3')[0];
	events_toggle_trigger = document.getElementById("events").getElementsByTagName('h3')[0];
	addButton = Array(...document.getElementsByClassName("add")).map(e => e.getElementsByTagName("button")[0]);
	cancel_comments = Array(...document.getElementsByClassName("textArea")).map(e => e.getElementsByClassName("btn_cancel")[0])
	accept_comments = Array(...document.getElementsByClassName("textArea")).map(e => e.getElementsByClassName("btn_ok")[0])
	variable_index_buttom = Array(...document.getElementsByClassName("variable_index_buttom")).map(sel => sel.getElementsByTagName("a")[0]);


	changePage();

	compact_home.forEach((node, index) => node.addEventListener("click", toggleStateCardView));

	compact_cards.forEach((sel, ind) =>
		sel.forEach((node, index) =>
			node.addEventListener("click", toggle_compact_card))
	);

	hamburger.addEventListener('click', toggleMenuView);
	news_toggle_trigger.addEventListener('click', toggleNews);
	events_toggle_trigger.addEventListener('click', toggleEvents);

	panel_overlay.addEventListener("click", cancel_logout);
	addButton.forEach((sel, ind) => sel.addEventListener("click", addQuestion));
	accept_comments.forEach((sel, ind) => sel.addEventListener("click", appendComment));
	cancel_comments.forEach((sel, ind) => sel.addEventListener("click", resetComment));


	Array(...document.getElementById("subjects").getElementsByTagName("a")).forEach((a, i) => 
		a.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			return false;
		}));


	document.getElementById("cancel_logout").addEventListener("click", cancel_logout);
	document.getElementById("ok_logout").addEventListener("click", ok_logout);

	$(".notes_export").click(notesExport);

	document.getElementById("logout").addEventListener("click", display_popUp);

	document.getElementById("sing_up_form").addEventListener("submit", singUp);
	document.getElementById("login_form").addEventListener("submit", login);

	window.onhashchange = changePage;
	window.onscroll = moveIndex;
	window.onresize = removeCompactClass;


	date.setFullYear(date.getFullYear()+3);
	if (!getCookie("login", false))
		document.cookie=`login=false; expires=${date.toUTCString()}`;

	createTable('users', columns);

	eventCalendar();
	activateEvents();
	changeRol(getCookie("mode", "profe"));
});
