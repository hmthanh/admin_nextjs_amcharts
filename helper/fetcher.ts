export const fetcher = (url: string, init?: RequestInit) => {
  return fetch(url, init).then((res: Response) => {
    return res.json();
  });
};
