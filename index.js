const refs = {
  daysEl: document.querySelector('[data-value="days"]'),
  hoursEl: document.querySelector('[data-value="hours"]'),
  minsEl: document.querySelector('[data-value="mins"]'),
  secsEl: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ refs, targetDate }) {
    this.refs = refs;
    this.targetDate = targetDate;

    this.updateTimer(this.getTimeComponents());

    setInterval(() => {
      this.updateTimer(this.getTimeComponents());
    }, 1000);
  }

  getTimeComponents() {
    const time = this.targetDate - Date.now();

    /*
     * Дні, що залишилися: ділимо значення UTC на 1000 * 60 * 60 * 24, кількість
     * мілісекунд в один день (мілісекунди * секунди * хвилини * години)
     */
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    /*
     * Решта годин: отримуємо залишок від попереднього розрахунку за допомогою оператора
     * залишку% і ділимо його на кількість мілісекунд в одній годині
     * (1000 * 60 * 60 = мілісекунди * хвилини * секунди)
     */
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );

    /*
     * Решта хвилин: отримуємо хвилини, що залишилися і ділимо їх на кількість
     * мілісекунд в одній хвилині (1000 * 60 = мілісекунди * секунди)
     */
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

    /*
     * Решта секунд: отримуємо секунди, які залишилися і ділимо їх на кількість
     * миллисекунд в одной секунде (1000)
     */
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  updateTimer({ days, hours, mins, secs }) {
    this.refs.daysEl.textContent = days;
    this.refs.hoursEl.textContent = hours;
    this.refs.minsEl.textContent = mins;
    this.refs.secsEl.textContent = secs;
  }
}

const countdownTimer = new CountdownTimer({
  refs: refs,
  targetDate: new Date(2020, 12, 12, 12, 12, 12, 12),
});
