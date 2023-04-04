import { createContext, useState } from 'react';

const UserContext = createContext("");

const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [cats, setCats] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser, cats, setCats}}>
      {children }
    </UserContext.Provider>
  )
}

export {UserContext, UserContextProvider}