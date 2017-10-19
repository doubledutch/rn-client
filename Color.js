// Thanks to https://github.com/kasperjj for the HSV/RGB transformations

const rgbBlack = {r:0, g:0, b:0}
const defaultColor = {r:0, g:154, b:205}

export default class Color {
  constructor(input) {
    if (!input) {
      this.hsv = RGBtoHSV(defaultColor)
    } else if (typeof input === 'string') {
      this.hsv = RGBtoHSV(parseRGB(input))
    } else if (input.h && input.s && input.v) {
      const {h,s,v} = input
      this.hsv = {h,s,v}
    } else if (input.r && input.g && input.b) {
      this.hsv = RGBtoHSV(input)
    } else {
      this.hsv = RGBtoHSV(defaultColor)
    }
  }

  rgb() { return HSVtoRGB(this.hsv) }
  rgbString() { return HSVtoRGBstring(this.hsv) }
  hsv() {
    const {h,s,v} = this.hsv
    return {h,s,v}
  }

  shiftHue(hueShift) { return new Color({ ...this.hsv, h: this.hsv.h + hueShift }) }
  limitLightness(maxLightness) { return new Color({ ...this.hsv, v: Math.min(this.hsv.v, maxLightness) }) }
}

function parseRGB(rgb) {
  if (!rgb) return rgbBlack

  const longMatch = rgb.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (longMatch) {
    const [_, rHex, gHex, bHex] = longMatch
    return { r: parseInt(rHex, 16), g: parseInt(gHex, 16), b: parseInt(bHex, 16) }
  } 

  const shortMatch = rgb.match(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i)
  if (shortMatch) {
    const [_, rHex, gHex, bHex] = shortMatch
    return { r: parseInt(rHex+rHex, 16), g: parseInt(gHex+gHex, 16), b: parseInt(bHex+bHex, 16) }
  }

  const rgbMatch = rgb.match(/^\s*rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)\s*$/)
  if (rgbMatch) {
    const [_, r, g, b] = rgbMatch
    return { r: +r, g: +g, b: +b }
  }

  return rgbBlack
}

function HSVtoRGB({h, s, v}) {
  var r, g, b, i, f, p, q, t
  i = Math.floor(h * 6)
  f = h * 6 - i
  p = v * (1 - s)
  q = v * (1 - f * s)
  t = v * (1 - (1 - f) * s)
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

function RGBtoHSV({r, g, b}) {
  var max = Math.max(r, g, b), min = Math.min(r, g, b),
      d = max - min,
      h,
      s = (max === 0 ? 0 : d / max),
      v = max / 255

  switch (max) {
    case min: h = 0; break;
    case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
    case g: h = (b - r) + d * 2; h /= 6 * d; break;
    case b: h = (r - g) + d * 4; h /= 6 * d; break;
  }

  return { h,s,v }
}

function HSVtoRGBstring(col){
  if(col.h<0)col.h=1-col.h
  if(col.h>=1)col.h=col.h-1
  var rgb=HSVtoRGB(col)
  return `rgb(${rgb.r},${rgb.g},${rgb.b})`
}
