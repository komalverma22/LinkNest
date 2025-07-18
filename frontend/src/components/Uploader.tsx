import React, { useState } from "react";
import { DotWave } from '@uiball/loaders';

const Uploader = () => {
  const [videos, setVideos] = useState<FileList | null>(null);
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [imgURL, setImgURL] = useState<string | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string>("");

  const uploadFile = async (type: "image" | "video") => {
    const data = new FormData();
    if (type === "image" && images && images.length > 0) {
      data.append("file", images[0]);
      data.append("upload_preset", "images_preset");
    } else if (type === "video" && videos && videos.length > 0) {
      data.append("file", videos[0]);
      data.append("upload_preset", "videos_preset");
    } else {
      return null;
    }
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dmz0oy04s";
      const resourceType = type === "image" ? "image" : "video";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
      const res = await fetch(api, {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      console.log(result.secure_url);
      return result.secure_url;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(""), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error('Failed to copy URL:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(""), 2000);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("submitted");
      const img = await uploadFile("image");
      const vid = await uploadFile("video");

      setImgURL(img);
      setVideoURL(vid);

      // Send URLs to backend for saving in DB
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9999";
      const response = await fetch(`${backendUrl}/api/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          imgURL: img,
          videoURL: vid
        })
      });
      const data = await response.json();
      console.log("Backend response:", data);

      alert("Upload successful!");
    } catch (error) {
      console.log(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen  text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto relative pt-7 pb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 font-custom">
            Get Shareable Link
          </h1>
          <p className="text-lg md:text-xl lg:text-lg text-gray-300  opacity-80">
            Upload your media files and get instant shareable links
          </p>
        </div>

        {/* Upload Form */}
        <div className=" backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Video Upload */}
            <div>
              <label htmlFor="video" className="block text-gray-300 text-sm font-semibold mb-3">
              Upload Video
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-400 file:text-white file:cursor-pointer hover:file:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  type="file"
                  accept="video/*"
                  id="video"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setVideos(e.target.files)
                  }
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-gray-300 text-sm font-semibold mb-3">
                Upload Image
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white file:cursor-pointer hover:file:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                  type="file"
                  accept="image/*"
                  id="image"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setImages(e.target.files)
                  }
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || (!videos && !images)}
              className={` py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                loading || (!videos && !images)
                  ? 'bg-white text-[var(--background-color)] cursor-not-allowed text-center m-auto'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-xl'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Uploading...
                </div>
              ) : (
                'Upload Files'
              )}
            </button>
          </form>
        </div>

        {/* Loading Animation */}
        {loading && (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
            <div className="flex flex-col items-center justify-center">
              <DotWave size={47} speed={1.2} color="#3b82f6" />
              <p className="text-gray-400 mt-4 text-lg">Processing your files...</p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {(imgURL || videoURL) && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-6">✅Upload Complete!</h2>
            
            {/* Image URL */}
            {imgURL && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-green-400">🖼️Image Link</h3>
                  <button
                    onClick={() => copyToClipboard(imgURL)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      copiedUrl === imgURL
                        ? 'bg-green-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {copiedUrl === imgURL ? '✅ Copied!' : '📋 Copy Link'}
                  </button>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-3 mb-4">
                  <p className="text-gray-300 text-sm break-all font-mono">{imgURL}</p>
                </div>
                
                <div className="flex justify-center">
                  <img 
                    src={imgURL} 
                    alt="Uploaded" 
                    className="max-w-full max-h-64 rounded-lg shadow-lg border border-gray-600" 
                  />
                </div>
              </div>
            )}

            {/* Video URL */}
            {videoURL && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-purple-400">📹 Video Link</h3>
                  <button
                    onClick={() => copyToClipboard(videoURL)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      copiedUrl === videoURL
                        ? 'bg-green-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {copiedUrl === videoURL ? '✅ Copied!' : '📋 Copy Link'}
                  </button>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-3 mb-4">
                  <p className="text-gray-300 text-sm break-all font-mono">{videoURL}</p>
                </div>
                
                <div className="flex justify-center">
                  <video 
                    src={videoURL} 
                    controls 
                    className="max-w-full max-h-64 rounded-lg shadow-lg border border-gray-600" 
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploader;