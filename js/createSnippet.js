const createSnippet = (() => {
  function initializeQuill() {
    // const quill = new Quill("#new-snippet-input", {
    //   modules: {
    //     toolbar: [
    //       ["bold", "italic"],
    //       ["link", "blockquote", "code-block"],
    //       [{ list: "ordered" }, { list: "bullet" }],
    //     ],
    //     keyboard: {
    //       bindings: {
    //         handleEnter: {
    //           key: "Enter",
    //           shortKey: true,
    //           handler: (range, context) => {
    //             submitSnippetForm(quill);
    //           },
    //         },
    //       },
    //     },
    //   },
    //   placeholder: "Compose your snippet...",
    //   theme: "snow",
    // });

    // quill.on("text-change", function (delta, oldDelta, source) {
    //   if (source == "api") {
    //     console.log("An API call triggered this change.");
    //   } else if (source == "user") {
    //     debugger;
    //     console.log("A user action triggered this change.");
    //   }
    // });
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

    // Set tabindex to -1 for all toolbar elements so we can tab straight from
    // the shortcut name to the quill textarea
    // const toolbarButtons = document.querySelectorAll(".ql-toolbar button");
    // toolbarButtons.forEach((button) => {
    //   button.setAttribute("tabindex", "-1");
    // });

    // return quill;
  }

  function submitSnippetForm(event) {
    if (event) event.preventDefault();

    const element = event.target.querySelector("trix-editor");
    const htmlContent = element.value;
    // const plainTextContent = element.editor.getDocument().toString();
    const plainTextContent = element.innerText;
    const trixJsonContent = JSON.stringify(element.editor);
    const name = event.target.querySelector("#snippet-name").value.trim();
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
    initializeQuill,
    submitSnippetForm,
  };
})();
