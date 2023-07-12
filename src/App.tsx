import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactHashRouter, IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages/Page";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import ClienteList from "./pages/cliente/ClienteList";
import ClienteEdit from "./pages/cliente/ClienteEdit";
import DespachoList from "./pages/despacho/DespachoList";
import DespachoEdit from "./pages/despacho/DespachoEdit";
import UsuarioList from "./pages/usuario/UsuarioList";
import UsuarioEdit from "./pages/usuario/UsuarioEdit";
import ProductoList from "./pages/producto/ProductoList";
import ProductoEdit from "./pages/producto/ProductoEdit";
import InventarioEdit from "./pages/inventario/InventarioEdit";
import InventarioList from "./pages/inventario/InventarioList";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactHashRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/page/usuario/:id" exact={true}>
              <UsuarioEdit />
            </Route>
            <Route path="/page/usuarios" exact={true}>
              <UsuarioList />
            </Route>
            <Route path="/page/cliente/:id" exact={true}>
              <ClienteEdit />
            </Route>
            <Route path="/page/clientes" exact={true}>
              <ClienteList />
            </Route>
            <Route path="/page/despachos" exact={true}>
              <DespachoList />
            </Route>
            <Route path="/page/despachos/:id" exact={true}>
              <DespachoEdit />
            </Route>
            <Route path="/page/producto/:id" exact={true}>
              <ProductoEdit />
            </Route>
            <Route path="/page/productos" exact={true}>
              <ProductoList />
            </Route>
            <Route path="/page/inventario/:id" exact={true}>
              <InventarioEdit />
            </Route>
            <Route path="/page/inventarios" exact={true}>
              <InventarioList />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactHashRouter>
    </IonApp>
  );
};

export default App;
