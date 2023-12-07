document.addEventListener("DOMContentLoaded", () => {
  createSnippet.initializeQuill();
  loadSnippets.loadSnippets();
  document.getElementById("removeAll").addEventListener("click", utils.removeAllSnippets);
});

// document.addEventListener("DOMContentLoaded", () => {
//   loadSnippets();
//   document.getElementById("removeAll").addEventListener("click", removeAllSnippets);

//   // Initialize Quill editor
//   const quill = new Quill("#new-snippet-input", {
//     modules: {
//       toolbar: [
//         ["bold", "italic"],
//         ["link", "blockquote", "code-block", "image"],
//         [{ list: "ordered" }, { list: "bullet" }],
//       ],
//     },
//     placeholder: "Compose your snippet...",
//     theme: "snow",
//   });

//   quill.keyboard.addBinding(
//     {
//       key: "Enter",
//       shortKey: true, // shortKey is true for both Ctrl and Command keys
//     },
//     (range, context) => {
//       handleQuillKeydown(range, context);
//     }
//   );

//   // Set tabindex to -1 for all toolbar elements so we can tab straight from
//   // the shortcut name to the quill textarea
//   const toolbarButtons = document.querySelectorAll(".ql-toolbar button");
//   toolbarButtons.forEach((button) => {
//     button.setAttribute("tabindex", "-1");
//   });

//   const form = document.getElementById("new-snippet-form");
//   form.onsubmit = function (event) {
//     event.preventDefault();

//     const name = document.querySelector("input[name=snippetName]").value.trim();
//     const content = quill.root.innerHTML;

//     if (name && content) {
//       saveNewSnippet(name, content);
//     } else {
//       alert("Please enter both name and content for the snippet.");
//     }
//   };
// });

// const loadSnippets = () => {
//   const snippets = getStoredSnippets();
//   const snippetContainer = document.getElementById("snippets");

//   // Clear existing snippets in the container
//   snippetContainer.innerHTML = "";

//   snippets.forEach((snippet) => {
//     // Create container for each snippet
//     const snippetElement = document.createElement("div");

//     // Create span to hold the snippet name
//     const snippetName = document.createElement("span");
//     snippetName.textContent = snippet.name;

//     // Create 'Copy' button for each snippet
//     const copyButton = document.createElement("button");
//     copyButton.textContent = "Copy";
//     copyButton.addEventListener("click", () => copyToClipboard(snippet.content, copyButton));

//     // Append the name and button to the snippet container
//     snippetElement.appendChild(snippetName);
//     snippetElement.appendChild(copyButton);

//     // Append the entire snippet element to the main container
//     snippetContainer.appendChild(snippetElement);
//   });
// };

// const saveNewSnippet = (name, content) => {
//   const snippets = getStoredSnippets();
//   snippets.push({ name, content });
//   localStorage.setItem("snippets", JSON.stringify(snippets));
//   location.reload(); // Reload to update the list of snippets
// };

// const copyToClipboard = (content, buttonElement) => {
//   // Extract plain text from HTML
//   const tempElem = document.createElement("div");
//   tempElem.innerHTML = content;
//   const originalText = tempElem.textContent || tempElem.innerText || "";

//   // Create Blob objects for HTML and plain text
//   const blobHtml = new Blob([content], { type: "text/html" });
//   const blobText = new Blob([originalText], { type: "text/plain" });

//   // Prepare the data to be copied
//   const data = [
//     new ClipboardItem({
//       "text/plain": blobText,
//       "text/html": blobHtml,
//     }),
//   ];

//   // Use Clipboard API to copy the data
//   navigator.clipboard.write(data).then(
//     () => {
//       // Change button text on success
//       const originalButtonText = buttonElement.textContent;
//       buttonElement.textContent = "Copied!";

//       // Change the button text back after 3 seconds
//       setTimeout(() => {
//         buttonElement.textContent = originalButtonText;
//       }, 3000);
//     },
//     () => {
//       alert("Failed to copy");
//     }
//   );
// };

// const getStoredSnippets = () => {
//   const storedSnippets = localStorage.getItem("snippets");
//   return storedSnippets ? JSON.parse(storedSnippets) : [];
// };

// const removeAllSnippets = () => {
//   localStorage.removeItem("snippets");
//   location.reload(); // Reload to update the display
// };

// const handleFormSubmit = (event) => {
//   event.preventDefault(); // Prevent the default form submission
//   saveNewSnippet();
// };

// const handleQuillKeydown = (range, context) => {
//   debugger;
//   const form = document.getElementById("new-snippet-form");
//   form.dispatchEvent(new Event("submit")); // Trigger the form submit
// };
