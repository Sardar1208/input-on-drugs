function getCursorPosition() {
  let editor = document.getElementById('main_input');

  // Get the cursor position before doing any changes
  var currentPosition;
  var selection = window.getSelection();

  // loops through all the nodes backwards starting from the current node that cursor is on
  // to the first node and calculate the total offset of the cursor pointer
  if (selection!.rangeCount > 0) {
    var range = selection!.getRangeAt(0);
    var startOffset = range.startOffset;
    var totalOffset = startOffset;

    var mainNode: any = range.startContainer;
    // TODO - make a root node and do parentElement.previousSibling utill it is a direct child of the rootNode
    while (mainNode.parentElement != editor) {
      mainNode = mainNode.parentElement;
    }
    mainNode = mainNode.previousSibling;
    while (mainNode != null) {
      if (mainNode.nodeType === Node.TEXT_NODE) {
        totalOffset += mainNode.nodeValue!.length;
      } else {
        totalOffset += mainNode.innerText.length;
      }
      mainNode = mainNode.previousSibling;
    }
    currentPosition = totalOffset;
  }

  return currentPosition;
}

interface HighlightOptions {
  style?: string;
  onlyHighlightIndependentWord?: boolean; // Option to highlight as an independent word or part of another word
}

export function highlightWords(
  text: string,
  wordsToHighlight: string[],
  options?: HighlightOptions
): string {
  const { style = '', onlyHighlightIndependentWord = true } = options || {};

  // Escape special characters in words
  const escapedWords = wordsToHighlight.map(word =>
    word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );

  // If only highlighting independent words, use word boundaries (\b)
  const regexPattern = onlyHighlightIndependentWord
    ? `\\b(${escapedWords.join('|')})\\b` // Word boundary based matching
    : `(${escapedWords.join('|')})`; // Match anywhere in the text

  // Create the regex from the pattern
  const regex = new RegExp(regexPattern, 'gi');

  // Wrap matched words with <span> and apply inline styles if provided
  return text.replace(regex, match => {
    const styleAttr = style ? ` style="${style}"` : '';
    return `<span${styleAttr}>${match}</span>`;
  });
}

function sanitizeToSpanOnly(html: string): string {
  // Create a temporary div element to manipulate the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Select all elements that are not <span> and replace them with their inner content
  const elements = tempDiv.querySelectorAll('*:not(span)');

  elements.forEach(element => {
    element.replaceWith(...Array.from(element.childNodes));
  });

  // Return the updated HTML content
  return tempDiv.innerHTML;
}

export function updateCode(
  onChangeOD: (input: string) => string,
  editorRef: React.MutableRefObject<any>
) {
  let editor = document.getElementById('main_input');
  let text = editor ? editor.innerText : '';

  if (editor != null && text.length <= 0) {
    // editor.innerHTML = "<span style={{color: 'grey'}}>Enter something<span>";
    editor.innerHTML = '&nbsp;';
    const range = document.createRange();
    const selection = window.getSelection();

    // Set the range at the end of the contentEditable element
    range.selectNodeContents(editor);
    range.collapse(false);

    // Clear any current selections and set the range
    selection?.removeAllRanges();
    selection?.addRange(range);
    return;
  }

  let currentPosition = getCursorPosition();

  if (currentPosition != null) {
    // Inject the new highlighted code
    if (editor != null) {
      let html = onChangeOD(text);
      editor.innerHTML = sanitizeToSpanOnly(html);
    }

    var childNodes = editorRef.current.childNodes;
    var count = 0; // Maintaines the the offset for the new cursor position
    var totalCount = 0; // total count of the index while looping thorough the nodes
    var currentNode = null;

    // Loop through all child nodes and find the current node that the cursor was on.
    // find the offset that tell exactly which position the cursor was on in the current node
    for (var node of childNodes) {
      // nodeType = 3 means its a text node
      if (node.nodeType == 3) {
        totalCount += node.length;
        if (count + node.length < currentPosition) {
          count += node.length;
        }
        // nodeType = 1 means its a span node
      } else if (node.nodeType == 1) {
        if (count + node.innerText.length < currentPosition) {
          count += node.innerText.length;
        }
        totalCount += node.innerText.length;
      }

      currentNode = node;

      if (totalCount >= currentPosition) {
        break;
      }
    }

    // Restore the cursor position
    const selection = window.getSelection();
    const range = document.createRange();
    // TODO - optimize this
    try {
      // in case its a span node, keep doing currentNode.firstChild until you get the text node
      while (currentNode.nodeType != 3) {
        currentNode = currentNode.firstChild;
      }
      // set the cursor position of the text node
      range.setStart(currentNode, currentPosition - count);
    } catch (e) {
      console.log('error is : ', e);
      // set cursor position to the end of the currentnode in case of an error
      range.setStartAfter(currentNode);
    }
    range.collapse(true);
    selection!.removeAllRanges();
    selection!.addRange(range);
  }
}
