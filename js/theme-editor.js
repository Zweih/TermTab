const data = {};

chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (key in changes) {
		var storageChange = changes[key];
		console.log('Storage key "%s" in namespace "%s" changed. ' +
								'Old value was "%s", new value is "%s".',
								key,
								namespace,
								storageChange.oldValue,
								storageChange.newValue);
	}
});

$(document).ready(() => {
	console.log("Ready to edit!");

	chrome.storage.local.get(null, function(items) {
		const selectors = Object.keys(items);

		for(let i = 0; i < selectors.length; i++) {
			console.log(items[selectors[i]]);
		}
 });

	$(".background .apply").click((event) => {
		event = event || window.event;
		const target = event.target;
		const color = $(target).prev().css("background-color");
		const selector = $(target).attr("id");
		
		$(selector).css("background-color", color);
		addData(selector, "background-color", color);
	});

	$(".borders .apply").click(() => {
		const color = $(".borders input"
		).css("background-color");
		const selector = "#image, .box, .window"
		const value = `5px solid ${color}`;

		$(selector).css("border", `5px solid ${color}`);
		addData(selector, "border", value);
	});

	$(".color .apply").click((event) => {
		event = event || window.event;
		const target = event.target;
		const color = $(target).prev().css("background-color");
		const selector = $(target).attr("id");
		console.log(selector);

		$(selector).css("color", color);

		addData(selector, "color", color);
	});
});

const addData = (selector, key, value) => {
	chrome.storage.local.set({[selector]: {[key]: value}});
}