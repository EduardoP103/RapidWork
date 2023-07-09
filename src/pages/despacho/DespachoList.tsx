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
import { useHistory, useParams } from "react-router";
import ExploreContainer from "../../components/ExploreContainer";
import { add, logoMarkdown, pencil, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import { removeDespacho, saveDespacho, searchDespachos } from "./DespachoApi";

const DespachoList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [despachos, setDespachos] = useState<any>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    let result = searchDespachos();
    setDespachos(result);
  };

  const remove = (id: string) => {
    removeDespacho(id);
    search();
  };

  const pruebaLocalStorage = () => {
    const ejemplo = {
      id: "1",
      nombre: "en mi casa",
      direccionenvio: "en mi otra casa",
      razonsocial: "aqui",
      estado: "entregado",
    };
    saveDespacho(ejemplo);
  };

  const addDespacho = () => {};

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
            <IonTitle>Gestion de Despachos</IonTitle>
            <IonItem>
              <IonButton
                onClick={addDespacho}
                color="primary"
                fill="solid"
                slot="end"
                size="default"
              >
                <IonIcon icon={add} />
                Agregar Despacho
              </IonButton>
            </IonItem>
            <IonGrid className="table">
              <IonRow>
                <IonCol>Nombre</IonCol>
                <IonCol>Direccion de envio</IonCol>
                <IonCol>Razon Social</IonCol>
                <IonCol>Estado</IonCol>
                <IonCol>Acciones</IonCol>
              </IonRow>
              {despachos.map((despacho: any) => (
                <IonRow>
                  <IonCol>{despacho.nombre}</IonCol>
                  <IonCol>{despacho.direccionenvio}</IonCol>
                  <IonCol>{despacho.razonsocial}</IonCol>
                  <IonCol>{despacho.estado}</IonCol>
                  <IonCol>
                    <IonButton color="primary" fill="clear">
                      <IonIcon icon={pencil} slot="icon-only" />
                    </IonButton>
                    <IonButton
                      color="danger"
                      fill="clear"
                      onClick={() => remove(despacho.id)}
                    >
                      <IonIcon icon={trash} slot="icon-only" />
                    </IonButton>
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </IonCard>
          <IonButton onClick={pruebaLocalStorage} color="danger" fill="clear">
            Prueba Local Storage
          </IonButton>
        </IonContent>

        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );
};

export default DespachoList;
