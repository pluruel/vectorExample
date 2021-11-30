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
      console.log(data.id);
      removeItem(data.id);
    });
    return () => rect.remove();
  }, [data, draw, removeItem]);

  return null;
};

export default Rect;
