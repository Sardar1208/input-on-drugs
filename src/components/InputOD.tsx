import * as React from 'react';
import '../index.css';
import { updateCode } from '../utility';

interface InputODProps {
  onChangeOD: (input: string) => string;
  textStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  initialText?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export const InputOD = ({
  onChangeOD,
  textStyle,
  inputStyle,
  onFocus,
  onBlur,
  initialText = " ",
}: InputODProps) => {
  const editorRef = React.useRef<any>(null);
  const [code] = React.useState(initialText);

  React.useEffect(() => {
    editorRef.current.innerHTML = onChangeOD(initialText);
  }, [])

  return (
    <div
      style={{
        ...inputStyle,
      }}
    >
      <pre style={{ margin: 0, padding: 0 }}>
        <code
          ref={editorRef}
          id="main_input"
          style={{
            outline: 'none',
            fontSize: "16px",
            ...textStyle,
          }}
          contentEditable="true"
          content={code}
          onInput={() => {
            updateCode(onChangeOD, editorRef);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {code}
        </code>
      </pre>
    </div>
  );
};

//  TODO - add placeholder emulation
//  TODO - multiline emulation
//  TODO - way to pass state of current text from outside
//  TODO - check how it behaves with form and formik

// cursor styles ???
// Add some custom styles premade and give props to use it
// look into how I can take control of a text processor, just like prism but custom

// API #1 :
// take a conifg object with strings to watch for and highlight
// const config = {
//   "sarthak": {
//     color: "red",
//     textFormatting: "underline",
//   }
// }

// API #2 :
// take an array of strings and add them as a trigger
// a onTrigger function will be exposed which will have the specific trigger as a parameter for the user
// triggerTexts = ["sarthak", "hello"]
// onTrigger = (trigger) {
//  do what you want
// }
// Use case: We can add the trigger for "/" or ":" to display tag list or emoji list
