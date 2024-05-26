// app/page.js

'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to download video');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'video.mp4'; // You can dynamically set the filename based on video info if needed
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
      setLoading(false);
    } catch (err:any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handlePreview = async () => {
    setError(null);
    try {
      
      const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to load video preview');
      }

      const blob = await response.blob();
      const previewUrl = window.URL.createObjectURL(blob);
  
      
      setVideoUrl(previewUrl);
    } catch (err:any) {
      setError(err.message);
    }
  };
  console.log(videoUrl);

  if(loading) return <div className='flex flex-col justify-center items-center w-full h-screen '>
    <Image src="/strawhats-one-piece.gif" alt="Strawhat" width="350" height={190}/>
    <p className='m-5 text-2xl'>Loading Please wait ....</p>
    <div className='loader'></div>
  </div>
  
  return (
    <div className='flex w-full h-full flex-col justify-center items-center h-screen p-4'>
      <h1 className='text-3xl mb-8 text-center'>YouTube Video Downloader</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste"
        className='w-96 h-10 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-50 focus:ring-offset-0'
      />
      <button  className='mt-10 h-10 group relative flex items-center justify-center rounded-md px-4 border border-transparent text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-50 focus:ring-offset-0' onClick={handleDownload}>Get Video</button>
      {videoUrl && (
        <div>
          <video controls src={videoUrl} style={{ width: '100%', height: 'auto' }} />
          <button onClick={handleDownload}>Download</button>
        </div>
      )}
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
