import React from "react";
import { Button } from "react-bootstrap";
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
