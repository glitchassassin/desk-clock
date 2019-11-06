import React from 'react';
import moment from 'moment';

import styles from './WorkTimer.module.css';

class WorkTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: '00',
            minutes: '00',
            timerState: 'paused', // paused, running
            timer: null
        };

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
                minutes: '00',
                seconds: '00'
            })
        } else {
            this.setState({
                timerState: 'running',
                timer: moment().add(10, 'hour').add(30, 'minute')
            })
        }
    }

    tick() {
        if (this.state.timerState !== 'paused') {
            let diff = -moment().diff(this.state.timer);
            if (diff <= 0) {
                this.setState({
                    timerState: 'paused',
                    timer: null,
                    hours: '00',
                    minutes: '00'
                });
                return;
            }
            let timer = moment.utc(moment.duration(diff).asMilliseconds());
            this.setState({
                hours: timer.format('hh'),
                minutes: timer.format('mm')
            })
        } else {
            this.setState({
                hours: '10',
                minutes: '30'
            })
        }
    }

    render() {
        let labelClasses = styles.label + ' ' + (styles[this.state.timerState])
        return (
            <div className={styles.WorkTimer} onClick={this.toggleTimer} augmented-ui="tl-clip exe">
                <div className={labelClasses}>
                    Start Work
                </div>
                <div className={styles.countdown}>
                    <div className={styles.hours}>{this.state.hours}</div>
                    <div className={styles.minutes}>{this.state.minutes}</div>
                </div>
            </div>
        )
    }
}

export default WorkTimer;
