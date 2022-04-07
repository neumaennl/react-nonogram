import React from 'react';
import { ILevel } from './types';

interface IProps {
  level: ILevel
}

function Preview({level}: IProps) {

  //TODO: implement preview

  return(
    <canvas />
  );
}

export default React.memo(Preview);
