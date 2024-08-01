import React, { useState } from 'react'
import toast from "react-hot-toast"

import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import validateInput from "../../hooks/validateInput"

const AddAppointment = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      try {
        const res = await axios.post("/api/v1/users/receptionist/addAppointment", data);
        return res.data.data;
      } catch (error) {
        const stat = error.response.status;
        if (stat === 400) toast.error("All feilds are required");
        else if (stat === 409) toast.error("Appointment already booked");
        else toast.error("Something went wrong");
      }
    },
    onSuccess: (data) => {
      if (data) {
        toast.success("Appointment added successfully");
        queryClient.invalidateQueries({ queryKey: ['authUser'] });
        queryClient.invalidateQueries({ queryKey: ['allAppointments'] });
        queryClient.invalidateQueries({ queryKey: ['todaysAppointments'] });
        setFormData({
          "patient_name": "",
          "mobile_no": "",
          "age": 0,
          "gender": "",
          "date_of_app": "",
          "time_of_app": ""
        })
      }
    }
  })

  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    "patient_name": "",
    "mobile_no": "",
    "age": 0,
    "gender": "",
    "date_of_app": "",
    "time_of_app": ""
  })

  function compareDates(dateString) {
    // Parse the input date string into a Date object
    const inputDate = new Date(dateString);

    // Get the current date and reset the time to zero
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Reset the time of inputDate to zero
    inputDate.setHours(0, 0, 0, 0);

    // Compare the dates
    if (inputDate.getTime() === currentDate.getTime()) {
      return 0; // Dates are the same
    } else if (inputDate.getTime() > currentDate.getTime()) {
      return 1; // inputDate is after currentDate
    } else {
      return -1; // inputDate is before currentDate
    }
  }
  function checkTimeInRange(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);

    // Check if provided time is between 10:00 to 14:00 or 18:00 to 23:00
    if ((hours >= 10 && hours < 14) || (hours >= 18 && hours < 23)) {
      return 1; // Provided time is within the specified ranges
    } else if (hours === 14 && minutes === 0) {
      // Special case to consider exactly 14:00 (2 PM)
      return 0;
    } else {
      return 0; // Provided time is outside the specified ranges
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput(formData.patient_name, formData.mobile_no, formData.age) !== 0) {
      if (validateInput(formData.patient_name, formData.mobile_no, formData.age) === 1)
        toast.error("Enter valid name");
      if (validateInput(formData.patient_name, formData.mobile_no, formData.age) === 2)
        toast.error("Enter valid mobile");
      if (validateInput(formData.patient_name, formData.mobile_no, formData.age) === 3)
        toast.error("Enter valid age");
      return;
    }
    if (compareDates(formData.date_of_app) === -1) {
      toast.error("Select valid date");
      return;
    }
    if (checkTimeInRange(formData.time_of_app) === 0) {
      toast.error("Select proper time");
      return;
    }


    mutate(formData);
    setFormData({
      "patient_name": "",
      "mobile_no": "",
      "age": 0,
      "gender": "",
      "date_of_app": "",
      "time_of_app": ""
    })
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  return (
    <div className='lg:w-[70%] mx-auto px-5 md:px-0 w-[100%] mt-7 font-semibold'>
      <h3 className='my-2 text-2xl font-bold text-neutral-content text-center'>Add Appointment</h3>
      <div className="collapse collapse-plus bg-neutral text-neutral-content mt-4">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-xl font-medium">Add</div>
        <div className="collapse-content">
          <form className='flex flex-col gap-4 text-neutral-content py-8 md:px-14 mb-12' onSubmit={handleSubmit}>
            <div className='flex flex-col lg:flex-row justify-evenly flex-wrap gap-4'>
              <div className='flex flex-col gap-4 mt-4 lg:mt-0'>
                <label className='input input-bordered rounded flex items-center gap-1'>
                  <input
                    type='text'
                    className='grow'
                    placeholder='patient name'
                    name='patient_name'
                    value={formData.patient_name}
                    onChange={handleChange}
                  />
                </label>

                <label className='input input-bordered rounded flex items-center gap-1'>
                  <input
                    type='tel'
                    className='grow'
                    placeholder='mobile'
                    name='mobile_no'
                    value={formData.mobile_no}
                    onChange={handleChange}
                  />
                </label>

                <label className='input input-bordered rounded flex items-center gap-1'>
                  <input
                    type='number'
                    className='grow'
                    placeholder='age'
                    name='age'
                    value={formData.age === 0 ? '' : formData.age}
                    onChange={handleChange}
                  />
                </label>

              </div>

              <div className='flex flex-col gap-4 mt-4 lg:mt-0'>
                <label className='input input-bordered rounded flex items-center gap-4'>
                  <div className='flex items-center gap-2'>
                    <input
                      type='radio'
                      className='grow'
                      name='gender'
                      value="Male"
                      onChange={handleChange}
                      id='genderM'
                    />
                    <label htmlFor='genderM' className='text-neutral-400'>Male</label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <input
                      type='radio'
                      className='grow'
                      name='gender'
                      value="Female"
                      onChange={handleChange}
                      id='genderF'
                    />
                    <label htmlFor='genderF' className='text-neutral-400'>Female</label>
                  </div>
                </label>

                <label className='input input-bordered rounded flex items-center gap-2'>
                  <input
                    type='date'
                    className='grow text-neutral-400'
                    name='date_of_app'
                    onChange={handleChange}

                  />
                </label>
                <label className='input input-bordered rounded flex items-center gap-1'>
                  <input
                    type='time'
                    className='grow'
                    name='time_of_app'
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <button className='btn rounded-full btn-primary text-primary-content font-semibold text-[1.2rem] w-52 mx-auto mt-4 py-1' disabled={isPending}>Add{isPending && <span className="loading loading-spinner loading-sm text-primary-content"></span>}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddAppointment