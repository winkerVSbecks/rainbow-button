const constrain = (n, low, high) => Math.max(Math.min(n, high), low);

export function normalize(
  n,
  start1,
  stop1,
  start2,
  stop2,
  withinBounds = true,
) {
  const newVal = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;

  if (!withinBounds) {
    return newVal;
  }

  if (start2 < stop2) {
    return constrain(newVal, start2, stop2);
  } else {
    return constrain(newVal, stop2, start2);
  }
}

export function buildWaveSimple({ w, h, x, y }) {
  const m = 0.512286623256592433;

  // prettier-ignore
  return [
    'M', x, y + 0.25 * h,
    'c', w * m, 0,
         w * (1 - m), -0.5 * h,
         w, -0.5 * h,
    's', w * (1 - m), 0.5 * h,
         w, 0.5 * h,
    ...bottom,
    'Z'
  ].join(' ');
}

export default function buildWave({
  w: normW,
  h: normH,
  x: normX = 0,
  y: normY = 0.5,
  doubleRainbow = false,
}) {
  const m = 0.512286623256592433;
  const w = normalize(normW, 0, 1, 0, 100) * 0.5;
  const h = normalize(normH, 0, 1, 0, 100);
  const y = normalize(normY, 0, 1, 0, 100, false);

  const count = Math.round(100 / w) - 1 + 4;

  // prettier-ignore
  const rest = Array(count).fill([
    's', 0.5 * w * (1 - m), -0.5 * h,
         0.5 * w, -0.5 * h,
    's', 0.5 * w * (1 - m), 0.5 * h,
         0.5 * w, 0.5 * h,
  ].join(' '));

  // prettier-ignore
  const bottom = doubleRainbow
    ? [
      'L', 3 * w, 100 - 0.25 * h,
      'c', -w * m, 0,
          -w * (1 - m), 0.5 * h,
          -w, 0.5 * h,
      's', -w * (1 - m), -0.5 * h,
          -w, -0.5 * h,
      's', -w * (1 - m), 0.5 * h,
          -w, 0.5 * h,
    ]
    : [
        'L', 2 * w, 100,
        'l', -2 * w, 0,
      ];

  // prettier-ignore
  return [
    'M', 0, y + 0.25 * h,
    'c', w * m, 0,
         w * (1 - m), -0.5 * h,
         w, -0.5 * h,
    's', w * (1 - m), 0.5 * h,
         w, 0.5 * h,
    ...bottom,
    'Z'
  ].join(' ');
}
