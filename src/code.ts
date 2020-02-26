import { generate, presetPalettes } from '@ant-design/colors'

var hexRgb = require('hex-rgb')
var contrast = require('contrast')

figma.showUI(__html__, { width: 300, height: 240 })

figma.ui.onmessage = msg => {

  if ( msg.type === 'run' ) {
    // Generate palette from color
    let newPalette = generate(msg.data.color)

    let nodes = []

    newPalette.map((color, i) => {
      // Create Paint from hex
      let hexColorToRGB = hexRgb(color)
      let R = hexColorToRGB.red / 255
      let G = hexColorToRGB.green / 255
      let B = hexColorToRGB.blue / 255
      let paintStyle = <Paint>{type: 'SOLID', color: {r: R, g: G, b: B}}

      // Generate color styles
      if (msg.data.generateStyles) {
        let newPaintStyle = figma.createPaintStyle()
        newPaintStyle.name = `${msg.data.paintStylePrefix} / ${i+1}`
        newPaintStyle.description = color.toUpperCase()
        newPaintStyle.paints = [paintStyle]
      }

      // Draw colors
      const rect = figma.createRectangle()
      rect.resize(450, 100)
      rect.y = i * -100
      rect.fills = [paintStyle]
      rect.name = color
      figma.currentPage.appendChild(rect)
      nodes.push(rect)
    })

    figma.currentPage.selection = nodes
    figma.viewport.scrollAndZoomIntoView(nodes)
  }

}
