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
  removeInventario,
  saveInventario,
  searchInventarioById,
  searchInventarios,
} from "./InventarioApi";
import Inventario from "./Inventario";

const InventarioEdit: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [inventario, setInventario] = useState<Inventario>({});
  const history = useHistory();
  const routeMatch: any = useRouteMatch("/page/inventario/:id");
  const id = routeMatch?.params.id;

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    if (id === "new") {
      setInventario({});
    } else {
      let result = await searchInventarioById(id);
      setInventario(result);
    }
  };

  const save = async () => {
    await saveInventario(inventario);
    history.push("/page/inventarios");
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
              {id === "new" ? "Agregar Inventario" : "Editar Inventario"}
            </IonTitle>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Nombre</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (inventario.nombre = String(e.detail.value))
                    }
                    value={inventario.nombre}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">cantidad</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (inventario.cantidad = String(e.detail.value))
                    }
                    value={inventario.cantidad}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Fecha de Ingreso</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (inventario.fechaingreso = String(e.detail.value))
                    }
                    value={inventario.fechaingreso}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Actualización</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (inventario.fechaactualizacion = String(e.detail.value))
                    }
                    value={inventario.fechaactualizacion}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Proveedor</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (inventario.proveedor = String(e.detail.value))
                    }
                    value={inventario.proveedor}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Precio C.</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (inventario.preciocompra = String(e.detail.value))
                    }
                    value={inventario.preciocompra}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Precio V.</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (inventario.precioventa = String(e.detail.value))
                    }
                    value={inventario.precioventa}
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

export default InventarioEdit;
