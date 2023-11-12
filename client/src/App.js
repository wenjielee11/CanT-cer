// import logo from "./logo.svg";
import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import "./App.css";
import ImageUpload from "./components/ImageUpload";
import Header from "./components/Header";
import { Row, Col, Container } from "react-bootstrap";

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
    // const hasSelected = images.some((image) => image.selected);

    const handleSelect = (index) => {
        const nextImages = images.map((image, i) =>
            i === index
                ? { ...image, isSelected: !image.isSelected }
                : { ...image, isSelected: false }
        );
        setImages(nextImages);
    };

    const handleImageUpload = (images) => {
        const nextImages = images.map((base64ImageData, index) =>
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            ({
                key: index,
                src: `data:image/jpeg;base64,${base64ImageData}`,
                alt: `Image ${index}`,
            })
        );
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
                    <Col xs="6">
                        <h2>Upload</h2>
                        <ImageUpload onImageUpload={handleImageUpload} />
                    </Col>
                    <Col xs="6">
                        <h2>Gallery</h2>
                        <Gallery images={images} onSelect={handleSelect} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
