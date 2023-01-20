import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Main from './pages/Main';
import Login from './pages/Login';
import ExpansionConcert from './pages/ExpansionConcert';

function App() {

  return (
    <Router>
      
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/inicio' element={<Main />} />
        <Route path='/concierto' element={<ExpansionConcert />} />
      </Routes>
    </Router>
  );
}

export default App;
