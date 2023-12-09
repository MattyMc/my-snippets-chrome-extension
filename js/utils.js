const utils = (() => {
  const newSnippet = () => {
    const newSnippetForm = document.getElementById("new-snippet-form");
    // clear the form
    newSnippetForm.reset();
    // show the form
    newSnippetForm.classList.toggle("d-none");
    // move focus to the name input
    document.getElementById("snippet-name-input").focus();
  };

  const buildSnippetHtmlFromTemplate = (snippet) => {
    const snippetListItemTemplate = document.querySelector("#snippet-li-template");
    const listItem = snippetListItemTemplate.content.cloneNode(true).querySelector("li");
    listItem.setAttribute("id", `snippet-${snippet.id}`);
    listItem.setAttribute("data-snippet-id", snippet.id);
    listItem.querySelectorAll(".snippet-name")[0].innerHTML = snippet.name;
    return listItem;
  };

  const saveOrUpdateSnippet = (id, name, htmlContent, plainTextContent, trixJsonContent) => {
    const snippets = getStoredSnippets();
    // Find the index of the snippet with the given ID
    const snippetIndex = snippets.findIndex((snippet) => snippet.id === id);

    const snippet = { id, name, htmlContent, plainTextContent, trixJsonContent };
    if (snippetIndex !== -1) {
      // Snippet exists, update it
      snippets[snippetIndex] = snippet;
      console.log("Updated Snippet: ", snippet);
      // update the snippet's name (if needed) in the snippet list
      element = document.getElementById(`snippet-${id}`);
      element.getElementsByClassName("snippet-name")[0].innerHTML = snippet.name;
      // add the 'new-snippet' class to show a green dot indicator
      element.classList.add('new-snippet')
    } else {
      // Snippet does not exist, add as new
      snippets.push(snippet);
      console.log("Created Snippet: ", snippet);
      // add snippet to the ui
      newSnippetElement = utils.buildSnippetHtmlFromTemplate(snippet);
      // add the 'new-snippet' class to show a green dot indicator
      newSnippetElement.classList.add('new-snippet')
      document.getElementById("snippets").querySelector("ul").append(newSnippetElement);
    }

    // Save the updated snippets array to localStorage
    localStorage.setItem("snippets", JSON.stringify(snippets));
    // Close and reset the form
    newSnippet();
  };

  const copyToClipboard = (buttonElement) => {
    const id = buttonElement.closest("li").getAttribute("data-snippet-id");

    const snippets = getStoredSnippets();
    const htmlContent = snippets.find((snippet) => snippet.id === id).htmlContent;
    const plainTextContent = snippets.find((snippet) => snippet.id === id).plainTextContent;
    const blobHtml = new Blob([htmlContent], { type: "text/html" });
    const blobPlainText = new Blob([plainTextContent], { type: "text/plain" }); // Assuming content is already plain text

    const data = [new ClipboardItem({ "text/html": blobHtml, "text/plain": blobPlainText })];

    navigator.clipboard.write(data).then(
      () => {
        buttonElement.classList.add("button-check");
      },
      () => {
        alert("Failed to copy");
      }
    );
  };

  const getStoredSnippets = () => {
    const storedSnippets = localStorage.getItem("snippets");
    return storedSnippets ? JSON.parse(storedSnippets) : [];
  };

  const removeAllSnippets = () => {
    localStorage.removeItem("snippets");
    location.reload();
  };

  const snippetListChange = () => {
    const numSnippets = document.querySelectorAll("#snippets li").length;
    if (numSnippets > 0) {
      document.getElementById("remove-all-button").classList.remove("d-none");
    } else {
      document.getElementById("remove-all-button").classList.add("d-none");
    }
  };

  return {
    saveOrUpdateSnippet,
    snippetListChange,
    buildSnippetHtmlFromTemplate,
    copyToClipboard,
    getStoredSnippets,
    removeAllSnippets,
    newSnippet,
  };
})();
