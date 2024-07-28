import React, { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

import defaultAvatar from "../../../public/avatar.png"
import { MdAddPhotoAlternate } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { SiTicktick } from "react-icons/si";

import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { validateProfileInputs } from '../../hooks/validateInput';

const Profile = () => {

  const { data: authUser, isSuccess, refetch, isRefetching } = useQuery({ queryKey: ['authUser'] })

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.post('/api/v1/users/updateProfile', { ...formData });
        return res.data.data;
      } catch (error) {
        const index = error.response.data.indexOf("<pre>")
        const Lastindex = error.response.data.indexOf("<br>")
        const errMsg = error.response.data.substring(index + 5, Lastindex);
        throw new Error(errMsg);
      }
    },
    onSuccess: () => {
      toast.success("Profile Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  const { mutate: changeAvatarCall, isPending: changeAvatarPending } = useMutation({
    mutationFn: async (avatarData) => {
      try {
        const res = await axios.post('/api/v1/users/changeAvatar', avatarData);
        return res.data.data;
      } catch (error) {
        const index = error.response.data.indexOf("<pre>")
        const Lastindex = error.response.data.indexOf("<br>")
        const errMsg = error.response.data.substring(index + 5, Lastindex);
        throw new Error(errMsg);
      }
    },
    onSuccess: () => {
      toast.success("Avatar Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      setShowSave(false)
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  const queryClient = useQueryClient();
  const [profileImg, setProfileImg] = useState(defaultAvatar);
  const [profileImgUrl, setProfileImgUrl] = useState(defaultAvatar);
  const [showSave, setShowSave] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    mobile_no: "",
    role: authUser?.role
  })
  const ref = useRef();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['authUser'] });
    refetch();
    if (isSuccess && formData.username === '') {
      setFormData({ ...authUser });
      if (authUser.avatar) {
        setProfileImg(authUser.avatar);
        setProfileImgUrl(authUser.avatar);
      }
      else {
        setProfileImg(defaultAvatar);
        setProfileImgUrl(defaultAvatar)
      }
    }
  }, [isSuccess, isRefetching])

  const handleSubmit = (e) => {
    e.preventDefault();
    const validations = validateProfileInputs(formData.username, formData.fullname, formData.email, formData.mobile_no);
    if (validations.username === 1) {
      toast.error("Username must be atleast 3 characters");
      return;
    }
    if (validations.fullname === 1) {
      toast.error("Fullname must be firstname and lastname with atleat 3 characters each");
      return;
    }
    if (validations.email === 1) {
      toast.error("Enter valid email");
      return;
    }
    if (validations.mobile === 1) {
      toast.error("Enter valid 10 digit mobile no");
      return;
    }
    toast.success("Profile updation is working successfully but I will not update in order to preserve direct login functionality given on homepage", {
      duration: 5000,
    });
    // mutate();
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='lg:w-[70%] mx-auto px-5 md:px-0 w-[100%] mt-7 font-semibold'>
      <h3 className='my-2 text-2xl font-bold text-neutral-content text-center'>{authUser?.role.toUpperCase()} Profile</h3>
      <div className='flex items-center justify-center flex-col'>
        <div className='relative inline-block'>
          <img src={profileImgUrl} alt="Profile image" className='rounded-full w-32' />
          {showSave ? <><SiTicktick size={"2rem"}
            className='cursor-pointer absolute bottom-0 right-0 m-1'
            onClick={() => {
              if (profileImgUrl !== authUser.avatar) {
                const data = new FormData();
                data.append('avatar', profileImg);
                changeAvatarCall(data);
              } else setShowSave(false)
            }} /> {
              changeAvatarPending ? <span className="loading loading-spinner loading-sm text-primary"></span> :
                <RxCrossCircled size={"2rem"} className='cursor-pointer absolute bottom-0 -right-9 m-1'
                  onClick={() => {
                    if (authUser.avatar)
                      setProfileImg(authUser.avatar)
                    else setProfileImg(defaultAvatar)
                    setShowSave(false);
                  }} />
            }</> : <MdAddPhotoAlternate
            size={"2rem"}
            className='cursor-pointer absolute bottom-0 right-0 m-1'
            onClick={() => {
              ref.current.click()
              setShowSave((prev) => !prev)
            }}
          />}
          <input
            type="file"
            ref={ref}
            style={{ display: 'none' }}
            onChange={(event) => {
              if (event.target.files[0]) {
                setProfileImg(event.target.files[0])
                setProfileImgUrl(URL.createObjectURL(event.target.files[0]))
              }
            }}
          />
        </div>
        <form className='flex flex-col gap-4 text-neutral-content py-8 px-14' onSubmit={handleSubmit}>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex flex-col gap-4'>
              <label className='input input-bordered rounded flex items-center gap-1'>
                <input
                  type='text'
                  className='grow'
                  disabled
                  name='username'
                  value={formData.role}
                />
              </label>
              <label className='input input-bordered rounded flex items-center gap-1'>
                <input
                  type='text'
                  className='grow'
                  placeholder='username'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>

              <label className='input input-bordered rounded flex items-center gap-1'>
                <input
                  type='text'
                  className='grow'
                  placeholder='fullname'
                  name='fullname'
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className='flex flex-col gap-4'>
              <label className='input input-bordered rounded flex items-center gap-1'>
                <input
                  type='tel'
                  className='grow'
                  placeholder='mobile_no'
                  name='mobile_no'
                  value={formData.mobile_no}
                  onChange={handleChange}
                />
              </label>
              <label className='input input-bordered rounded flex items-center gap-1'>
                <input
                  type='email'
                  className='grow'
                  placeholder='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <button className='btn rounded-full btn-primary text-primary-content font-semibold text-[1.2rem]' disabled={isPending}>Update{isPending && <span className="loading loading-spinner loading-sm text-primary-content"></span>}</button>
        </form>
        <div className='mb-20'>
          <p>Feeling like forgot password or password in weak <NavLink to={`/user/${authUser?.role}/changePassword`}><a className='text-primary underline cursor-pointer'>Change Password</a></NavLink></p>
        </div>
      </div>
    </div>
  )
}

export default Profile