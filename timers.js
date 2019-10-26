class Timer {
    /**
     * The id is used to save the timer to LocalStorage in case the browser gets refreshed
     * If a new Timer is created, it checks to see if an existing countdown is stored with
     * the same ID. If so, it resumes from there.
     *
     * @param id
     * @param hoursElement
     * @param minutesElement
     * @param secondsElement
     * @param callback
     */
    constructor(id, hoursElement, minutesElement, secondsElement, callback) {
        this.duration = null;
        this.targetTime = null;
        this.hoursElement = hoursElement;
        this.minutesElement = minutesElement;
        this.secondsElement = secondsElement;
        this.storageId = id;
        this.callback = callback;

        let existing = localStorage.getItem(this.storageId);
        if (existing) {
            this.countdown((parseInt(existing) - Date.now())/1000);
        }
        this.updateInterval = setInterval(() => (this.update()), 500);
    }

    /**
     * Starts a countdown
     * @param timeRemaining (in seconds)
     */
    countdown(timeRemaining) {
        console.log('starting', this.storageId);
        this.duration = timeRemaining*1000;
        this.targetTime = Date.now() + this.duration;
        localStorage.setItem(this.storageId, this.targetTime);
        setTimeout(() => (this.done()), this.duration);
        this.update();
        console.log(this);
    }

    update() {
        if (!this.targetTime) { return; }
        console.log('updating', this.storageId);
        let difference = this.targetTime - Date.now();
        let hours = Math.floor(difference / 3600 / 1000);
        let minutes = Math.floor((difference - hours * 3600 * 1000) / (60 * 1000));
        let seconds = Math.floor((difference - hours * 3600 * 1000 - minutes * 60 * 1000) / 1000);

        try {
            if (this.hoursElement) {
                document.querySelector(this.hoursElement).textContent = hours.toString().padStart(2, '0');
            }
            if (this.minutesElement) {
                document.querySelector(this.minutesElement).textContent = minutes.toString().padStart(2, '0');
            }
            if (this.secondsElement) {
                document.querySelector(this.secondsElement).textContent = seconds.toString().padStart(2, '0');
            }
        } catch {
            console.log('Caught error')
        }
        console.log(this);
    }

    progress() {
        return (this.targetTime - Date.now()) / this.duration;
    }

    done() {
        console.log('ending', this.storageId);
        localStorage.removeItem(this.storageId);
        // clearInterval(this.updateInterval);
        this.targetTime = null;
        this.callback();
        console.log(this);
    }
}

class WorkTimer {

    constructor() {
        this.started = false;
        document.querySelector('#startwork').addEventListener('click', () => {
            this.clicked();
        });
        this.timer = new Timer('WorkTimer', '#startwork_hours', '#startwork_minutes', '', () => {
            // Timer finished
            document.querySelector('#label').style.display = 'block';
        });
        if (localStorage.getItem('WorkTimer')) {
            document.querySelector('#label').style.display = 'none';
        }
    }

    clicked() {
        if (!this.started) {
            this.started = true;
            document.querySelector('#label').style.display = 'none';
            this.timer.countdown(10*60*60);
        } else {
            this.started = false;
            document.querySelector('#label').style.display = 'block';
            this.timer.done();
        }
    }
}

class PomodoroTimer {
    constructor() {
        this.started = false;
        document.querySelector('#pomodoro').addEventListener('click', () => {
            this.clicked();
        });
        this.activeTimer = new Timer('PomodoroTimerActive', '', '#pomodoro_minutes', '#pomodoro_seconds', () => {
            // Active timer finished, start rest timer
            document.querySelector('#pomodoro').classList.remove('active');
            document.querySelector('#pomodoro').classList.add('rest');
            this.restTimer.countdown(5*60);
        });
        this.restTimer = new Timer('PomodoroTimerRest', '', '#pomodoro_minutes', '#pomodoro_seconds', () => {
            // Rest timer finished
            document.querySelector('#pomodoro').classList.remove('rest');
            document.querySelector('#pomodoro_minutes').textContent = '25';
            document.querySelector('#pomodoro_seconds').textContent = '00';
            this.started = false;
        });
        if (localStorage.getItem('PomodoroTimerActive')) {
            this.started = true;
            document.querySelector('#pomodoro').classList.add('active');
        }
        if (localStorage.getItem('PomodoroTimerRest')) {
            this.started = true;
            document.querySelector('#pomodoro').classList.add('rest');
        }
    }

    clicked() {
        if (!this.started) {
            this.started = true;
            document.querySelector('#pomodoro').classList.add('active');
            this.activeTimer.countdown(25*60);
        } else {
            this.activeTimer.done();
            this.restTimer.done();
            this.started = false;
            document.querySelector('#pomodoro').classList.remove('active');
            document.querySelector('#pomodoro').classList.remove('rest');
            document.querySelector('#pomodoro_minutes').textContent = '25';
            document.querySelector('#pomodoro_seconds').textContent = '00';
        }
    }
}
