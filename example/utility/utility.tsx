export function manageNumofLines(linesRef: React.MutableRefObject<any>) {
  var editor = document.getElementById('main_input');
  var linesDiv = linesRef.current;
  const text = editor ? editor.innerText : '';

  var count = text.split('\n').length - 1;
  console.log("count:", count);

  console.log(linesDiv.childNodes);

  if(count == 0) {
    linesDiv.innerHTML = "<span>1</span>";
    return;
  }

  if (linesDiv.childNodes.length > count) {
    // remove last child
    while (linesDiv.childNodes.length != count) {
      var lastLine = linesDiv.lastChild;
      linesDiv.removeChild(lastLine);
    }
  } else if (linesDiv.childNodes.length < count) {
    // increment the child

    while (linesDiv.childNodes.length != count) {
      var lastLine = linesDiv.lastChild?.textContent ?? 0;
      var lineNumberNode = document.createTextNode(
        (parseInt(lastLine!) + 1).toString()
      );
      const p = document.createElement('div');
      p.appendChild(lineNumberNode);
      linesDiv.appendChild(p);
      linesDiv.removeChild(p.ATTRIBUTE_NODE);
    }
  }
}
