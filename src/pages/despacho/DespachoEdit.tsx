import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import ExploreContainer from "../../components/ExploreContainer";
import { add, checkmark, close, pencil, text, trash } from "ionicons/icons";
import {
  removeDespacho,
  saveDespacho,
  searchDespachoById,
  searchDespachos,
} from "./DespachoApi";
import Despacho from "./Despacho";

const DespachoEdit: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [despacho, setDespacho] = useState<Despacho>({});
  const history = useHistory();
  const routeMatch: any = useRouteMatch("/page/despacho/:id");
  const id = routeMatch?.params.id;

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    if (id === "new") {
      setDespacho({});
    } else {
      let result = await searchDespachoById(id);
      setDespacho(result);
    }
  };

  const save = async () => {
    await saveDespacho(despacho);
    history.push("/page/despachos");
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
            <IonTitle>
              {id === "new" ? "Agregar Despacho" : "Editar Despacho"}
            </IonTitle>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Nombre</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (despacho.nombre = String(e.detail.value))
                    }
                    value={despacho.nombre}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Direcció envio</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (despacho.direccionenvio = String(e.detail.value))
                    }
                    value={despacho.direccionenvio}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Razon Social</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (despacho.razonsocial = String(e.detail.value))
                    }
                    value={despacho.razonsocial}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Estado</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (despacho.estado = String(e.detail.value))
                    }
                    value={despacho.estado}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonItem>
              <IonButton
                onClick={save}
                color="success"
                fill="solid"
                slot="end"
                size="default"
              >
                <IonIcon icon={checkmark} />
                Guardar
              </IonButton>
            </IonItem>
          </IonCard>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default DespachoEdit;
