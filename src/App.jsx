import { useState } from 'react'
import './style.css'

function LoanCalculator() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [tenure, setTenure] = useState('')
  const [result, setResult] = useState(null)

  const calculate = (e) => {
    e.preventDefault()
    
    const P = parseFloat(principal) || 0
    const r = (parseFloat(rate) || 0) / 100 / 12
    const n = (parseFloat(tenure) || 0) * 12

    if (P === 0 || n === 0) return

    // Rumus angsuran bulanan: M = P × r × (1+r)^n / ((1+r)^n - 1)
    const monthlyPayment = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const totalPayment = monthlyPayment * n
    const totalInterest = totalPayment - P

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    })
  }

  const clear = () => {
    setPrincipal('')
    setRate('')
    setTenure('')
    setResult(null)
  }

  return (
    <div className="calculator-container">
      <h1>Mikuans Calculator</h1>
      <p className="subtitle">Kalkulator Kredit Simpel & Akurat</p>

      <form onSubmit={calculate} className="calculator-form">
        <div className="form-group">
          <label>Jumlah Pinjaman (Rp)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Contoh: 10000000"
            required
          />
        </div>

        <div className="form-group">
          <label>Bunga Tahunan (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Contoh: 10"
            required
          />
        </div>

        <div className="form-group">
          <label>Tenor (Tahun)</label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            placeholder="Contoh: 5"
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn-calculate">
            Hitung
          </button>
          <button type="button" onClick={clear} className="btn-clear">
            Reset
          </button>
        </div>
      </form>

      {result && (
        <div className="result">
          <h2>Hasil Perhitungan</h2>
          <div className="result-grid">
            <div className="result-item">
              <span className="result-label">Angsuran Bulanan</span>
              <span className="result-value">Rp {result.monthlyPayment}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Total Angsuran</span>
              <span className="result-value">Rp {result.totalPayment}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Total Bunga</span>
              <span className="result-value">Rp {result.totalInterest}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoanCalculator
