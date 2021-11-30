// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from "react";
import { DrawContext } from ".";

const Rect = (props) => {
  const { data, removeItem } = props;
  const draw = useContext(DrawContext);
  useEffect(() => {
    const rect = draw
      .rect(data.width, data.height)
      .attr({ fill: data.color, x: data.x, y: data.y });
    rect.click((e) => {
      removeItem(data.id);
    });
    return () => rect.remove();
  }, [data, draw, removeItem]);

  return null;
};

export default Rect;
