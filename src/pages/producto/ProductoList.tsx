import React from "react";
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
  IonPopover,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { add, close, pencil, trash, image } from "ionicons/icons";
import { useEffect, useState } from "react";
import { removeProducto, saveProducto, searchProductos } from "./ProductoApi";
import Producto from "./Producto";

import "../../theme/table.css";

const ProductoList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [popoverState, setShowPopover] = useState<{
    showPopover: boolean;
    imageSrc: string;
  }>({ showPopover: false, imageSrc: "" });
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchProductos();
    setProductos(result);
  };

  const remove = async (id: string) => {
    await removeProducto(id);
    search();
  };

  const addProducto = () => {
    history.push("/page/producto/new");
  };

  const editProducto = (id: string) => {
    history.push("/page/producto/" + id);
  };

  const handleSearch = (event: CustomEvent) => {
    setSearchTerm(event.detail.value || "");
  };

  const filteredProductos = productos.filter((producto: Producto) => {
    const fullName = `${producto.nombre} ${producto.precio}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const openPopover = (imageSrc: string) => {
    setShowPopover({ showPopover: true, imageSrc });
  };

  const closePopover = () => {
    setShowPopover({ showPopover: false, imageSrc: "" });
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
          <IonGrid>
            <IonRow>
              {filteredProductos.map((producto: Producto) => (
                <IonCol
                  size="12"
                  size-md="6"
                  size-lg="4"
                  key={producto.id_producto}
                >
                  <IonCard>
                    <img
                      src={producto.imagen}
                      alt="Imagen del producto"
                      className="card-image"
                    />
                    <IonCardHeader>
                      <IonCardSubtitle>{producto.nombre}</IonCardSubtitle>
                      <IonCardTitle>S/{producto.precio}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>{producto.descripcion}</IonCardContent>
                    {/* <IonItem>
                      <IonButton
                        color="primary"
                        fill="clear"
                        onClick={() =>
                          editProducto(String(producto.id_producto))
                        }
                      >
                        <IonIcon icon={pencil} slot="icon-only" />
                      </IonButton>
                      <IonButton
                        color="danger"
                        fill="clear"
                        onClick={() => remove(String(producto.id_producto))}
                      >
                        <IonIcon icon={close} slot="icon-only" />
                      </IonButton>
                    </IonItem> */}
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonContent>

        <IonPopover
          isOpen={popoverState.showPopover}
          onDidDismiss={closePopover}
        >
          <img src={popoverState.imageSrc} alt="Imagen del producto" />
        </IonPopover>
      </IonContent>
    </IonPage>
  );
};

export default ProductoList;
