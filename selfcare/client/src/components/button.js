import React, { useState } from 'react';
import axios from 'axios';  // Corrected the import

const MyButtonComponent = () => {
  const [menuValue, setMenuValue] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [data, setData] = useState("");
  const [filename, setFilename] = useState("No file Uploaded");

  const handleSkincareButtonClick = () => {
    setMenuValue(1);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.type.match('image.*'));

    if (validFiles.length > 0) {
      const uploadedImagesPromises = validFiles.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = () => {
            reject(new Error('There was an issue reading the file.'));
          };
        });
      });

      Promise.all(uploadedImagesPromises)
        .then(images => {
          setUploadedImages(images);
        })
        .catch(error => {
          console.error('Error uploading images:', error);
        });
    } else {
      alert("Please upload image files only.");
    }
  };

  const sendImagesToServer = async () => {
    const formData = new FormData();
    uploadedImages.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });

    try {
      const response = await axios.post('http://localhost:5000/your-flask-endpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const onDragEnter = () => {
    setDragging(true);
  };

  const onDragLeave = () => {
    setDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleImageUpload({ target: { files: e.dataTransfer.files } });
  };

  return (
    <>
      {menuValue === 0 && (
        <button
          style={{
            padding: '40px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '18px',
            marginLeft: '40px',
          }}
          onClick={handleSkincareButtonClick}
        >
          Begin Assessment
        </button>
      )}

      {menuValue === 1 && (
        <div
          style={{
            position: 'fixed',
            right: '0',
            top: '0',
            width: '700px',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
          }}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div
            style={{
              flex: 1,
              backgroundColor: 'whitesmoke',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', height: '100%', fontSize: 45 }}>Product Recommendations:</div>
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: '#ccc',
            }}
          >
            <h3>Please Upload Images Of Yourself!</h3>
            {dragging ? (
              <p>Drop files here</p>
            ) : (
              <label
                style={{
                  display: 'inline-block',
                  padding: '12px 30px',
                  margin: '10px',
                  cursor: 'pointer',
                  color: 'white',
                  backgroundColor: '#4CAF50',
                  borderRadius: '4px',
                }}
              >
                Upload Images
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    pointerEvents: 'none',
                    width: 1,
                    height: 1,
                  }}
                />
              </label>
            )}
            {uploadedImages.map((image, index) => (
              <img key={`img-${index}`} src={image} width="100%" alt={`Uploaded ${index}`} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyButtonComponent;
