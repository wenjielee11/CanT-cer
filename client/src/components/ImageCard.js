import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

function ImageCard({ image }) {
    return (
        <Card>
            <Card.Img variant="top" src={image.src} />
            <Card.Body>
                <Card.Title>{image.title}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default ImageCard;
