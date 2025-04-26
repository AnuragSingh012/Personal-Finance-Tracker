const USER_ID_KEY = 'userId';
const USER_NAME_KEY = 'userName';

export const saveUserToLocalStorage = (userId, userName) => {
    if(typeof window !== "undefined") {
        localStorage.setItem(USER_ID_KEY, userId);
        localStorage.setItem(USER_NAME_KEY, userName);
    }
}

export const getUserFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem(USER_ID_KEY);
      const userName = localStorage.getItem(USER_NAME_KEY);
      return { userId, userName };
    }
    return { userId: null, userName: null };
};


export const removeUserFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_ID_KEY);
      localStorage.removeItem(USER_NAME_KEY);
    }
};