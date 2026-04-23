import { useState, useRef } from "react";
import { Upload } from "lucide-react";


const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
export function ImageUpload({
  onUpload,
  disabled = false,
  accept = "image/*",
  uploadUrl = `${IMAGE_URL}/landing-page/upload/image`,
  buttonLabel = "Click to upload image",
  busyLabel = "Uploading...",
  ariaLabel = "Upload image",
  fileTypeLabel = "image",
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match(/^(image|video)\//)) {
      setError(`Please select a ${fileTypeLabel} file`);
      return;
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError("File size must be less than 50MB");
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        uploadUrl,
        {
          method: "POST",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onUpload(data.path);
    } catch (err) {
      setError(err.message || "Upload failed");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        disabled={uploading || disabled}
        className="hidden"
        aria-label={ariaLabel}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading || disabled}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <Upload size={18} className="text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {uploading ? busyLabel : buttonLabel}
        </span>
      </button>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
