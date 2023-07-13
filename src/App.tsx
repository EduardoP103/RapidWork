import React from "react";
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
// import Carrito from "./pages/carrito_compras/Carrito";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";
import PedidoEdit from "./pages/pedido/PedidoEdit";
import PedidoList from "./pages/pedido/PedidoList";

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

            <Route path="/page/pedido/:id" exact={true}>
              <PedidoEdit />
            </Route>
            <Route path="/page/pedidos" exact={true}>
              <PedidoList />
            </Route>

            <Route path="/carrito" exact={true}>
              <Carrito />
            </Route>
            <Route exact path="/">
              <Redirect to="/page/productos" />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactHashRouter>
    </IonApp>
  );
};

export default App;
