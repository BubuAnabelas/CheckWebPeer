const logHeading = document.querySelector('#logHeading');
const logDiv = document.querySelector('#log');

const resultsHeading = document.querySelector('#resultsHeading');
const resultsDiv = document.querySelector('#results');

function message (msg) {
	var p = document.createElement('p');
	p.innerHTML = msg;
	return p;
}

exports.log = function log (msg) {
	logHeading.style.display = 'block'
	var p = message(msg);
	logDiv.appendChild(p);
	return p;
}

exports.error = function error (err) {
	var p = exports.log(err.message || err);
	p.style.color = 'red';
	p.style.fontWeight = 'bold';
}

exports.results = function results (data) {
	resultsHeading.style.display = 'block';
	var p = message(data);
	resultsDiv.appendChild(p);
}