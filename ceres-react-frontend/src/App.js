import Navbar from './components/navbar/Navbar';
import Alert from './components/utils/Alert';
import './App.css';

function App() {

  return (
    <div className="container">
      <Alert severity='error'/>
      <Navbar />
    </div>
  );
}

export default App;
