/**
 * function in charge of the creation and intantiation of a local storage table
 * @param name name of the table to create
 * @param items items to initialize the table with
 * @return void
 */
function createTable(name, items) {
	if (window.localStorage.hasOwnProperty(name)) return;
	if (typeof(name) !== "string")
		throw "Error: the name of the database must be string";
	if (!Array.isArray(items) || items.some(i => typeof(i) !== "string"))
		throw "Error: the column of the table must be string array";
	
	let table = {"columns": items, "name": name, "data": []};
	window.localStorage.setItem(name, JSON.stringify(table))
};


/**
 * this function doesn't get a real function
 * it only responde as api method. You indicate
 * the user name and the password and the function return
 * the match value of the especific table
 * @param tablename name of the table to select
 * @param query is an object which contains the dictionary that matches with the user
 * @return an empty array when there are no matches or the dictionary matches list (1 to be expected)
 */
function select(tableName, query) {
	let data = window.localStorage.getItem(tableName)
	if (!data) throw "Error: the table does not exists";
	data = JSON.parse(data);
	data = data.data;
	let result = data.filter(value => {
		for (let query_value in query)
			if (!value[query_value] || value[query_value] !== query[query_value]) return false;
		return true;
	});
	return result;
}

/**
 * function in charge of inserting a new value into a table
 * @param tableName name of the table to append a new item into
 * @param value dictionary of the item to append
 */
function appendValue(tableName, value) {
	let table = window.localStorage.getItem(tableName)
	if (!table) throw "Error: the table does not exists";
	table = JSON.parse(table);
	let values = Object.fromEntries(table.columns.map(d => [d, ""]));
	for (let v in value) if (values[v] === "") values[v]  = value[v];
	table.data.push(values);
	window.localStorage.setItem(tableName, JSON.stringify(table))
}


