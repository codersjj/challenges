import { useState, type ChangeEvent } from "react"
import './ColorPicker.css'

const ColorPicker = () => {
  const [color, setColor] = useState('#FFFFFF')

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }

  return (
    <div className="color-picker-container">
      <h1>Color Picker</h1>
      <div className="color-display" style={{ backgroundColor: color }}>
        <p>Selected Color: {color}</p>
      </div>
      <label htmlFor="picker">Select a Color:</label>
      <input id="picker" type="color" value={color} onChange={handleColorChange} />
    </div>
  )
}

export default ColorPicker