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
  removePedido,
  savePedido,
  searchPedidoById,
  searchPedidos,
} from "./PedidoApi";
import Pedido from "./Pedido";

const PedidoEdit: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [pedido, setPedido] = useState<Pedido>({
    id_pedido: 0,
    fechaPedido: "",
    fechaEntrega: "",
    id_cliente: {
      id_cliente: 0,
      nombre: "",
      apellido: "",
      direccion: "",
      dni: "",
      email: "",
    },
  });
  const history = useHistory();
  const routeMatch: any = useRouteMatch("/page/pedido/:id");
  const id = routeMatch?.params.id;

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    if (id === "new") {
      setPedido({
        id_pedido: 0,
        fechaPedido: "",
        fechaEntrega: "",
        id_cliente: {
          id_cliente: 0,
          nombre: "",
          apellido: "",
          direccion: "",
          dni: "",
          email: "",
        },
      });
    } else {
      let result = await searchPedidoById(id);
      setPedido(result);
    }
  };

  const save = async () => {
    await savePedido(pedido);
    history.push("/page/pedidos");
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
              {id === "new" ? "Agregar Pedido" : "Editar Pedido"}
            </IonTitle>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">fechaPedido</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (pedido.fechaPedido = String(e.detail.value))
                    }
                    value={pedido.fechaPedido}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">fechaEntrega</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (pedido.fechaEntrega = String(e.detail.value))
                    }
                    value={pedido.fechaEntrega}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Nombre del Cliente</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (pedido.id_cliente.nombre = String(e.detail.value))
                    }
                    value={pedido.id_cliente.nombre}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Dirección del Cliente</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (pedido.id_cliente.direccion = String(e.detail.value))
                    }
                    value={pedido.id_cliente.direccion}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">DNI del Cliente</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (pedido.id_cliente.dni = String(e.detail.value))
                    }
                    value={pedido.id_cliente.dni}
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

export default PedidoEdit;
