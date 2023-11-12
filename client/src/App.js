// import logo from "./logo.svg";
import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import { Row, Col, Container } from "react-bootstrap";
import "./App.css";
import Upload from "./components/Upload";
import Header from "./components/Header";
import ImageGallery from "./components/ImageGallery";
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
    const [images, setImages] = useState([]);
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
        if (data === null) {
            setImages([]);
            setScores({});
            return;
        }
        const newImages = [data.predicted_image];
        const nextImages = images.concat(
            newImages.map((base64ImageData, index) =>
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                ({
                    key: index,
                    src: `data:image/jpeg;base64,${base64ImageData}`,
                    alt: `Image ${index}`,
                    // title: (index == 0 ? "Predicted" : "Masked") + " Image",
                })
            )
        );
        setImages(nextImages);
        const nextScores = data.diagnosis_score;
        setScores(nextScores);
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
                        <h1>Upload Images</h1>
                        <Upload onUpload={handleUpload} />
                    </Col>
                    <Col>
                        <h1>Results</h1>
                        <ImageGallery images={images} />
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
