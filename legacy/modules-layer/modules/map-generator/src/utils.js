export const normalizeNoise2D = (createNoise2D) => (x, y) => createNoise2D(x, y) / 2 + 0.5;
