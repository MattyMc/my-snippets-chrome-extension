#!/bin/zsh

# Directory and file setup
EXT_DIR="TextSnippetExtension"
mkdir -p $EXT_DIR/icons

# Create manifest.json
cat <<EOM >$EXT_DIR/manifest.json
{
  "manifest_version": 3,
  "name": "Text Snippet Manager",
  "version": "1.0",
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "permissions": ["storage"],
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
EOM

# Create popup.html
cat <<EOM >$EXT_DIR/popup.html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
  <textarea id="snippet"></textarea>
  <button id="save">Save</button>
  <button id="copy">Copy to Clipboard</button>
  <script src="popup.js"></script>
</body>
</html>
EOM

# Create popup.js
cat <<EOM >$EXT_DIR/popup.js
document.getElementById('save').addEventListener('click', () => {
  const snippet = document.getElementById('snippet').value;
  chrome.storage.local.set({ 'snippet': snippet });
});

document.getElementById('copy').addEventListener('click', () => {
  const snippet = document.getElementById('snippet').value;
  navigator.clipboard.writeText(snippet).then(() => {
    alert('Snippet copied to clipboard');
  });
});

// Load stored snippet
window.onload = () => {
  chrome.storage.local.get('snippet', (result) => {
    document.getElementById('snippet').value = result.snippet || '';
  });
};
EOM

# Create styles.css
cat <<EOM >$EXT_DIR/styles.css
body {
  width: 300px;
  padding: 10px;
}
textarea {
  width: 280px;
  height: 100px;
}
button {
  margin-top: 10px;
  width: 100%;
}
EOM

echo "Chrome Extension files created in $EXT_DIR"
