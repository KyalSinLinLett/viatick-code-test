import React, { useState } from "react";
import axios from "axios";

export const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        setIsLoading(true);
        if (selectedFile) {
            const formData = new FormData();
            formData.append("video_file", selectedFile);
            axios
                .post("http://localhost:4000/upload", formData)
                .then((response) => {
                    console.log("Upload success:", response.data);
                    window.alert("upload successful");
                    setIsLoading(false);
                    // Reset selected file after upload
                    setSelectedFile(null);
                })
                .catch((error) => {
                    console.error("Upload error:", error);
                });
        } else {
            setIsLoading(false);
            window.alert("No file selected");
        }
    };

    return (
        <div>
            {!isLoading ? (
                <div>
                    <input type="file" onChange={handleFileChange} />
                    <button
                        onClick={handleUpload}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Upload
                    </button>
                </div>
            ) : (
                <div>Uploading...</div>
            )}
        </div>
    );
};
