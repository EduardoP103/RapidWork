import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import ExploreContainer from "../../components/ExploreContainer";
import { add, logoMarkdown, pencil, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import { removeDespacho, saveDespacho, searchDespachos } from "./DespachoApi";

const DespachoEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string }>();

  const [despachos, setDespachos] = useState<any>([]);

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    let result = searchDespachos();
    setDespachos(result);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonCard>
            <IonTitle>Gestion de Despachos {id}</IonTitle>

            <IonItem>
              <IonButton color="primary" fill="solid" slot="end" size="default">
                <IonIcon icon={add} />
                Guardar
              </IonButton>
            </IonItem>
          </IonCard>
          <IonButton onClick={() => {}} color="danger" fill="clear">
            Prueba Local Storage
          </IonButton>
        </IonContent>

        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );
};

export default DespachoEdit;
