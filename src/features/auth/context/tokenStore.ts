const TOKEN_KEY = "accessToken";

export const setAccessToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const removeAccessToken = () => {
  if (getAccessToken()) {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};
