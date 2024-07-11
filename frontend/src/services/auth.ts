// auth.ts
export const checkAuth = async (): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:3000/user/check-auth', {
        method: 'GET',
        credentials: 'include', // Incluir cookies en la solicitud
      });
  
      return response.ok;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  };