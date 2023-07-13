import React, { useState, useEffect } from "react";
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
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonPopover,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { add, close, pencil, trash, image, cart } from "ionicons/icons";
import { removeProducto, saveProducto, searchProductos } from "./ProductoApi";
import Producto from "./Producto";

import "../../theme/table.css";

const ProductoList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [popoverState, setPopoverState] = useState<{
    showPopover: boolean;
    imageSrc: string;
    cartItems: Producto[];
  }>({ showPopover: false, imageSrc: "", cartItems: [] });
  const history = useHistory();

  useEffect(() => {
    search();
  }, []);

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
    setPopoverState({ ...popoverState, showPopover: true, imageSrc });
  };

  const closePopover = () => {
    setPopoverState({ ...popoverState, showPopover: false });
  };

  const addToCart = (producto: Producto) => {
    const updatedCartItems = [...popoverState.cartItems, producto];
    setPopoverState({
      ...popoverState,
      showPopover: true,
      imageSrc: producto.imagen,
      cartItems: updatedCartItems,
    });
  };

  const navigateToCart = () => {
    history.push("/carrito");
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of popoverState.cartItems) {
      totalPrice += item.precio;
    }
    return totalPrice;
  };

  const handlePay = () => {
    // Lógica para realizar el pago
    console.log("Pago realizado");
  };

  const handleCancel = () => {
    // Lógica para cancelar la lista de productos
    setPopoverState({ showPopover: false, imageSrc: "", cartItems: [] });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={navigateToCart}>
              <IonIcon icon={cart} />
              {popoverState.cartItems.length > 0 && (
                <span className="cart-count">
                  {popoverState.cartItems.length}
                </span>
              )}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonSearchbar
            value={searchTerm}
            onIonChange={handleSearch}
            placeholder="Buscar productos..."
          ></IonSearchbar>

          <IonGrid>
            <IonRow>
              {filteredProductos.map((producto: Producto) => (
                <IonCol
                  size="12"
                  size-md="6"
                  size-lg="4"
                  key={producto.productoId}
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
                    <IonItem>
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
                      <IonButton
                        color="success"
                        fill="clear"
                        onClick={() => addToCart(producto)}
                      >
                        <IonIcon icon={cart} slot="icon-only" />
                      </IonButton>
                    </IonItem>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonContent>

        <IonPopover
          isOpen={popoverState.showPopover}
          onDidDismiss={closePopover}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <IonList>
            <IonListHeader>Carrito de Compras</IonListHeader>
            {popoverState.cartItems.map((item: Producto) => (
              <IonItem key={item.productoId}>
                {item.nombre} - S/{item.precio}
              </IonItem>
            ))}
            <IonItem>Total: S/{calculateTotalPrice().toFixed(2)}</IonItem>
          </IonList>
          <IonButton expand="block" onClick={handlePay}>
            Pagar
          </IonButton>
          <IonButton expand="block" fill="clear" onClick={handleCancel}>
            Cancelar
          </IonButton>
        </IonPopover>
      </IonContent>
    </IonPage>
  );
};

export default ProductoList;
