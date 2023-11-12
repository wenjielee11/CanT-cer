import React from "react";
import { Button } from "react-bootstrap";

import "downloadjs";

async function downloadData() {
    const res = await fetch("http://localhost:3000/export");
    const blob = await res.blob();
}

function Save({}) {
    return (
        <span className="text-center">
            <Button variant="primary" type="submit">
                Save as JSON
            </Button>
        </span>
    );
}

export default Save;
