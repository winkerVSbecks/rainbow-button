import React from 'react';
import buildWave, { normalize } from './buildWave';

export const Wave = ({
  w,
  h,
  x,
  offset,
  doubleRainbow = false,
  color,
  id,
  pathRef,
  patternRef,
}) => (
  <React.Fragment>
    <defs>
      <pattern
        id={`wave${id}`}
        x={normalize(offset + x, 0, 1, 0, 100)}
        width={normalize(w, 0, 1, 0, 100)}
        height={100}
        patternContentUnits="userSpaceOnUse"
        patternUnits="userSpaceOnUse"
        ref={patternRef}
      >
        <path
          ref={pathRef}
          fill={color}
          d={buildWave({ w, h: 0, x, y: 1, doubleRainbow })}
        />
      </pattern>
    </defs>
    <rect x="0" y="0" width="100" height="100" fill={`url(#wave${id})`} />
  </React.Fragment>
);
