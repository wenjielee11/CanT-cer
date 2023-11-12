import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

function Save({}) {
    const handleDownload = async () => {
        try {
            const response = await axios.get("http://localhost:3000//export", {
                responseType: "blob", // Important
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${Date.now()}.zip`); // Name the download file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error during file download:", error);
        }
    };

    return (
        <span className="text-center">
            <Button variant="primary" type="submit" onClick={handleDownload}>
                Export to ZIP
            </Button>
        </span>
    );
}

export default Save;
