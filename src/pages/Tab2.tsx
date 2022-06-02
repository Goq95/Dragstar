import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonList, IonItem, IonLabel, IonListHeader, IonGrid, IonCol, IonRow, IonIcon } from '@ionic/react';
import { speedometerOutline, resizeOutline } from 'ionicons/icons';
import './Tab2.css';

const Tab2: React.FC = () => {

  const data = [
    {
      type: 'distance',
      distancePassed: 402,
      speed: 190,
      time: 31.2,
      date: new Date()
    },
    {
      type: 'speed',
      distancePassed: 300,
      speed: 100,
      time: '8.2',
      date: new Date()
    },
    {
      type: 'speed',
      distancePassed: 300,
      speed: 100,
      time: '8.2',
      date: new Date()
    },
  ]

  const getIcon = (result: any) => {
    if (result.type == 'speed') {
      return (<div>
        <IonIcon icon={speedometerOutline} size="large" />
        <IonLabel>speed</IonLabel>
      </div>)
    }
    else {
      return (<div>
        <IonIcon icon={resizeOutline} size="large" />
        <IonLabel>distance</IonLabel>
      </div>)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonImg src="/assets/icon/logo.png" className="logo-small"></IonImg>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonListHeader>
          <IonLabel>Results</IonLabel>
        </IonListHeader>
        <IonList>
          {data.map((result, index) => {
            return (
              <IonItem key={index}>
                <IonLabel>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="2" className="result-icon">
                        {getIcon(result)}
                      </IonCol>
                      <IonCol size="6">
                        <b>Time: </b> <span>{result.time}sec</span> <br />
                        <b>Speed: </b> <span>{result.speed}km/h</span> <br />
                        <b>Distance: </b> <span>{result.distancePassed}m</span> <br />
                      </IonCol>
                      <IonCol size="3">{new Date().toString()}</IonCol>
                    </IonRow>
                  </IonGrid>
                </IonLabel>
              </IonItem>
            )
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
