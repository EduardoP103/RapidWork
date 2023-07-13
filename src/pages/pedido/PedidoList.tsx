import React, { useState, useEffect } from "react";
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
import { removePedido, savePedido, searchPedidos } from "./PedidoApi";
import Pedido from "./Pedido";

import "../../theme/table.css";

const PedidoList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchPedidos();
    setPedidos(result);
  };

  const remove = async (id: string) => {
    await removePedido(id);
    search();
  };

  const addPedido = () => {
    history.push("/page/pedido/new");
  };

  const editPedido = (id: string) => {
    history.push("/page/pedido/" + id);
  };

  const handleSearch = (event: CustomEvent) => {
    setSearchTerm(event.detail.value || "");
  };

  const filteredPedidos = pedidos.filter((pedido: Pedido) => {
    const fullName = `${pedido.fechaPedido} ${pedido.fechaEntrega}`;
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
            <IonTitle>Listado de Pedidos</IonTitle>
            <IonItem>
              <IonButton
                onClick={addPedido}
                color="primary"
                fill="solid"
                slot="end"
                size="default"
              >
                <IonIcon icon={add} />
                Agregar Pedido
              </IonButton>
            </IonItem>

            <IonSearchbar
              value={searchTerm}
              onIonInput={handleSearch}
            ></IonSearchbar>

            <div className="table-container">
              <IonGrid className="table">
                <IonRow className="header-row">
                  <IonCol>Fecha Pedido</IonCol>
                  <IonCol>Fecha Entrega</IonCol>
                  <IonCol>Nombre</IonCol>
                  <IonCol>Apellido</IonCol>
                  <IonCol>DNI</IonCol>
                  <IonCol>Correo</IonCol>
                  <IonCol>Acciones</IonCol>
                </IonRow>
                {filteredPedidos.map((pedido: Pedido) => (
                  <IonRow className="data-row" key={pedido.id_pedido}>
                    <IonCol>{pedido.fechaPedido}</IonCol>
                    <IonCol>{pedido.fechaEntrega}</IonCol>
                    <IonCol>{pedido.id_cliente.nombre}</IonCol>
                    <IonCol>{pedido.id_cliente.apellido}</IonCol>
                    <IonCol>{pedido.id_cliente.dni}</IonCol>
                    <IonCol>{pedido.id_cliente.email}</IonCol>
                    <IonCol className="actions-column">
                      <IonButton
                        color="primary"
                        fill="clear"
                        onClick={() => editPedido(String(pedido.id_pedido))}
                      >
                        <IonIcon icon={pencil} slot="icon-only" />
                      </IonButton>

                      <IonButton
                        color="danger"
                        fill="clear"
                        onClick={() => remove(String(pedido.id_pedido))}
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

export default PedidoList;
