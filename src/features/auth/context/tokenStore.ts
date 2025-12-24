const TOKEN_KEY = "accessToken";

export const setAccessToken = (token: string | null): void => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const removeAccessToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};
