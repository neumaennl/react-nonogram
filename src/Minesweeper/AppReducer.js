import { getNeighbors } from "./utils";

export default function reducer(state, { type, payload }) {
  switch (type) {
    case "CREATE_TABLE": {
      return {
        table: payload.table,
        bombs: payload.bombs,
        win: 0,
        moves: 0
      };
    }
    case "UPDATE_STYLE": {
      if (state.win !== 0) return { ...state };
      const val = state.table[payload.index].value;
      if (!payload.flag) {
        if (val !== 0) {
          switch (val) {
            case "B": {
              //reveal the bombs and set win = -1
              return {
                ...state,
                table: state.table.map((item, index) => {
                  if (item.value === "B") {
                    return {
                      ...item,
                      html: item.value,
                      style: {
                        background: `var(--bg-${item.value})`
                      }
                    };
                  }
                  return item;
                }),
                win: -1,
                msg: "Boom! Try again!"
              };
            }
            default: {
              // normal number but not zero
              return {
                ...state,
                moves: state.moves + 1,
                table: state.table.map((item, index) => {
                  if (index === payload.index) {
                    return {
                      ...item,
                      html: item.value,
                      style: {
                        background: `var(--bg-${item.value})`
                      }
                    };
                  }
                  return item;
                })
              };
            }
          }
        } else {
          // number has value zero
          const x = Math.floor(payload.index / payload.size);
          const y = payload.index % payload.size;
          const indices = getNeighbors(state.table, { x, y }, payload.size);
          return {
            ...state,
            moves: state.moves + 1,
            table: state.table.map((item, index) => {
              if (indices.indexOf(index) !== -1 && item.html !== "F") {
                return {
                  ...item,
                  html: item.value,
                  style: {
                    background: `var(--bg-${item.value})`
                  }
                };
              }
              return item;
            })
          };
        }
      } else {
        //Flag the thing if it is not revealed
        const html = state.table[payload.index].html;
        if (html !== val) {
          return {
            ...state,
            moves: state.moves + 1,
            table: state.table.map((item, index) => {
              if (index === payload.index) {
                return {
                  ...item,
                  html: payload.toggle === "" ? "F" : "",
                  style: {
                    background: `var(--bg-${
                      payload.toggle === "" ? "F" : "none"
                    })`
                  }
                };
              }
              return item;
            })
          };
        }
      }
      return {
        ...state
      };
    }
    case "REVEAL_BOARD": {
      return {
        ...state,
        table: state.table.map(item => ({
          ...item,
          html: item.value,
          style: { background: `var(--bg-${item.value})` }
        })),
        win: -2,
        msg: ""
      };
    }
    case "CHECK_WIN": {
      if (state.win === -1) return { ...state };
      const revealed = state.table.filter(item => item.html !== "").length;
      const flags = state.table.filter(item => item.html === "F").length;
      const win =
        flags === state.bombs && revealed === payload.size * payload.size
          ? 1
          : 0;
      return {
        ...state,
        win,
        msg: win === 1 ? "You Won" : ""
      };
    }
    default:
      return state;
  }
}
