import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ImageCard from "./ImageCard";

function ImageGallery({ images, onSelect }) {
    return (
        <Container className="outputsContainer mb-2">
            <Row>
                {images.map((image, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <ImageCard image={image} onSelect={onSelect} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ImageGallery;
