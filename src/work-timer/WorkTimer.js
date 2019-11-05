import React from 'react';
import moment from 'moment';

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
                minutes: '25',
                seconds: '00'
            })
        }
    }

    render() {
        return (
            <div onClick={this.toggleTimer}>
                <div className="label">
                    Start Work
                </div>
                <div className="countdown">
                    <div className="hours">{this.state.hours}</div>
                    <div className="minutes">{this.state.minutes}</div>
                </div>
            </div>
        )
    }
}

export default WorkTimer;
