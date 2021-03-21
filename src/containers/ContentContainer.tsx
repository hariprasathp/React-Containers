import React, { useState } from "react";
import { InputGroup, FormControl, Button, ListGroup } from "react-bootstrap";

export const ContentContainer: React.FC = () => {
  const [text, setText] = useState("");
  const [leftContainer, setLeftContainer] = useState<string[]>([]);
  const [rightContainer, setRightContainer] = useState<string[]>([]);

  const handleClick = (event: React.MouseEvent): void => {
    setLeftContainer([...leftContainer, text]);
  };

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
      }}
    >
      <div style={{ flexBasis: "50%" }}>
        <InputGroup className="mb-3" style={{ maxWidth: "35%" }}>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            defaultValue=""
            onChange={(e) => setText(e.target.value)}
          />
        </InputGroup>
        <Button
          variant="primary"
          size="sm"
          active
          style={{ marginBottom: "10px", textAlign: "center" }}
          onClick={handleClick}
        >
          Add to List
        </Button>
        <ListGroup>
          {leftContainer.map((item, index) => {
            return <ListGroup.Item key={index}>{item}</ListGroup.Item>;
          })}
        </ListGroup>
      </div>
      <div style={{ flexBasis: "50%" }}>
        <Button
          variant="primary"
          size="sm"
          active
          style={{ marginBottom: "10px" }}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};
