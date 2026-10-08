/**
 * Grade My Brain - Web Audio API Sound Engine
 * Brave Shields & Fingerprint Protection Resilient.
 * Silently bypasses audio when Web Audio API is restricted by privacy browsers.
 */

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.audioFailed = false;
    }

    init() {
        if (this.audioFailed || !this.enabled) return;
        try {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) {
                    this.ctx = new AudioCtx();
                } else {
                    this.audioFailed = true;
                    return;
                }
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume().catch(() => {
                    this.audioFailed = true;
                });
            }
        } catch (e) {
            this.audioFailed = true;
        }
    }

    toggleSound() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    playClick() {
        if (this.audioFailed || !this.enabled) return;
        try {
            this.init();
            if (!this.ctx || this.ctx.state !== 'running') return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);

            gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.05);
        } catch (e) {
            this.audioFailed = true;
        }
    }

    playTick() {
        if (this.audioFailed || !this.enabled) return;
        try {
            this.init();
            if (!this.ctx || this.ctx.state !== 'running') return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1200 + Math.random() * 200, this.ctx.currentTime);

            gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.03);
        } catch (e) {
            this.audioFailed = true;
        }
    }

    playWagerSelect() {
        if (this.audioFailed || !this.enabled) return;
        try {
            this.init();
            if (!this.ctx || this.ctx.state !== 'running') return;

            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08);
            osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.16);

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.2);
        } catch (e) {
            this.audioFailed = true;
        }
    }

    playWin() {
        if (this.audioFailed || !this.enabled) return;
        try {
            this.init();
            if (!this.ctx || this.ctx.state !== 'running') return;

            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                const startTime = this.ctx.currentTime + i * 0.08;
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, startTime);

                gain.gain.setValueAtTime(0.25, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(startTime);
                osc.stop(startTime + 0.25);
            });
        } catch (e) {
            this.audioFailed = true;
        }
    }

    playLoss() {
        if (this.audioFailed || !this.enabled) return;
        try {
            this.init();
            if (!this.ctx || this.ctx.state !== 'running') return;

            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(110, now + 0.35);

            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.35);
        } catch (e) {
            this.audioFailed = true;
        }
    }

    playGameOver() {
        if (this.audioFailed || !this.enabled) return;
        try {
            this.init();
            if (!this.ctx || this.ctx.state !== 'running') return;

            const freqs = [440, 415.30, 392.00, 349.23];
            freqs.forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                const startTime = this.ctx.currentTime + i * 0.15;
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(freq, startTime);

                gain.gain.setValueAtTime(0.2, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(startTime);
                osc.stop(startTime + 0.3);
            });
        } catch (e) {
            this.audioFailed = true;
        }
    }
}

export const sound = new SoundEngine();
