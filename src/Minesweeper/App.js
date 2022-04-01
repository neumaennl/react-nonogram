import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef
} from "react";
import "./styles.css";
import reducer from "./AppReducer";
import { createIndices } from "./utils";
import { useTimer } from "./useTimer";

import { ReactComponent as LeftClick } from "../assets/left.svg";
import { ReactComponent as RightClick } from "../assets/right.svg";

const initialState = {
  table: [],
  bombs: 0,
  moves: 0,
  win: 0,
  msg: ""
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [size, setSize] = useState(8);
  const loading = useRef(false);

  const loadGame = () => {
    loading.current = true;
    const { arr, bombs } = createIndices({ table: { size } });
    dispatch({
      type: "CREATE_TABLE",
      payload: { table: arr, bombs }
    });
  };
  useEffect(() => {
    const rightclick = e => e.preventDefault();
    window.addEventListener("contextmenu", rightclick);

    return () => {
      window.removeEventListener("contextmenu", rightclick);
    };
  }, []);

  useEffect(() => {
    loading.current = true;
    const { arr, bombs } = createIndices({ table: { size } });
    dispatch({
      type: "CREATE_TABLE",
      payload: { table: arr, bombs }
    });
  }, [size]);

  const onclick = useCallback(
    (e, index) => {
      if (loading.current) {
        loading.current = false;
      }
      if (e.target.innerHTML !== "") return;
      dispatch({
        type: "UPDATE_STYLE",
        payload: { index, size, flag: false }
      });
      dispatch({ type: "CHECK_WIN", payload: { size } });
    },
    [dispatch, size]
  );

  const oncontextmenu = useCallback(
    (e, index) => {
      e.preventDefault();
      if (loading.current) {
        loading.current = false;
      }
      dispatch({
        type: "UPDATE_STYLE",
        payload: {
          index,
          size,
          flag: true,
          toggle: e.target.innerHTML
        }
      });
      dispatch({ type: "CHECK_WIN", payload: { size } });
    },
    [dispatch, size]
  );

  const setTableSize = e => {
    setSize(parseInt(e.target.innerHTML, 10));
  };

  const time = useTimer({
    start: state.win === 0,
    pause: state.win !== 0,
    reset: loading.current
  });

  return (
    <div className="App">
      <div className="container">
        <div className="timer">
          {time.minutes.toString().padStart(2, "0") +
            ":" +
            time.seconds.toString().padStart(2, "0")}
        </div>
        <p
          className={
            "win-banner " + (state.msg === "" ? "invisible" : "visible")
          }
        >
          {state.msg}
        </p>
        <div className="game-container">
          <div className="boardsize-container">
            <p> Game Size </p>
            <button
              onClick={setTableSize}
              className={size === 8 ? "selected" : ""}
            >
              8 {"\u00D7"} 8
            </button>
            <button
              onClick={setTableSize}
              className={size === 10 ? "selected" : ""}
            >
              10 {"\u00D7"} 10
            </button>
            <button
              onClick={setTableSize}
              className={size === 12 ? "selected" : ""}
            >
              12 {"\u00D7"} 12
            </button>
            <div className="game-btn-container">
              <button onClick={loadGame}>New Game</button>
              <button onClick={e => dispatch({ type: "REVEAL_BOARD" })}>
                Reveal
              </button>
            </div>
            <div className="instructions">
              <h4>Instructions</h4>
              <p>
                <LeftClick />
                <span>Reveal tile</span>
              </p>
              <p>
                <RightClick />
                <span>Flag tile</span>
              </p>
            </div>
          </div>
          <div
            className="grid-container"
            style={{
              gridTemplateColumns: `repeat(${size},1fr)`,
              width: `${size * 35 + (size - 1) * 5}px`
            }}
          >
            {state.table.map((item, index) => (
              <button
                disabled={!state.win === 0}
                id={index}
                key={index}
                style={item.style}
                onClick={e => onclick(e, index)}
                onContextMenu={e => oncontextmenu(e, index)}
              >
                {item.html === 0 ? "" : item.html}
              </button>
            ))}
          </div>
          <div className="right-container">
            <p>Moves: {state.moves.toString().padStart(3, "0")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
