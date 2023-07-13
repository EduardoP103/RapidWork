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

  const [pedido, setPedido] = useState<Pedido>({});
  const history = useHistory();
  const routeMatch: any = useRouteMatch("/page/pedido/:id");
  const id = routeMatch?.params.id;

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    if (id === "new") {
      setPedido({});
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
                      setPedido({
                        ...pedido,
                        fechaPedido: e.detail.value || "",
                      })
                    }
                    value={pedido.fechaPedido || ""}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">fechaEntrega</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      setPedido({
                        ...pedido,
                        fechaEntrega: e.detail.value || "",
                      })
                    }
                    value={pedido.fechaEntrega || ""}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">id_cliente.nombre</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      setPedido({
                        ...pedido,
                        id_cliente: {
                          ...pedido.id_cliente,
                          nombre: e.detail.value || "",
                        },
                      })
                    }
                    value={pedido.id_cliente?.nombre || ""}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">id_cliente.apellido</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      setPedido({
                        ...pedido,
                        id_cliente: {
                          ...pedido.id_cliente,
                          apellido: e.detail.value || "",
                        },
                      })
                    }
                    value={pedido.id_cliente?.apellido || ""}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">id_cliente.dni</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      setPedido({
                        ...pedido,
                        id_cliente: {
                          ...pedido.id_cliente,
                          dni: e.detail.value || "",
                        },
                      })
                    }
                    value={pedido.id_cliente?.dni || ""}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">id_cliente.email</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      setPedido({
                        ...pedido,
                        id_cliente: {
                          ...pedido.id_cliente,
                          email: e.detail.value || "",
                        },
                      })
                    }
                    value={pedido.id_cliente?.email || ""}
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
