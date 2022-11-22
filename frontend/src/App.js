import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Main from './pages/Main';
import Login from './pages/Login';

function App() {

  return (
    <Router>
      
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/inicio' element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
