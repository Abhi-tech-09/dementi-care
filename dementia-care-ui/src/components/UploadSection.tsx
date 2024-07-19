import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContextProvider";

import "./UploadSection.css";

interface UploadSectionProps {
  uploadSuccessStatus: boolean;
  uploadingStatus: boolean;
  onSubmitUploadSection: (formData: FormData) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  uploadSuccessStatus,
  uploadingStatus,
  onSubmitUploadSection,
}) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [uploadError, setUploadError] = useState("");

  const user = useAuth();
  const currentUser =
    user && user.user ? user.user.email : "testUser@gmail.com";

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!file) {
      setUploadError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();

    const postBodyString = {
      userId: currentUser,
      contentText: text,
    };
    formData.append("postBodyString", JSON.stringify(postBodyString));
    formData.append("file", file);

    onSubmitUploadSection(formData);
    setFile(null);
    setText("");
  };

  return (
    <div className="upload-section">
      <h2>Share Your Story</h2>
      <div className="mb-5 items-center space-x-2 border-b pb-3 dark:border-neutral-700">
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              className="w-30 h-12 flex-grow rounded-full bg-white-50 pl-5 text-left text-gray-500 hover:bg-white-200 focus:bg-white-300 focus:outline-none dark:bg-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-600 dark:focus:bg-neutral-700"
              id="text"
              value={text}
              onChange={handleTextChange}
              rows={4}
              placeholder={
                "What's on your mind," + currentUser.split("@")[0] + " ?"
              }
            />
          </div>
          <div className="upload-footer">
            <div className="file-upload">
              <input
                id="file"
                type="file"
                accept="image/*,video/*,audio/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="submit-upload">
              <button
                className="submit-upload-button"
                type="submit"
                disabled={uploadingStatus}
              >
                {uploadingStatus ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* <form onSubmit={handleSubmit}>
        <div>
          <textarea
            id="text"
            value={text}
            onChange={handleTextChange}
            rows={4}
            placeholder="Enter text here..."
          />
        </div>
        <div>
          <input
            id="file"
            type="file"
            accept="image/*,video/*,audio/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form> */}
      {uploadSuccessStatus && <p>Upload successful!</p>}
      {uploadError && <p className="error">{uploadError}</p>}
    </div>
  );
};

export default UploadSection;
