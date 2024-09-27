import * as React from 'react';
import { highlightWords, InputOD } from '../../src';
import 'prismjs/themes/prism.css';

const ValidationExample = () => {

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

  return (
    <div>
      <div style={{padding: "10px"}}>
        Hint: Try typing out an email with "_" or "|" in it.
      </div>
      <label style={{fontSize: "10px"}}>Email</label>
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
    </div>
  );
};

export default ValidationExample;

