import './App.scss';
import Appbar from './components/Appbar/Appbar';
import Boardbar from './components/Boardbar/Boardbar';
import BoardContent from './components/BoardContent/BoardContent';

function App() {
  return (
    <div className="App">
      <Appbar/>
      <Boardbar/>
      <BoardContent/>
    </div>
  );
}

export default App;
