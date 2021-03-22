import React, { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import { useDrag, useDrop } from "react-dnd";
import { v4 as uuid } from "uuid";
import CloseIcon from "../assets/CloseIcon.svg";

interface IItem {
  id: string;
  value: string;
}

interface ICardProps {
  item: IItem;
  canDrag?: boolean;
  onRemove?: (item: IItem) => void;
}

const Card: React.FC<ICardProps> = ({
  item,
  onRemove,
  canDrag = true,
}: ICardProps) => {
  const [_, dragRef] = useDrag<IItem, void, unknown>({
    type: "card",
    canDrag: canDrag,
    item: item,
  });
  return (
    <ListGroup.Item ref={dragRef} key={item.id}>
      <span>{item.value}</span>
      {!canDrag ? (
        <span
          onClick={() => {
            if (onRemove) {
              onRemove(item);
            }
          }}
        >
          <img src={CloseIcon} />
        </span>
      ) : null}
    </ListGroup.Item>
  );
};

export const ContentContainer: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [leftItems, setLeftItems] = useState<IItem[]>([]);
  const [rightItems, setRightItems] = useState<IItem[]>([]);

  const [_, dropRef] = useDrop<IItem, void, unknown>({
    accept: "card",
    drop: (item) => {
      const index = leftItems.findIndex((value) => value.id === item.id);
      if (index > -1) {
        setLeftItems([
          ...leftItems.slice(0, index),
          ...leftItems.slice(index + 1),
        ]);
        setRightItems([...rightItems, item]);
      }
    },
  });

  const onRemove = (item: IItem) => {
    const index = rightItems.findIndex((value) => value.id === item.id);
    if (index > -1) {
      setRightItems([
        ...rightItems.slice(0, index),
        ...rightItems.slice(index + 1),
      ]);
      setLeftItems([...leftItems, item]);
    }
  };

  return (
    <div className="content-container">
      <Form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          setLeftItems([...leftItems, { value: text, id: uuid() }]);
          setText("");
        }}
      >
        <InputGroup defaultValue={text}>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            defaultValue={text}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </InputGroup>
        <Button variant="primary" size="sm" active type="submit">
          Add
        </Button>
      </Form>
      <div className="sub-container">
        <div className="column">
          <ListGroup>
            {leftItems.map((item) => {
              return <Card item={item} />;
            })}
          </ListGroup>
        </div>
        <div className="column">
          <ListGroup ref={dropRef}>
            {rightItems.map((item) => {
              return <Card item={item} canDrag={false} onRemove={onRemove} />;
            })}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};
