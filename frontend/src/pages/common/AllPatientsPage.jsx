import React, { useEffect } from 'react'

import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { usePatientsContext } from "../../context/PatientDetails.context"
import { useUpdatePatientsContext } from "../../context/UpdatePatient.context"

import TableRow from '../../components/TableRow';

const AllPatientsPage = ({ fromHome, fromSearch, fromUpdate }) => {
  const { data: patients, isSuccess, refetch, isRefetching } = useQuery({
    queryKey: ['allPatients'],
    queryFn: async () => {
      try {
        const res = await axios.get('/api/v1/users/allPatientDetails');
        return res.data.data;
      } catch (error) {
        toast.error("Unable to fetch patients")
        return null;
      }
    }
  })

  const { visitedPatients, setVisitedPatients } = usePatientsContext();
  const { setUpdatePatientDetails } = useUpdatePatientsContext();
  const queryClient = useQueryClient();

  useEffect(() => {
    refetch();
  }, [])

  useEffect(() => {
    if (isSuccess && patients) {
      if (visitedPatients.length === 0) {
        setVisitedPatients(Array.from(patients));
        setUpdatePatientDetails(Array.from(patients));
      }
      queryClient.invalidateQueries(['authUser']);
    }
  }, [isSuccess]);


  if (!isSuccess) return (<div className='skeleton lg:w-[70%] mx-auto px-5 md:px-0 w-[100%] mt-7 pb-5 font-semibold bg-black'>
    <h3 className='skeleton my-4 text-2xl font-bold text-neutral-content text-center w-44 h-8 mx-auto bg-[#28282B]'></h3>
    <table className="skeleton table  table-xs md:table-md lg:w-[70%] mx-auto px-5 md:px-0 w-[100%] mt-7 font-semibold bg-[#28282B]">
      <thead className='font-bold text-neutral-content'>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
      </thead>
      <tbody>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>

        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
        <tr className='border-b-2 border-primary-content'>
          <th></th>
          <th></th>
          <th className='hidden md:block'></th>
          <th></th>
          <th className='hidden md:block'></th>
        </tr>
      </tbody>
    </table></div>)

  return (
    <div className={`lg:w-[70%] mx-auto px-5 md:px-0 w-[100%] mt-7 font-semibold ${fromUpdate || fromSearch ? "mb-0" : "mb-20"}`}>
      {fromHome && <h3 className='my-4 text-2xl font-bold text-neutral-content text-center'>Visited Patient Details</h3>}
      {(fromSearch || fromUpdate) && <h3 className='my-4 text-2xl font-bold text-neutral-content text-center'>Search Patient Details</h3>}
      <table className="table bg-neutral text-neutral-content table-xs md:table-md">
        <thead className='font-bold text-neutral-content'>
          <tr className='border-b-2 border-primary-content'>
            <th>Sr. No.</th>
            <th>Name</th>
            <th className='hidden md:block'>Mobile No.</th>
            <th>Symptoms</th>
            <th className='hidden md:block'>Last Visited</th>
          </tr>
        </thead>
        <tbody>
          {
            patients && (fromSearch || fromUpdate) ? <TableRow fromSearch={fromSearch} fromUpdate={fromUpdate} /> : patients && <TableRow patients={patients} />
          }
        </tbody>
      </table>
    </div>
  );
}

export default AllPatientsPage