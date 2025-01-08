export const loginToBackend = async (token: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to login to backend");
      }
  
      return response.json();
    } catch (error) {
      console.error("Error al loguear en el backend:", error);
      throw error;
    }
  };
  