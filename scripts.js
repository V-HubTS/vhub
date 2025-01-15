// For "About:blank Embedder"
function openInAboutBlank() {
  const url = document.getElementById('urlInput').value;
  if (!url.startsWith('https://')) {
    alert('URL must include https://');
    return;
  }
  const newWindow = window.open('about:blank', '_blank');
  newWindow.document.write('<iframe src="' + url + '" style="border:none; width:100%; height:100vh;"></iframe>');
}

// For HTML Code Runner
function launchCode() {
  const code = document.getElementById('htmlCode').value;
  const newWindow = window.open("", "_blank", "width=800,height=600");
  newWindow.document.open();
  newWindow.document.write(code);
  newWindow.document.close();
}

// For HTML, CSS, and JavaScript Packager
function downloadFile() {
  const code = document.getElementById('code-editor').value;

  const fullCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Page</title>
</head>
<body>
  ${code}
</body>
</html>
  `;

  const blob = new Blob([fullCode], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'index.html';
  link.click();
}

// For Mass URL Opener
function openLinks() {
  const urls = document.getElementById('urls').value.split('\n');
  urls.forEach(url => {
    if (url.trim()) {
      window.open(url.trim(), '_blank');
    }
  });
}

// For Attractive Drawing Tool
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
let drawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

function getMousePos(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function startDrawing(e) { drawing = true; draw(e); }
function stopDrawing() { drawing = false; ctx.beginPath(); }
function draw(e) {
  if (!drawing) return;
  const pos = getMousePos(canvas, e);
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = colorPicker.value;

  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

function downloadCursor() {
  canvas.toBlob(blob => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'drawing.cur';
    link.click();
  }, 'image/x-icon');
}
