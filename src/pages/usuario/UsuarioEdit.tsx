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
  removeUsuario,
  saveUsuario,
  searchUsuarioById,
  searchUsuarios,
} from "./UsuarioApi";
import Usuario from "./Usuario";

const UsuarioEdit: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [usuario, setUsuario] = useState<Usuario>({});
  const history = useHistory();
  const routeMatch: any = useRouteMatch("/page/usuario/:id");
  const id = routeMatch?.params.id;

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    if (id === "new") {
      setUsuario({});
    } else {
      let result = await searchUsuarioById(id);
      setUsuario(result);
    }
  };

  const save = async () => {
    await saveUsuario(usuario);
    history.push("/page/usuarios");
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
              {id === "new" ? "Agregar Usuario" : "Editar Usuario"}
            </IonTitle>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Nombre</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (usuario.nombre = String(e.detail.value))
                    }
                    value={usuario.nombre}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Apellido</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (usuario.apellido = String(e.detail.value))
                    }
                    value={usuario.apellido}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">cargo</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (usuario.cargo = String(e.detail.value))
                    }
                    value={usuario.cargo}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Dirección</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (usuario.direccion = String(e.detail.value))
                    }
                    value={usuario.direccion}
                  ></IonInput>
                </IonItem>
              </IonCol>

              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (usuario.email = String(e.detail.value))
                    }
                    value={usuario.email}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">dni</IonLabel>
                  <IonInput
                    onIonChange={(e) => (usuario.dni = String(e.detail.value))}
                    value={usuario.dni}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">telefono</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (usuario.telefono = String(e.detail.value))
                    }
                    value={usuario.telefono}
                  ></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">password</IonLabel>
                  <IonInput
                    onIonChange={(e) =>
                      (usuario.password = String(e.detail.value))
                    }
                    value={usuario.password}
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

export default UsuarioEdit;
