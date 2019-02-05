// In Safari's incognito mode, attempting to save a value to localStorage 
// will throw an exception, so we wrap the call in a try statement

export const loadAuthToken = () => {
  return localStorage.getItem('authToken');
}

export const saveAuthToken = authToken => {
  try {
    localStorage.setItem('authToken', authToken);
  } catch(e) {}
};

export const clearAuthToken = () => {
  try {
    localStorage.removeItem('authToken');
  } catch(e) {}
};