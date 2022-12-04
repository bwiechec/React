export const setAccessToken = (s: string) => {
  localStorage.setItem('token', s);
};

export const getAccessToken = (): string => {
  return localStorage.getItem('token') ?? '';
};