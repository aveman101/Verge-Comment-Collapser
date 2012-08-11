function addCollapseWidgets() {
	// create a link node
	var collapseLink = document.createElement("div");
	collapseLink.setAttribute("class", "collapseWidget");

	// prepend the comment node to the username
	var commentNodes = document.getElementsByClassName("citem");
	for (var i=0; i<commentNodes.length; i++) {
		var thisElement = commentNodes[i];

		// get the usernameNode by looking for the "says" class
		// var usernameNode = thisElement.getElementsByClassName("says")[0];
		var usernameNode = thisElement.getElementsByClassName("comment")[0];
		// only root comments have the "says" class. All others have a "reply-to" class.
		if (!usernameNode)
			usernameNode = thisElement.getElementsByClassName("reply-to")[0];

		// Check to see if this node already has a collapse link on it. If so, we skip it.
		if (usernameNode.getElementsByClassName("collapseWidget").length == 0) {
			var nodeCopy = collapseLink.cloneNode();

			// create a text node to be in the link
			var collapseLinkSpan = document.createElement("span");
			collapseLinkSpan.className = "widget-minus";
			$(collapseLinkSpan).text("-");
			nodeCopy.appendChild(collapseLinkSpan);

			// add the event listener for the click event
			collapseLinkSpan.addEventListener("click", toggleCollapsed, true);

			// Place the node immediately before the username
			usernameNode.insertBefore(nodeCopy, usernameNode.firstChild);
		}
	}

	setTimeout(addCollapseWidgets, 750);
}

function toggleCollapsed(mouseEvent) {
	var spanElement = mouseEvent.toElement;
	var clickedElement = $(spanElement).parent();
	var commentBlock = $(clickedElement).parent()[0];

	// collapse all the child comments
	$(commentBlock).siblings(".citem").toggleClass("comment-hidden");
	$(commentBlock).children("*:not(.says, .reply-to)").toggleClass("comment-hidden");

	// toggle the spanElement on the button
	$(spanElement).toggleClass("widget-minus").toggleClass("widget-plus");
	if ($(spanElement).hasClass("widget-plus")) {
		$(spanElement).text("+");
	} else {
		$(spanElement).text("-");
	}
}

// check for more comments every 0.75 seconds
// TODO: intercept whatever function is loading the comments in the first place, so the widgets only need to be added once.
setTimeout(addCollapseWidgets, 750);