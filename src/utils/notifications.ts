export const requestNotificationPermission = () => {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
};

export const showNotification = (title: string, message: string) => {
    if (Notification.permission === "granted") {
        new Notification(title, {
            body: message,
            icon: "/path/to/icon.png",  // Puedes agregar un ícono si lo deseas
        });
    }
};
