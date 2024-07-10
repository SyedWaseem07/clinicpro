import React, { useState } from 'react'
import clinic from "../assets/clinic.png"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
const LoginPage = ({ theme, setTheme, user }) => {
  const [formData, setFormData] = useState({
    "username": "",
    "password": "",
    "role": ""
  })
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const { mutate, isPending, isLoading } = useMutation({
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
      toast.success("Login successful")
      queryClient.invalidateQueries({ queryKey: ['authUser'] })
    },
    onError: (error) => {
      const index = error.message.indexOf("<pre>")
      const Lastindex = error.message.indexOf("<br>")
      const errMsg = error.message.substring(index + 5, Lastindex);
      toast.error(errMsg)
    }
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  }
  return (
    <div className='w-full max-w-[1240px] mx-auto'>
      <Header theme={theme} setTheme={setTheme} user={user} />
      <div className='flex flex-col md:flex-row justify-center items-center w-full gap-1 md:gap-10'>
        <img src={clinic} alt="" className="max-w-sm rounded-lg shadow-2xl h-48 md:h-96 bg-base" />
        <form className='flex flex-col gap-4 text-neutral-content py-8  px-14' onSubmit={handleSubmit}>
          <h1 className='text-4xl font-extrabold '>{"Let's"} go.</h1>
          <label className='input input-bordered rounded flex items-center gap-1'>
            <input
              type='text'
              className='grow'
              placeholder='username'
              name='username'
              value={formData.username}
              onChange={handleChange} disabled={isPending}
            />
          </label>

          <label className='input input-bordered rounded flex items-center gap-2'>
            <input
              type='password'
              className='grow'
              placeholder='Password'
              name='password'
              value={formData.password}
              onChange={handleChange} disabled={isPending}
            />
          </label>
          <div className='flex gap-2 cursor-pointer' id='radio1'
            onClick={() => {
              document.getElementById('radio1').firstChild.checked = true
              setFormData({ ...formData, "role": "doctor" })
            }}
          >
            <input type="radio" name="radio-5" className="radio radio-success" disabled={isPending} />
            <span>Doctor</span>
          </div>
          <div className='flex gap-2 cursor-pointer' id='radio2'
            onClick={() => {
              document.getElementById('radio2').firstChild.checked = true
              setFormData({ ...formData, "role": "receptionist" })
            }}
          >
            <input type="radio" name="radio-5" className="radio radio-success" disabled={isPending} />
            <span>Receptionist</span>
          </div>

          <button className='btn rounded-full btn-primary text-primary-content font-semibold text-[1.2rem]' disabled={isPending}>Login{isPending && <span className="loading loading-spinner loading-sm text-primary-content"></span>}</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage