// App.jsx
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseClassDetails from "./Compnents/CourseClassDetails";
import CourseFilterOptions from "./Compnents/CourseFilterOptions";
import ContactUs from "./Compnents/ContactUs";
import Projects from "./Compnents/Projects";
import ScrollToTop from "./Compnents/ScrollToTop ";
import { KnowMoreSection } from "./Compnents/knowmore/KnowMoreInfo";
import Footer from "./Compnents/footer/Footer";
import CreateTeacher from "./Compnents/admin/CreateTeacher";
import SchoolContactForm from "./Compnents/SchoolContactForm";
import { ReactLenis } from "lenis/react";
import WhatsappIntegration from "./Compnents/WhatsappIntegration";
import Loading from "./Compnents/Loading";
import HeroSection from "./Compnents/summerCamp/HeroSection";
import EnrollForm from "./Compnents/summerCamp/EnrollForm";
import BlogListingPage from "./Compnents/blog/BlogListPage";
import SingleBlogPostPage from "./Compnents/blog/SingleBlogPostPage";
import AboutUs from "./Compnents/AboutUs";

// --- LAZY LOADED COMPONENTS (Existing and New) ---
const Navbar = lazy(() => import("./Compnents/Navbar"));
const Home = lazy(() => import("./Pages/Home"));
const StemLab = lazy(() => import("./Compnents/StemLab"));
const Products = lazy(() => import("./Compnents/Products"));
const Login = lazy(() => import("./Compnents/Login"));
const BookDemoClass = lazy(() => import("./Compnents/BookDemoClass"));
const SignUp = lazy(() => import("./Compnents/SignUp"));
const SingleCourseData = lazy(() => import("./Compnents/SingleCourseData"));
const BookeDemoClassSlotBookedPage = lazy(() => import("./Compnents/BookeDemoClassSlotBookedPage"));
const Courses = lazy(() => import("./Pages/Course"));
const PageNotFound = lazy(() => import("./Compnents/PageNotFound"));

// --- LAZY LOADED ADMIN COMPONENTS ---
const AdminLayout = lazy(() => import("./Compnents/admin/AdminLayout"));
const AdminLoginPage = lazy(() => import("./Compnents/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("./Compnents/admin/AdminDashboardPage"));
const CreateCourse = lazy(() => import("./Compnents/admin/CreateCourse"));
const UpdateCourse = lazy(() => import("./Compnents/admin/UpdateCourse"));
const AllCourses = lazy(() => import("./Compnents/admin/AllCourses"));
const AdminBlogListPage = lazy(() => import("./Compnents/admin/AdminBlogListPage"));
const UpdateBlogPage = lazy(() => import("./Compnents/admin/UploadBlogPage"));
const CreateBlogPage = lazy(() => import("./Compnents/admin/CreateBlogPage"));
const AllTeachers = lazy(() => import("./Compnents/admin/AllTeachers"));
const AllSchoolData = lazy(() => import("./Compnents/admin/AllSchoolData"));
const AllContactForm = lazy(() => import("./Compnents/admin/AllContactForm"));
const AllBookedSlotsPage = lazy(() => import("./Compnents/admin/AllBookedSlotsPage"));
const AllUsersPage = lazy(() => import("./Compnents/admin/AllUsersPage"));

// --- NEW LAZY LOADED ADMIN COMPONENT FOR ENROLLMENT FORMS ---
const EnrollmentFormsPage = lazy(() => import("./Compnents/admin/EnrollmentFormsPage"));

const App = () => {
  return (
    <ReactLenis root options={{ smooth: true, duration: 1.2 }}>
      <Suspense fallback={<Loading/>}>
        
        <Navbar />
        <ScrollToTop/>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<SingleCourseData />} />
          <Route path="/courses/course-filter" element={<CourseFilterOptions />} />
          <Route path="/products" element={<Products />} />
          <Route path="/stemlab" element={<StemLab />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/courses/:slug/bookdemoclass" element={<BookDemoClass />} />
          <Route path="/know-more-info" element={<KnowMoreSection />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact-us-school" element={<SchoolContactForm />} />
          <Route path="/summer-camp" element={<HeroSection/>}/>
          <Route path="/enroll" element={<EnrollForm/>} />
          <Route path="/blog" element={<BlogListingPage />} />
          <Route path="/blog/:slug" element={<SingleBlogPostPage />} />
          <Route path="/courses/:id/bookdemoclass/book-demo-class-slot-booked-page" element={<BookeDemoClassSlotBookedPage />} />

          {/* --- ADMIN ROUTES --- */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />

            {/* Blog Management */}
            <Route path="blogs" element={<AdminBlogListPage />} />
            <Route path="blogs/new" element={<CreateBlogPage />} />
            <Route path="blogs/edit/:id" element={<UpdateBlogPage />} />

            {/* Course Management */}
            <Route path="courses" element={<AllCourses />} />
            <Route path="courses/new" element={<CreateCourse />} />
            <Route path="courses/edit/:id" element={<UpdateCourse />} />

            {/* Teacher Management */}
            <Route path="teachers" element={<AllTeachers />} />
            <Route path="teachers/new" element={<CreateTeacher />} />

            {/* Submissions */}
            <Route path="submissions/school" element={<AllSchoolData />} />
            <Route path="submissions/contact" element={<AllContactForm />} />
            
            {/* NEW: Booked Slots and Users */}
            <Route path="slots" element={<AllBookedSlotsPage />} />
            <Route path="users" element={<AllUsersPage />} />

            {/* NEW: Enrollment Forms Route */}
            <Route path="enrollment-forms" element={<EnrollmentFormsPage />} />
            
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <WhatsappIntegration />
        <Footer/>
      </Suspense>
    </ReactLenis>
  );
};

export default App;