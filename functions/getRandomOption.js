import { tiles } from "../tiles"

export const getRandomOption = (options) => {
    let possibleResults = []

    options.forEach(element => {
        for (let i = 0; i<tiles[element].WEIGTH; i++) {
            possibleResults.push(element)
        }
    });

    return possibleResults[Math.floor(Math.random() * possibleResults.length)]
}