function updateTime() {
    let currentTime = new Date();
    // console.log(currentTime);
    let currentHours = currentTime.getHours();
    let ampm = (currentHours < 12)  ? 'AM' : 'PM';
    currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
    document.querySelector("#hours").textContent = currentHours.toString().padStart(2, '0');
    document.querySelector("#minutes").textContent = currentTime.getMinutes().toString().padStart(2, '0');
    document.querySelector("#seconds").textContent = currentTime.getSeconds().toString().padStart(2, '0');
    document.querySelector("#ampm").textContent = ampm;

    document.querySelector("#day_of_week").textContent = new Intl.DateTimeFormat('en-US', {weekday: 'short'}).format(currentTime);
    document.querySelector("#month_name").textContent = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(currentTime);
    document.querySelector("#month").textContent = (currentTime.getMonth()+1).toString().padStart(2, '0');
    document.querySelector("#day").textContent = currentTime.getDate().toString().padStart(2, '0');
    document.querySelector("#year").textContent = currentTime.getFullYear().toString().padStart(2, '0');
}
