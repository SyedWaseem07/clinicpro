import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast"

import LogoWhite from "../assets/LogoWhite.gif"
import LogoDark from "../assets/LogoDark.gif"
import { MdOutlineDashboard } from "react-icons/md";
import { CiMemoPad } from "react-icons/ci";
import { ImSearch } from "react-icons/im";
import { FaAddressCard } from "react-icons/fa6";
import { MdPersonAddAlt } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { FaHospitalUser } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { MdFormatListBulleted } from "react-icons/md";

import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Navbar = ({ user, theme, setTheme }) => {

  const { mutate, isLoading } = useMutation({
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
      toast.success("Logout successful");
      queryClient.invalidateQueries({ queryKey: ['authUser'] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const navigator = useNavigate();
  const [checked, setChecked] = useState(false);
  const queryClient = useQueryClient();

  const handleLogoSubmit = () => {
    setChecked(false)
    if (user.role === "doctor") navigator('/user/doctor')
    else navigator('/user/receptionist')
  }
  const handleLogout = () => {
    mutate();
  }

  return (
    <>
      <div className="drawer hidden md:block md:drawer-open md:w-[25%] md:mr-[2%] bg-base-200 border-r-[1px] border-neutral-content">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className='w-full' onClick={(e) => {
            e.preventDefault();
            navigator(`/user/${user.role}/`)
          }}>
            {theme === "forest" ? <img src={LogoDark} alt="dark Logo" className='md:h-[12.5rem] h-32 mx-auto md:mt-2 md:ml-4 cursor-pointer' onClick={handleLogoSubmit} /> : <img src={LogoWhite} alt="light Logo" className='md:h-[12.5rem] h-32 mx-auto md:mt-2 md:ml-4 cursor-pointer' onClick={handleLogoSubmit} />}
          </div>
          <ul className="menu text-base-content w-80 px-4">
            {user.role === "doctor" ? (<>
              <NavLink to="/user/doctor/"><li className='hover:bg-neutral rounded-full'><a><MdOutlineDashboard /> Dashboard</a></li></NavLink>
              <NavLink to="/user/doctor/appointments"><li className='hover:bg-neutral rounded-full'><a><CiMemoPad /> Appointments</a></li></NavLink>
              <NavLink to="/user/doctor/patients"><li className='hover:bg-neutral rounded-full'><a><FaAddressCard /> Pateint Details</a></li></NavLink>
              <NavLink to="/user/doctor/searchPatient"><li className='hover:bg-neutral rounded-full'><a><ImSearch /> Search Patient</a></li></NavLink>
            </>) : (<>
              <NavLink to="/user/receptionist/"><li className='hover:bg-neutral rounded-full'><a><CiMemoPad /> Appointments</a></li></NavLink>
              <NavLink to="/user/receptionist/patients"><li className='hover:bg-neutral rounded-full'><a><FaAddressCard /> Pateint Details</a></li></NavLink>
              <NavLink to="/user/receptionist/searchPatient"><li className='hover:bg-neutral rounded-full'><a><ImSearch /> Search Patient</a></li></NavLink>
              <NavLink to="/user/receptionist/addPatient/null"><li className='hover:bg-neutral rounded-full'><a><MdPersonAddAlt /> Add Patient</a></li></NavLink>
              <NavLink to="/user/receptionist/updatePatient"><li className='hover:bg-neutral rounded-full'><a><MdPersonAddAlt /> Update Patient</a></li></NavLink>
              <NavLink to="/user/receptionist/addAppointment"><li className='hover:bg-neutral rounded-full'><a><MdOutlinePostAdd /> Add Appointment</a></li></NavLink>
            </>)}
            <li><label className="flex cursor-pointer gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>

              <input type="checkbox" value={theme} className="toggle 
              theme-controller"
                onClick={(e) => setTheme(theme === "forest" ? "wireframe" : "forest")}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path
                  d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
            </label></li>
            <NavLink to="/"><button className='btn btn-primary mt-2'>Back to Home</button></NavLink>
          </ul>
          <details className='text-base-content gap-2 px-4 py-2 rounded-full dropdown '>
            <summary className="btn m-1 hover:bg-neutral">
              {user.role === "doctor" ? < FaUserDoctor /> : <FaHospitalUser />}
              <span>{user.role === "doctor" ? `Dr. ${user.fullname}` : `Mr. ${user.fullname}`} </span>
              <FaAngleDown />
            </summary>
            <ul className="menu dropdown-end bg-base-100 rounded-box z-[99999] w-52 p-2 shadow">
              <NavLink to={`/user/${user.role}/profile`}><li className='hover:bg-neutral rounded-full'><a>Profile</a></li></NavLink>
              <li className='hover:bg-neutral rounded-full' onClick={handleLogout} aria-disabled={isLoading}><a>Logout</a></li>
            </ul>
          </details>
        </div >
      </div >

      {/* Mobile nav bar */}
      <div className="btm-nav md:hidden z-[999]">
        <button className="text-success"
          onClick={(e) => {
            e.preventDefault();
            navigator(`/user/${user.role}/`)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>

        </button>
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={checked} />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="drawer-button">
              < MdFormatListBulleted size={"1.5rem"} className="text-success" onClick={() => setChecked(true)} />
            </label >
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            {/* Mobile nav links */}
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {theme === "forest" ? <img src={LogoDark} alt="dark Logo" className='h-64  mx-auto md:mt-2 md:ml-4 cursor-pointer' onClick={handleLogoSubmit} /> : <img src={LogoWhite} alt="light Logo" className='h-64 mx-auto md:mt-2 md:ml-4 cursor-pointer' onClick={handleLogoSubmit} />}
              {user.role === "doctor" ? (<>
                <NavLink to="/user/doctor/" onClick={() => setChecked(false)}><li className='hover:bg-neutral rounded-full'><a><MdOutlineDashboard /> Dashboard</a></li></NavLink>
                <NavLink to="/user/doctor/appointments" onClick={() => setChecked(false)}><li className='hover:bg-neutral rounded-full'><a><CiMemoPad /> Appointments</a></li></NavLink>
                <NavLink to="/user/doctor/patients" onClick={() => setChecked(false)}><li className='hover:bg-neutral rounded-full'><a><FaAddressCard /> Pateint Details</a></li></NavLink>
                <NavLink to="/user/doctor/searchPatient" onClick={() => setChecked(false)}><li className='hover:bg-neutral rounded-full'><a><ImSearch /> Search Patient</a></li></NavLink>
              </>) : (<>
                <NavLink to="/user/receptionist/" onClick={() => setChecked(false)}><li className='hover:bg-neutral rounded-full'><a><CiMemoPad /> Appointments</a></li></NavLink>
                <NavLink to="/user/receptionist/patients" onClick={() => setChecked(false)}><li className='hover:bg-neutral rounded-full' ><a ><FaAddressCard /> Pateint Details</a></li></NavLink>
                <NavLink to="/user/receptionist/searchPatient" onClick={() => setChecked(false)}><li className='hover:bg-neutral rounded-full'><a><ImSearch /> Search Patient</a></li></NavLink>
                <NavLink to="/user/receptionist/addPatient/null" onClick={() => setChecked(false)}><li className='hover:bg-neutral rounded-full'><a><MdPersonAddAlt /> Add Patient</a></li></NavLink>
                <NavLink to="/user/receptionist/updatePatient" onClick={() => setChecked(false)}><li className='hover:bg-neutral rounded-full'><a><MdPersonAddAlt /> Update Patient</a></li></NavLink>
                <NavLink to="/user/receptionist/addAppointment" onClick={() => setChecked(false)}><li className='hover:bg-neutral rounded-full'><a><MdOutlinePostAdd /> Add Appointment</a></li></NavLink>
              </>)}
              <li><label className="flex cursor-pointer gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <path
                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <input type="checkbox" value={theme} className="toggle 
              theme-controller"
                  onClick={(e) => {
                    setTheme(theme === "forest" ? "wireframe" : "forest")
                    setChecked(false)
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </label></li>
              <NavLink to="/"><button className='btn btn-primary'>Back to Home</button></NavLink>
              <button className='btn btn-primary mt-2 w-[44%]' onClick={() => setChecked(false)}>Close</button>
            </ul>
            {/* Profile, logout dropdowwn */}
            <button className="text-success dropdown" id='profile'
            >
              <details className="dropdown">
                <summary className="btn mt-2 hover:bg-neutral">
                  {user.role === "doctor" ? < FaUserDoctor /> : <FaHospitalUser />}
                  <span>{user.role === "doctor" ? `Dr. ${user.fullname}` : `Mr. ${user.fullname}`}</span>
                  <FaAngleDown />
                </summary>
                <ul className="menu bg-base-100 rounded-box  shadow">
                  <NavLink to={`/user/${user.role}/profile`} onClick={() => setChecked(false)}><li className='hover:bg-neutral rounded-full'><a>Profile</a></li></NavLink>
                  <li className='hover:bg-neutral rounded-full' onClick={() => {
                    setChecked(false)
                    mutate();
                  }} aria-disabled={isLoading}><a>Logout</a></li>
                </ul>
              </details>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar