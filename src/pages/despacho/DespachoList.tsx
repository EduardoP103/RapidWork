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
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { add, close, car, pencil, trash } from "ionicons/icons";
import { removeDespacho, saveDespacho, searchDespachos } from "./DespachoApi";
import "../../theme/table.css";
import Despacho from "./Despacho";

const DespachoList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [despachos, setDespachos] = useState<Despacho[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchDespachos();
    setDespachos(result);
  };

  const remove = async (id: string) => {
    await removeDespacho(id);
    search();
  };

  const addDespacho = () => {
    history.push("/page/despacho/new");
  };

  const editDespacho = (id: string) => {
    history.push(`/page/despachos/${id}`);
  };

  const handleSearch = (event: CustomEvent) => {
    setSearchTerm(event.detail.value || "");
  };

  const getEstadoColorClass = (estado: string) => {
    if (estado === "En tránsito") {
      return "estado-amarillo";
    } else if (estado === "Entregado") {
      return "estado-verde";
    } else {
      return "";
    }
  };

  const filteredDespachos = despachos.filter((despacho: Despacho) => {
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

            <IonSearchbar value={searchTerm} onIonInput={handleSearch} />

            <div className="table-container">
              <IonGrid className="table">
                <IonList>
                  {filteredDespachos.map((despacho: Despacho) => (
                    <IonCard key={despacho.id_despacho}>
                      <IonItem>
                        <IonButton
                          onClick={() => editDespacho(despacho.id_despacho)}
                          color="primary"
                          fill="clear"
                          slot="start"
                        >
                          <IonIcon icon={car} slot="icon-only" />
                        </IonButton>
                        <IonLabel>
                          <h2>{despacho.nombre}</h2>
                          <p>{despacho.direccionenvio}</p>
                          <p>{despacho.razonsocial}</p>
                          <p className={getEstadoColorClass(despacho.estado)}>
                            {despacho.estado}
                          </p>
                        </IonLabel>
                        <IonButton
                          color="primary"
                          fill="clear"
                          onClick={() => editDespacho(despacho.id_despacho)}
                        >
                          <IonIcon icon={pencil} slot="icon-only" />
                        </IonButton>

                        <IonButton
                          onClick={() => remove(despacho.id_despacho)}
                          color="danger"
                          fill="clear"
                          slot="end"
                        >
                          <IonIcon icon={close} slot="icon-only" />
                        </IonButton>
                      </IonItem>
                    </IonCard>
                  ))}
                </IonList>
              </IonGrid>
            </div>
          </IonCard>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default DespachoList;
