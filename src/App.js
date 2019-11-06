import React from 'react';
import './App.css';
import 'augmented-ui/augmented.css'
import Backdrop from './backdrop/Backdrop';
import Clock from "./clock/Clock";
import Calendar from './calendar/Calendar';
import PomodoroTimer from "./pomodoro-timer/PomodoroTimer";
import WorkTimer from "./work-timer/WorkTimer";

function App() {
  return (
    <div className="App">
      <Backdrop/>
      <Clock/>
      <Calendar/>
      <PomodoroTimer/>
      <WorkTimer/>
    </div>
  );
}

export default App;
