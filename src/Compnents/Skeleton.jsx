import React from "react";

const Skeleton = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return ( 
    <>
      <section className="w-full flex justify-center flex-wrap gap-4">
        {" "}
        {arr.map((e,index) => {
          return (
            <>
              <div key={index} className="flex flex-col w-80  gap-4 mb-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};

export default Skeleton;
