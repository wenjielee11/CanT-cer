// import logo from "./logo.svg";
import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import "./App.css";
import ImageUpload from "./components/ImageUpload";
import Header from "./components/Header";
import { Row, Col, Container } from "react-bootstrap";

// import ImageGallery from "./components/ImageGallery";
// import img1 from "./assets/img1.jpg";

// const importAll = (context) => context.keys().map(context);

// const imagesContext = require.context(
//     "../public/assets",
//     false,
//     /\.(png|jpe?g|svg)$/
// );

const IMAGES = [
    // {
    //     src: "/assets/img1.jpg",
    //     alt: "Image 1",
    //     isSelected: false,
    //     width: 200,
    //     height: 150,
    // },
    // {
    //     src: "/assets/img2.jpg",
    //     alt: "Image 2",
    //     isSelected: false,
    //     width: 200,
    //     height: 150,
    // },
    // {
    //     src: "/assets/img3.jpg",
    //     alt: "Image 3",
    //     isSelected: false,
    //     width: 200,
    //     height: 150,
    // },
    // {
    //     src: "/assets/img4.jpg",
    //     alt: "Image 4",
    //     isSelected: false,
    //     width: 200,
    //     height: 150,
    // },
    // {
    //     src: "/assets/img5.jpg",
    //     alt: "Image 5",
    //     isSelected: false,
    //     width: 200,
    //     height: 150,
    // },
];

function App() {
    const [images, setImages] = useState(IMAGES);
    // const hasSelected = images.some((image) => image.selected);

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
            {/* <div className="p-t-1 p-b-1">
                <button onClick={handleSelectAllClick}>
                    {hasSelected ? "Clear selection" : "Select all"}
                </button>
            </div> */}
            <Container>
                <Row>
                    <Col>
                        <h2>Upload</h2>
                        <ImageUpload onImageUpload={handleImageUpload} />
                    </Col>
                    <Col>
                        <h2>Gallery</h2>
                        <Gallery images={images} onSelect={handleSelect} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
