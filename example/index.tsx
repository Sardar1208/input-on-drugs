import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'prismjs/themes/prism.css';
import ValidationExample from './components/validation_example';
import CodeEditorExample from './components/code_editor_example';

// Component A
const ComponentA = () => (
  <div style={componentAStyle}>
    <h2 style={headingAStyle}>Component A</h2>
    <p style={paragraphAStyle}>
      This is the beautifully styled content of Component A.
    </p>
  </div>
);

const componentAStyle = {
  padding: '24px',
  background: 'linear-gradient(to bottom right, #f3e8ff, #ffe4e6)',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
};

const headingAStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '12px',
  color: '#6B21A8',
};

const paragraphAStyle = {
  color: '#7E22CE',
};

// Component B
const ComponentB = () => (
  <div style={componentBStyle}>
    <h2 style={headingBStyle}>Component B</h2>
    <p style={paragraphBStyle}>
      This is the elegantly designed content of Component B.
    </p>
  </div>
);

const componentBStyle = {
  padding: '24px',
  background: 'linear-gradient(to bottom right, #d1fae5, #a7f3d0)',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
};

const headingBStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '12px',
  color: '#065F46',
};

const paragraphBStyle = {
  color: '#10B981',
};

const buttonStyle = active => ({
  padding: '10px 20px',
  borderRadius: '8px',
  border: active ? 'none' : '1px solid #ccc',
  backgroundColor: active ? '#ccc' : 'white',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  display: 'flex',
  alignItems: 'center',
});

const buttonHoverStyle = {
  transform: 'scale(1.05)',
};

const App = () => {
  const [activeComponent, setActiveComponent] = React.useState<
    'A' | 'B' | null
  >(null);

  return (
    <div style={cardStyle}>
      <div style={cardHeaderStyle}>
        <h2 style={cardTitleStyle}>Input-on-drugs example</h2>
      </div>
      <div style={cardContentStyle}>
        <div style={buttonGroupStyle}>
          <button
            onClick={() => setActiveComponent('A')}
            style={buttonStyle(activeComponent === 'A')}
            onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Code Editor Example
          </button>
          <button
            onClick={() => setActiveComponent('B')}
            style={buttonStyle(activeComponent === 'B')}
            onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Email Validation Example
          </button>
        </div>
        <div style={{ marginTop: '24px', transition: 'all 0.3s ease-in-out' }}>
          {activeComponent === 'A' && <CodeEditorExample />}
          {activeComponent === 'B' && <ValidationExample />}
          {activeComponent === null && (
            <p
              style={{
                textAlign: 'center',
                color: '#888',
                fontStyle: 'italic',
              }}
            >
              Click a button above to load a component.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
  borderRadius: '12px',
  boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
}

const cardHeaderStyle = {
  padding: '16px',
  backgroundColor: '#f0f0f0',
  // textAlign: 'center',
}

const cardTitleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: 0,
}

const cardContentStyle = {
  padding: '24px',
}

const buttonGroupStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
}

const iconStyle = {
  marginRight: '8px',
  fontSize: '16px',
}

ReactDOM.render(<App />, document.getElementById('root'));
