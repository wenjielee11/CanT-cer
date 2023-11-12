// src/components/ImageUpload.js
import React, { useState, useEffect } from "react";
import axios from 'axios';


const ImageUpload = ({ onImageUpload }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectetdImageCount, setSelectedImageCount] = useState(1);
    const [imageName, setImageName] = useState(null);
    const [document, setDocument] = useState(null)
    const [base64, setBase64] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        getBase64(file).then(base64Output => {
            setBase64(base64Output);
          })
        setImageName(file.name);
        setSelectedImage(file);
    };

    const helperFn = async() => {
        if (document!=null){
            let response = await axios.post("http://localhost:3000/upload",document);
        }
        if (selectedImage) {
            onImageUpload(selectedImage, selectetdImageCount);
            // Optionally, you can reset the selected image state
            setSelectedImage(null);
            setSelectedImageCount(1);
        }
    }

    useEffect(() => {
        helperFn();
    }, [document]);

    const handleInputs = (e) => {
        setSelectedImageCount(e.target.value);
    };
    const getBase64=(file)=> {
        return new Promise((resolve,reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
         });
      }
    const handleUpload = async () => {
        setDocument({
            image: selectedImage,
            imageName: imageName,
            base64: base64
        })
        //const postReq = {"count": selectetdImageCount, "image":selectedImage,"imageName":imageName,"base64":base64};
        //console.log(postReq);
        
    };


    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {selectedImage && (
                <div>
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        alt=""
                        width={300}
                        height={225}
                    />
                </div>
            )}
            <div>
                How many images do you want to generate?
                <input
                    type="number"
                    min="1"
                    max="10"
                    defaultValue={selectetdImageCount}
                    onChange={handleInputs}
                />
            </div>
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default ImageUpload;
