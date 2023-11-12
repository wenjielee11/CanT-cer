import React from "react";
import { Card } from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons";

function ImageCard({ image, onSelect }) {
    return (
        <Card className={typeof onSelect === "function" ? "gallery-card" : ""}>
            <div className={image.isSelected ? "shadow active-icon" : "d-none"}>
                <CheckCircleFill size={24} color="white" />
            </div>
            <Card.Img
                variant="top"
                src={image.src}
                className={image.isSelected ? "card-active" : ""}
                onClick={() => {
                    if (typeof onSelect === "function") {
                        onSelect(image.index);
                    }
                }}
            />
            {image.title && (
                <Card.Body>
                    <Card.Title>{image.title}</Card.Title>
                </Card.Body>
            )}
        </Card>
    );
}

export default ImageCard;
