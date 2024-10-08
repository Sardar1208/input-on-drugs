import * as React from 'react';
import { InputOD } from '../../src';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import { manageNumofLines } from '../utility/utility';

const CodeEditorExample = () => {

  const linesRef = React.useRef<any>(null);

  const styles = {
    input: {
      fontSize: '16px',
      color: 'white',
    },
  };

  return (
    <div style={{display: "flex", backgroundColor: "black", alignItems: "center", padding: "15px", gap: "10px"}}>
      <div style={{color: "white", fontSize: "16px"}} id="lines" ref={linesRef}>
        <span style={{fontSize: "15px"}}>1</span>
      </div>
      <InputOD
        onChangeOD={text => {
          var html = Prism.highlight(
            text,
            Prism.languages.javascript,
            'javascript'
          );

          manageNumofLines(linesRef);

          return html;
        }}
        initialText='// Write your JavaScript here'
        inputStyle={styles.input}
      />
    </div>
  );
};

export default CodeEditorExample;
