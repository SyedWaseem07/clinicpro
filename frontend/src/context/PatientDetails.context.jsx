import { createContext, useContext, useState } from "react"

// create context
export const PatientsContext = createContext(null);

// Provide Context
export const PatientsContextProvider = (props) => {
  const [visitedPatients, setVisitedPatients] = useState([]);

  return (
    <PatientsContext.Provider value={{ visitedPatients, setVisitedPatients }}>
      {props.children}
    </PatientsContext.Provider>
  )
}

// Export custom hook
export const usePatientsContext = () => {
  const value = useContext(PatientsContext);
  return value;
}

