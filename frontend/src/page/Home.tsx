import React, { useState } from "react";
import LandingPage from "../ui/LandingPage"
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
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      console.log("Sending request to:", `${backendUrl}/api/convert`);
      
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
    }
  };

  const handleDownload = () => {
   if (convertedUrl) {
    // Create blob from image URL
    fetch(convertedUrl)
      .then(response => response.blob())
      .then(blob => {
        // Create a blob URL
        const blobUrl = window.URL.createObjectURL(blob);
        
        // Create download link
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `converted-image-${Date.now()}.${format}`; // Add timestamp and format
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
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
      <LandingPage/>
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#4a5568" }}>
          Image Converter
        </h1>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #e2e8f0",
              borderRadius: "5px"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #e2e8f0",
              borderRadius: "5px"
            }}
          >
            {formats.map(f => (
              <option key={f} value={f}>{f.toUpperCase()}</option>
            ))}
          </select>
        </div>

        {error && (
          <div style={{
            color: "#e53e3e",
            marginBottom: "10px",
            padding: "10px",
            background: "#fff5f5",
            borderRadius: "5px"
          }}>
            {error}
          </div>
        )}

        <button
          onClick={handleConvert}
          disabled={!file || loading}
          style={{
            width: "100%",
            padding: "12px",
            background: loading ? "#cbd5e0" : "#4c51bf",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.3s ease"
          }}
        >
          {loading ? "Converting..." : "Convert Image"}
        </button>

        {convertedUrl && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              onClick={handleDownload}
              style={{
                padding: "10px 20px",
                background: "#48bb78",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Download Converted Image
            </button>
            <img
              src={convertedUrl}
              alt="Converted"
              style={{
                maxWidth: "100%",
                marginTop: "20px",
                borderRadius: "5px"
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;