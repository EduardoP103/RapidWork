import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
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
import {
  add,
  calendar,
  calendarNumberOutline,
  calendarOutline,
  close,
  mailOutline,
  pencil,
  readerOutline,
  trash,
} from "ionicons/icons";
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
            <IonCardContent>
              <IonButton expand="full" onClick={addPedido} color="primary">
                <IonIcon icon={add} slot="start" />
                Agregar Pedido
              </IonButton>
            </IonCardContent>
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
          <IonGrid fixed>
            <IonRow>
              {filteredPedidos.map((pedido: Pedido) => (
                <IonCol
                  size="12"
                  size-md="6"
                  size-lg="4"
                  key={pedido.id_pedido}
                >
                  <IonCard>
                    <IonCardHeader>
                      <IonCardSubtitle>
                        {pedido.id_cliente.nombre}
                      </IonCardSubtitle>
                      <IonCardTitle>{pedido.id_cliente.apellido}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonItem>
                        <IonIcon icon={calendarOutline} />
                        <span>{pedido.fechaPedido}</span>
                      </IonItem>
                      <IonItem>
                        <IonIcon icon={calendarNumberOutline} />
                        <span>{pedido.fechaEntrega}</span>
                      </IonItem>
                      <IonItem>
                        <IonIcon icon={readerOutline} />
                        <span>{pedido.id_cliente.dni}</span>
                      </IonItem>
                      <IonItem>
                        <IonIcon icon={mailOutline} />
                        <span>{pedido.id_cliente.email}</span>
                      </IonItem>
                      <IonItem>
                        <IonIcon icon={add} />
                        <IonButton
                          onClick={() => editPedido(String(pedido.id_pedido))}
                        >
                          Editar
                        </IonButton>
                        <IonButton
                          onClick={() => remove(String(pedido.id_pedido))}
                          color="danger"
                        >
                          Eliminar
                        </IonButton>
                      </IonItem>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default PedidoList;
