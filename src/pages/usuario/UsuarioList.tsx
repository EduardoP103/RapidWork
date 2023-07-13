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
  IonPopover,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { add, close, downloadOutline, pencil } from "ionicons/icons";
import { useEffect, useState } from "react";
import { removeUsuario, searchUsuarios } from "./UsuarioApi";
import Usuario from "./Usuario";
import { utils as XLSXUtils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../../theme/table.css";

const UsuarioList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showPopover, setShowPopover] = useState(false);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchUsuarios();
    setUsuarios(result);
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

  const exportToExcel = () => {
    const worksheet = XLSXUtils.json_to_sheet(usuarios);
    const workbook = XLSXUtils.book_new();
    XLSXUtils.book_append_sheet(workbook, worksheet, "Usuarios");
    writeFile(workbook, "usuarios.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableData = usuarios.map((usuario) => [
      usuario.nombre,
      usuario.apellido,
      usuario.cargo,
      usuario.direccion,
      usuario.email,
      usuario.telefono,
    ]);
    doc.autoTable({
      head: [["Nombre", "Apellido", "Cargo", "Dirección", "Email", "Teléfono"]],
      body: tableData,
    });
    doc.save("usuarios.pdf");
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

              <IonButton
                onClick={() => setShowPopover(true)}
                color="primary"
                fill="solid"
                slot="end"
                size="default"
              >
                <IonIcon icon={downloadOutline} />
                Exportar
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

          <IonPopover
            isOpen={showPopover}
            onDidDismiss={() => setShowPopover(false)}
          >
            <IonButton
              onClick={exportToExcel}
              expand="full"
              color="primary"
              fill="solid"
            >
              Exportar a Excel
            </IonButton>
            <IonButton
              onClick={exportToPDF}
              expand="full"
              color="primary"
              fill="solid"
            >
              Exportar a PDF
            </IonButton>
          </IonPopover>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default UsuarioList;
