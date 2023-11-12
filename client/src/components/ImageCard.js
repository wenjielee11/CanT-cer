import React from "react";
import { Card } from "react-bootstrap";

function ImageCard({ image }) {
    return (
        <Card>
            <Card.Img variant="top" src={image.src} />
            {image.title && (
                <Card.Body>
                    <Card.Title>{image.title}</Card.Title>
                </Card.Body>
            )}
        </Card>
    );
}

export default ImageCard;
