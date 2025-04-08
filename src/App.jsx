import { useState } from 'react'
import CryptoJS from 'crypto-js'

import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [encryptedText, setEncryptedText] = useState('')
  const [decryptedText, setDecryptedText] = useState('')

  const cifrar = (texto) => {
    return CryptoJS.AES.encrypt(texto, 'jorge').toString()
  }

  const descifrar = (texto) => {
    try {
      const bytes = CryptoJS.AES.decrypt(texto, 'jorge')
      return bytes.toString(CryptoJS.enc.Utf8)
    } catch {
      return 'Texto inválido o clave incorrecta'
    }
  }

  const handleEncrypt = () => {
    const result = cifrar(inputText)
    setEncryptedText(result)
    setDecryptedText('') // limpiamos para que no muestre texto viejo
  }

  const handleDecrypt = () => {
    const result = descifrar(encryptedText)
    setDecryptedText(result)
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Cifrado AES con CryptoJS</h1>

      <div className="mb-3">
        <label className="form-label">Texto a cifrar:</label>
        <input
          type="text"
          className="form-control"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={handleEncrypt}>
          Cifrar
        </button>
        <button className="btn btn-success" onClick={handleDecrypt} disabled={!encryptedText}>
          Descifrar
        </button>
      </div>

      {encryptedText && (
        <div className="alert alert-warning mt-4">
          <strong>Texto Cifrado:</strong> {encryptedText}
        </div>
      )}

      {decryptedText && (
        <div className="alert alert-success mt-2">
          <strong>Texto Descifrado:</strong> {decryptedText}
        </div>
      )}
    </div>
  )
}

export default App
