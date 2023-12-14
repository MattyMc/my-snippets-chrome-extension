document.addEventListener("DOMContentLoaded", () => {
  createSnippet.initializeTrix();
  loadSnippets.loadSnippets();

  document.getElementById("download-button").addEventListener("click", function () {
    // Assume userData is the data you want to download
    const snippetsJson = localStorage.getItem("snippets");

    // const jsonData = JSON.stringify(snippets, null, 2);
    const blob = new Blob([snippetsJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const now = new Date();
    const timestamp =
      now.getFullYear().toString() +
      "-" +
      (now.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      now.getDate().toString().padStart(2, "0") +
      "-" +
      now.getHours().toString().padStart(2, "0") +
      "_" +
      now.getMinutes().toString().padStart(2, "0") +
      now.getSeconds().toString().padStart(2, "0");
    const filename = `my_snippets_${timestamp}.json`;

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  });

  document.getElementById("restore-snippets-file-input").addEventListener("change", function (event) {
    if (!this.files) return;

    if (this.files.length === 1) {
      // A file has been selected
      const file = this.files[0];
      console.log("File selected: ", file);

      // Prompt the user for confirmation after selecting the file
      if (confirm("Would you like to restore snippets from this file? This action cannot be undone.")) {
        const reader = new FileReader();

        reader.onload = function (e) {
          try {
            const snippets = JSON.parse(e.target.result);
            localStorage.setItem("snippets", JSON.stringify(snippets));
            loadSnippets.loadSnippets();
            alert("Snippets restored.");
          } catch (error) {
            alert("Error parsing JSON. Please check the file format.");
          }
        };

        reader.readAsText(file);
      } else {
        // Clear the file input if user cancels
        this.value = "";
      }
    } else if (this.files.length === 0) {
      console.log("No file selected");
    } else if (this.files.length > 1) {
      console.log("More than 1 file selected");
    }
  });
});
