import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ImageCard from "./ImageCard";

function ImageGallery({ images }) {
    console.log(images);
    return (
        <Container className="outputsContainer">
            <Row>
                {images.map((image, index) => (
                    <Col md={6} key={index} className="mb-4">
                        <ImageCard image={image} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ImageGallery;
