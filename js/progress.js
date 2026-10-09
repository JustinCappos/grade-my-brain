/**
 * Grade My Brain - Player Progress
 * Keeps each ID code's progress across sessions: which scenarios they have
 * seen, every scored result, consent choices, and the session in progress.
 * Stored in localStorage, so it never leaves the player's browser.
 */

const KEY_PREFIX = 'gmb_progress_';
const DATA_VERSION = 1;

export function normalizeId(raw) {
    return String(raw || '').trim().toLowerCase();
}

// Falls back to an in-memory store when localStorage is blocked or absent
function defaultStorage() {
    try {
        if (typeof localStorage !== 'undefined') return localStorage;
    } catch (err) { /* blocked by browser settings */ }
    const memory = {};
    return {
        getItem: k => (k in memory ? memory[k] : null),
        setItem: (k, v) => { memory[k] = String(v); },
        removeItem: k => { delete memory[k]; }
    };
}

function freshData() {
    return {
        version: DATA_VERSION,
        consent: { checked: true, openedPolicy: false },
        seen: {},
        // { scenarioId, biasType, correct, kind: 'main' | 'retest' | 'practice', at }
        results: [],
        sessionsCompleted: 0,
        session: null
    };
}

export class Progress {
    constructor(id, storage = defaultStorage()) {
        this.id = normalizeId(id);
        this.storage = storage;
        this.data = this.load() || freshData();
    }

    get key() {
        return KEY_PREFIX + this.id;
    }

    static exists(id, storage = defaultStorage()) {
        try {
            return storage.getItem(KEY_PREFIX + normalizeId(id)) !== null;
        } catch (err) {
            return false;
        }
    }

    load() {
        try {
            const data = JSON.parse(this.storage.getItem(this.key));
            return data && data.version === DATA_VERSION ? data : null;
        } catch (err) {
            return null;
        }
    }

    save() {
        try {
            this.storage.setItem(this.key, JSON.stringify(this.data));
        } catch (err) { /* storage full or blocked; progress lasts for this page only */ }
    }

    reset() {
        const consent = this.data.consent;
        this.data = freshData();
        this.data.consent = consent;
        this.save();
    }

    get seenIds() {
        return new Set(Object.keys(this.data.seen));
    }

    markSeen(scenarioId) {
        this.data.seen[scenarioId] = true;
    }

    recordResult({ scenarioId, biasType, correct, kind }) {
        this.data.results.push({ scenarioId, biasType, correct, kind, at: Date.now() });
    }

    // Results that measure the player (practice answers come right after an explanation)
    get scoredResults() {
        return this.data.results.filter(r => r.kind !== 'practice');
    }

    // Bias types whose most recent scored result was wrong, most recent miss first
    retestTypes() {
        const latest = new Map();
        this.scoredResults.forEach((r, idx) => latest.set(r.biasType, { ...r, idx }));
        return [...latest.values()]
            .filter(r => !r.correct)
            .sort((a, b) => b.idx - a.idx)
            .map(r => r.biasType);
    }

    // Every scenario the player has ever answered wrong
    missedIds() {
        return new Set(this.scoredResults.filter(r => !r.correct).map(r => r.scenarioId));
    }
}
