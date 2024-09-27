# input-on-drugs

An input field that lets you style the text by inserting HTML into it as you wish. All of this happens as you type in real time.

## Installation

```bash
npm install input-on-drugs
```

## Example #1 - JavaScript syntax highlighting

![gif ce](https://github.com/user-attachments/assets/562d6a8c-d929-48cb-8457-c13a285fbb2e)

## Example #2 - Email Validation

![validation gif](https://github.com/user-attachments/assets/9465a416-9cfc-45d9-9850-6437fd311e95)

## Usage

```js
import { InputOD, highlightWords } from 'input-on-drugs';

const styles = {
  input: {
    border: '1px solid #1e90ff',
    borderRadius: '5px',
    padding: '5px 15px',
    fontSize: '16px',
    color: '#333',
    backgroundColor: '#f0f8ff',
    transition: 'all 0.3s ease-in-out',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

<InputOD
  onChangeOD={text => {
    let html = highlightWords(text, ['_', '|'], {
      style: 'color: red; font-weight: bold;',
      onlyHighlightIndependentWord: false,
    });
    return html;
  }}
  inputStyle={styles.input}
/>
```

**InputOD props**

| Prop Name   | Type         | Description                                       |
|-------------|--------------|---------------------------------------------------|
| `onChangeOD` | `function`   | Provides the current text in the input. Return upgraded HTML to style the text|
| `inputStyle?` | `object`     | The styles for the input's outer container                |
| `textStyle?`  | `object`     | The styles for the input's text     |
| `initialText?`| `string`     | Text that is initialy present in the input field |
| `onFocus?`     | `function`     | Triggered when the input is focused               |
| `onBlur?`     | `function`     | Triggered when the input is blurred               |

**Note:**  Currently the ```onChangeOD``` only accepts ```text``` and ```span``` nodes. If you pass any other nodes in the HTML then it will be converted to a ```span``` node.

## Helper Methods

This package also provides some helper functions to help in the text processing stage some common situations: 

```js
highlightText(
  text: string,
  wordsToHighlight: string[],
  options?: HighlightOptions
): 
```
Takes in plain text and returns styled HTML based on the cofiguration provided. 

**HighlightOptions**

| Param name   | Type         | Description                                       |
|-------------|--------------|---------------------------------------------------|
| `style` | `string`   | The styles for the text that is being highlighted |
| `onlyHighlightIndependentWord?` | `boolean`     | if you want to only highlight the word in isolation               |


## Notes from author

This package is currently a work in progress. If you have any suggestions or ideas to expand it, then ping me at - ```sarthak.bakre@gmail.com```

Thank You 😄
