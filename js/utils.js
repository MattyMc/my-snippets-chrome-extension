const utils = (() => {
  const saveNewSnippet = (name, content) => {
    const snippets = getStoredSnippets();
    snippets.push({ name, content });
    localStorage.setItem("snippets", JSON.stringify(snippets));
    location.reload();
  };

  const copyToClipboard = (content, buttonElement) => {
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
    saveNewSnippet,
    copyToClipboard,
    getStoredSnippets,
    removeAllSnippets,
  };
})();
