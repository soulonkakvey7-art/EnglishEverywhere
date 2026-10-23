class AudioHelper {
  private isMuted: boolean = false;
  private audioCtx: AudioContext | null = null;
  private bgmAudio: HTMLAudioElement | null = null;
  private bgmSrc: string = '/test-bgm.mp3';
  private isSessionActive: boolean = false;
  private playPromise: Promise<void> | null = null;
  private unlockListenerAttached: boolean = false;

  constructor() {
    try {
      const savedMute = localStorage.getItem('english_everywhere_audio_muted');
      this.isMuted = savedMute === 'true';
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

  private initBgmAudio(): HTMLAudioElement | null {
    if (typeof window === 'undefined') return null;
    if (!this.bgmAudio) {
      try {
        this.bgmAudio = new Audio(this.bgmSrc);
        this.bgmAudio.loop = true;
        this.bgmAudio.volume = 0.35;
        this.bgmAudio.preload = 'auto';
        this.bgmAudio.muted = this.isMuted;
      } catch (err) {
        console.warn('Could not initialize background audio:', err);
        return null;
      }
    }
    return this.bgmAudio;
  }

  private attachAutoplayUnlock() {
    if (this.unlockListenerAttached || typeof window === 'undefined') return;
    this.unlockListenerAttached = true;

    const unlock = () => {
      if (this.isSessionActive && !this.isMuted && this.bgmAudio) {
        this.bgmAudio.play().catch(() => {});
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }
      window.removeEventListener('click', unlock);
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('keydown', unlock);
      this.unlockListenerAttached = false;
    };

    window.addEventListener('click', unlock, { once: true, passive: true });
    window.addEventListener('pointerdown', unlock, { once: true, passive: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    window.addEventListener('keydown', unlock, { once: true, passive: true });
  }

  public playBGM() {
    this.isSessionActive = true;
    const audio = this.initBgmAudio();
    if (!audio) return;

    audio.loop = true;
    audio.muted = this.isMuted;

    if (this.isMuted) return;

    this.playPromise = audio.play();
    if (this.playPromise !== undefined) {
      this.playPromise.catch((err: any) => {
        // Autoplay policies may prevent immediate playback before user gesture
        console.warn('BGM playback deferred until user interaction:', err);
        this.attachAutoplayUnlock();
      });
    }
  }

  public stopBGM() {
    this.isSessionActive = false;
    if (this.bgmAudio) {
      if (this.playPromise) {
        this.playPromise
          .then(() => {
            if (!this.isSessionActive && this.bgmAudio) {
              this.bgmAudio.pause();
              this.bgmAudio.currentTime = 0;
            }
          })
          .catch(() => {
            if (this.bgmAudio) {
              this.bgmAudio.pause();
              this.bgmAudio.currentTime = 0;
            }
          });
      } else {
        try {
          this.bgmAudio.pause();
          this.bgmAudio.currentTime = 0;
        } catch (err) {
          console.warn('Error stopping BGM:', err);
        }
      }
    }
  }

  public pauseBGM() {
    if (this.bgmAudio) {
      if (this.playPromise) {
        this.playPromise
          .then(() => {
            if (this.bgmAudio) this.bgmAudio.pause();
          })
          .catch(() => {
            if (this.bgmAudio) this.bgmAudio.pause();
          });
      } else {
        try {
          this.bgmAudio.pause();
        } catch (err) {
          console.warn('Error pausing BGM:', err);
        }
      }
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    try {
      localStorage.setItem('english_everywhere_audio_muted', String(muted));
    } catch {}

    if (this.bgmAudio) {
      this.bgmAudio.muted = muted;
    }

    if (muted) {
      if (this.bgmAudio) {
        if (this.playPromise) {
          this.playPromise
            .then(() => {
              if (this.isMuted && this.bgmAudio) {
                this.bgmAudio.pause();
              }
            })
            .catch(() => {});
        } else {
          try {
            this.bgmAudio.pause();
          } catch {}
        }
      }
    } else {
      if (this.isSessionActive) {
        const audio = this.initBgmAudio();
        if (audio) {
          audio.muted = false;
          this.playPromise = audio.play();
          if (this.playPromise !== undefined) {
            this.playPromise.catch(err => {
              console.warn('BGM resume prevented:', err);
              this.attachAutoplayUnlock();
            });
          }
        }
      }
    }
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
