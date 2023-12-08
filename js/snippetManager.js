// Assuming utils.js also contains a method to update an existing snippet
// utils.updateSnippet(name, content)

/**
 * Loads the snippet content into the form
 *
 * @param {HTMLElement} buttonElement - The name of the snippet to be edited.
 */
const editSnippet = (buttonElement) => {
  const id = buttonElement.closest("li").getAttribute("data-snippet-id");

  const snippets = utils.getStoredSnippets();
  const snippetToEdit = snippets.find((snippet) => snippet.id === id);

  if (!snippetToEdit) {
    alert(`Snippet "${snippetName}" not found.`);
    return;
  }

  // Load content into Trix
  const element = document.querySelector("trix-editor");
  element.editor.loadJSON(JSON.parse(snippetToEdit.trixJsonContent));

  // Set the snippet name in the input field
  document.querySelector("input[name=snippet-name]").value = snippetToEdit.name;
  document.getElementById("snippet-id").value = snippetToEdit.id;
  utils.snippetListChange(); // anything else to do?

  // Show the form!
  const newSnippetForm = document.getElementById("new-snippet-form");
  newSnippetForm.classList.remove("d-none");
};

/**
 * Deletes a snippet by its name.
 *
 * @param {string} snippetName - The name of the snippet to be deleted.
 */
const deleteSnippet = (buttonElement) => {
  const id = buttonElement.closest("li").getAttribute("data-snippet-id");
  // Retrieve stored snippets
  let snippets = utils.getStoredSnippets();

  // Filter out the snippet to delete
  const snippet = snippets.find((snippet) => snippet.id === id);
  snippets = snippets.filter((snippet) => snippet.id !== id);

  // Update stored snippets
  localStorage.setItem("snippets", JSON.stringify(snippets));

  // Remove the deleted snippet
  document.getElementById(`snippet-${id}`).remove();

  console.log(`Deleted snippet: ${(id, snippet.name)}`);
  utils.snippetListChange(); // anything else to do?
  // hide the form
  const newSnippetForm = document.getElementById("new-snippet-form");
  newSnippetForm.classList.add("d-none");
};

// Export functions if using modules
// export { editSnippet, deleteSnippet };
