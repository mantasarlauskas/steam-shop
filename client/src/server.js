export const url = 'http://localhost:5000';

export const ajax = (route, method, data) => {
  return fetch(`${url}/${route}`, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  });
};