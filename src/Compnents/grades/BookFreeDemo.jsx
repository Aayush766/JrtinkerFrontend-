import { IoIosArrowDown } from "react-icons/io";

const BookFreeDemo = () => {

  const gradeArr = ["Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"];
  const boardArr = ["CBSE","State", "Board","ICSE","IB","IGCSE","JEE/NEET","Foundation"]

  return (
    <div className="max-w-md mx-auto bg-transparent text-white p-6 rounded-xl shadow-md ">
      <h2 className="text-4xl font-semibold text-center mb-4 ">
        Book a free Demo
      </h2>
      <form className="space-y-4 nunito">
        <label className="input validator w-full bg-transparent border-none outline-none ">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>
          <input
            type="input"
            required
            placeholder="Username"
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minlength="3"
            maxlength="30"
            title="Only letters, numbers or dash"
            className="focus:border-none focus:outline-none"
          />
        </label>
        {/* <p className="validator-hint hidden">
          Must be 3 to 30 characters
          <br />
          containing only letters, numbers or dash
        </p> */}
        <label className="input validator w-full bg-transparent border-none outline-none">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input type="email" placeholder="mail@site.com" required />
        </label>
        {/* <div className="validator-hint hidden">Enter valid email address</div> */}
        <label className="input validator w-full bg-transparent border-none outline-none">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <g fill="none">
              <path
                d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
          <input
            type="tel"
            className="tabular-nums"
            required
            placeholder="Phone"
            pattern="[0-9]*"
            minlength="10"
            maxlength="10"
            title="Must be 10 digits"
          />
        </label>
        {/* <p className="validator-hint hidden">Must be 10 digits</p> */}
        <div className="flex space-x-4">
          <select
            
            className="select  bg-transparent border-none outline-none"
          >
            <option value="" disabled selected className="text-black">Board</option>
            {
              boardArr.map((board,index)=>{
                return(
                  <option key={index} className="text-black" >{board}</option>
                )
              })
            }
          </select>
          <select className="select  bg-transparent border-none outline-none">
            <option  value="" disabled selected  className="text-black" >Grade</option>
            {
              gradeArr.map((grade,index)=>{
                return(
                  <option key={index} className="text-black" >{grade}</option>
                )
              })
            }
          </select>
        </div>
        <label className="input validator w-full bg-transparent border-none outline-none">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>
          <input
            type="input"
            required
            placeholder="City"
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minlength="3"
            maxlength="30"
            title="Only letters, numbers or dash"
          />
        </label>
        {/* <p className="validator-hint hidden">
          Must be 3 to 30 characters
          <br />
          containing only letters
        </p> */}
        <div className="flex items-center">
          <input type="checkbox" className="mr-2 checkbox checkbox-sm rounded-sm bg-white checkbox-neutral" />
          {/* <span className="text-gray-400">Terms & Conditions</span> */}


          {/* Open the modal using document.getElementById('ID').showModal() method */}
<span onClick={()=>document.getElementById('my_modal_1').showModal()} className="cursor-pointer m-0">Terms & Conditions</span>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box text-zinc-900">
    <h3 className="font-bold text-lg">Terms & Conditions</h3>
    <p className="py-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem velit deleniti ex repellat mollitia aliquam quia, ipsa laborum autem, cupiditate rerum vel rem nemo? Debitis ipsa ducimus quos praesentium amet nihil culpa, asperiores excepturi.</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-warning text-white">Close</button>
      </form>
    </div>
  </div>
</dialog>

        </div>
        <button className="w-full text-xl bg-teal-700 cursor-pointer text-white py-2 rounded-full hover:bg-teal-800 transition mt-4">
          Book Demo
        </button>
      </form>
    </div>
  );
};

export default BookFreeDemo;
