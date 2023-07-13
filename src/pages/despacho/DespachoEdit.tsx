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
import { useHistory, useParams } from "react-router";
import { checkmark } from "ionicons/icons";
import { saveDespacho, searchDespachoById } from "./DespachoApi";
import Despacho from "./Despacho";

const DespachoEdit: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [despacho, setDespacho] = useState<Despacho>({});
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    search();
  }, []);

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
                      setDespacho({ ...despacho, nombre: e.detail.value! })
                    }
                    value={despacho.nombre}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Apellido</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      setDespacho({
                        ...despacho,
                        direccionenvio: e.detail.value!,
                      })
                    }
                    value={despacho.direccionenvio}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Dirección</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      setDespacho({
                        ...despacho,
                        razonsocial: e.detail.value!,
                      })
                    }
                    value={despacho.razonsocial}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">DNI</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      setDespacho({ ...despacho, estado: e.detail.value! })
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
