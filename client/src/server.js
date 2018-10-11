export const url = 'http://localhost:5000';

export const ajax = async (route, method, dispatch, errorAction, successAction, data, token) => {
  let errorExists = false;
  
  await fetch(`${url}/${route}`, {
    method: method,
    body: JSON.stringify(data),
    headers: !token ? {  "Content-Type": "application/json; charset=utf-8" } : 
    { "Content-Type": "application/json; charset=utf-8", "Authorization": `Bearer ${token}` }
  })
  .then(response => {
    if(response.status === 400) errorExists = true;
    return response.json();
  })
  .then(result => errorExists ? errorAction && dispatch(errorAction(result)) : successAction && dispatch(successAction(result)));

  return errorExists;
};