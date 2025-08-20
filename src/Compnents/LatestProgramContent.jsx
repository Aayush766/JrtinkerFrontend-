import { FaRegClock, FaUserGraduate } from "react-icons/fa6";
import { MdCalendarViewMonth } from "react-icons/md";
import { RiPriceTag3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const LatestProgramContent = ({ course }) => {
  return (
    <div className="w-full relative">
      <div className="w-full h-[240px]">
        <img
          src={course.courseImage}
          alt={course.courseName}
          className="object-cover w-full h-full"
          style={{
            maskImage: `url("/images/background/bg-img-courses.png")`,
            maskPosition: "center top",
            maskRepeat: "no-repeat",
          }}
        />
      </div>

      <div className="relative z-20 bg-white mx-auto -mt-24 px-3 sm:px-6 py-4 flex flex-col items-center max-w-sm w-[95%] sm:w-[20rem]">
        <Link
          to={`/courses/${course.slug}`}
          className="text-center mb-2 text-2xl leading-11 text-[#33467b] font-medium salsa"
        >
          {course.courseName}
        </Link>
        <p className="text-center text-gray-600">
          {`${course.courseDescription.slice(0, 54)}...`}
        </p>
        <div className="w-full border-b border-gray-200 mt-6 mb-4" />

        <div className="w-full grid grid-cols-2 sm:gap-y-3 gap-y-2 gap-x-0 sm:gap-x-4">
          <div className="flex items-center gap-2">
            <FaUserGraduate className="text-xl text-purple-600" />
            <p className="text-lg salsa text-[#33467b]">
              {`${course.ageGroup.min}-${course.ageGroup.max}`}
            </p>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
  <MdCalendarViewMonth className="text-xl text-cyan-500" />
  <p className="text-lg salsa text-[#33467b]">
    {`${Math.ceil(course.courseDuration / 20)} months`}
  </p>
</div>

          <div className="flex items-center gap-2">
            <RiPriceTag3Fill className="text-xl text-orange-500" />
            <p className="text-lg salsa text-[#33467b]">
              ${course.coursePrice}
            </p>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <FaRegClock className="text-xl text-yellow-500" />
            <p className="text-lg salsa text-[#33467b] ">
              {`${course.courseDuration} sessions`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestProgramContent;
