(() => {
  // Remove All Snippets Button
  document.getElementById("remove-all-button").addEventListener("click", function () {
    utils.removeAllSnippets();
  });

  // New Snippet Button
  document.getElementById("new-snippet-button").addEventListener("click", function () {
    utils.newSnippet();
  });

  document.getElementById("cancel-new-snippet-button").addEventListener("click", function () {
    utils.newSnippet();
  });

  // List Items
  // All the buttons in the snippets list have a data-action attribute
  // whose value maps to functions defined below. This allows our extension
  // to not have to ask for extra permissions to use inline events
  const listContainer = document.getElementById("snippets");
  listContainer.addEventListener("click", function (event) {
    const button = event.target.closest("button");
    if (button == null) return;

    const action = button.getAttribute("data-action");
    if (action == "copyToClipboard") {
      utils.copyToClipboard(button);
    } else if (action == "editSnippet") {
      editSnippet(button);
    } else if (action == "deleteSnippet") {
      deleteSnippet(button);
    }
  });

  // Removes the 'button-check' class
  // When we click to copy a snippet to the keyboard, a 'button-check'
  // class is added to the button to display a checkmark. Once the user
  // leaves the button area, we should remove the checkmark
  listContainer.addEventListener("mouseleave", function (event) {
    var target = event.target;
    if (target.classList.contains("copy-button")) {
      target.classList.remove("button-check");
    }
  });
})();
