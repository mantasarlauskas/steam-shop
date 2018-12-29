export const url = 'http://localhost:5000';
export const config = token => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});