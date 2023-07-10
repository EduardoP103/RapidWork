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
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { add, close, pencil, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import { removeDespacho, saveDespacho, searchDespachos } from "./DespachoApi";
import Doctor from "./Despacho";

import "../../theme/table.css";
import Despacho from "./Despacho";

const DoctorList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [despachos, setDoctores] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchDespachos();
    setDoctores(result);
  };

  const remove = async (id: string) => {
    await removeDespacho(id);
    search();
  };

  const addDoctor = () => {
    history.push("/page/despacho/new");
  };

  const editDoctor = (id: string) => {
    history.push("/page/despacho/" + id);
  };

  const handleSearch = (event: CustomEvent) => {
    setSearchTerm(event.detail.value || "");
  };

  const filteredDespachos = despachos.filter((despacho: Doctor) => {
    const fullName = `${despacho.nombre} ${despacho.direccionenvio}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
            <IonTitle>Listado de Despachos</IonTitle>
            <IonItem>
              <IonButton
                onClick={addDoctor}
                color="primary"
                fill="solid"
                slot="end"
                size="default"
              >
                <IonIcon icon={add} />
                Agregar Despacho
              </IonButton>
            </IonItem>

            <IonSearchbar
              value={searchTerm}
              onIonInput={handleSearch}
            ></IonSearchbar>

            <div className="table-container">
              <IonGrid className="table">
                <IonRow className="header-row">
                  <IonCol>Nombre</IonCol>
                  <IonCol>Dirección de Envio</IonCol>
                  <IonCol>Razón Social</IonCol>
                  <IonCol>Estado</IonCol>
                  <IonCol>Acciones</IonCol>
                </IonRow>
                {filteredDespachos.map((despacho: Despacho) => (
                  <IonRow className="data-row" key={despacho.id_despacho}>
                    <IonCol>{despacho.nombre}</IonCol>
                    <IonCol>{despacho.direccionenvio}</IonCol>
                    <IonCol>{despacho.razonsocial}</IonCol>
                    <IonCol>{despacho.estado}</IonCol>
                    <IonCol className="actions-column">
                      <IonButton
                        color="primary"
                        fill="clear"
                        onClick={() => editDoctor(String(despacho.id_despacho))}
                      >
                        <IonIcon icon={pencil} slot="icon-only" />
                      </IonButton>

                      <IonButton
                        color="danger"
                        fill="clear"
                        onClick={() => remove(String(despacho.id_despacho))}
                      >
                        <IonIcon icon={close} slot="icon-only" />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                ))}
              </IonGrid>
            </div>
          </IonCard>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default DoctorList;
