// src/components/ImageUpload.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import ShadeSlider from "@uiw/react-color-shade-slider";
import ImageCard from "./ImageCard";

const BASE_URL = "https://localhost:3000";

const Upload = ({ onUpload }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedTone, setSelectedTone] = useState(0);
    const [hsva, setHsva] = useState({ h: 0, s: 0, v: 100, a: 1 });
    const [imageName, setImageName] = useState(null);
    const [document, setDocument] = useState(null);
    const [base64, setBase64] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        getBase64(file).then((base64Output) => {
            setBase64(base64Output);
        });
        setImageName(file.name);
        setSelectedImage(file);
        onUpload(null);
    };

    const helperFn = async () => {
        if (document != null) {
            setShowModal(true);
            let response = await axios.post(
                "http://localhost:3000//upload",
                document
            );
            console.log("response", response);
            onUpload(response.data);
            setShowModal(false);
        }
    };

    useEffect(() => {
        helperFn();
    }, [document]);

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
        if (!selectedImage) {
            return;
        }
        setDocument({
            image: selectedImage,
            imageName: imageName,
            base64: base64,
            slider: selectedTone,
        });
        //const postReq = {"count": selectedImageCount, "image":selectedImage,"imageName":imageName,"base64":base64};
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
                    <ImageCard
                        image={{
                            src: URL.createObjectURL(selectedImage),
                            width: 300,
                            height: 225,
                            title: "Input Image",
                            alt: "",
                        }}
                    />
                )}
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
                    <Col xs="4">
                        <Form.Label>Skin tone: </Form.Label>
                    </Col>
                    <Col xs="8">
                        <ShadeSlider
                            hsva={hsva}
                            onChange={handleTones}
                            width="25em"
                        />
                    </Col>
                    {/* <Col xs="1"> */}
                    {/* {selectedTone} */}
                    {/* <Form.Control value={selectedImageCount} /> */}
                    {/* </Col> */}
                </Row>
            </Form.Group>
            <Form.Group
                controlId="uploadBtn"
                className="d-flex justify-content-center"
            >
                <Button variant="primary" onClick={handleUpload}>
                    Analyze Image
                </Button>
                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Body>Analyzing your image...</Modal.Body>
                </Modal>
            </Form.Group>
        </Form>
    );
};

export default Upload;
