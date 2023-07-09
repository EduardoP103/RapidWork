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
import { removeCliente, saveCliente, searchClientes } from "./ClienteApi";
import Doctor from "./Cliente";

import "../../theme/table.css";
import Cliente from "./Cliente";

const DoctorList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [clientees, setDoctores] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchClientes();
    setDoctores(result);
  };

  const remove = async (id: string) => {
    await removeCliente(id);
    search();
  };

  const addDoctor = () => {
    history.push("/page/cliente/new");
  };

  const editDoctor = (id: string) => {
    history.push("/page/cliente/" + id);
  };

  const handleSearch = (event: CustomEvent) => {
    setSearchTerm(event.detail.value || "");
  };

  const filteredClientes = clientees.filter((cliente: Doctor) => {
    const fullName = `${cliente.nombre} ${cliente.apellido}`;
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
            <IonTitle>Listado de Clientes</IonTitle>
            <IonItem>
              <IonButton
                onClick={addDoctor}
                color="primary"
                fill="solid"
                slot="end"
                size="default"
              >
                <IonIcon icon={add} />
                Agregar Doctor
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
                  <IonCol>Apellido</IonCol>
                  <IonCol>Direccion</IonCol>
                  <IonCol>DNI</IonCol>
                  <IonCol>Email</IonCol>
                  <IonCol>Acciones</IonCol>
                </IonRow>
                {filteredClientes.map((cliente: Cliente) => (
                  <IonRow className="data-row" key={cliente.id_cliente}>
                    <IonCol>{cliente.nombre}</IonCol>
                    <IonCol>{cliente.apellido}</IonCol>
                    <IonCol>{cliente.direccion}</IonCol>
                    <IonCol>{cliente.dni}</IonCol>
                    <IonCol>{cliente.email}</IonCol>
                    <IonCol className="actions-column">
                      <IonButton
                        color="primary"
                        fill="clear"
                        onClick={() => editDoctor(String(cliente.id_cliente))}
                      >
                        <IonIcon icon={pencil} slot="icon-only" />
                      </IonButton>

                      <IonButton
                        color="danger"
                        fill="clear"
                        onClick={() => remove(String(cliente.id_cliente))}
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
