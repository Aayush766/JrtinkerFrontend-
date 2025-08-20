import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

// Load credentials from your .env file
dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.VITE_CLOUD_NAME,
  api_key: process.env.VITE_CLODINARY_API_KEY,
  api_secret: process.env.VITE_CLODINARY_API_SECRET,
});

const uploadImages = async () => {
  console.log('🚀 Starting image migration to Cloudinary...');

  // IMPORTANT: Set the path to your local images folder here.
  const imageFolder = 'public/images';
  const imagePattern = `${imageFolder}/**/*.{png,jpg,jpeg,gif,svg,webp}`;
  
  const files = await glob(imagePattern);

  if (files.length === 0) {
    console.log('⚠️ No images found. Please check the "imageFolder" path in the script.');
    return;
  }

  console.log(`✅ Found ${files.length} images. Starting upload process...`);

  const uploadPromises = files.map(file => {
    // Create a clean name for the image in Cloudinary
    const publicId = path.relative(imageFolder, file).replace(/\.[^/.]+$/, '');

    // Upload the file
    return cloudinary.uploader.upload(file, {
      folder: 'jrtinker_website_assets', // This will be the folder name in Cloudinary
      public_id: publicId,
      overwrite: true,
    }).then(result => {
      console.log(`- Uploaded: ${file}  =>  ${result.secure_url}`);
      return { local_path: file, cloudinary_url: result.secure_url };
    }).catch(error => {
      console.error(`- FAILED to upload: ${file}. Error: ${error.message}`);
      return null;
    });
  });

  const results = await Promise.all(uploadPromises);
  const successfulUploads = results.filter(Boolean); // Filter out any failed (null) results

  // Create a JSON file that maps old paths to new Cloudinary URLs
  if (successfulUploads.length > 0) {
    fs.writeFileSync(
      'cloudinary-urls.json',
      JSON.stringify(successfulUploads, null, 2),
      'utf8'
    );
    console.log('\n✅ Success! A map of new URLs has been saved to cloudinary-urls.json');
  }

  console.log(`\n✨ Migration complete. ${successfulUploads.length} of ${files.length} images were uploaded successfully.`);
};

// Run the main function
uploadImages();