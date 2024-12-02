// import React, { useContext } from 'react'
// import { assets } from '../assets/assets'
// import { DoctorContext } from '../context/DoctorContext'
// import { AdminContext } from '../context/AdminContext'
// import { useNavigate } from 'react-router-dom'

// const Navbar = () => {

//   const { dToken, setDToken } = useContext(DoctorContext)
//   const { aToken, setAToken } = useContext(AdminContext)

//   const navigate = useNavigate()

//   const logout = () => {
//     navigate('/')
//     dToken && setDToken('')
//     dToken && localStorage.removeItem('dToken')
//     aToken && setAToken('')
//     aToken && localStorage.removeItem('aToken')
//   }

//   return (
//     <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
//       <div className='flex items-center gap-2 text-xs'>
//         <img onClick={() => navigate('/')} className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
//         <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
//       </div>
//       <button onClick={() => logout()} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
//     </div>
//   )
// }

// export default Navbar



import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext);
  const { aToken, setAToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    dToken && setDToken('');
    dToken && localStorage.removeItem('dToken');
    aToken && setAToken('');
    aToken && localStorage.removeItem('aToken');
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          onClick={() => navigate('/')}
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt=""
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? 'Admin' : 'Veteran'}
        </p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/announcement')}
          className="bg-blue-500 text-white text-sm px-6 py-2 rounded-full hover:bg-blue-600 transition-all"
        >
          Make an Announcement
        </button>
        <button
          onClick={() => navigate('/newsletter')}
          className="bg-green-500 text-white text-sm px-6 py-2 rounded-full hover:bg-green-600 transition-all"
        >
          Newsletter
        </button>
        <button
          onClick={logout}
          className="bg-primary text-white text-sm px-10 py-2 rounded-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
