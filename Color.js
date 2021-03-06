/*
 * Copyright 2018 DoubleDutch, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Thanks to https://github.com/kasperjj for the HSV/RGB transformations

const rgbBlack = {r:0, g:0, b:0}
const defaultColor = {r:0, g:154, b:205}

export default class Color {
  constructor(input) {
    if (!input) {
      this._hsv = RGBtoHSV(defaultColor)
    } else if (typeof input === 'string') {
      this._hsv = RGBtoHSV(parseRGB(input))
    } else if (input.h != null && input.s != null && input.v != null) {
      const {h,s,v} = input
      this._hsv = {h,s,v}
    } else if (input.r != null && input.g != null && input.b != null) {
      this._hsv = RGBtoHSV(input)
    } else {
      this._hsv = RGBtoHSV(defaultColor)
    }
  }

  rgb() { return HSVtoRGB(this._hsv) }
  rgbString() { return HSVtoRGBstring(this._hsv) }
  hsv() {
    const {h,s,v} = this._hsv
    return {h,s,v}
  }

  shiftHue(hueShift) {
    return new Color({ ...this._hsv, h: this._hsv.h + hueShift })
  }

  limitLightness(maxLightness) {
    return new Color({ ...this._hsv, v: Math.min(this._hsv.v, maxLightness) })
  }
  minLightness(minLightness) {
    return new Color({ ...this._hsv, v: Math.max(this._hsv.v, minLightness) })
  }

  limitSaturation(maxSaturation) {
    return new Color({ ...this._hsv, s: Math.min(this._hsv.s, maxSaturation) })    
  }
  minSaturation(minSaturation) {
    return new Color({ ...this._hsv, s: Math.max(this._hsv.s, minSaturation) })    
  }
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
