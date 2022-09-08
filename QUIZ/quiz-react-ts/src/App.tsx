import React, {useEffect, useState} from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Content from './components/Content'
import LoginPage from './components/LoginPage'

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

      { currentAction === 'main' ? <Content currentAction={currentAction} setCurrentAction = {changeActionByChild} /> : null }
      { currentAction === 'login' ? <LoginPage currentAction={currentAction} setCurrentAction = {changeActionByChild} /> : null }
      { currentAction === 'main' ? <Content currentAction={currentAction} setCurrentAction = {changeActionByChild} /> : null }

    </div>
  );
}

export default App;
