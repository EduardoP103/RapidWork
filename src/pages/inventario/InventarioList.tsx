import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  IonImg,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { add, close, pencil, trash } from "ionicons/icons";
import {
  removeInventario,
  saveInventario,
  searchInventarios,
} from "./InventarioApi";
import Inventario from "./Inventario";

import "../../theme/table.css";
import "./InventarioList.css";

const InventarioList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [inventarios, setInventarioes] = useState<Inventario[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchInventarios();
    setInventarioes(result);
  };

  const remove = async (id: string) => {
    await removeInventario(id);
    search();
  };

  const addInventario = () => {
    history.push("/page/inventario/new");
  };

  const editInventario = (id: string) => {
    history.push("/page/inventario/" + id);
  };

  const handleSearch = (event: CustomEvent) => {
    setSearchTerm(event.detail.value || "");
  };

  const filteredInventarios = inventarios.filter((inventario: Inventario) => {
    const fullName = `${inventario.nombre} ${inventario.cantidad}`;
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
            <IonTitle>Listado de Inventarios</IonTitle>
            <IonItem>
              <IonButton
                onClick={addInventario}
                color="primary"
                fill="solid"
                slot="end"
                size="default"
              >
                <IonIcon icon={add} />
                Agregar Inventario
              </IonButton>
            </IonItem>

            <IonSearchbar
              value={searchTerm}
              onIonInput={handleSearch}
            ></IonSearchbar>

            <div className="card-container">
              {filteredInventarios.map((inventario: Inventario) => (
                <IonCard key={inventario.id_inventario}>
                  <IonCardContent>
                    <IonTitle>{inventario.nombre}</IonTitle>
                    <IonImg
                      src={inventario.id_producto.imagen}
                      alt="Imagen del producto"
                    />
                    <IonRow>
                      <IonCol>Cantidad: {inventario.cantidad}</IonCol>
                      <IonCol>
                        Fecha de Entrada: {inventario.fechaingreso}
                      </IonCol>
                      <IonCol>Proveedor: {inventario.proveedor}</IonCol>
                      <IonCol>
                        Precio de Compra: {inventario.preciocompra}
                      </IonCol>
                      <IonCol>Precio de Venta: {inventario.precioventa}</IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <IonButton
                          color="primary"
                          fill="clear"
                          onClick={() =>
                            editInventario(String(inventario.id_inventario))
                          }
                        >
                          <IonIcon icon={pencil} slot="icon-only" />
                        </IonButton>
                      </IonCol>
                      <IonCol>
                        <IonButton
                          color="danger"
                          fill="clear"
                          onClick={() =>
                            remove(String(inventario.id_inventario))
                          }
                        >
                          <IonIcon icon={close} slot="icon-only" />
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          </IonCard>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default InventarioList;
