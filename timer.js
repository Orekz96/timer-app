class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    // const { durationInput, startButton, pauseButton } = this;
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      //to make callbacks optional
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick(); //to immediately run the tick/click once the user clicks, not waiting for a second
    this.interval = setInterval(this.tick, 20);
  };

  pause = () => {
    clearInterval(this.interval); //to stop an interval
  };

  tick = () => {
    // this.timeRemaining <= 0
    //   ? this.pause()
    //   : (this.timeRemaining = this.timeRemaining - 1);
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.02;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
