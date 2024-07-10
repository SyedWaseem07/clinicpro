import { createContext, useContext, useState } from "react";

// create context
const TotalAppointmentsContext = createContext(null);

// Provide Context
export const TotalAppointmentsContextProvider = (props) => {
  const [totalApps, setTotalApps] = useState(0);
  const [appLeft, setappLeft] = useState(0);

  return (
    <TotalAppointmentsContext.Provider value={{ totalApps, setTotalApps, appLeft, setappLeft }}>
      {props.children}
    </TotalAppointmentsContext.Provider>
  )
}

// Export custom hook
export const useTotalAppointmentsContext = () => {
  const value = useContext(TotalAppointmentsContext);
  return value;
}