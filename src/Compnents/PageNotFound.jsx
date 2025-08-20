import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      
      {/* FIX: Add the ID to this container for the pre-rendering script */}
      <div id="page-not-found-container" className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
        <div className="relative text-7xl md:text-9xl font-bold text-black">
          <span className="relative z-10 nunito">404</span>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-300 w-40 h-20 md:w-52 md:h-28 rounded-full opacity-50"></div>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-4">
          Uh oh. That page doesn’t exist.
        </h1>
        <p className="text-gray-600 mt-2 text-lg max-w-md">
          Head to our{" "}
          <Link
            to="/"
            className="text-teal-500 font-semibold hover:underline"
          >
            homepage
          </Link>{" "}
          that does exist.
        </p>
      </div>
    </>
  );
};

export default PageNotFound;