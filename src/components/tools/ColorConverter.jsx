import { useState } from 'react'

export default function ColorConverter() {
  const [hex, setHex] = useState('#2563eb')
  const [rgb, setRgb] = useState('37, 99, 235')
  const [hsl, setHsl] = useState('')

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : ''
  }

  const hexToHsl = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255
    let g = parseInt(hex.slice(3, 5), 16) / 255
    let b = parseInt(hex.slice(5, 7), 16) / 255
    let max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2
    if (max === min) { h = s = 0 }
    else {
      let d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }
    return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`
  }

  const handleHexChange = (value) => {
    setHex(value)
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      setRgb(hexToRgb(value))
      setHsl(hexToHsl(value))
    }
  }

  const handleRgbChange = (value) => {
    setRgb(value)
    const nums = value.match(/\d+/g)
    if (nums && nums.length === 3) {
      const h = Math.min(255, parseInt(nums[0])).toString(16).padStart(2, '0')
      const g = Math.min(255, parseInt(nums[1])).toString(16).padStart(2, '0')
      const b = Math.min(255, parseInt(nums[2])).toString(16).padStart(2, '0')
      setHex(`#${h}${g}${b}`)
      setHsl(hexToHsl(`#${h}${g}${b}`))
    }
  }

  const copy = (text) => {
    navigator.clipboard.writeText(text)
    alert('已复制!')
  }

  return (
    <div className="tool-container">
      <h2>颜色转换</h2>
      <div className="tool-area">
        <div className="color-preview" style={{ background: hex }}></div>
        <div className="field">
          <label>HEX:</label>
          <input type="text" value={hex} onChange={e => handleHexChange(e.target.value)} />
          <button onClick={() => copy(hex)}>复制</button>
        </div>
        <div className="field">
          <label>RGB:</label>
          <input type="text" value={rgb} onChange={e => handleRgbChange(e.target.value)} />
          <button onClick={() => copy(`rgb(${rgb})`)}>复制</button>
        </div>
        {hsl && (
          <div className="field">
            <label>HSL:</label>
            <span>{hsl}</span>
            <button onClick={() => copy(`hsl(${hsl})`)}>复制</button>
          </div>
        )}
      </div>
    </div>
  )
}