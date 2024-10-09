import './App.css';
import Advertisement from '../src/advertisements/Advertisement.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="indexTitle">Job Board</h1>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <Advertisement/>
      </header>
    </div>
  );
}

export default App;
