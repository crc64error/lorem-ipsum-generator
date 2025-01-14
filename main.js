// Copyright (c) 2012 Jared Drake All rights reserved. See Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International Public License

var loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquet quam id dui posuere blandit. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Vivamus suscipit tortor eget felis porttitor volutpat. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Proin eget tortor risus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec rutrum congue leo eget malesuada. Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Donec sollicitudin molestie malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Duis volutpat fringilla risus, et vulputate lorem tempor sed. ";
var optionToggler = 1;

// handlers
// paragragh count
document.getElementById('pCountId').onchange = function () {
	createContent();
	save();
}
// paragragh length
document.getElementById('paragraphLengthId').onchange = function () {
	createContent();
	save();
}
// paragraph form
document.getElementById('pFormId').onchange = function () {
	paragraphChange();
	save();
}
// break type
document.getElementById('breakTypeId').onchange = function () {
	createContent();
	save();
}
// break times
document.getElementById('breakTimesId').onchange = function () {
	createContent();
	save();
}
// selectable Id
document.getElementById('selectableId').onchange = function () {
	createContent();
	save();
}
// copyable Id
document.getElementById('copyableId').onchange = function () {
	createContent();
	save();
}
// contGenId?
document.getElementById('contGenId').onclick = function () {
	if (document.getElementById('selectableId').value == "Yes") {
		selectContent(this);
	}
	save();
}
// optionsId
document.getElementById('optionsId').onclick = function () {
	showOptions();
	document.getElementById('pCountId').focus();
	return false;
}

//functions
function createContent() {
	drawContent(textArray(loremIpsum));
}

function textArray(text) {
	text = text.split('. ');
	text.pop();
	return (text);
}

function drawContent(content) {
	var loopCount = document.getElementById('paragraphLengthId').value;
	var text = "";
	var formType = document.getElementById('pFormId').value;
	var pNum = document.getElementById('pCountId').value;
	for (var a = 0; a < pNum; a++) { //prints out number of paragraphs
		if (formType == "Yes") { //if in paragraph form, add opening paragraph tag
			text = text + "&lt;p&gt;";
		} else if (formType == "Curly_Tags") { // if in curly tags, add opening curly tag}
			text = text + "{{p}}";
			for (var b = 0; b < loopCount; b++) { //append random sentence
				var rand = Math.floor((Math.random() * 19));
				var sentence = content[rand]
				if (b == loopCount - 1) {
					text += sentence + ".";
				} else {
					text += sentence + ". ";
				}
			}
			if (formType == "Yes") { //if in paragraph form, add end paragraph tag
				text = text + "&lt;/p&gt;";
			} else if (formType == "Curly_Tags") { // if in curly tags, add end curly tag
				text = text + "{{/p}}";
				if (a != pNum - 1) {
					var breakNum = document.getElementById('breakTimesId').value;
					if (document.getElementById('breakTypeId').value == 1 && formType != "Yes") {
						for (c = 0; c < breakNum; c++) {
							text += "\n";
						}
					} else if (formType != "Yes") {
						for (c = 0; c < breakNum; c++) {
							text += "<br/>";
						}
					} else {
						for (c = 0; c < 2; c++) {
							text += "\n";
						}
					}
				}
			}
			document.getElementById('contGenId').innerHTML = text;
		}

		function showOptions() {
			if (optionToggler == 1) {
				document.getElementById('contGenId').style.display = 'none';
				document.getElementById('optionsId').setAttribute('title', 'Show the default text');
				document.getElementById('optionsId').innerHTML = 'Show Text';
				document.getElementById('genOptId').style.display = 'block';
				optionToggler = 0;
			} else {
				document.getElementById('contGenId').style.display = 'block';
				document.getElementById('optionsId').setAttribute('title', 'Show more default text options');
				document.getElementById('optionsId').innerHTML = 'More Options';
				document.getElementById('genOptId').style.display = 'none';
				selectContent(document.getElementById('contGenId'));
				optionToggler = 1;
			}

		}

		function selectContent(element) {
			element.focus();
			element.select();
		}

		function paragraphChange() {
			var state = document.getElementById('pFormId').value;
			if (state == "No") {
				document.getElementById('extraSpacers').setAttribute('style', '');
				document.getElementById('spacerCount').setAttribute('style', '');
			} else {
				document.getElementById('extraSpacers').setAttribute('style', 'display:none;');
				document.getElementById('spacerCount').setAttribute('style', 'display:none;');
				document.getElementById('optionsId').focus();
			}
			createContent();
		}

		function save() {
			chrome.storage.sync.set({
				'preferences': {
					'pCountId': document.getElementById('pCountId').value,
					'paragraphLengthId': document.getElementById('paragraphLengthId').value,
					'pFormId': document.getElementById('pFormId').value,
					'breakTypeId': document.getElementById('breakTypeId').value,
					'breakTimesId': document.getElementById('breakTimesId').value,
					'selectableId': document.getElementById('selectableId').value,
					'copyableId': document.getElementById('copyableId').value,
				}
			});
		}

		chrome.storage.sync.get("preferences", function (settings) {
			for (var id in settings.preferences) {
				document.getElementById(id).value = settings.preferences[id];
			}
			if (document.getElementById('selectableId').value == "Yes") {
				selectContent(document.getElementById('contGenId'));
			}
			createContent();

			if (document.getElementById('copyableId').value == "Yes") {
				copyToClipboard();
			}
		});

		function copyToClipboard() {
			selectContent(document.getElementById('contGenId'));
			document.execCommand('Copy');
		}
	}
}