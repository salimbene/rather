import { createContext, useState } from "react";

const FavsContext = createContext([], () => {});

export const FavsProvider = ({ children }) => {
  const [favContent, setFavContent] = useState([]);
  return (
    <FavsContext.Provider value={[favContent, setFavContent]}>
      {children}
    </FavsContext.Provider>
  );
};

export default FavsContext;
