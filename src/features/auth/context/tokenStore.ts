// Note: Access token should be stored in a variable not localStorage.
// The problem is that, I cant make it to work. When the user refresh the page
// They will be logged out and refreshToken returns invalid for some reason.
// There is definitely a problem with how we handle refreshToken logic.
// This is currently working so I am not touching this :p
// Submit a PR maybe?

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
