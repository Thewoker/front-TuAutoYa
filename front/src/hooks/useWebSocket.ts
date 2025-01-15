import { useEffect } from "react";
import { showNotification } from "../utils/notifications";

const useWebSocket = (onMessageReceived: (message: string) => void) => {
  useEffect(() => {
    // Cambia la URL del WebSocket a la que estés utilizando
    const socket = new WebSocket("wss://tu-servidor.com");

    // Cuando se recibe un mensaje, se llama a la función proporcionada
    socket.onmessage = (event) => {
      const newMessage = event.data;  // Asumimos que el mensaje es un texto
      onMessageReceived(newMessage);  // Llamamos a la función de notificación
      showNotification("Nuevo mensaje", newMessage); // Muestra la notificación
    };

    // Maneja errores de conexión
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cuando la conexión se abre
    socket.onopen = () => {
      console.log("Conexión WebSocket establecida");
    };

    // Limpieza cuando el componente se desmonta
    return () => {
      socket.close();
    };
  }, [onMessageReceived]);

  return null;
};

export default useWebSocket;
