const createSnippet = (() => {
  function initializeQuill() {
    const quill = new Quill("#new-snippet-input", {
      modules: {
        toolbar: [
          ["bold", "italic"],
          ["link", "blockquote", "code-block", "image"],
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

    if (name && content) {
      utils.saveNewSnippet(name, content);
    } else {
      alert("Please enter both name and content for the snippet.");
    }
  }

  return {
    initializeQuill,
    submitSnippetForm,
  };
})();
