import React, {useEffect, useState} from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Content from './components/Content'
import LoginPage from './components/LoginPage'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const [currentAction, setCurrentAction] = useState<string>();

  useEffect(()=>{
    setCurrentAction('main')
  }, [])

  const changeActionByChild = (newAction: string) => {
    setCurrentAction(newAction);
  }

  return (
    <div className="App">
      <Navbar currentAction={currentAction ? currentAction : ''} setCurrentAction = {changeActionByChild} />

      <BrowserRouter>
        <Routes key={'Routes'}>
          <Route key={'main_route'} path="/" element={<Content />} />
          <Route key={'login_rote'} path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
