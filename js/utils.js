const utils = (() => {
  const saveOrUpdateSnippet = (id, name, content) => {
    const snippets = getStoredSnippets();
    // Find the index of the snippet with the given ID
    const snippetIndex = snippets.findIndex(snippet => snippet.id === id);
  
    if (snippetIndex !== -1) {
      // Snippet exists, update it
      snippets[snippetIndex] = { id, name, content };
    } else {
      // Snippet does not exist, add as new
      snippets.push({ id, name, content });
    }
  
    // Save the updated snippets array to localStorage
    localStorage.setItem("snippets", JSON.stringify(snippets));
    location.reload(); // Consider a more efficient way to refresh the data on the page
  };
  

  const copyToClipboard = (id, buttonElement) => {
    const snippets = getStoredSnippets();
    const content = snippets.find(snippet => snippet.id === id).content;
    const blobHtml = new Blob([content], { type: "text/html" });
    const blobPlainText = new Blob([content], { type: "text/plain" }); // Assuming content is already plain text

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

  const getInnerText = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const innerText = doc.body.innerText;
    return innerText;
  };

  return {
    saveOrUpdateSnippet,
    copyToClipboard,
    getStoredSnippets,
    removeAllSnippets,
  };
})();
