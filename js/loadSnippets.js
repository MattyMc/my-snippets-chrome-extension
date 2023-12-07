const loadSnippets = (() => {
  const loadSnippets = () => {
    const snippets = utils.getStoredSnippets();
    const snippetContainer = document.getElementById("snippets");

    // Initialize snippetContainer with an unordered list
    snippetContainer.innerHTML = "<ul style='list-style-type: none; padding: 0; margin: 0;'></ul>";
    const list = snippetContainer.querySelector("ul");

    const snippetListItems = snippets.map((snippet) => {
      // Append each snippet as a list item
      return `
      <li style="display: flex; align-items: center; justify-content: space-between;">
        <div style="flex-grow: 1;">
          <button onclick="utils.copyToClipboard('${snippet.content}', this)" class="snippet-button copy-button" onmouseleave="(() => { this.classList.remove('button-check') })()">
            Copy
          </button>
          <span class="snippet-name">${snippet.name}</span>
        </div>
        <button aria-label="Edit Snippet" onclick="editSnippet('${snippet.name}')" class="snippet-button image-button edit-button">
          <ion-icon name="create-outline" aria-hidden="true"></ion-icon>
        </button>
        <button style="margin-left: 0.6rem;" aria-label="Delete Snippet" onclick="deleteSnippet('${snippet.name}')" class="snippet-button image-button delete-button">
          <ion-icon name="trash-outline" aria-hidden="true"></ion-icon>
        </button>
      </li>
      `;
    });

    list.innerHTML = snippetListItems.join("");
  };

  return {
    loadSnippets,
  };
})();
