document.addEventListener("DOMContentLoaded", () => {
  createSnippet.initializeTrix();
  loadSnippets.loadSnippets();

  document.getElementById('download-button').addEventListener('click', function() {
    // Assume userData is the data you want to download
    const snippetsJson = localStorage.getItem("snippets");
    
    // const jsonData = JSON.stringify(snippets, null, 2);
    const blob = new Blob([snippetsJson], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
  
    const now = new Date();
    const timestamp = now.getFullYear().toString() + '-' +
                      (now.getMonth() + 1).toString().padStart(2, '0') + '-' +
                      now.getDate().toString().padStart(2, '0') + '-' +
                      now.getHours().toString().padStart(2, '0') + '_' +
                      now.getMinutes().toString().padStart(2, '0') +
                      now.getSeconds().toString().padStart(2, '0');
    const filename = `my_snippets_${timestamp}.json`;
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  
    URL.revokeObjectURL(url);
  });

  document.getElementById('upload-button').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            try {
                const snippets = JSON.parse(e.target.result);
                // Assuming 'snippets' is an object or array as per your data structure
                localStorage.setItem('snippets', JSON.stringify(snippets));
                confirm('Snippets uploaded successfully.');
            } catch (error) {
                alert('Error parsing JSON. Please check the file format.');
            }
        };

        reader.readAsText(file);
    } else {
        alert('Please select a file.');
    }
});

  
});
