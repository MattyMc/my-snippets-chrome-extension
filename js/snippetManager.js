// Assuming utils.js also contains a method to update an existing snippet
// utils.updateSnippet(name, content)

/**
 * Edits a snippet by its name.
 * 
 * @param {string} snippetName - The name of the snippet to be edited.
 */
/**
 * Edits a snippet by its name.
 * 
 * @param {string} snippetName - The name of the snippet to be edited.
 */
const editSnippet = (snippetId) => {
    const snippets = utils.getStoredSnippets();
    const snippetToEdit = snippets.find(snippet => snippet.id === snippetId);
  
    if (!snippetToEdit) {
      alert(`Snippet "${snippetName}" not found.`);
      return;
    }
  
    // Initialize Quill if it hasn't been initialized
    const quill = Quill.find(document.getElementById("new-snippet-input"));
  
    // Set the content in the Quill editor
    quill.root.innerHTML = snippetToEdit.content;
  
    // Set the snippet name in the input field
    document.querySelector("input[name=snippetName]").value = snippetToEdit.name;
    document.getElementById("snippetId").value = snippetToEdit.id;
    const name = document.querySelector("input[name=snippetName]").value.trim();
    const content = quill.root.innerHTML;

    // Override the submitSnippetForm function
    // createSnippet.submitSnippetForm = (quill) => {
    //   const name = document.querySelector("input[name=snippetName]").value.trim();
    //   const content = quill.root.innerHTML;
  
    //   if (!name || !content) {
    //     alert("Please enter both name and content for the snippet.");
    //     return;
    //   }
  
    //   // Check if a snippet with the same name exists and it's not the current one being edited
    //   const isNameTaken = snippets.some(snippet => snippet.name === name && snippet.name !== snippetToEdit.name);
  
    //   if (isNameTaken) {
    //     alert("A snippet with this name already exists. Please choose a different name.");
    //     return;
    //   }
  
    //   // Update the snippet
    //   utils.updateSnippet(name, content, snippetToEdit.name);
  
    //   // Optionally: refresh the list of snippets
    //   loadSnippets.loadSnippets();
    // };
  };
  
  
  
  /**
   * Deletes a snippet by its name.
   * 
   * @param {string} snippetName - The name of the snippet to be deleted.
   */
  const deleteSnippet = (snippetId, snippetName) => {
    // Retrieve stored snippets
    let snippets = utils.getStoredSnippets();
  
    // Filter out the snippet to delete
    const snippet = snippets.find(snippet => snippet.id === snippetId);
    snippets = snippets.filter(snippet => snippet.id !== snippetId, snippetName);
  
    // Update stored snippets
    localStorage.setItem("snippets", JSON.stringify(snippets));
  
    // Remove the deleted snippet
    document.getElementById(`snippet-${snippetId}`).remove()
  
    console.log(`Deleted snippet: ${snippetId, snippetName}`);
  };
  
  // Export functions if using modules
  // export { editSnippet, deleteSnippet };
  