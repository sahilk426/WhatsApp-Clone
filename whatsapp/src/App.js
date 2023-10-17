import { useContext } from 'react';
import './App.css';
import Chat from './components/Chat';
import LoginWindow from './components/LoginWindow';
import SideBar from './components/SideBar';
import { AppContext } from './context/AppContext';

function App() {
  const {account} = useContext(AppContext);
  return (
    <div className="App">
      {
        !account 
        ? 
          <LoginWindow/>
        :
        <div className='app_body'>
          <SideBar/>
          <Chat/>
        </div>
      }
      </div>
  );
}

export default App;
