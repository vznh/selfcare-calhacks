import React, { useState } from 'react';
import axios from 'axios'; 

const UploadImage = ( {level, setLevel} ) => {
    // General state
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [imageCnt, setImageCnt] = useState(0);
    const [imageFiles, setImagesFiles] = useState([]);

    const handleImgUpload = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => file.type.match('image.*'));
    
        if (validFiles.length > 0) {
            // Update imageFiles state
            setImagesFiles(prevImageFiles => [...prevImageFiles, ...validFiles]);
    
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
            .then(newImages => {
                // Update imagesLoaded state
                setImagesLoaded(prevImages => Array.isArray(prevImages) ? [...prevImages, ...newImages] : newImages);
                // Increment imageCnt by the number of valid files added
                setImageCnt(prevCnt => prevCnt + validFiles.length);
            })
            .catch(error => {
                console.error('There was an error uploading images', error);
            });
        } else {
            alert("Please upload only image files ending in the extension ['.png', '.jpeg, '.jpg']. We currently do not support any other files!");
        }
    };
    

        const sendImgArrToServer = async () => {
            if (imageCnt >= 5) {
                const formData = new FormData();
                imageFiles.forEach((image, index) => {
                    formData.append(`image${index}`, image);
                });

            try {
                const resp = await axios.post('http://localhost:5000/receiveImages', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setImagesLoaded(true);
                setLevel(2);
                console.log('Server response:', resp.data);
                } catch (err) {
                    console.error('Error uploading images:', err);
                }
            }
        };

        const processImgs = () => {
            
            setLevel(2);
        }

    return (
        <>
            <div class="container" style={{
                position: 'relative',
                height: '100vh',
                width: '100vw'
            }}>
                <span className="introduction" style={{ position: 'absolute', left: '36%', transform: 'translateY(-50%)', top: '41%', fontFamily: "Inter" }}><b>let's get started!</b><br />start by uploading at least <b>5</b> images of your skin in clear light.</span>
                <label style={{
                    position: 'absolute',
                    top: '45%',
                    left: '35%',
                    transform: 'translateY(-50%)',
                    display: 'inline-block',
                    padding: '12px 30px',
                    margin: '10px',
                    color: 'black',
                    backgroundColor: '#F9F9F9',
                    borderRadius: '5px',
                }}>upload image(s) all at once!
                <input type="file" multiple onChange={handleImgUpload} style={{
                    opacity: '0',
                    position: 'absolute',
                    pointerEvents: 'none',
                    width: '1',
                    height: '1',
                }} />
                </label>
                <span style={{ textDecoration: 'underline', position: 'absolute', top: '50%', right: '51.5%', fontFamily: "Inter" }}>{imageCnt} files have been uploaded.</span>
                <div className='image-preview' style={{
                    position: 'absolute',
                    top: '55%',
                    left: '35%',
                    width: '30%',
                    maxHeight: '100px',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    display: 'flex',         
                    flexDirection: 'row', 
                }}>
                    {imagesLoaded && imagesLoaded.map((imgSrc, index) => (
                    <img key={index} src={imgSrc} alt={`uploaded ${index}`} style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        margin: '5px',
                    }} />
                    ))}
                </div>
                {imageCnt >= 5 && (
                        <button 
                        onClick={() => processImgs()}
                        style={{
                            fontFamily: "Inter",
                            textDecoration: 'underline', 
                            position: 'absolute',
                            top: '65%',
                            left: '35%',
                            transform: 'translateY(-50%)',
                            display: 'inline-block',
                            padding: '12px 30px',
                            margin: '10px',
                            color: 'black',
                            backgroundColor: '#F9F9F9',
                            borderRadius: '5px',
                        }}>submit image(s) for ML analysis</button>
                    )}
            </div>
        </>
    )
};

export default UploadImage;
