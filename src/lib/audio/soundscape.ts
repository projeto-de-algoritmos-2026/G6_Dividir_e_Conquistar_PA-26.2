/**
 * Sintetizador Procedural de Efeitos Sonoros via Web Audio API.
 * 100% autônomo, sem arquivos externos de áudio, funciona offline.
 */
class Soundscape {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('skyward_audio_enabled');
      this.enabled = saved !== null ? saved === 'true' : true;
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('skyward_audio_enabled', String(this.enabled));
    }
    return this.enabled;
  }

  /**
   * Som de colocação suave de carta no slot de madeira polida
   */
  public playCardPlace() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.08);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.12);
  }

  /**
   * Som de Inversão / Swap com arco senoidal no ar
   */
  public playSwapInversion() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Rajada de vento ascendente
    const oscWind = this.ctx.createOscillator();
    const gainWind = this.ctx.createGain();
    oscWind.type = 'sine';
    oscWind.frequency.setValueAtTime(320, t);
    oscWind.frequency.exponentialRampToValueAtTime(740, t + 0.16);
    oscWind.frequency.exponentialRampToValueAtTime(440, t + 0.28);

    gainWind.gain.setValueAtTime(0.12, t);
    gainWind.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

    oscWind.connect(gainWind);
    gainWind.connect(this.ctx.destination);
    oscWind.start(t);
    oscWind.stop(t + 0.3);

    // Sino de bronze (impacto da ultrapassagem)
    const oscBell = this.ctx.createOscillator();
    const gainBell = this.ctx.createGain();
    oscBell.type = 'sine';
    oscBell.frequency.setValueAtTime(880, t + 0.05);

    gainBell.gain.setValueAtTime(0.15, t + 0.05);
    gainBell.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    oscBell.connect(gainBell);
    gainBell.connect(this.ctx.destination);
    oscBell.start(t + 0.05);
    oscBell.stop(t + 0.4);
  }

  /**
   * Som do Fluxo Sereno (acorde puro harmônico celestial)
   */
  public playSereneFlow() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99]; // Acorde C Maior puro

    freqs.forEach((f, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t + idx * 0.04);

      gain.gain.setValueAtTime(0.08, t + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + idx * 0.04);
      osc.stop(t + 0.45);
    });
  }

  /**
   * Som de conjuração alquímica (arpejo ascendente cintilante)
   */
  public playSpellCast() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const freqs = [392.0, 587.33, 783.99, 1174.66]; // Arpejo G-D-G-D

    freqs.forEach((f, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, t + idx * 0.07);

      gain.gain.setValueAtTime(0.07, t + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + idx * 0.07);
      osc.stop(t + idx * 0.07 + 0.3);
    });
  }

  /**
   * Som do Grande Vórtice K-Inversion (explosão cinegética com múltiplos tons)
   */
  public playVortexBurst(k: number = 3) {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Baixo potente do vórtice
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(140, t);
    subOsc.frequency.exponentialRampToValueAtTime(60, t + 0.4);
    subGain.gain.setValueAtTime(0.25, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(t);
    subOsc.stop(t + 0.5);

    // Cascata de k badaladas estáticas
    const chord = [440, 554.37, 659.25, 880, 1108.73];
    const notesToPlay = Math.min(chord.length, Math.max(2, k));

    for (let i = 0; i < notesToPlay; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(chord[i], t + i * 0.05);

      gain.gain.setValueAtTime(0.14, t + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + i * 0.05);
      osc.stop(t + 0.6);
    }
  }

  /**
   * Fenda da névoa na fase Dividir
   */
  public playDivideSplit() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(660, t);
    osc.frequency.linearRampToValueAtTime(220, t + 0.25);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.28);
  }

  /**
   * Fanfarra de vitória ou resolução da conquista
   */
  public playResolutionFanfare() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const arpeggio = [392.0, 523.25, 659.25, 783.99, 1046.5]; // G4, C5, E5, G5, C6

    arpeggio.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.08);

      gain.gain.setValueAtTime(0.12, t + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + idx * 0.08);
      osc.stop(t + 0.8);
    });
  }
}

export const soundscape = new Soundscape();
