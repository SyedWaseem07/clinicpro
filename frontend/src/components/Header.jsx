import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import LogoDark from "../assets/LogoDark.gif"
import LogoWhite from "../assets/LogoWhite.gif"
import { MdFormatListBulleted } from "react-icons/md";

const Header = ({ theme, setTheme, user }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className='max-w-[1240px] w-full mx-auto z-10 h-[16vh]'>

      <div className='px-2 md:px-4 flex md:justify-between items-center w-full justify-between'>
        {theme === "forest" ? <NavLink to="/"><img src={LogoDark} alt="dark Logo" className='h-36' /></NavLink> : <NavLink to="/"><img src={LogoWhite} alt="light Logo" className='h-36' /></NavLink>}
        <div className='lg:flex hidden justify-evenly items-center w-[50%] text-base-content '>
          <h2 className='cursor-pointer hover:bg-neutral px-2 py-1 rounded-full' onClick={() => {
            document.getElementById('doctorModal').showModal()
          }}>Doctor Functionalities</h2>
          <h2 className='cursor-pointer hover:bg-neutral px-2 py-1 rounded-full' onClick={() => {
            document.getElementById('receptionistModal').showModal()
            setChecked(false)
          }}>Receptionist Functionalities</h2>
          <h2 className='cursor-pointer hover:bg-neutral px-2 py-1 rounded-full' onClick={() => {
            document.getElementById('featuresModal').showModal()
            setChecked(false)
          }}>Features</h2>
          <h2 className='cursor-pointer hover:bg-neutral px-2 py-1 rounded-full' onClick={() => {
            document.getElementById('techStackModal').showModal()
            setChecked(false)
          }}>Stack Used</h2>
        </div>
        <div className='flex gap-4 z-[9999] items-center'>
          {user ? <NavLink to={`/user/${user.role}`}><button className='btn btn-primary hidden md:block'>{user.role.charAt(0).toUpperCase() + user.role.substring(1) + "'s Home"}</button></NavLink> : <NavLink to="/login"><button className='btn btn-primary hidden md:block'>Login</button></NavLink>}
          <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" value={theme} onClick={() => setTheme(theme === "forest" ? "wireframe" : "forest")} />
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          <div className="drawer drawer-end lg:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={checked} />
            <div className="drawer-content">
              <label htmlFor="my-drawer-4" className="drawer-button" >
                < MdFormatListBulleted size={"2rem"} className="text-success cursor-pointer" onClick={() => setChecked(true)} />
              </label >
            </div>
            <div className="drawer-side" onClick={() => setChecked(false)}>
              <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <li><a className='cursor-pointer hover:bg-neutral rounded-full' onClick={() => {
                  document.getElementById('doctorModal').showModal()
                  setChecked(false)
                }} >Doctor Functionalities</a></li>

                <li><a className='cursor-pointer hover:bg-neutral rounded-full' onClick={() => {
                  document.getElementById('receptionistModal').showModal()
                  setChecked(false)
                }}>Receptionist Functionalities</a></li>
                <li><a className='cursor-pointer hover:bg-neutral rounded-full' onClick={() => {
                  document.getElementById('featuresModal').showModal()
                  setChecked(false)
                }}>Features</a></li>
                <li><a className='cursor-pointer hover:bg-neutral rounded-full mb-2' onClick={() => {
                  document.getElementById('techStackModal').showModal()
                  setChecked(false)
                }}>Stack Used</a></li>
                {user ? <NavLink to={`/user/${user.role}`}><button className='btn btn-primary block md:hidden my-2 w-[80%] mx-auto'>{user.role.charAt(0).toUpperCase() + user.role.substring(1) + "'s Home"}</button></NavLink> : <NavLink to="/login"><button className='btn btn-primary block md:hidden w-[80%] mx-auto'>Login</button></NavLink>}
              </ul>
            </div>
          </div>
        </div>
        <dialog id="doctorModal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Doctor's Functionalities</h3>
            <p className="py-2">📊 Dashboard to see patient count, revenue, Average appointments (all daily, weekly, monthly in real time)</p>
            <p className="py-2">🔍 Searching functionality of patients.</p>
            <p className="py-2">👤 Details of single patient including medicine, reports, payment, last visited.</p>
            <p className="py-2">📅 Remaining appointment status.</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        <dialog id="receptionistModal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Receptionist's Functionalities</h3>
            <p className="py-2">➕ Add appointment.</p>
            <p className="py-2">📝 Add patient details from appointments; auto-delete appointment after addition.</p>
            <p className="py-2">🔄 Update details of existing patients.</p>
            <p className="py-2">❌ Delete medicine by name for the same patient during addition.</p>
            <p className="py-2">📄 Add/delete report and payment.</p>
            <p className="py-2">🔍 Search patients.</p>
            <p className="py-2">👤 Own profile: Update profile, change password, change avatar.</p>
            <p className="py-2">📅 View all appointments.</p>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        <dialog id="featuresModal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">ClinicPro Features</h3>
            <p className='py-2'>🔓 Login without entering credentials.</p>
            <p className='py-2'>🌗 Dual theme UI.</p>
            <p className='py-2'>🖥️ User-friendly dynamic UI with loaders, spinners, etc.</p>
            <p className='py-2'>🔄 Skeleton loading for every component.</p>
            <p className='py-2'>⚡ API calls with React Query (caching, invalidation).</p>
            <p className='py-2'>✅ Form validation (login to appointment, patient, payment, report, medicine).</p>
            <p className='py-2'>👨‍⚕️👩‍💼 Dynamic UI for doctor and receptionist.</p>
            <p className='py-2'>🔐 Strong authentication and rock-solid authorization.</p>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        <dialog id="techStackModal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">ClinicPro Tech Stack</h3>
            <ol class="list-decimal ml-6 space-y-2">
              <li class="font-bold">Frontend:
                <ul class="list-disc ml-6 space-y-1">
                  <li class="flex items-center">
                    <img src="https://img.icons8.com/plasticine/30/000000/react.png" class="w-5 h-5 mr-2" />
                    <span>React.js</span>
                  </li>
                  <li class="flex items-center">
                    <img src="https://img.icons8.com/color/30/000000/tailwindcss.png" class="w-5 h-5 mr-2" />
                    <span>Tailwind CSS</span>
                  </li>
                  <li class="flex items-center">
                    <img src="https://raw.githubusercontent.com/saadeghi/daisyui-images/master/images/daisyui-logo/favicon-192.png" class="w-5 h-5 mr-2" />
                    <span>Daisy UI (Tailwind component library)</span>
                  </li>
                </ul>
              </li>
              <li class="font-bold">Backend:
                <ul class="list-disc ml-6 space-y-1">
                  <li class="flex items-center">
                    <img src="https://img.icons8.com/color/30/000000/nodejs.png" class="w-5 h-5 mr-2" />
                    <span>Node.js</span>
                  </li>
                  <li class="flex items-center">
                    <img src="https://img.icons8.com/color/30/000000/express.png" class="w-5 h-5 mr-2" />
                    <span>Express.js</span>
                  </li>
                  <li class="flex items-center">
                    <img src="https://repository-images.githubusercontent.com/139898859/9617c480-81c2-11ea-94fc-322231ead1f0" class="w-5 h-5 mr-2" />
                    <span>bcrypt.js</span>
                  </li>
                  <li class="flex items-center">
                    <img src="https://tinyurl.com/5vms33kb" class="w-5 h-5 mr-2" />
                    <span>Swagger Docs</span>
                  </li>
                </ul>
              </li>
              <li class="font-bold">Database:
                <ul class="list-disc ml-6 space-y-1">
                  <li class="flex items-center">
                    <img src="https://img.icons8.com/color/30/000000/mongodb.png" class="w-5 h-5 mr-2" />
                    <span>MongoDB</span>
                  </li>
                  <li class="flex items-center">
                    <img src="https://media.licdn.com/dms/image/D4D12AQEk8opKsyHhRQ/article-cover_image-shrink_720_1280/0/1693917399837?e=2147483647&v=beta&t=6LPN-E9p8k_59NMv17edpwj8ofRzcXd_vlmlFoc1fLw" class="w-5 h-5 mr-2" />
                    <span>Mongoose (ORM)</span>
                  </li>
                </ul>
              </li>
              <li class="font-bold">Third-party Tools/Libraries:
                <ul class="list-disc ml-6 space-y-1">
                  <li class="flex items-center">
                    <img src="https://cdn.worldvectorlogo.com/logos/jwt-3.svg" class="w-5 h-5 mr-2" />
                    <span>JWT</span>
                  </li>
                  <li class="flex items-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Ya3EBDdD49IMTC6bTFmL2R5kK2Fr9fUQzw&s" class="w-5 h-5 mr-2" />
                    <span>Cloudinary</span>
                  </li>
                  <li class="flex items-center">
                    <img src="https://seeklogo.com/images/R/react-query-logo-1340EA4CE9-seeklogo.com.png" class="w-5 h-5 mr-2" />
                    <span>Tanstack React-Query</span>
                  </li>
                  <li class="flex items-center">
                    <img src="https://miro.medium.com/v2/resize:fit:1000/0*SMpS9j8KEimJrx39.png" class="w-5 h-5 mr-2" />
                    <span>Axios</span>
                  </li>
                  <li class="flex items-center">
                    <img src="https://img.stackshare.io/service/40157/default_ac6bddce398a038cb30e3dfd23eaab10c84cfc78.jpg" class="w-5 h-5 mr-2" />
                    <span>React hot toast</span>
                  </li>
                </ul>
              </li>
            </ol>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  )
}

export default Header