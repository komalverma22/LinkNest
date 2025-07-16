import React, { useState } from "react";
import { DotWave } from '@uiball/loaders';

const Uploader = () => {
  const [videos, setVideos] = useState<FileList | null>(null);
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [imgURL, setImgURL] = useState<string | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);

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
    <div className="px-3">
      <form onSubmit={handleSubmit}>
        <label htmlFor="video">Video: </label>
        <input
          className="block w-auto text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
          type="file"
          accept="video/*"
          id="video"
          multiple
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setVideos(e.target.files)
          }
        />
        <br />
        <label htmlFor="image">Image:</label>
        <input
          className="block w-auto text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
          type="file"
          accept="image/*"
          id="image"
          multiple
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setImages(e.target.files)
          }
        />
        <br />
        <button type="submit" className="border-1 p-2" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {loading && (
        <div className="flex items-center h-32">
          <DotWave size={47} speed={1.2} color="green" />
        </div>
      )}
      {/* Show URLs below */}
      {imgURL && (
        <div>
          <p>Image URL:</p>
          <a href={imgURL} target="_blank" rel="noopener noreferrer">{imgURL}</a>
          <br />
          <img src={imgURL} alt="Uploaded" style={{maxWidth: "300px", marginTop: "10px"}} />
        </div>
      )}
      {videoURL && (
        <div>
          <p>Video URL:</p>
          <a href={videoURL} target="_blank" rel="noopener noreferrer">{videoURL}</a>
          <br />
          <video src={videoURL} controls style={{maxWidth: "300px", marginTop: "10px"}} />
        </div>
      )}
    </div>
  );
};

export default Uploader;