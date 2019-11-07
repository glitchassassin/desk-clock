import React from 'react';
import moment from 'moment';

import styles from './PomodoroTimer.module.css';

class PomodoroTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: '25',
            seconds: '00',
            timerState: 'paused', // paused, running, resting
            timer: null
        }

        this.toggleTimer = this.toggleTimer.bind(this);
    }

    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(),
            1000
        )
    }
    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    toggleTimer() {
        if (this.state.timerState !== 'paused') {
            this.setState({
                timerState: 'paused',
                minutes: '25',
                seconds: '00'
            })
        } else {
            this.setState({
                timerState: 'running',
                timer: moment().add(25, 'minute')
            })
        }
    }

    tick() {
        if (this.state.timerState !== 'paused') {
            let diff = -moment().diff(this.state.timer);
            if (diff <= 0) {
                if (this.state.timerState === 'running') {
                    this.setState({
                        timerState: 'resting',
                        timer: moment().add(5, 'minute')
                    });
                    diff = moment().diff(this.state.timer);
                } else {
                    this.setState({
                        timerState: 'paused',
                        timer: null,
                        minutes: '25',
                        seconds: '00'
                    });
                    return;
                }
            }
            let timer = moment.utc(moment.duration(diff).asMilliseconds());
            this.setState({
                minutes: timer.format('mm'),
                seconds: timer.format('ss')
            })
        } else {
            this.setState({
                minutes: '25',
                seconds: '00'
            })
        }
    }

    render() {
        return (
            <div className={styles.PomodoroTimer}>
                <div className={styles.spinner + ' ' + styles[this.state.timerState]} onClick={this.toggleTimer}>
                    <svg className={styles.loader} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
                        <circle cx="200" cy="200" r="175" stroke="#ddd"/>
                        <circle cx="200" cy="200" r="160" stroke="#ddd"/>
                        <circle cx="200" cy="200" r="145" stroke="#ddd"/>
                        <circle cx="200" cy="200" r="130" stroke="#ddd"/>
                    </svg>
                </div>
                <div className={styles.countdown}>
                    <div className={styles.minutes}>{this.state.minutes}</div>
                    <div className={styles.seconds}>{this.state.seconds}</div>
                </div>
            </div>
        )
    }
}

export default PomodoroTimer;
