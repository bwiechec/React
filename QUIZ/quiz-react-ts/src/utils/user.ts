export const setLogin = (s: string) => {
  localStorage.setItem('login', s);
};

export const getLogin = ():string => {
  return localStorage.getItem('login') ?? '';
};