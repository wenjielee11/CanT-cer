// src/components/ImageUpload.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import ShadeSlider from "@uiw/react-color-shade-slider";


const ImageUpload = ({ onImageUpload }) => {
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
            console.log("response",response);
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
            slider: selectedTone
        });
        //const postReq = {"count": selectetdImageCount, "image":selectedImage,"imageName":imageName,"base64":base64};
        //console.log(postReq);
    };

    return (
        <Form>
            <Form.Group controlId="uploadImage" className="mb-3">
                <Form.Label>Image Input</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                {selectedImage && (
                    <div>
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt=""
                            width={300}
                            height={225}
                        />
                    </div>
                )}
            </Form.Group>
            <Form.Group controlId="countSlider" className="mb-3">
                <Row className="align-items-center">
                    <Col xs="6">
                        <Form.Label>
                            Number of desired image outputs:{" "}
                        </Form.Label>
                    </Col>
                    <Col xs="5">
                        <RangeSlider
                            value={selectetdImageCount}
                            min={1}
                            max={10}
                            step={1}
                            onChange={handleInputs}
                        />
                    </Col>
                    <Col xs="1">
                        {selectetdImageCount}
                        {/* <Form.Control value={selectetdImageCount} /> */}
                    </Col>
                </Row>
            </Form.Group>
            {/* <Form.Group controlId="toneSlider" className="mb-3">
                <Row className="align-items-center">
                    <Col xs="4">
                        <Form.Label>Desired skin: </Form.Label>
                    </Col>
                    <Col xs="8">
                        <RangeSlider
                            value={selectedTone}
                            min="0"
                            max="255"
                            step="1"
                            onChange={handleTones}
                        />
                    </Col>
                </Row>
            </Form.Group> */}
            <Form.Group controlId="toneSlider" className="mb-3">
                <Row className="align-items-center">
                    <Col xs="6">
                        <Form.Label>Desired skin: </Form.Label>
                    </Col>
                    <Col xs="6">
                        <ShadeSlider hsva={hsva} onChange={handleTones} />
                    </Col>
                    <Col xs="1">
                        {selectedTone}
                        {/* <Form.Control value={selectetdImageCount} /> */}
                    </Col>
                </Row>
            </Form.Group>
            <Button variant="primary" onClick={handleUpload}>
                Upload
            </Button>
        </Form>
        
    );
};

export default ImageUpload;
