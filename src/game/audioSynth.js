hlp.AudioSynth = class {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.reset();
  }

  play(freq, vol, wave, when = 0) {
    if (!this.hasResseted) throw new Error("Make sure you reset the AudioPlayer before playing!");

    if (freq != null) this.setFreq(freq);
    if (wave != null) this.setWaveType(wave);
    if (vol != null) this.setVolume(vol);
    this.oscillator.start(when);

    this.hasResseted = false;
    return this;
  }

  stop(when = 0, useExpRamp = false) {
    if (useExpRamp) {
      this.gain.gain.setValueAtTime(this.gain.gain.value, this.context.currentTime);
      this.gain.gain.exponentialRampToValueAtTime(0.00001, this.context.currentTime + when);
    }

    this.oscillator.stop(this.context.currentTime + when);
    return this;
  }

  reset(filter = this.context.destination) {
    this.gain = this.context.createGain();
    this.gain.connect(filter);
    this.oscillator = this.context.createOscillator();
    this.oscillator.connect(this.gain);
    this.compressor = this.context.createDynamicsCompressor();
    this.compressor.connect(this.context.destination);
    this.hasResseted = true;
    return this;
  }

  setWaveType(wave) {
    this.oscillator.type = wave;
    return this;
  }

  setFreq(freq) {
    this.oscillator.frequency.value = freq;
    return this;
  }

  setVolume(vol) {
    this.gain.gain.value = vol;
    return this;
  }
};
