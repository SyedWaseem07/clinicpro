import { createContext, useContext, useState } from "react";

// create context
const SearchedPatientsContext = createContext(null);

// Provide Context
export const SearchedPatientsContextProvider = (props) => {
  const [filteredPatients, setFilteredPatients] = useState([]);

  return (
    <SearchedPatientsContext.Provider value={{ filteredPatients, setFilteredPatients }}>
      {props.children}
    </SearchedPatientsContext.Provider>
  )
}

// Export custom hook
export const useSearchedPatientsContext = () => {
  const value = useContext(SearchedPatientsContext);
  return value;
}