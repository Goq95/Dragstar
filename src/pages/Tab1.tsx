import {
  IonContent,
  IonPage,
  IonImg,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButton,
} from "@ionic/react";
import React from "react";
import { Race } from "../helpers/race";
import "./Tab1.css";

class Home extends React.Component {
  constructor(props: any) {
    super(props);

    this.start = this.start.bind(this);
    this.startCounter = this.startCounter.bind(this);
  }

  state: any = {
    mode: "speed",
    speed: "60",
    distance: "1/4",
    isStarted: false,
    counter: 3,
    race: {},
    raceDetails: {
      speed: '',
      distance: '',
    },
    time: ''
  };

  startCounter(cb: any) {
    this.setState({ counter: 3 });

    const intervalId = setInterval(() => {
      if (this.state.counter > 0) {
        this.setState({ counter: this.state.counter - 1 });
      } else {
        clearInterval(intervalId);

        cb();
      }
    }, 1800 / 3);
  }

  start() {
    this.setState({ isStarted: true });

    this.startCounter(() => {
      const race = new Race()
      this.setState({ race });

      race.addListener((details: any) => {
        this.setState({
          raceDetails: {
            speed: details.speed,
            distance: details.distance,
          }
        })
      });

      setInterval(() => {
        this.setState({
          time: this.state.race.time
        })
      }, 100)
    });

    let a = new Audio();

    a.src = "/assets/sounds/start.wav";

    a.play();
  }

  render() {
    let segment = null;

    if (this.state.mode == "speed")
      segment = (
        <IonSegment
          onIonChange={(e) => this.setState({ speed: e.detail.value })}
          color="secondary"
          className="ion-margin-top"
          value={this.state.speed}
        >
          <IonSegmentButton value="60">
            <IonLabel>0-60</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="100">
            <IonLabel>0-100</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="150">
            <IonLabel>0-150</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="200=">
            <IonLabel>0-200</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      );

    if (this.state.mode == "distance")
      segment = (
        <IonSegment
          onIonChange={(e) => this.setState({ distance: e.detail.value })}
          color="secondary"
          className="ion-margin-top"
          value={this.state.distance}
        >
          <IonSegmentButton value="1/8">
            <IonLabel>1/8 mile</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="1/4">
            <IonLabel>1/4 mile</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="1/2">
            <IonLabel>1/2 mile</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="1">
            <IonLabel>mile</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      );

    // if (this.state.isStarted)
    return (
      <IonPage>
        {!this.state.isStarted ? (
          <IonContent fullscreen>
            <IonImg
              src="/assets/icon/logo.png"
              className="logo-big ion-margin-top"
            ></IonImg>

            <IonSegment
              onIonChange={(e) => this.setState({ mode: e.detail.value })}
              color="secondary"
              className="ion-margin-top"
              value={this.state.mode}
            >
              <IonSegmentButton value="speed">
                <IonLabel>Speed</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="distance">
                <IonLabel>Distance</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            {segment}

            <IonButton
              size="large"
              expand="full"
              className="start-btn"
              onClick={this.start}
            >
              START
            </IonButton>
          </IonContent>
        ) : (
          <div className="countDown">
            <span>
              {this.state.counter === 0 ? (
                <ul className="race-details">
                  <li><b>Time:</b> {Number(this.state.time).toFixed(2)} sec</li>
                  <li><b>Distance:</b> {Number(this.state.raceDetails.distance).toFixed(2)} meter</li>
                  <li><b>Speed:</b> {Number(this.state.raceDetails.speed * 3.6).toFixed(1)} km/h</li>
                </ul>) :
                this.state.counter}
            </span>
          </div>
        )}
      </IonPage>
    );
  }
}

export default Home;
