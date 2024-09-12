
export const tiles = [
    {ID: 0, TILE: 'Land', COLOR: 0x228b22, WEIGTH: 40, HEIGHT: 3, RULES: {TOP: [0, 1, 3], RIGHT: [0, 1, 3], BOTTOM: [0, 1, 3], LEFT: [0, 1, 3]}},
    {ID: 1, TILE: 'Coast', COLOR: 0xcbd90b, WEIGTH: 1, HEIGHT: 2, RULES: {TOP: [0, 1], RIGHT: [0, 1, 2], BOTTOM: [1, 2], LEFT: [0, 1, 2]}},
    {ID: 2, TILE: 'Sea', COLOR: 0x1c97bd, WEIGTH: 30, HEIGHT: 1, RULES: {TOP: [1, 2], RIGHT: [1, 2], BOTTOM: [1, 2], LEFT: [1, 2]}},
    {ID: 3, TILE: 'Hill', COLOR: 0x525c5b, WEIGTH: 1, HEIGHT: 4, RULES: {TOP: [0, 3], RIGHT: [0, 3], BOTTOM: [0, 3], LEFT: [0, 3]}}
] 