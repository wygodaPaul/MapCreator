import {gridCreator} from "./gridCreator.js"
import { getRandomNumber } from "./optionFunctions.js"

const numberOfoptions = 3
let worldMap = gridCreator()

function draw() {
    const canvas = document.getElementById("tutorial");
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
    }
  }
  window.addEventListener("load", draw);

// // ??
// worldMap[getRandomNumber(worldMap.length)].option = [getRandomNumber(numberOfoptions)]
// worldMap[getRandomNumber(worldMap.length)].isCollapsed = true
// // console.log(worldMap)
// for (let i = 0; i<worldMap.length; i++) {

// }