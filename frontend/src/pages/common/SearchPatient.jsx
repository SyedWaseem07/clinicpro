import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { usePatientsContext } from '../../context/PatientDetails.context';
import { useSearchedPatientsContext } from '../../context/searchedPatients.context';

import AllPatientsPage from './AllPatientsPage'

const SearchPatient = ({ fromSearch, fromUpdate }) => {

  const { data: patients, isSuccess, refetch } = useQuery({
    queryKey: ['searchPatients'],
    queryFn: async () => {
      try {
        const res = await axios.get('/api/v1/users/allPatientDetails');
        return res.data.data;
      } catch (error) {
        return null;
      }
    }
  })

  const [patientName, setPatientName] = useState('');
  const { filteredPatients, setFilteredPatients } = useSearchedPatientsContext();
  const { visitedPatients, setVisitedPatients } = usePatientsContext();

  useEffect(() => {
    refetch();
  }, [])

  useEffect(() => {
    if (isSuccess) {
      setVisitedPatients(Array.from(patients));
      setFilteredPatients(Array.from(patients));
    }
  }, [isSuccess])

  const searchFunction = (e) => {
    setFilteredPatients(visitedPatients.filter(patient => patient.patient_name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  return (
    <div className='lg:w-[70%] mx-auto px-5 md:px-0 w-full mt-7 font-semibold text-neutral-content mb-20'>
      <h3 className='my-4 text-2xl font-bold text-neutral-content text-center'>Search Patient</h3>
      <div className="mockup-browser bg-base-300 border">
        <div className="mockup-browser-toolbar my-4">
          <div className="input border-1 border-neutral-content my-4">
            <input className='w-[100%]' type="text" name="pateintName" id="ipBox" placeholder='name surname'
              value={patientName}
              onChange={e => {
                setPatientName(e.target.value);
                searchFunction(e);
              }}
            />
          </div>
        </div>
        <div className="bg-base-200 flex justify-center md:px-4 py-16">
          {
            filteredPatients.length > 0 ?
              <AllPatientsPage fromSearch={fromSearch} fromUpdate={fromUpdate} /> :
              <h3 className='my-4 text-2xl font-bold text-neutral-content text-center'> Patient Not Found!!</h3>
          }
        </div>
      </div>
    </div>
  )
}

export default SearchPatient