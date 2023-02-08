import React, {useEffect, useState} from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Content from './components/Content'
import LoginPage from './components/LoginPage'
import QuizCreate from './components/QuizCreate'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import QuizList from "./components/quizList/QuizList";

function App() {

  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <Routes key={'Routes'}>
          <Route key={'main_route'} path="/" element={<Content />} />
          <Route key={'category'} path="/category/:categoryId" element={<QuizList />} />
          <Route key={'login_rote'} path="/login" element={<LoginPage />} />
          <Route key={'quiz_create_route'} path="/quiz/create" element={<QuizCreate />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
