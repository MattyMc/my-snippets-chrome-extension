const createSnippet = (() => {
  function initializeQuill() {
    const quill = new Quill("#new-snippet-input", {
      modules: {
        toolbar: [
          ["bold", "italic"],
          ["link", "blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
        keyboard: {
          bindings: {
            handleEnter: {
              key: "Enter",
              shortKey: true,
              handler: (range, context) => {
                submitSnippetForm(quill);
              },
            },
          },
        },
      },
      placeholder: "Compose your snippet...",
      theme: "snow",
    });

    const form = document.getElementById("new-snippet-form");
    form.onsubmit = (event) => {
      if (event) event.preventDefault();
      submitSnippetForm(quill);
    };

    // Set tabindex to -1 for all toolbar elements so we can tab straight from
    // the shortcut name to the quill textarea
    const toolbarButtons = document.querySelectorAll(".ql-toolbar button");
    toolbarButtons.forEach((button) => {
      button.setAttribute("tabindex", "-1");
    });

    return quill;
  }

  function submitSnippetForm(quill) {
    const name = document.querySelector("input[name=snippetName]").value.trim();
    const content = quill.root.innerHTML;
    // Get the snippet's ID if we're editing, or
    // Generate a unique ID for the new snippet
    let id = document.querySelector("input[name=snippetId]").value.trim(); 
    id = id || Date.now().toString();
  
    if (!name || !content) {
      alert("Please enter both name and content for the snippet.");
      return;
    }
  
  
    // Save the new snippet with the generated ID
    utils.saveOrUpdateSnippet(id, name, content);
  }
  

  return {
    initializeQuill,
    submitSnippetForm,
  };
})();
