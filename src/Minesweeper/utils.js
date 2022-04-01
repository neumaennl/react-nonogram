export const IncrementNeighbors = (arr, size, currIndex) => {
  const indices = connected(currIndex, size, 8);
  for (let i in indices) {
    if (arr[indices[i]].value !== "B") {
      arr[indices[i]].value++;
    }
  }
};

export const createIndices = ({ table }) => {
  let arr = [];
  const { size } = table;
  const bombs = Math.floor(Math.random() * 0.5 * size + size);

  let bombsInd = [];
  while (bombsInd.length < bombs) {
    let r = Math.floor(Math.random() * size * size);
    if (bombsInd.indexOf(r) === -1) {
      bombsInd.push(r);
    }
  }
  for (let a = 0; a < size; a++) {
    for (let b = 0; b < size; b++) {
      arr.push({ value: 0, html: "", style: { background: `var(--bg-none)` } });
    }
  }
  for (let a = 0; a < size; a++) {
    for (let b = 0; b < size; b++) {
      if (bombsInd.indexOf(a * size + b) !== -1) {
        arr[a * size + b].value = "B";
        IncrementNeighbors(arr, size, { x: a, y: b });
      }
    }
  }
  return { arr, bombs };
};

const connected = ({ x, y }, size, connection) => {
  let obj = [];
  for (let a = -1; a < 2; a++) {
    for (let b = -1; b < 2; b++) {
      if (x + a >= 0 && x + a <= size - 1 && y + b >= 0 && y + b <= size - 1) {
        switch (connection) {
          case 4: {
            if ((a === 0 || b === 0) && !(a === 0 && b === 0)) {
              obj.push((x + a) * size + (y + b));
            }
            break;
          }
          case 8: {
            if (!(a === 0 && b === 0)) obj.push((x + a) * size + (y + b));
            break;
          }
          default:
            break;
        }
      }
    }
  }

  return obj;
};

export const getNeighbors = (arr, currIndex, size) => {
  const { x, y } = currIndex;
  let visited = [x * size + y];
  let neighbors = [x * size + y];
  do {
    const item = neighbors.shift();
    const a = Math.floor(item / size);
    const b = item % size;
    const indices = connected({ x: a, y: b }, size, 8);
    for (let i of indices) {
      if (arr[i].value !== "B") {
        if (visited.indexOf(i) === -1) {
          if (arr[i].value === 0) {
            neighbors.push(i);
          }
          visited.push(i);
        }
      }
    }
  } while (neighbors.length !== 0);

  return visited;
};
