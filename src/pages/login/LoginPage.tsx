import React, { useState } from "react";
import {
  IonContent,
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonAlert,
} from "@ionic/react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación

    if (email === "usuario@example.com" && password === "contraseña") {
      // Lógica para iniciar sesión exitosamente
      console.log("Inicio de sesión exitoso");
    } else {
      // Mostrar una alerta si las credenciales son incorrectas
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">Correo electrónico</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            required
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            required
          ></IonInput>
        </IonItem>
        <IonButton expand="full" onClick={handleLogin}>
          Iniciar sesión
        </IonButton>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Credenciales incorrectas"
          message="Por favor, verifica tu correo electrónico y contraseña."
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
