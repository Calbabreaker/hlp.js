import { UniqueIDGen } from "../utils/unique_id_gen";

// this is a synth to create simple sounds
// this runs in threads so that multiple sounds can be created
// the thread is a index in the player instead of an onject so not instanciating performance issues

export class AudioSynth {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext == null) return alert("Your browser does not support the AudioContext!");
    this.context = new AudioContext();
    this.threads = {};
    this.uniqueIdGen = new UniqueIDGen();
  }

  play(thread, freq, vol, wave) {
    if (freq != null) this.setFreq(thread, freq);
    if (wave != null) this.setWaveType(thread, wave);
    if (vol != null) this.setVolume(thread, vol);

    const selThread = this.threads[thread];
    selThread.oscillator.start(selThread.startTime);
    return this;
  }

  stop(thread, when = 0, useExpRamp = false) {
    const selThread = this.threads[thread];
    if (useExpRamp) this.setVolume(thread, 0.00001, this.context.currentTime + when, true);

    selThread.oscillator.stop(this.context.currentTime + when);
    return this;
  }

  dispose(thread) {
    delete this.threads[thread];
    return this;
  }

  newThread(filter = this.context.destination) {
    const selThread = {};
    this.context.resume();

    // basic setup of oscillator
    selThread.gain = this.context.createGain();
    selThread.gain.connect(filter);
    selThread.oscillator = this.context.createOscillator();
    selThread.oscillator.connect(selThread.gain);
    selThread.compressor = this.context.createDynamicsCompressor();
    selThread.compressor.connect(this.context.destination);

    const id = this.uniqueIdGen.gen();
    this.threads[id] = selThread;
    return id;
  }

  setWaveType(thread, wave) {
    this.threads[thread].oscillator.type = wave;
    return this;
  }

  setFreq(thread, freq, when = 0) {
    const selThread = this.threads[thread];
    const timeNow = this.context.currentTime;
    selThread.oscillator.frequency.setTargetAtTime(freq, timeNow + when, 0);
    return this;
  }

  setVolume(thread, vol, when = 0, useExpRamp = false) {
    const selThread = this.threads[thread];
    const timeNow = this.context.currentTime;

    if (useExpRamp) {
      selThread.gain.gain.setValueAtTime(selThread.gain.gain.value, this.context.currentTime); // reset the gain
      selThread.gain.gain.exponentialRampToValueAtTime(vol, timeNow + when);
    } else {
      selThread.gain.gain.value = vol;
    }

    return this;
  }
}
