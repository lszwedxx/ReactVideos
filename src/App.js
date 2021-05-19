import React from 'react';
import Main from './components/Main';
import ThemeProvider from './context/ThemeProvider';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Main />
      </ThemeProvider>
    </div>
  );
}

export default App;
