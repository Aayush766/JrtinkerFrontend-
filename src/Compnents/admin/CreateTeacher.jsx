import React, { useState } from 'react';

const CreateTeacher = () => {
  const [teachername, setTeachername] = useState('');
//   const [email, setEmail] = useState('');
  const [subjects, setSubjects] = useState('');
  const [experience, setExperience] = useState('');
  const [photo, setPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCloudinaryUpload = async () => {
    const formData = new FormData();
    formData.append('file', photo);
    formData.append('upload_preset', 'jr-tinker');
    formData.append('cloud_name', 'priyank-cloud');

    try {
      setIsUploading(true);
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/priyank-cloud/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await res.json();
      setUploadUrl(data.secure_url);
      setIsUploading(false);
      return data.secure_url;
    } catch (err) {
      console.error('Image upload error:', err);
      setIsUploading(false);
      alert('Image upload failed.');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo) return alert('Please upload a photo.');

    const uploadedPhotoUrl = await handleCloudinaryUpload();
    if (!uploadedPhotoUrl) return;

    const teacherData = {
      teachername,
    //   email,
      subjects: subjects.split(',').map((s) => s.trim()), // handle array input
      experience,
      teacherphoto: [uploadedPhotoUrl],
    };

    console.log("teacher data: ",teacherData)

    try {
      const res = await fetch('https://jrtinker01.onrender.com//admin/teacher-dashboard/create-teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacherData),
      });

      const result = await res.json();
      console.log("response: ",res)
      console.log("result: ",result)
      if (res.ok) {
        setMessage('Teacher created successfully!');
        // Clear form
        setTeachername('');
        // setEmail('');
        setSubjects('');
        setExperience('');
        setPhoto(null);
        setImagePreview(null);
        setUploadUrl('');
      } else {
        setMessage(result.message || 'Error creating teacher');
      }
    } catch (err) {
      console.error("erroe: ",err);
      setMessage('Error submitting the form.');
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-4 pt-44">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Create Teacher</h2>

        <input
          type="text"
          placeholder="Teacher Name"
          value={teachername}
          onChange={(e) => setTeachername(e.target.value)}
          className="w-full border p-2 rounded-md"
          required
        />

        {/* <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded-md"
          required
        /> */}

        <input
          type="text"
          placeholder="Subjects (comma separated)"
          value={subjects}
          onChange={(e) => setSubjects(e.target.value)}
          className="w-full border p-2 rounded-md"
          required
        />

        <input
          type="text"
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full border p-2 rounded-md"
          required
        />

        <label htmlFor="image-teacher" className='text-xl text-cyan-800 cursor-pointer'> Upload Image</label>

        <input
        id="image-teacher"
          type="file"
          accept="image/*"
          onChange={handleImagePreview}
          className="w-full"
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full mx-auto"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Create Teacher'}
        </button>

        {message && (
          <p className="text-center text-sm text-green-600 mt-2">{message}</p>
        )}
      </form>
    </section>
  );
};

export default CreateTeacher;
