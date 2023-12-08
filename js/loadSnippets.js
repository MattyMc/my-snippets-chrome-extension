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
      <li id="snippet-${snippet.id}" style="display: flex; align-items: center; justify-content: space-between;">
        <div style="flex-grow: 1;">
          <button onclick="utils.copyToClipboard('${snippet.id}', this)" class="snippet-button copy-button" onmouseleave="(() => { this.classList.remove('button-check') })()">
            Copy
          </button>
          <span class="snippet-name">${snippet.name}</span>
        </div>
        <button aria-label="Edit Snippet" onclick="editSnippet('${snippet.id}')" class="snippet-button image-button edit-button">
          <div class="ionic-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 512 512"><path d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48" stroke-linecap="round" stroke-linejoin="round" class="ionicon-fill-none ionicon-stroke-width"></path><path d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z"></path></svg>
          </div>
        </button>
        <button style="margin-left: 0.6rem;" aria-label="Delete Snippet" onclick="deleteSnippet('${snippet.id}')" class="snippet-button image-button delete-button">
          <div class="ionic-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>        </button>
          </div>
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
