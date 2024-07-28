import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { nanoid } from "nanoid"

import { usePatientsContext } from "../../context/PatientDetails.context"

let temp = []
const AllAppointmentsPage = ({ user }) => {

  const { data: allAppointments, isSuccess: allAppSuccess, refetch, isRefetchError: allReftchError } = useQuery({
    queryKey: ['allAppointments'],
    queryFn: async () => {
      try {
        const res = await axios.get('/api/v1/users/appointments');
        return res.data.data;
      } catch (error) {
        toast.error("unable to fetch Todays Appointments")
        return [];
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
        toast.error("unable to fetch Todays Appointments")
        return [];
      }
    }
  })

  const { data: patients, isSuccess, refetch: allPatientRefetch } = useQuery({
    queryKey: ['allPatients'],
    queryFn: async () => {
      try {
        const res = await axios.get('/api/v1/users/allPatientDetails');
        return res.data.data;
      } catch (error) {
        return null;
      }
    }
  })

  const { mutate: weekDelete, isPending: weekDeletePedning } = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.delete('/api/v1/users/receptionist/deleteLastWeekAppointments');
        return res.data.data;
      } catch (error) {
        const index = error.response.data.indexOf("<pre>")
        const Lastindex = error.response.data.indexOf("<br>")
        const errMsg = error.response.data.substring(index + 5, Lastindex);
        toast.error(errMsg)

      }
    },
    onSuccess: (data) => {
      if (data) {
        toast.success("Last weeks appointments deleted");
        refetch();
        todayReftech();
      }
    }
  })

  const { mutate: monthDelete, isPending: monthDeletePedning } = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.delete('/api/v1/users/receptionist/deleteLastMonthAppointments');
        return res.data.data;
      } catch (error) {
        const index = error.response.data.indexOf("<pre>")
        const Lastindex = error.response.data.indexOf("<br>")
        const errMsg = error.response.data.substring(index + 5, Lastindex);
        toast.error(errMsg)
      }
    },
    onSuccess: (data) => {
      if (data) {
        toast.success("Last months appointments deleted");
        refetch();
        todayReftech();
      }
    }
  })

  const [showTodaysApp, setShowTodaysApp] = useState(true);
  const [confirmWeekDelete, setConfirmWeekDelete] = useState(false);
  const [confirmMonthDelete, setConfirmMonthDelete] = useState(false);
  const [showAllApp, setShowAllApp] = useState(false);
  const { visitedPatients, setVisitedPatients } = usePatientsContext();
  const queryClient = useQueryClient();
  const [names, setNames] = useState([]);

  useEffect(() => {
    allPatientRefetch();
    refetch();
    todayReftech();

    if (!dailyAppSuccess || !allAppSuccess) queryClient.invalidateQueries({ queryKey: ['authUser'] })

    visitedPatients.map(item => {
      temp.push(item.patient_name)
    })
    setNames(temp);
  }, [])

  useEffect(() => {
    if (isSuccess && patients) setVisitedPatients(Array.from(patients))
  }, [isSuccess])

  if (confirmWeekDelete) {
    weekDelete();
    setConfirmWeekDelete(false);
  }

  if (confirmMonthDelete) {
    monthDelete();
    setConfirmMonthDelete(false);
  }

  const handleLastWeekDelete = () => {
    setConfirmWeekDelete(false);
    document.getElementById('deleteWeekDialogue').showModal();
  }

  const handleLastMonthDelete = () => {
    setConfirmMonthDelete(false);
    document.getElementById('deleteMonthDialogue').showModal();
  }

  if (!dailyAppSuccess || !allAppSuccess) return (<div className='skeleton md:w-[70%]  w-[100%] px-5 md:px-0 mx-auto mt-7 font-semibold'>
    <h3 className='skeleton my-4 text-2xl font-bold text-neutral-content text-center'></h3>
    <div className='skeleton md:w-[70%]  w-[100%] px-5 md:px-0 mx-auto mt-7 font-semibold bg-neutral'>
      <h3 className='skeleton my-4'></h3>
      <div className="skeleton collapse collapse-plus border-b-2 border-primary">
        <input type="radio" name="my-accordion-3" checked />
        <div className="skeleton collapse-title">
        </div>
        <div className="skeleton bg-neutral">
          <div className="skeleton overflow-x-auto bg-neutral">
            <table className="skeleton table table-xs md:table-sm font-semibold">
              {/* head */}
              <thead className='skeleton '>
                <tr className='skeleton'>
                  <th className='skeleton'></th>
                  <th className='skeleton'></th>
                  <th className='skeleton'></th>
                  <th className='hidden md:block skeleton'></th>
                  <th className='hidden md:block skeleton'></th>
                  <th className='skeleton'></th>
                  <th className='skeleton'></th>
                </tr>
              </thead>
              <tbody className='skeleton'>
                <tr className='skeleton'>
                  <th className='skeleton'></th>
                  <td className='skeleton'></td>
                  <td className='skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='skeleton'></td>
                  <td className=' skeleton'></td>
                </tr>
                <tr className='skeleton'>
                  <th className='skeleton'></th>
                  <td className='skeleton'></td>
                  <td className='skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='skeleton'></td>
                  <td className=' skeleton'></td>
                </tr>
                <tr className='skeleton'>
                  <th className='skeleton'></th>
                  <td className='skeleton'></td>
                  <td className='skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='skeleton'></td>
                  <td className=' skeleton'></td>
                </tr>
                <tr className='skeleton'>
                  <th className='skeleton'></th>
                  <td className='skeleton'></td>
                  <td className='skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='skeleton'></td>
                  <td className=' skeleton'></td>
                </tr>
                <tr className='skeleton'>
                  <th className='skeleton'></th>
                  <td className='skeleton'></td>
                  <td className='skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='skeleton'></td>
                  <td className=' skeleton'></td>
                </tr>
                <tr className='skeleton'>
                  <th className='skeleton'></th>
                  <td className='skeleton'></td>
                  <td className='skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='skeleton'></td>
                  <td className=' skeleton'></td>
                </tr>
                <tr className='skeleton'>
                  <th className='skeleton'></th>
                  <td className='skeleton'></td>
                  <td className='skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='skeleton'></td>
                  <td className=' skeleton'></td>
                </tr>
                <tr className='skeleton'>
                  <th className='skeleton'></th>
                  <td className='skeleton'></td>
                  <td className='skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='skeleton'></td>
                  <td className=' skeleton'></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div className='skeleton md:w-[70%]  w-[100%] px-5 md:px-0 mx-auto mt-7 font-semibold'>
      <h3 className='skeleton my-4'></h3>
      <div className="skeleton collapse collapse-plus  border-b-2 border-primary">
        <input type="radio" name="my-accordion-3" checked={showTodaysApp} onClick={() => {
          setShowAllApp(false)
          setShowTodaysApp(prev => !prev)
        }} />
        <div className="skeleton collapse-title">
        </div>
        <div className="skeleton collapse-content">
          <div className="skeleton overflow-x-auto">
            <table className="skeleton table table-xs md:table-sm font-semibold">
              {/* head */}
              <thead className='skeleton '>
                <tr className='skeleton'>
                  <th className='skeleton'></th>
                  <th className='skeleton'></th>
                  <th className='skeleton'></th>
                  <th className='hidden md:block skeleton'></th>
                  <th className='hidden md:block skeleton'></th>
                  <th className='skeleton'></th>
                  <th className='skeleton'></th>
                </tr>
              </thead>
              <tbody className='skeleton'>
                <tr className='skeleton'>
                  <th className='skeleton'></th>
                  <td className='skeleton'></td>
                  <td className='skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='skeleton'></td>
                  <td className=' skeleton'></td>
                </tr>
                <tr className='skeleton'>
                  <th className='skeleton'></th>
                  <td className='skeleton'></td>
                  <td className='skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='skeleton'></td>
                  <td className=' skeleton'></td>
                </tr>
                <tr className='skeleton'>
                  <th className='skeleton'></th>
                  <td className='skeleton'></td>
                  <td className='skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='skeleton'></td>
                  <td className=' skeleton'></td>
                </tr>
                <tr className='skeleton'>
                  <th className='skeleton'></th>
                  <td className='skeleton'></td>
                  <td className='skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='skeleton'></td>
                  <td className=' skeleton'></td>
                </tr>
                <tr className='skeleton'>
                  <th className='skeleton'></th>
                  <td className='skeleton'></td>
                  <td className='skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='skeleton'></td>
                  <td className=' skeleton'></td>
                </tr>
                <tr className='skeleton'>
                  <th className='skeleton'></th>
                  <td className='skeleton'></td>
                  <td className='skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='skeleton'></td>
                  <td className=' skeleton'></td>
                </tr>
                <tr className='skeleton'>
                  <th className='skeleton'></th>
                  <td className='skeleton'></td>
                  <td className='skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='skeleton'></td>
                  <td className=' skeleton'></td>
                </tr>
                <tr className='skeleton'>
                  <th className='skeleton'></th>
                  <td className='skeleton'></td>
                  <td className='skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='hidden md:block skeleton'></td>
                  <td className='skeleton'></td>
                  <td className=' skeleton'></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>)

  return (
    <div className='md:w-[70%]  w-[100%] px-5 md:px-0 mx-auto mt-7 font-semibold min-h-[89vh]'>
      {user && user.role === "receptionist" && <div className="dropdown md:absolute">
        <div tabIndex={0} role="button" className="btn m-1 btn-primary">Delete Appointments{weekDeletePedning || monthDeletePedning && <span className="loading loading-spinner loading-sm text-primary-content"></span>}</div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow">
          <li className='hover:bg-error hover:text-error-content rounded-full cursor-pointer' onClick={handleLastWeekDelete}><a>Last week</a></li>
          <li className='hover:bg-error hover:text-error-content rounded-full cursor-pointer' onClick={handleLastMonthDelete}><a>Last Month</a></li>
        </ul>
      </div>}
      <h3 className='my-4 text-2xl font-bold text-neutral-content text-center'>Appointment Details</h3>
      <div className="collapse collapse-plus border-b-2 border-primary bg-neutral text-neutral-content mt-4">
        <input type="radio" name="my-accordion-3" checked={showTodaysApp} onClick={() => {
          setShowAllApp(false);
          setShowTodaysApp(prev => !prev)
        }} />
        <div className="collapse-title text-xl font-medium">
          Todays Appointments
        </div>
        <div className="collapse-content">
          <div className="overflow-x-auto">
            <table className="table bg-secondary text-secondary-content table-xs md:table-sm min-h-40">
              <thead className='text-secondary-content'>
                <tr className='grid grid-cols-7 md:grid-cols-9 text-center'>
                  <th>Sr. No.</th>
                  <th className='col-span-2'>Name</th>
                  <th className='col-span-2'>Mobile No.</th>
                  <th className='hidden md:block'>Age</th>
                  <th className='hidden md:block'>Gender</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {
                  todaysAppointments && todaysAppointments?.map((appointment, index) => (
                    <div className="dropdown dropdown-end w-full">
                      <tr key={nanoid()} tabIndex={0} role="button" className='grid grid-cols-7 md:grid-cols-9 text-center'>
                        <th>{index + 1}</th>
                        <td className='col-span-2'>{appointment.patient_name}</td>
                        <td className='col-span-2'>{appointment.mobile_no}</td>
                        <td className='hidden md:block'>{appointment.age}</td>
                        <td className='hidden md:block'>{appointment.gender}</td>
                        <td>{appointment.date_of_app.substring(0, 10)}</td>
                        <td>{Number(appointment.time_of_app.substring(0, 2)) > 12 ? appointment.time_of_app.substring(0, 10) + " PM" : appointment.time_of_app.substring(0, 10) + " AM"}</td>
                      </tr>
                      {user && user.role === "receptionist" && <ul tabIndex={0} className="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow text-neutral-content">
                        <NavLink to={`/user/receptionist/${names.includes(appointment.patient_name) ? "update" : "addPatient"}/${appointment.patient_name}`}><li className='hover:bg-success hover:text-success-content hover:rounded-full'><a>{names.includes(appointment.patient_name) ? "Update Details" : "Add Details"}</a></li></NavLink>
                        <li className='hover:bg-error hover:text-error-content hover:rounded-full'><a>Delete</a></li>
                      </ul>}
                    </div>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="collapse collapse-plus border-b-2 border-primary bg-neutral text-neutral-content mt-4 mb-16 ">
        <input type="radio" name="my-accordion-3" checked={showAllApp} onClick={() => {
          setShowTodaysApp(false);
          setShowAllApp(prev => !prev)
        }} />
        <div className="collapse-title text-xl font-medium">
          All Appointments
        </div>
        <div className="collapse-content">
          <div className="overflow-x-auto">
            <table className="table bg-secondary text-secondary-content table-xs md:table-sm">
              {/* head */}
              <thead className='text-secondary-content'>

                <tr className='grid grid-cols-7 md:grid-cols-9 text-center'>
                  <th>Sr. No.</th>
                  <th className='col-span-2'>Name</th>
                  <th className='col-span-2'>Mobile No.</th>
                  <th className='hidden md:block'>Age</th>
                  <th className='hidden md:block'>Gender</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>

              </thead>
              <tbody>
                {
                  allAppointments && allAppointments?.map((appointment, index) => (
                    <div className="dropdown dropdown-end w-full">
                      <tr key={nanoid()} tabIndex={0} role="button" className='grid grid-cols-7 md:grid-cols-9 text-center'>
                        <th>{index + 1}</th>
                        <td className='col-span-2'>{appointment.patient_name}</td>
                        <td className='col-span-2'>{appointment.mobile_no}</td>
                        <td className='hidden md:block'>{appointment.age}</td>
                        <td className='hidden md:block'>{appointment.gender}</td>
                        <td>{appointment.date_of_app.substring(0, 10)}</td>
                        <td>{Number(appointment.time_of_app.substring(0, 2)) > 12 ? appointment.time_of_app.substring(0, 10) + " PM" : appointment.time_of_app.substring(0, 10) + " AM"}</td>
                      </tr>
                      {user && user.role === "receptionist" && <ul tabIndex={0} className="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow text-neutral-content">
                        <NavLink to={`/user/receptionist/${names.includes(appointment.patient_name) ? "update" : "addPatient"}/${appointment.patient_name}`}><li className='hover:bg-success hover:text-success-content hover:rounded-full'><a>{names.includes(appointment.patient_name) ? "Update Details" : "Add Details"}</a></li></NavLink>
                        <li className='hover:bg-error hover:text-error-content hover:rounded-full'><a>Delete</a></li>
                      </ul>}
                    </div>
                  ))
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>
      <dialog id="deleteWeekDialogue" className="modal">
        <div className="modal-box modal-top">
          <h3 className="font-bold text-lg text-error">Confirm Delete</h3>
          <p className="py-4">Are you sure you want to Last weeks appointments</p>
          <div className="modal-action">
            <form method="dialog" className='flex gap-2'>
              <button className="btn btn-error" onClick={() => setConfirmWeekDelete(true)}>Delete</button>
              <button className="btn btn-primary">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="deleteMonthDialogue" className="modal">
        <div className="modal-box modal-top">
          <h3 className="font-bold text-lg text-error">Confirm Delete</h3>
          <p className="py-4">Are you sure you want to delete Last months appointments</p>
          <div className="modal-action">
            <form method="dialog" className='flex gap-2'>
              <button className="btn btn-error" onClick={() => setConfirmMonthDelete(true)}>Delete</button>
              <button className="btn btn-primary">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default AllAppointmentsPage