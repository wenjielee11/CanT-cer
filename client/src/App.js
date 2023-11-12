// import logo from "./logo.svg";
import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import "./App.css";
import Upload from "./components/Upload";
import Header from "./components/Header";
import { Row, Col, Container } from "react-bootstrap";
import BarChart from "./components/BarChart";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const dummyScore = (n) => {
    // return an object containing n keys, each key is a float, all of the float value sums to 1
    const scores = {};
    for (let i = 0; i < n; i++) {
        scores[i] = Math.random();
    }
    const sum = Object.values(scores).reduce((a, b) => a + b, 0);
    for (let i = 0; i < n; i++) {
        scores[i] /= sum;
    }
    return scores;
};

function App() {
    const [images, setImages] = useState(IMAGES);
    const [scores, setScores] = useState({});

    const handleSelect = (index) => {
        const nextImages = images.map((image, i) =>
            i === index
                ? { ...image, isSelected: !image.isSelected }
                : { ...image, isSelected: false }
        );
        setImages(nextImages);
    };

    const handleUpload = (data) => {
        const images = [data.predicted_image, data.masked_image]
        const nextImages = images.map((base64ImageData, index) =>
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            ({
                key: index,
                src: `data:image/jpeg;base64,${base64ImageData}`,
                alt: `Image ${index}`,
            })
        );
        setImages(nextImages);
        const dummyScores = dummyScore(7);
        setScores(dummyScores);
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
                        <Upload onUpload={handleUpload} />
                    </Col>
                    <Col xs="6">
                        <h2>Gallery</h2>
                        <Gallery images={images} onSelect={handleSelect} />
                        {Object.keys(scores).length !== 0 && (
                            <BarChart inputData={scores} />
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
