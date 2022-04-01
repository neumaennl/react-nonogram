import useDataApi from './useDataApi';
import { CellState, Result, State } from './types';

import levelUrl from './levels/test.lvl';
import { useState, useEffect } from 'react';

class Level implements State {
    loading = true;
    table = new Array<CellState>();
    cols = 0;
    rows = 0;
    win = Result.undefined;
    msg = "";
    description = "";

    constructor(level: string) {

        let rowStrings = level.split("\n");
        let error = false;

        for (const row of rowStrings) {
            if (row.match(/[0-4]+/)) {
                this.rows++;
                if (this.cols === 0) {
                    this.cols = row.length;
                } else {
                    if (this.cols !== row.length) {
                        error = true;
                        break;
                    }
                }
                for (const col of row) {
                    switch (col) {
                        case "0": this.table.push(CellState.emptyUnmarked); break;
                        case "1": this.table.push(CellState.emptyMarkedEmpty); break;
                        case "2": this.table.push(CellState.filledUnmarked); break;
                        case "3": this.table.push(CellState.filledMarkedEmpty); break;
                        case "4": this.table.push(CellState.filledMarkedFilled); break;
                    }
                }
            } else if (this.rows !== 0 && row.length > 0) {
                this.description = row;
                break;
            } else {
                error = true;
                break;
            }
        }

        if (error) {
            this.rows = 10;
            this.cols = 15;
            this.table = new Array<CellState>();
            for (let y = 0; y < this.rows; y++) {
                for (let x = 0; x < this.cols; x++) {
                    this.table.push(CellState.emptyUnmarked);
                }
            }
        }

        this.loading = false;
    }

}

export function useLevelLoader() {
    const [level, setLevel] = useState(new Level(""));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ data, isLoading, isError }, doFetch] = useDataApi(levelUrl, "");
    useEffect(() => {
        if (data) {
            setLevel(new Level(data));
        }
    }, [data, isLoading]);
    return level;
}
