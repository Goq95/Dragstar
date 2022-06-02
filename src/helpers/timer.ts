
export class Timer {
    start = new Date()
    private end: Date
    
    isFinished = false

    constructor() {
        this.end = new Date(0);
    }

    finish() {
        this.end = new Date();
        this.isFinished = true;
    }
}