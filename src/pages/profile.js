import { useState } from 'react';
import Image from 'next/image';
import MainLayout from '@/components/layouts/MainLayout';
import Link from 'next/link';

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit for the image

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > MAX_FILE_SIZE) {
      setError('File size exceeds the 5MB limit.');
      setSelectedFile(null);
      setPreview('');
      return;
    }

    setError('');
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) return alert('Please select a file to upload.');

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/upload-profile', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadedUrl(data.url);
        alert('Profile picture uploaded successfully!');
      } else {
        alert(`Upload failed: ${data.message}`);
      }
    } catch (err) {
      setError('An error occurred while uploading the file.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    
      <div className="container w-11/12 mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Profile Page</h1>

        <div>
          <Link href="/">home</Link>
        </div>

        <div className="mb-4">
          {uploadedUrl ? (
            <div>
              <h3>Uploaded Profile Picture:</h3>
              <Image src={uploadedUrl} alt="Profile Picture" width={150} height={150} />
            </div>
          ) : (
            <p>No profile picture uploaded yet.</p>
          )}
        </div>

        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label htmlFor="profile-pic" className="block font-semibold mb-2">
              Upload a Profile Picture:
            </label>
            <input
              type="file"
              id="profile-pic"
              accept="image/*"
              onChange={handleFileChange}
              className="block"
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>

          {preview && (
            <div className="mt-4">
              <h4>Preview:</h4>
              <img src={preview} alt="Preview" className="w-32 h-32 rounded-full" />
            </div>
          )}

          <button
            type="submit"
            disabled={uploading}
            className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>
  );
};

export default Profile;
