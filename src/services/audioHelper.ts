// Audio helper using the standard Web Audio API for highly reliable,
// zero-latency, CORS-free, and offline-compatible sound effects and ambient BGM.

class AudioHelper {
  private isMuted: boolean = false;
  private audioCtx: AudioContext | null = null;
  private isBgmPlaying: boolean = false;
  private bgmIntervalId: any = null;
  private activeBgmNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
  private currentChordIdx: number = 0;

  // Lush, calm seventh and ninth chords for a beautiful, relaxing zen-like background pad
  private chords: number[][] = [
    // Chord 1: Cmaj9 (C3, G3, B3, D4, E4)
    [130.81, 196.00, 246.94, 293.66, 329.63],
    // Chord 2: Fmaj9 (F2, C3, A3, C4, E4)
    [87.31, 130.81, 220.00, 261.63, 329.63],
    // Chord 3: Am9 (A2, E3, C4, G4, B4)
    [110.00, 164.81, 261.63, 392.00, 493.88],
    // Chord 4: G6/9 (G2, D3, B3, E4, A4)
    [98.00, 146.83, 246.94, 329.63, 440.00]
  ];

  constructor() {
    try {
      const saved = localStorage.getItem('english_everywhere_audio_muted');
      this.isMuted = saved === 'true';
    } catch {
      this.isMuted = false;
    }
  }

  private initAudioContext() {
    if (typeof window === 'undefined') return;
    if (!this.audioCtx) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        this.audioCtx = new AudioContextClass();
      } catch (err) {
        console.error('Web Audio API is not supported in this browser:', err);
      }
    }
    
    // Resume context if suspended (common in browsers due to autoplay policies)
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(err => {
        console.warn('Could not resume AudioContext automatically:', err);
      });
    }
  }

  public playBGM() {
    this.isBgmPlaying = true;
    this.initAudioContext();

    if (this.isMuted) return;

    // If already looping, don't start multiple loops
    if (this.bgmIntervalId) return;

    // Play the first chord immediately
    this.triggerNextBgmChord();

    // Trigger a new chord every 5.5 seconds (overlapping slightly for a seamless ambient pad)
    this.bgmIntervalId = setInterval(() => {
      this.triggerNextBgmChord();
    }, 5500);
  }

  private triggerNextBgmChord() {
    if (!this.isBgmPlaying || this.isMuted) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const notes = this.chords[this.currentChordIdx];
    this.currentChordIdx = (this.currentChordIdx + 1) % this.chords.length;

    const currentChordNodes: { osc: OscillatorNode; gain: GainNode }[] = [];

    notes.forEach((freq, idx) => {
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      // We're using sine waves for a pure, flute-like peaceful tone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Add a slight detune to give the pad a rich, warm, organic chorus effect
      osc.detune.setValueAtTime((idx % 2 === 0 ? 5 : -5), now);

      // Beautiful long fade-in and slow fade-out envelope:
      // Overlap notes smoothly to create a dense, cinematic texture
      gain.gain.setValueAtTime(0, now);
      // Fade in over 2.5 seconds
      gain.gain.linearRampToValueAtTime(0.015, now + 2.5); // extremely soft volume to sit nicely in the background
      // Maintain volume
      gain.gain.setValueAtTime(0.015, now + 4.0);
      // Fade out slowly over 2.5 seconds
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 6.5);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 7.0);

      currentChordNodes.push({ osc, gain });
    });

    this.activeBgmNodes.push(...currentChordNodes);

    // Housekeeping: remove old nodes from tracking after they stop playing
    setTimeout(() => {
      this.activeBgmNodes = this.activeBgmNodes.filter(node => !currentChordNodes.includes(node));
    }, 7500);
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmIntervalId) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }

    // Stop and disconnect all active BGM voices immediately
    this.activeBgmNodes.forEach(({ osc, gain }) => {
      try {
        osc.stop();
        osc.disconnect();
        gain.disconnect();
      } catch {}
    });
    this.activeBgmNodes = [];
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    try {
      localStorage.setItem('english_everywhere_audio_muted', String(muted));
    } catch {}

    if (muted) {
      // Fade out background voices and stop interval
      this.stopBgmIntervalOnly();
    } else {
      // Resume background music if practice is ongoing
      if (this.isBgmPlaying) {
        this.playBGM();
      }
    }
  }

  private stopBgmIntervalOnly() {
    if (this.bgmIntervalId) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
    this.activeBgmNodes.forEach(({ osc, gain }) => {
      try {
        osc.stop();
        osc.disconnect();
        gain.disconnect();
      } catch {}
    });
    this.activeBgmNodes = [];
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playCorrect() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      // Elegant ascending C-major arpeggio: C5 (523.25Hz), E5 (659.25Hz), G5 (783.99Hz), C6 (1046.50Hz)
      const notes = [523.25, 659.25, 783.99, 1046.50];
      const step = 0.07; // rapid sequence

      notes.forEach((freq, idx) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        // High quality bright triangle wave blended with soft sine for chime sweetness
        osc.type = idx === 3 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * step);

        const noteStart = now + idx * step;
        gain.gain.setValueAtTime(0, noteStart);
        gain.gain.linearRampToValueAtTime(0.08, noteStart + 0.02); // gentle crisp attack
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.4); // soft decay ring

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.5);
      });
    } catch (e) {
      console.error('Error playing correct chime:', e);
    }
  }

  public playIncorrect() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      // Soft, detuned buzzer: Two overlapping sawtooth/triangle waves at a low frequency
      // with a quick filter sweep downwards
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const filter = this.audioCtx.createBiquadFilter();
      const gain = this.audioCtx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(140, now); // Low Eb/D pitch
      osc2.frequency.setValueAtTime(136, now); // Detuned by 4Hz for a fat, buzzy tone

      // Pitch glide down
      osc1.frequency.exponentialRampToValueAtTime(90, now + 0.3);
      osc2.frequency.exponentialRampToValueAtTime(87, now + 0.3);

      // Lowpass filter sweep to take off harsh high frequencies
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);
      filter.frequency.exponentialRampToValueAtTime(120, now + 0.3);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.03); // rapid fade-in
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35); // fast decay

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.4);
      osc2.stop(now + 0.4);
    } catch (e) {
      console.error('Error playing incorrect buzzer:', e);
    }
  }
}

export const audioHelper = new AudioHelper();
