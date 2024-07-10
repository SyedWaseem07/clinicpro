import React from 'react'
import Doctor from "../assets/doctor.png"
import { NavLink, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Footer from '../components/Footer'

const HomePage = ({ theme, setTheme, user }) => {
  const navigator = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ username, password, role }) => {
      try {
        const res = await axios.post("/api/v1/users/login", { username, password, role });
        return res;
      } catch (error) {
        const index = error.response.data.indexOf("<pre>")
        const Lastindex = error.response.data.indexOf("<br>")
        const errMsg = error.response.data.substring(index + 5, Lastindex);
        throw new Error(errMsg);
      }
    },
    onSuccess: (data) => {
      toast.success(`You are now ${data.data.data.role.charAt(0).toUpperCase() + data.data.data.role.substring(1)} of ClinicPro. Click on right side ${data.data.data.role.charAt(0).toUpperCase() + data.data.data.role.substring(1) + "'s Home button to explore"} `)
      queryClient.invalidateQueries({ queryKey: ['authUser'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const { mutate: logout, isPending: logoutPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.post("/api/v1/users/logout");
        return res;
      } catch (error) {
        const index = error?.response?.data?.indexOf("<pre>")
        const Lastindex = error?.response?.data?.indexOf("<br>")
        const errMsg = error?.response?.data?.substring(index + 5, Lastindex);
        throw new Error(errMsg);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const handleDoctorClick = () => {
    if (user) {
      if (user.role !== "doctor") logout()
      else {
        toast.success("You are already Doctor. Click on right side Doctor's Home button to explore");
        return;
      }
    }
    if (!logoutPending) {
      mutate({ username: "testdoctor", password: "Test@123", role: "doctor" });
    }
  }

  const handleReceptionistClick = () => {
    if (user) {
      if (user.role !== "receptionist") logout()
      else {
        toast.success("You are already Receptionist. Click on right side Receptionist's Home button to explore");
        return;
      }
    }
    mutate({ username: "testreceptionist", password: "Test@1234", role: "receptionist" })
  }
  return (
    <div className='max-w-[1240px] w-full mx-auto'>
      <Header theme={theme} setTheme={setTheme} user={user} />
      <div className="hero bg-base -my-20 md:my-0">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={Doctor}
            className="max-w-[10rem] xs:w-full md:max-w-sm rounded-lg" />
          <div>
            <h1 className="text-3xl md:text-5xl font-bold myb-4 flex flex-wrap md:block">ClinicPro - <span className='bg-primary text-primary-content rounded-md p-1 hover:bg-base-300 hover:text-base-content'>Manage With Ease</span></h1>
            <p className="mt-6 mb-2">
              Clinic management system designed for effiecient management of home clinics.
            </p>
            <p className="mb-4">
              It includes 2 roles <span className={`${theme === "forest" ? "text-primary" : "text-secondary-content"} font-semibold text-lg`}>Doctor</span> and <span className={`${theme === "forest" ? "text-primary" : "text-secondary-content"} font-semibold text-lg`}>Receptionist</span> and features of both are listed in header
            </p>
            <NavLink to="/login"><button className="btn btn-primary">Get Started</button></NavLink>
            <p className={`py-6 ${theme === "forest" ? "text-neutral-content" : "text-secondary-content"}`}>Wanna explore without putting effort of logging in <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className={`font-bold no-underline hover:underline cursor-pointer ${theme === "forest" ? "text-primary" : "text-secondary-content"}`}>Click here</div>
              <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow bg-base-300">
                <li className='hover:bg-primary hover:text-primary-content rounded-full' onClick={handleDoctorClick} disabled={isPending}><button disabled={isPending}>Doctor{isPending && <span className="loading loading-spinner loading-sm text-primary-content"></span>}</button></li>
                <li className='hover:bg-primary hover:text-primary-content rounded-full' onClick={handleReceptionistClick} disabled={isPending}><button disabled={isPending}>Receptionist{isPending && <span className="loading loading-spinner loading-sm text-primary-content"></span>}</button></li>
              </ul>
            </div>
            </p>
          </div>
        </div>
      </div>
      <div className="divider divider-neutral md:-my-2 mt-16"></div>
      <Footer />
    </div >
  )
}

export default HomePage