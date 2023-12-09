const createSnippet = (() => {
  function initializeTrix() {
    // Do not accept file uploads
    document.addEventListener("trix-file-accept", function (event) {
      event.preventDefault();
    });

    const form = document.getElementById("new-snippet-form");
    form.onsubmit = submitSnippetForm;

    document.body.addEventListener("keydown", (e) => {
      if (!(e.key == "Enter" && e.metaKey)) return;
      if (e.target.form) {
        e.preventDefault();
        e.target.form.requestSubmit();
      }
    });
  }

  function submitSnippetForm(event) {
    if (event) event.preventDefault();

    const element = event.target.querySelector("trix-editor");
    const htmlContent = element.value;
    // const plainTextContent = element.editor.getDocument().toString();
    const plainTextContent = element.innerText;
    const trixJsonContent = JSON.stringify(element.editor);
    const name = event.target.querySelector("#snippet-name-input").value.trim();
    // Get the snippet's ID if we're editing, or
    // generate an ID for a new snippet
    let id = event.target.querySelector("#snippet-id").value.trim();
    id = id || Date.now().toString();

    if (!name || !htmlContent) {
      alert("Please enter both name and content for the snippet.");
      return;
    }

    // Save the new snippet with the generated ID
    utils.saveOrUpdateSnippet(id, name, htmlContent, plainTextContent, trixJsonContent);
  }

  return {
    initializeTrix,
    submitSnippetForm,
  };
})();
