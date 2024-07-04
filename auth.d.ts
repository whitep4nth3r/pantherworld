declare module "#auth-utils" {
  interface User {
    accessToken: string;
    image: string;
    name: string;
  }

  interface UserSession {
    // Add your own fields
  }
}

export {};
