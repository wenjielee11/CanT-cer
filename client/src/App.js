// import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

const IMAGES = [
    // {
    //     src: "/logo192.png",
    //     alt: "Image 1",
    //     isSelected: false,
    //     width: 200,
    //     height: 150,
    // },
    // {
    //     src: "/logo192.png",
    //     alt: "Image 2",
    //     isSelected: false,
    //     width: 200,
    //     height: 150,
    // },
    // {
    //     src: "/logo192.png",
    //     alt: "Image 3",
    //     isSelected: false,
    //     width: 200,
    //     height: 150,
    // },
    // {
    //     src: "/logo192.png",
    //     alt: "Image 4",
    //     isSelected: false,
    //     width: 200,
    //     height: 150,
    // },
    // {
    //     src: "/logo192.png",
    //     alt: "Image 5",
    //     isSelected: false,
    //     width: 200,
    //     height: 150,
    // },
    // {
    //     src: "/logo192.png",
    //     alt: "Image 1",
    //     isSelected: false,
    //     width: 200,
    //     height: 150,
    // },
    // {
    //     src: "/logo192.png",
    //     alt: "Image 2",
    //     isSelected: false,
    //     width: 200,
    //     height: 150,
    // },
    // {
    //     src: "/logo192.png",
    //     alt: "Image 3",
    //     isSelected: false,
    //     width: 200,
    //     height: 150,
    // },
    // {
    //     src: "/logo192.png",
    //     alt: "Image 4",
    //     isSelected: false,
    //     width: 200,
    //     height: 150,
    // },
    // {
    //     src: "/logo192.png",
    //     alt: "Image 5",
    //     isSelected: false,
    //     width: 200,
    //     height: 150,
    // },
];

function App() {
    const [images, setImages] = useState(IMAGES);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectetdImageCount, setSelectedImageCount] = useState(1);
    const [selectedTone, setSelectedTone] = useState(0);
    const [hsva, setHsva] = useState({ h: 0, s: 0, v: 100, a: 1 });
    const [imageName, setImageName] = useState(null);
    const [document, setDocument] = useState(null);
    const [base64, setBase64] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        getBase64(file).then((base64Output) => {
            setBase64(base64Output);
        });
        setImageName(file.name);
        setSelectedImage(file);
    };

    const helperFn = async () => {
        if (document != null) {
            let response = await axios.post(
                "http://localhost:3000/upload",
                document
            );
        }
        if (selectedImage) {
            onImageUpload(selectedImage, selectetdImageCount);
            // Optionally, you can reset the selected image state
            setSelectedImage(null);
            setSelectedImageCount(1);
        }
    };

    useEffect(() => {
        helperFn();
    }, [document]);

    const handleInputs = (e) => {
        setSelectedImageCount(e.target.value);
    };

    const handleTones = (newShade) => {
        setHsva({ ...hsva, ...newShade });
        setSelectedTone((100 - newShade.v) / 100);
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };
    const handleUpload = async () => {
        setDocument({
            image: selectedImage,
            imageName: imageName,
            base64: base64,
        });
        //const postReq = {"count": selectetdImageCount, "image":selectedImage,"imageName":imageName,"base64":base64};
        //console.log(postReq);
    };

    const handleSelect = (index) => {
        const nextImages = images.map((image, i) =>
            i === index
                ? { ...image, isSelected: !image.isSelected }
                : { ...image, isSelected: false }
        );
        setImages(nextImages);
    };

    const handleImageUpload = (image, count) => {
        console.log(image);
        let nextImages = [...images];
        while (count--) {
            nextImages = nextImages.concat([
                {
                    ...image,
                    src: URL.createObjectURL(image),
                    width: 200,
                    height: 150,
                    isSelected: false,
                },
            ]);
        }
        setImages(nextImages);
    };

    // const handleSelectAllClick = () => {
    //     const nextImages = images.map((image) => ({
    //         ...image,
    //         isSelected: !hasSelected,
    //     }));
    //     setImages(nextImages);
    // };

    return (
        <div className="App">
            <Header />
            <Dashboard {...{ images, handleSelect, handleImageUpload }} />
        </div>
    );
}

export default App;
