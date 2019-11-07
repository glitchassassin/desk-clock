import React from 'react';
import './App.css';
import 'augmented-ui/augmented.css'
import Backdrop from './backdrop/Backdrop';
import Clock from "./clock/Clock";
import Calendar from './calendar/Calendar';
import PomodoroTimer from "./pomodoro-timer/PomodoroTimer";
import WorkTimer from "./work-timer/WorkTimer";
import NoSleepJs from 'nosleep.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.noSleep = new NoSleepJs();
    }

    noSleepEnable = () => {
        this.noSleep.disable();
        this.noSleep.enable();
    }

    render() {
        return (
            <div className="App" onClick={this.noSleepEnable}>
                <Backdrop/>
                <Clock/>
                <Calendar/>
                <PomodoroTimer/>
                <WorkTimer/>
            </div>
        );
    }
}

export default App;
