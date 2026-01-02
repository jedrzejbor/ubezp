import reactLogo from '@/assets/react.svg';
import '@/styles/app.css';

function App() {
  return (
    <div className="app">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + TS</h1>
      <p className="subtitle">
        Projekt startowy z ESLint, Prettier, husky, lint-staged oraz aliasami ścieżek.
      </p>
      <p className="read-the-docs">
        Edytuj <code>src/App.tsx</code> i zacznij tworzyć aplikację.
      </p>
    </div>
  );
}

export default App;
