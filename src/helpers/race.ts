import moment from "moment";
import { getDistance } from "./get-distance";
import { Timer } from "./timer";

class Location {
    latitude: number = 0
    longitude: number = 0
}

export class Race {
    timer: Timer
    watchId: number
    callbacks: any[] = []

    public speed: number = 0

    A: any = null;
    B: Location = new Location();

    public get time() {
        return (Number(new Date()) - Number(this.timer.start)) / 1000;
    }

    public get distance() {
        if(!this.A || !this.B) return 0;

        return getDistance(this.A.latitude, this.A.longitude, this.B.latitude, this.B.longitude);
    }

    constructor() {
        if (!navigator.geolocation) throw new Error('Geolocation access denied;');

        this.timer = new Timer();

        this.watchId = navigator.geolocation.watchPosition(this.updateState.bind(this), (err) => {
            console.log(err)
        }, {
            enableHighAccuracy: true,
            timeout: 100
        });
    }

    public updateState(position: any) {
        const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        
        if(!this.A) {
            this.A = location;
        } else {
            this.B = location;
        }

        console.log(this.time)
        console.log(this.distance)
        console.log(position.coords.speed)

        this.speed = position.coords.speed;

        this.callbacks.forEach(cb => cb({
            speed: this.speed,
            time: this.time,
            distance: this.distance
        }))
    }

    finish() {
        this.timer.finish();

        // Geolocation.clearWatch(this.watchId)
    }

    addListener(cb: any) {
        this.callbacks.push(cb)
    }
}