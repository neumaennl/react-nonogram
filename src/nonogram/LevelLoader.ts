import { useEffect, useState } from "react";
import { coordsToKey } from "./helper";
import { CellMap, CellMark, ILevel } from "./types";

export default function useLevel(levelName: string): ILevel {

  const [cells, setCells] = useState<CellMap>(new Map());
  const [filledCells, setFilledCells] = useState(0);

  const [description, setDescription] = useState("");
  const [cellsToBeFilled, setCellsToBeFilled] = useState(0);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  //TODO: get levels by level name
  const levelText = `220224444422202
200004444400002
000004444400002
200004444400002
200004444400002
444441111144444
444441111144444
444441111144444
444441111144444
444441111144444
200004444400002
200004444400002
200004444400002
000004444400002
222224444422222
Test level 10`;

  useEffect(() => {
    let rowStrings = levelText.split("\n");
    let error = false;
    let x = 0;
    let y = -1;
    let tempCells: CellMap = new Map();
    let tempRows = 0;
    let tempCols = 0;
    let tempCellsToBeFilled = 0;
    let tempCellsAlreadyFilled = 0;

    for (const row of rowStrings) {
      y++;
      if (row.match(/^[0-4]+/)) {
        tempRows++;
        if (tempCols === 0) {
          tempCols = row.length;
        } else {
          if (tempCols !== row.length) {
            error = true;
            break;
          }
        }
        x = -1;
        for (const col of row) {
          x++;
          switch (col) {
            case "0":
              tempCells.set(
                coordsToKey([x, y]),
                {
                  id: x + tempCols * y,
                  coords: [x, y],
                  fill: false,
                  mark: CellMark.none
                }
              );
              break;
            case "1":
              tempCells.set(
                coordsToKey([x, y]),
                {
                  id: x + tempCols * y,
                  coords: [x, y],
                  fill: false,
                  mark: CellMark.empty
                }
              );
              break;
            case "2":
              tempCells.set(
                coordsToKey([x, y]),
                {
                  id: x + tempCols * y,
                  coords: [x, y],
                  fill: true,
                  mark: CellMark.none
                }
              );
              tempCellsToBeFilled++;
              break;
            case "3":
              tempCells.set(
                coordsToKey([x, y]),
                {
                  id: x + tempCols * y,
                  coords: [x, y],
                  fill: true,
                  mark: CellMark.empty
                }
              );
              tempCellsToBeFilled++;
              break;
            case "4":
              tempCells.set(
                coordsToKey([x, y]),
                {
                  id: x + tempCols * y,
                  coords: [x, y],
                  fill: true,
                  mark: CellMark.filled
                }
              );
              tempCellsToBeFilled++;
              tempCellsAlreadyFilled++;
              break;
            default:
              error = true;
              break;
          }
        }
      } else if (tempRows !== 0 && row.length > 0) {
        setDescription(row);
        break;
      } else {
        error = true;
        break;
      }
    }

    if (error) {
      tempRows = 10;
      tempCols = 15;
      tempCells = new Map();
      tempCellsToBeFilled = 0;
      for (y = 0; y < tempRows; y++) {
        for (x = 0; x < tempCols; x++) {
          tempCells.set(coordsToKey([x, y]), { id: x + tempCols * y, coords: [x, y], fill: false, mark: CellMark.none });
        }
      }
    }

    setRows(tempRows);
    setCols(tempCols);
    setCellsToBeFilled(tempCellsToBeFilled);
    setFilledCells(tempCellsAlreadyFilled);

    setCells(new Map(tempCells));
  }, [levelName, levelText]);

  return { levelName, description, cells, cellsFilled: filledCells, cellsToBeFilled, rows, cols, setCells, setCellsFilled: setFilledCells }
}
