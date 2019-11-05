import React from 'react';
import moment from 'moment';

import styles from './Clock.module.css';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        let now = moment();
        this.state = {
            hours: now.format('hh'),
            minutes: now.format('mm'),
            seconds: now.format('ss'),
            ampm: now.format('a'),
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        )
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        let now = moment();
        this.setState({
            hours: now.format('hh'),
            minutes: now.format('mm'),
            seconds: now.format('ss'),
            ampm: now.format('a'),
        })
    }

    render() {
        return (
            <div className={styles.Clock}>
                <span className={styles.hours}>{this.state.hours}</span>
                <span className={styles.minutes}>{this.state.minutes}</span>
                <span className={styles.seconds}>{this.state.seconds}</span>
                <span className={styles.ampm}>{this.state.ampm}</span>
            </div>
        );
    }
}

export default Clock;
