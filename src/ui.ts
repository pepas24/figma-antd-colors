import './libs/figma-plugin-ds.min.css'
import './libs/figma-plugin-ds.min.js'
import './ui.css'

const colorInput = <HTMLInputElement>document.getElementById('color')
const generateStylesInput = <HTMLInputElement>document.getElementById('generateStyles')
const paintStylePrefixInput = <HTMLInputElement>document.getElementById('paintStylePrefix')
const runButton = <HTMLElement>document.getElementById('run')
const runDefauldPalette = <HTMLElement>document.getElementById('runDefauldPalette')

generateStylesInput.addEventListener('click', function () {
    generateStylesInput.checked === true
        ? paintStylePrefixInput.style.display = 'block'
        : paintStylePrefixInput.style.display = 'none'
})

runButton.addEventListener('click', function () {
    let data = {
        color: colorInput.value,
        generateStyles: generateStylesInput.checked,
        paintStylePrefix: paintStylePrefixInput.value
    }
    parent.postMessage({ pluginMessage: { type: 'run', data} }, '*')
})
