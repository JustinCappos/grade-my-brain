/**
 * Grade My Brain - Canvas Performance & Radar Chart
 * Renders both high-DPI line chart for score trajectory and radar chart for cognitive bias profile.
 */

export class BrainChart {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.history = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        if (!this.canvas) return;
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.drawHistory();
    }

    updateHistory(history) {
        this.history = history;
        this.drawHistory();
    }

    drawHistory() {
        if (!this.ctx || !this.canvas) return;
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        ctx.clearRect(0, 0, w, h);

        if (this.history.length === 0) return;

        const paddingLeft = 45;
        const paddingBottom = 35;
        const paddingTop = 20;
        const paddingRight = 25;

        const graphW = w - paddingLeft - paddingRight;
        const graphH = h - paddingTop - paddingBottom;

        let minScore = Math.min(50, ...this.history.map(d => d.score));
        let maxScore = Math.max(300, ...this.history.map(d => d.score));
        minScore = Math.floor(minScore / 50) * 50;
        maxScore = Math.ceil(maxScore / 50) * 50;

        const totalRounds = 24;

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = `${Math.max(10, Math.floor(h * 0.038))}px Outfit, sans-serif`;

        const steps = 4;
        for (let i = 0; i <= steps; i++) {
            const val = minScore + (maxScore - minScore) * (i / steps);
            const y = h - paddingBottom - ((val - minScore) / (maxScore - minScore)) * graphH;

            ctx.beginPath();
            ctx.moveTo(paddingLeft, y);
            ctx.lineTo(w - paddingRight, y);
            ctx.stroke();

            ctx.textAlign = 'right';
            ctx.fillText(Math.round(val), paddingLeft - 8, y + 4);
        }

        const points = this.history.map(d => {
            const x = paddingLeft + (d.round / totalRounds) * graphW;
            const y = h - paddingBottom - ((d.score - minScore) / (maxScore - minScore)) * graphH;
            return { x, y, score: d.score, round: d.round };
        });

        if (points.length > 1) {
            const grad = ctx.createLinearGradient(0, paddingTop, 0, h - paddingBottom);
            grad.addColorStop(0, 'rgba(6, 182, 212, 0.35)');
            grad.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.lineTo(points[points.length - 1].x, h - paddingBottom);
            ctx.lineTo(points[0].x, h - paddingBottom);
            ctx.closePath();
            ctx.fillStyle = grad;
            ctx.fill();

            ctx.save();
            ctx.shadowColor = '#06b6d4';
            ctx.shadowBlur = 10;
            ctx.strokeStyle = '#06b6d4';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.stroke();
            ctx.restore();
        }

        points.forEach((pt, idx) => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, idx === points.length - 1 ? 5 : 3, 0, Math.PI * 2);
            ctx.fillStyle = idx === points.length - 1 ? '#38bdf8' : '#0284c7';
            ctx.fill();
            ctx.restore();
        });
    }

    static renderRadarChart(canvasId, biasSummary) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        const centerX = w / 2;
        const centerY = h / 2;
        const radius = Math.min(centerX, centerY) - 45;

        const categories = biasSummary;
        const numCats = categories.length;

        // Draw web rings
        const rings = 4;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;

        for (let r = 1; r <= rings; r++) {
            const rad = (radius / rings) * r;
            ctx.beginPath();
            for (let i = 0; i < numCats; i++) {
                const angle = (Math.PI * 2 / numCats) * i - Math.PI / 2;
                const x = centerX + Math.cos(angle) * rad;
                const y = centerY + Math.sin(angle) * rad;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
        }

        // Draw spokes & labels
        ctx.font = `${Math.max(10, Math.floor(h * 0.035))}px Inter, sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const dataPoints = [];

        categories.forEach((cat, i) => {
            const angle = (Math.PI * 2 / numCats) * i - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();

            // Label position slightly outside radius
            const labelX = centerX + Math.cos(angle) * (radius + 28);
            const labelY = centerY + Math.sin(angle) * (radius + 24);
            const shortName = cat.name.split(' ')[0];
            ctx.fillText(shortName, labelX, labelY);

            // Compute data point (resiliency = 100 - susceptibility)
            const resiliency = Math.max(10, 100 - cat.susceptibilityPercent);
            const dataRad = (radius * (resiliency / 100));
            const dataX = centerX + Math.cos(angle) * dataRad;
            const dataY = centerY + Math.sin(angle) * dataRad;
            dataPoints.push({ x: dataX, y: dataY });
        });

        // Draw radar fill polygon
        if (dataPoints.length > 0) {
            ctx.beginPath();
            ctx.moveTo(dataPoints[0].x, dataPoints[0].y);
            for (let i = 1; i < dataPoints.length; i++) {
                ctx.lineTo(dataPoints[i].x, dataPoints[i].y);
            }
            ctx.closePath();

            const radGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius);
            radGrad.addColorStop(0, 'rgba(6, 182, 212, 0.45)');
            radGrad.addColorStop(1, 'rgba(139, 92, 246, 0.2)');
            ctx.fillStyle = radGrad;
            ctx.fill();

            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Draw radar dots
            dataPoints.forEach(pt => {
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#38bdf8';
                ctx.fill();
            });
        }
    }
}
