import './App.css';
import { Board } from './components/Board';
import { Controls } from './components/Controls';
import { Header } from './components/Header';
import { SettingsProvider } from './context/settings';
import { StatusProvider } from './context/status';

export const App = () => {
  return (
    <>
      <Header />
      <SettingsProvider>
        <StatusProvider>
          <Controls />
          <Board />
        </StatusProvider>
      </SettingsProvider>
    </>
  );
};

export default App;
