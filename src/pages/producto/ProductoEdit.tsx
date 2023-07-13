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
  removeProducto,
  saveProducto,
  searchProductoById,
  searchProductos,
} from "./ProductoApi";
import Producto from "./Producto";

const ProductoEdit: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [producto, setProducto] = useState<Producto>({});
  const history = useHistory();
  const routeMatch: any = useRouteMatch("/page/producto/:id");
  const id = routeMatch?.params.id;

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    if (id === "new") {
      setProducto({});
    } else {
      let result = await searchProductoById(id);
      setProducto(result);
    }
  };

  const save = async () => {
    await saveProducto(producto);
    history.push("/page/productos");
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
              {id === "new" ? "Agregar Producto" : "Editar Producto"}
            </IonTitle>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Nombre</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (producto.nombre = String(e.detail.value))
                    }
                    value={producto.nombre}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Descripcion</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (producto.descripcion = String(e.detail.value))
                    }
                    value={producto.descripcion}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Precio</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (producto.precio = String(e.detail.value))
                    }
                    value={producto.precio}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Imagen</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (producto.imagen = String(e.detail.value))
                    }
                    value={producto.imagen}
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

export default ProductoEdit;
