const TOKEN_KEY = "accessToken";

export const setAccessToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeAccessToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};
