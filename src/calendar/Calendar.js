import React from 'react';
import moment from 'moment';

import styles from './Calendar.module.css';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        let now = moment();
        this.state = {
            dayOfWeek: now.format('ddd'),
            monthName: now.format('MMM'),
            month: now.format('MM'),
            day: now.format('DD'),
            year: now.format('YYYY')
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
            dayOfWeek: now.format('ddd'),
            monthName: now.format('MMM'),
            month: now.format('MM'),
            day: now.format('DD'),
            year: now.format('YYYY')
        })
    }

    render() {
        return (
            <div className={styles.Calendar}>
                <span className={styles.dayOfWeek}>{this.state.dayOfWeek}</span>
                <span className={styles.monthName}>{this.state.monthName}</span>
                <span className={styles.month}>{this.state.month}</span>
                <span className={styles.day}>{this.state.day}</span>
                <span className={styles.year}>{this.state.year}</span>
            </div>
        )
    }
}

export default Calendar;
