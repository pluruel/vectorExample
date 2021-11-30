import React, { createContext, useEffect, useRef, useState } from "react";
import Rect from "./Rect";

let idx = 0;
let id = 0;
const colors = ["blue", "black", "red", "purple", "green"];

export const DrawContext = createContext("draw");
const SvgDrawer = () => {
  const svg = useRef();

  const [draw, setDraw] = useState();
  const [datas, setDatas] = useState([[]]);
  const [history, setHistory] = useState(0);
  const [startPoint, setstartPoint] = useState();
  const [crntRect, setCrntRect] = useState();
  const [eraseMode, setEraseMode] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/static/svg.js";
    script.onload = () => {
      const draw = window.SVG().addTo(svg.current).size("100%", 400);
      setDraw(draw);
    };
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const removeItem = (id) => {
    const data = datas[history];
    setDatas([...datas, data.filter((e) => e.id !== id)]);
    setHistory(history + 1);
  };

  return (
    <DrawContext.Provider value={draw}>
      <div
        style={{ border: "1px solid black" }}
        ref={svg}
        onMouseDown={(e) => {
          if (!eraseMode) setstartPoint({ x: e.clientX, y: e.clientY });
        }}
        onMouseMove={(e) => {
          const { clientX, clientY } = e;
          if (startPoint) {
            setCrntRect({
              x: Math.min(startPoint.x, clientX),
              y: Math.min(startPoint.y, clientY),
              width: Math.abs(clientX - startPoint.x),
              height: Math.abs(clientY - startPoint.y),
              color: colors[idx % 5],
              id: id++,
            });
          }
        }}
        onMouseUp={(e) => {
          if (!crntRect) return;
          const next = history > 0 ? datas[history] : [];
          const nextDatas = history > 0 ? datas.slice(0, history + 1) : [[]];

          setDatas([
            ...nextDatas,
            [...next, { ...crntRect, color: colors[idx++ % 5] }],
          ]);
          setHistory(history + 1);
          setCrntRect(undefined);
          setstartPoint(undefined);
        }}
      >
        {crntRect ? <Rect data={crntRect} /> : null}
        {datas[history].map((e, idx) => (
          <Rect data={e} key={idx} removeItem={removeItem} />
        ))}
      </div>
      <button onClick={() => setEraseMode(!eraseMode)}>erase Mode</button>
      <button onClick={() => history > 0 && setHistory(history - 1)}>
        undo
      </button>
      <button
        onClick={() => datas.length - 1 > history && setHistory(history + 1)}
      >
        redo
      </button>
      <div>{eraseMode ? "can Use eraser" : null}</div>
    </DrawContext.Provider>
  );
};

export default SvgDrawer;
