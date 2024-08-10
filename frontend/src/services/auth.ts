// auth.ts
export const checkAuth = async (): Promise<boolean> => {
  try {
    const response = await fetch("http://localhost:3000/user/check-auth", {
      method: "GET",
      credentials: "include", // Incluir cookies en la solicitud
    });

    return response.ok;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

export const userLogin = async (
  email: string,
  password: string,
  setUser: (user: any) => void
): Promise<any> => {
  try {
    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // TODO: Passing user autheticated data to dashboard
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      setUser(data.user);
      return data.user;
    } else {
      return response;
    }
  } catch (error) {
    console.error("Error while loging:", error);
    return false;
  }
};

export const userSignup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const response = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      return response.ok;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error while signing up: ", error);
    return false;
  }
};

export const userLogout = async (
  setUser: (user: any) => void
): Promise<boolean> => {
  try {
    const response = await fetch("http://localhost:3000/user/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setUser(null);
      return response.ok;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error while loging out: ", error);
    return false;
  }
};
