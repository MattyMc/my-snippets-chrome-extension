const loadSnippets = (() => {
  const loadSnippets = () => {
    const snippets = utils.getStoredSnippets();
    const snippetContainer = document.getElementById("snippets");

    // Initialize snippetContainer with an unordered list
    snippetContainer.innerHTML = "<ul style='list-style-type: none; padding: 0; margin: 0;'></ul>";
    const list = snippetContainer.querySelector("ul");

    const snippetListItems = snippets.map((snippet) => {
      return utils.buildSnippetHtmlFromTemplate(snippet);
    });

    list.append(...snippetListItems);
    utils.snippetListChange(); // check if we need to do anything
  };

  return {
    loadSnippets,
  };
})();
