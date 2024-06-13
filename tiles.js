



export const tiles = [
    {ID: 0, TILE: 'Land', COLOR: 'green', WEIGTH: 8, HEIGHT: 3, RULES: {TOP: [0, 1, 3], RIGHT: [0, 1, 3], BOTTOM: [0, 1, 3], LEFT: [0, 1, 3]}},
    {ID: 1, TILE: 'Coast', COLOR: 'yellow', WEIGTH: 1, HEIGHT: 2, RULES: {TOP: [0, 1], RIGHT: [0, 1, 2], BOTTOM: [1, 2], LEFT: [0, 1, 2]}},
    {ID: 2, TILE: 'Sea', COLOR: 'blue', WEIGTH: 14, HEIGHT: 1, RULES: {TOP: [1, 2], RIGHT: [1, 2], BOTTOM: [1, 2], LEFT: [1, 2]}},
    {ID: 3, TILE: 'Hill', COLOR: 'grey', WEIGTH: 1, HEIGHT: 4, RULES: {TOP: [0, 3], RIGHT: [0, 3], BOTTOM: [0, 3], LEFT: [0, 3]}}
] 