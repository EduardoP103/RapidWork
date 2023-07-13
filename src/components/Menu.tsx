import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  card,
  cardOutline,
  cubeOutline,
  heartOutline,
  heartSharp,
  home,
  homeOutline,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  peopleCircle,
  personCircleOutline,
  speedometerOutline,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";
import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Usuario",
    url: "/page/usuarios",
    iosIcon: peopleCircle,
    mdIcon: peopleCircle,
  },
  {
    title: "Cliente",
    url: "/page/clientes",
    iosIcon: personCircleOutline,
    mdIcon: personCircleOutline,
  },
  {
    title: "Despacho",
    url: "/page/despachos",
    iosIcon: home,
    mdIcon: home,
  },
  {
    title: "Inventario",
    url: "/page/inventarios",
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
  },
  {
    title: "Pedido",
    url: "/page/pedidos",
    iosIcon: speedometerOutline,
    mdIcon: speedometerOutline,
  },
  {
    title: "Producto",
    url: "/page/productos",
    iosIcon: cubeOutline,
    mdIcon: cubeOutline,
  },
];

const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonImg
            src="/public/logo.png"
            alt="RapidWork"
            style={{ width: "50%" }}
          ></IonImg>

          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
