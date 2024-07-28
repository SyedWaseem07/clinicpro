import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const ChangePassword = () => {

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.post('/api/v1/users/changePassword', { ...formData });
        return res.data.data;
      } catch (error) {
        const index = error.response.data.indexOf("<pre>")
        const Lastindex = error.response.data.indexOf("<br>")
        const errMsg = error.response.data.substring(index + 5, Lastindex);
        toast.error(errMsg)
      }
    },
    onSuccess: (data) => {
      if (data) toast.success("Password changed successfully");
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    }
  })

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  })
  const queryClient = useQueryClient();

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{6,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      toast.error("New Password must be at least 6 characters, with at least one uppercase letter and one special character")
      return;
    }
    mutate();
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='lg:w-[70%] mx-auto px-5 md:px-0 w-[100%] mt-7 font-semibold'>
      <h3 className='my-2 text-2xl font-bold text-neutral-content text-center'>Change Password</h3>
      <form className='flex flex-col gap-4 text-neutral-content py-8 px-14 w-[80%] md:w-[50%] mx-auto' onSubmit={handleSubmit}>
        <label className='input input-bordered rounded flex items-center gap-2'>
          <input
            type='password'
            className='grow'
            placeholder='old Password'
            name='oldPassword'
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        <label className='input input-bordered rounded flex items-center gap-2'>
          <input
            type='password'
            className='grow'
            placeholder='new Password'
            name='newPassword'
            value={formData.newPassword}
            onChange={handleChange}
          />
        </label>
        <button className='btn rounded-full btn-primary text-primary-content font-semibold text-[1.2rem]' disabled={isPending}>Change{isPending && <span className="loading loading-spinner loading-sm text-primary-content"></span>}</button>
      </form>
    </div>
  )
}

export default ChangePassword