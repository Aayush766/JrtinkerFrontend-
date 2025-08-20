import React from 'react'
import { Link } from 'react-router-dom'

const NotLoginPopUp = ({heading}) => {
  return (
    <>
    <button 
   className="w-full flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-xl mt-4 bg-[#1f2a54] hover:bg-[#2e3d62] text-white py-2.5 sm:py-3 font-semibold rounded-lg transition cursor-pointer"
  onClick={() => document.getElementById('my_modal_2').showModal()}
>
 {heading}
</button>

<dialog id="my_modal_2" className="modal backdrop-blur-sm">
  <div className="modal-box bg-white shadow-2xl rounded-xl p-6 max-w-md relative">
    <button 
      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
      onClick={() => document.getElementById('my_modal_2').close()}
    >
      ✖
    </button>
    <h3 className="font-bold text-xl text-gray-800">🚀 Book a Demo Class</h3>
    <p className="py-4 text-gray-600">
      To book a demo class, please <span className="font-semibold">log in</span> first.
    </p>
    <div className="flex justify-end gap-3 mt-4">
      <Link to="/login" className="btn  btn-accent px-4 py-2 rounded-lg">
        Login
      </Link>
      <button 
        className="btn btn-soft  px-4 py-2 rounded-lg"
        onClick={() => document.getElementById('my_modal_2').close()}
      >
        Close
      </button>
    </div>
  </div>
</dialog>
    </>
  )
}

export default NotLoginPopUp