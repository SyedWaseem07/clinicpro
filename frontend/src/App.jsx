import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AllAppointmentsPage from './pages/common/AllAppointmentsPage'
import AllPatientsPage from './pages/common/AllPatientsPage'
import Navbar from './components/Navbar'
import SearchPatient from './pages/common/SearchPatient'
import Profile from './pages/common/Profile'
import ChangePassword from './pages/common/ChangePassword'
import AddPatientDetails from './pages/receptionist/AddPatientDetails'
import AddAppointment from './pages/receptionist/AddAppointment'
import UpdatePatientDetails from './pages/receptionist/UpdatePatientDetails'
import Dashboard from './pages/doctor/Dashboard'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast from "react-hot-toast"
import PatientDetailsPage from './pages/common/PatientDetailsPage'
import { usePatientsContext } from "./context/PatientDetails.context"
import { useTotalAppointmentsContext } from "./context/TotalAppointments.context"
import HomePage from './pages/HomePage'
const App = () => {
  const [theme, setTheme] = useState('forest');
  const { visitedPatients, setVisitedPatients } = usePatientsContext();
  const { totalApps, setTotalApps, appLeft, setappLeft } = useTotalAppointmentsContext()
  const location = useLocation();

  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await axios.get('/api/v1/users/getCurrentUser');
        return res.data.data;
      } catch (error) {
        return null;
      }
    }
  })
  const { data: patients, isSuccess, refetch, isRefetching } = useQuery({
    queryKey: ['allPatients'],
    queryFn: async () => {
      try {
        if (authUser) {
          const res = await axios.get('/api/v1/users/allPatientDetails');
          return res.data.data;
        }
        return null
      } catch (error) {
        return null;
      }
    }
  })

  const { data: todaysAppointments, isSuccess: dailyAppSuccess, refetch: todayReftech, isRefetchError: todaysRefetchError } = useQuery({
    queryKey: ['todaysAppointments'],
    queryFn: async () => {
      try {
        const res = await axios.get('/api/v1/users/dailyAppointments');
        return res.data.data;
      } catch (error) {
        if (authUser) toast.error("unable to fetch Todays Appointments");
        return [];
      }
    }
  })
  useEffect(() => {
    if (isSuccess && patients)
      if (patients) setVisitedPatients(Array.from(patients));
    if (dailyAppSuccess && todaysAppointments)
      if (todaysAppointments) {
        setTotalApps(Array.from(todaysAppointments).length);
        setappLeft(Array.from(todaysAppointments).length);
      }
  }, [isSuccess, dailyAppSuccess])
  return (
    <div className='flex w-full md:mb-0' data-theme={theme}>
      {authUser && location.pathname !== '/' && <Navbar user={authUser} theme={theme} setTheme={setTheme} />}
      <Routes>
        <Route path='/' element={<HomePage theme={theme} setTheme={setTheme} user={authUser} />} />
        <Route path='/login' element={!authUser ? <LoginPage theme={theme} setTheme={setTheme} user={authUser} /> : <Navigate to={`/user/${authUser.role}/`} />} />
        <Route path='user'>
          <Route path='receptionist' >
            <Route path='' element={authUser && authUser.role === "receptionist" ? <AllAppointmentsPage user={authUser} /> : <Navigate to="/" />} />
            <Route path='updatePatient' element={authUser && authUser.role === "receptionist" ? <SearchPatient fromSearch={true} fromUpdate={true} /> : <Navigate to="/" />} />
            <Route path='addPatient/:name' element={authUser && authUser.role === "receptionist" ? <AddPatientDetails /> : <Navigate to="/" />} />
            <Route path='addAppointment' element={authUser && authUser.role === "receptionist" ? <AddAppointment /> : <Navigate to="/" />} />
            <Route path='update/:name' element={authUser && authUser.role === "receptionist" ? <UpdatePatientDetails /> : <Navigate to="/" />} />
            <Route path='patients' element={authUser && authUser.role === "receptionist" ? <AllPatientsPage fromHome={true} /> : <Navigate to="/" />} />
            <Route path='searchPatient' element={authUser ? <SearchPatient fromSearch={true} /> : <Navigate to="/" />} />
            <Route path='profile' element={authUser && authUser.role === "receptionist" ? <Profile /> : <Navigate to="/" />} />
            <Route path='changePassword' element={authUser && authUser.role === "receptionist" ? <ChangePassword /> : <Navigate to="/" />} />
            <Route path='patientInfo/:name/:fromSearch/:fromUpdate' element={authUser && authUser.role === "receptionist" ? <PatientDetailsPage /> : <Navigate to="/" />} />
            <Route path='patientInfo/:name/' element={authUser && authUser.role === "receptionist" ? <PatientDetailsPage /> : <Navigate to="/" />} />
            <Route path='patientInfo/:name/:fromSearch' element={authUser && authUser.role === "receptionist" ? <PatientDetailsPage /> : <Navigate to="/" />} />
            <Route path='patientInfo/:name/:fromUpdate' element={authUser && authUser.role === "receptionist" ? <PatientDetailsPage /> : <Navigate to="/" />} />
          </Route>
          <Route path='doctor' >
            <Route path='' element={authUser && authUser.role === "doctor" ? <Dashboard user={authUser} /> : <Navigate to="/" />} />
            <Route path='patients' element={authUser && authUser.role === "doctor" ? <AllPatientsPage fromHome={true} /> : <Navigate to="/" />} />
            <Route path='searchPatient' element={authUser && authUser.role === "doctor" ? <SearchPatient fromSearch={true} /> : <Navigate to="/" />} />
            <Route path='profile' element={authUser && authUser.role === "doctor" ? <Profile /> : <Navigate to="/" />} />
            <Route path='changePassword' element={authUser && authUser.role === "doctor" ? <ChangePassword /> : <Navigate to="/" />} />
            <Route path='appointments' element={authUser && authUser.role === "doctor" ? <AllAppointmentsPage user={authUser} /> : <Navigate to="/" />} />
            <Route path='patientInfo/:name/' element={authUser && authUser.role === "doctor" ? <PatientDetailsPage /> : <Navigate to="/" />} />
            <Route path='patientInfo/:name/:fromSearch' element={authUser && authUser.role === "doctor" ? <PatientDetailsPage /> : <Navigate to="/" />} />
            <Route path='patientInfo/:name/:fromUpdate' element={authUser && authUser.role === "doctor" ? <PatientDetailsPage /> : <Navigate to="/" />} />
            <Route path='profile' element={authUser && authUser.role === "doctor" ? <Profile /> : <Navigate to="/" />} />
          </Route>
        </Route>

      </Routes>
      <Toaster />
    </div>
  )
}

export default App
