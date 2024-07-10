import { createContext, useContext, useState } from "react"

// create context
export const UpdatePatientContext = createContext(null);

// Provide context
export const UpdatePatientContextProvider = (props) => {
  const [updatePatientDetails, setUpdatePatientDetails] = useState([]);
  return (
    <UpdatePatientContext.Provider value={{ updatePatientDetails, setUpdatePatientDetails }}>
      {props.children}
    </UpdatePatientContext.Provider>
  )
}

// Export Custom hook
export const useUpdatePatientsContext = () => {
  const value = useContext(UpdatePatientContext);
  return value;
}