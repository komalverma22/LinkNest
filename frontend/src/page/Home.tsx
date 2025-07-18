import React, { useState } from "react";
import LandingPage from "../ui/LandingPage";
import LinkSettings from "../ui/LinkSetting"; // Import LinkSettings
import Button from "../ui/Button";

interface ConversionResponse {
  message: string;
  file: string;
  error?: string;
}

const formats: string[] = [
  "jpeg", "jpg", "png", "webp", "gif", "bmp", "tiff", "avif"
];

const Home: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<string>("jpeg");
  const [quality, setQuality] = useState<string>("85");
  const [resolution, setResolution] = useState<string>("");
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showConversionBox, setShowConversionBox] = useState(true);

  const handleConvert = async (): Promise<void> => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setConvertedUrl(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("format", format);

      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
      console.log("Sending request to:", `${backendUrl}/api/home`);
      
      const res = await fetch(`${backendUrl}/api/convert`, {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: ConversionResponse = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setConvertedUrl(`${backendUrl}${data.file}`);
    } catch (error) {
      console.error("Conversion error:", error);
      setError(error instanceof Error ? error.message : "Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        setError("Please select a valid image file");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
      setShowConversionBox(true); // Show box again on new upload
    }
  };

  const handleDownload = () => {
    if (convertedUrl) {
      fetch(convertedUrl)
        .then(response => response.blob())
        .then(blob => {
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = `converted-image-${Date.now()}.${format}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
          console.error('Download failed:', error);
          alert('Failed to download image');
        });
    }
  };

  return (
    <div>
      <LandingPage />
      <div className="text-white p-7 lg:p-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 pt-8 lg:pt-32">
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 inline-block text-transparent bg-clip-text">
              Create. Connect. Share.
            </h1>
            
            {/* Paragraph below heading */}
            <p className="text-lg md:text-xl lg:text-lg text-gray-300 max-w-3xl opacity-80 my-6 text-center mx-auto">
              Transform and share your media files effortlessly. Convert and secure media with powerful link generation, complete access control, and real-time tracking.
            </p>
            
            {/* File Upload Section */}
            <div className="max-w-2xl mx-auto mt-12">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-600 rounded-2xl p-12 mb-6 hover:border-gray-500 transition-colors duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Drag & drop files here</h3>
                  <p className="text-gray-400 mb-4">Or click to browse your device</p>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-200 font-medium"
                     style={{
          backgroundColor: 'white',
          color: 'hsl(222.2, 84%, 4.9%)',
          borderColor: 'hsl(222.2, 84%, 4.9%)',
          boxShadow: '0 8px 32px 0 hsla(222.2, 84%, 4.9%, 0.25)',
        }}
                  >
                    Choose Files
                
                  </label>
                  {/* Show uploaded file name */}
                  {file && (
                    <div className="mt-2 text-sm text-gray-300 font-medium">Selected file: <span className="text-blue-300">{file.name}</span></div>
                  )}
                  <p className="text-sm text-gray-500 mt-3">Supports images, audio, and videos in all major formats</p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 border border-red-500 rounded-lg text-red-400 bg-red-500/10">
                  {error}
                </div>
              )}

              {/* Convert Button */}
              <button
                onClick={handleConvert}
                disabled={!file || loading}
                className={` py-3 px-4 rounded-lg font-semibold text-lg transition-all duration-200  ${
                  loading || !file
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-400 text-white hover:bg-blue-700 hover:transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Converting...
                  </div>
                ) : (
                  'Convert Media'
                )}
              </button>

              {/* Download Section */}
              {convertedUrl && showConversionBox && (
                <div className="mt-8 p-6 border border-gray-600 rounded-xl mb-8 relative">
                  {/* Close button */}
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-400 text-2xl font-bold focus:outline-none"
                    onClick={() => setShowConversionBox(false)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-white mb-3">✅ Conversion Complete!</h3>
                    <button
                      onClick={handleDownload}
                      className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                    >
                      📥 Download Converted File
                    </button>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <img
                      src={convertedUrl}
                      alt="Converted"
                      className="max-w-full max-h-64 rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Conversion Options and Link Settings - Show when file is uploaded */}
            {file && (
              <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Side - Conversion Options */}
                <div className="bg-gray-800/50 border border-gray-600 rounded-xl p-6">
                  {/* Header */}
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm">🔄</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Conversion Options</h3>
                  </div>

                  {/* Convert to format */}
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Convert to format:
                    </label>
                    <select
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                    >
                      <option value="">Keep original format</option>
                      {formats.map(f => (
                        <option key={f} value={f} className="bg-gray-900">{f.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>

                  {/* Quality and Resolution Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Quality */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Quality (1-100):
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                        placeholder="85"
                      />
                    </div>

                    {/* Resolution */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Resolution:
                      </label>
                      <select
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                      >
                        <option value="">Original</option>
                        <option value="1920x1080">1920x1080</option>
                        <option value="1280x720">1280x720</option>
                        <option value="854x480">854x480</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Right Side - Link Settings */}
                <LinkSettings />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;