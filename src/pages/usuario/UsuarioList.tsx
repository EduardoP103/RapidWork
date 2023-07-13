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
import { removeUsuario, saveUsuario, searchUsuarios } from "./UsuarioApi";
import Usuario from "./Usuario";

import "../../theme/table.css";

const UsuarioList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [usuarios, setUsuarioes] = useState<Usuario[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchUsuarios();
    setUsuarioes(result);
  };

  const remove = async (id: string) => {
    await removeUsuario(id);
    search();
  };

  const addUsuario = () => {
    history.push("/page/usuario/new");
  };

  const editUsuario = (id: string) => {
    history.push("/page/usuario/" + id);
  };

  const handleSearch = (event: CustomEvent) => {
    setSearchTerm(event.detail.value || "");
  };

  const filteredUsuarios = usuarios.filter((usuario: Usuario) => {
    const fullName = `${usuario.nombre} ${usuario.apellido}`;
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
            <IonTitle>Listado de Usuarios</IonTitle>
            <IonItem>
              <IonButton
                onClick={addUsuario}
                color="primary"
                fill="solid"
                slot="end"
                size="default"
              >
                <IonIcon icon={add} />
                Agregar Usuario
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
                  <IonCol>Cargo</IonCol>
                  <IonCol>Dirección</IonCol>
                  <IonCol>Email</IonCol>
                  <IonCol>Teléfono</IonCol>
                  <IonCol>Password</IonCol>
                  <IonCol>Acciones</IonCol>
                </IonRow>
                {filteredUsuarios.map((usuario: Usuario) => (
                  <IonRow className="data-row" key={usuario.idUsuario}>
                    <IonCol>
                      <strong>{usuario.nombre}</strong>
                    </IonCol>
                    <IonCol>
                      <strong>{usuario.apellido}</strong>
                    </IonCol>
                    <IonCol>{usuario.cargo}</IonCol>
                    <IonCol>{usuario.direccion}</IonCol>
                    <IonCol>{usuario.email}</IonCol>
                    <IonCol>{usuario.telefono}</IonCol>
                    <IonCol>
                      <input
                        type="password"
                        value={usuario.password}
                        readOnly
                      />
                    </IonCol>
                    <IonCol className="actions-column">
                      <IonButton
                        color="primary"
                        fill="clear"
                        onClick={() => editUsuario(String(usuario.idUsuario))}
                      >
                        <IonIcon icon={pencil} slot="icon-only" />
                      </IonButton>

                      <IonButton
                        color="danger"
                        fill="clear"
                        onClick={() => remove(String(usuario.idUsuario))}
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

export default UsuarioList;
