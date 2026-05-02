
/**
 * Programmatic Sound Service for the Brutalist Portfolio
 * Generates short, clean technical sounds using Web Audio API
 */

class SoundService {
  private context: AudioContext | null = null;

  private async init() {
    try {
      if (!this.context) {
        this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (this.context.state === 'suspended') {
        await this.context.resume();
      }
    } catch (e) {
      console.warn('AudioContext initialization failed:', e);
    }
  }

  /**
   * Play a short technical "blip" sound
   */
  public async playHover() {
    await this.init();
    if (!this.context || this.context.state !== 'running') return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = 'square'; // Brutalist, digital sound
    osc.frequency.setValueAtTime(880, this.context.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(440, this.context.currentTime + 0.1);

    gain.gain.setValueAtTime(0.05, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.context.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.context.destination);

    osc.start();
    osc.stop(this.context.currentTime + 0.1);
  }

  /**
   * Play a clean click sound
   */
  public async playClick() {
    await this.init();
    if (!this.context || this.context.state !== 'running') return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.context.currentTime + 0.05);

    gain.gain.setValueAtTime(0.1, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.context.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.context.destination);

    osc.start();
    osc.stop(this.context.currentTime + 0.05);
  }
}

export const soundService = new SoundService();
