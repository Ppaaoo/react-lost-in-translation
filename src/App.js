import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './views/Login';
import Profile from './views/Profile';
import NavBar from './components/NavBar/NavBar';
import Translate from './views/Translate';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={ <Login />} />
          <Route path="/profile" element={ <Profile />} />
          <Route path='/translate' element={<Translate />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;