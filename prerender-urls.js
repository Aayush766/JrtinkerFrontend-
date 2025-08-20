// // prerender-urls.js
// import axios from 'axios';

// async function generateUrls() {
//     try {
//         console.log('Fetching blog and course slugs for pre-rendering...');
//         const blogsRes = await axios.get('https://jrtinker01.onrender.com/api/blogs');
//         const coursesRes = await axios.get('https://jrtinker01.onrender.com/api/courses');

//         const blogSlugs = blogsRes.data.map(blog => `/blog/${blog.slug}`);
//         const courseSlugs = coursesRes.data.map(course => `/courses/${course.slug}`); // ✅ fixed plural

//         return [
//             '/',
//             '/about',
//             '/contact',
//             '/login',
//             '/register',
//             '/courses',
//             '/blog', // Or '/blogs' if that's your actual path
//             ...blogSlugs,
//             ...courseSlugs
//         ];
//     } catch (error) {
//         console.error('Failed to generate URLs:', error);
//         return [];
//     }
// }

// export default generateUrls;
