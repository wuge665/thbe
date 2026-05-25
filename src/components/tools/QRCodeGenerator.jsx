import { useState } from 'react'
import './QRCode.css'

export default function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [qrCode, setQrCode] = useState('')

  const generate = () => {
    if (!text) return
    const api = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`
    setQrCode(api)
  }

  return (
    <div className="tool-container">
      <h2>二维码生成</h2>
      <div className="tool-area">
        <div className="field">
          <label>内容:</label>
          <input type="text" placeholder="输入网址或文字" value={text} onChange={e => setText(e.target.value)} />
        </div>
        <button onClick={generate}>生成二维码</button>
        {qrCode && (
          <div className="qr-preview">
            <img src={qrCode} alt="QR Code" />
            <a href={qrCode} download="qrcode.png" className="download-btn">下载图片</a>
          </div>
        )}
      </div>
    </div>
  )
}