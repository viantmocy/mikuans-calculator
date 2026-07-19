import { useState } from 'react'
import './style.css'

function formatRupiah(value) {
  if (isNaN(value) || value === null) return 'Rp0'
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
}

function LoanCalculator() {
  const [principal, setPrincipal] = useState('')
  const [tenor, setTenor] = useState('12')
  const [result, setResult] = useState(null)
  const [toast, setToast] = useState('')

  const presetPrincipals = [100000,200000,300000,400000,500000,750000,1000000,1500000,2000000,3000000,4000000,5000000,10000000,20000000]
  const presetTenors = Array.from({length: 18}, (_,i)=>i+3) // 3..20

  const validate = (P, n) => {
    if (!P || P < 100000 || P > 20000000) return false
    if (!n || n < 3 || n > 20) return false
    return true
  }

  const calculate = (e) => {
    e && e.preventDefault()
    const P = Math.round(parseFloat(principal) || 0)
    const n = parseInt(tenor) || 0

    if (!validate(P,n)) {
      setToast('Input tidak valid. Pastikan jumlah dan tenor dalam rentang.')
      setTimeout(()=>setToast(''),3000)
      return
    }

    // Rumus Mikuans
    // Keuntungan (%) = Tenor × 2.5%
    const keuntunganPercent = n * 2.5
    const keuntunganNominal = Math.round(P * (keuntunganPercent/100))
    const totalBayar = P + keuntunganNominal
    const angsuran = Math.round(totalBayar / n)

    setResult({
      principal: P,
      tenor: n,
      keuntunganPercent,
      keuntunganNominal,
      totalBayar,
      angsuran
    })
  }

  const clear = () => {
    setPrincipal('')
    setTenor('12')
    setResult(null)
  }

  const copyResult = async () => {
    if (!result) return
    const text = `📄 Simulasi Pinjaman Mikuans\n\nPokok      : ${formatRupiah(result.principal)}\n\nTenor      : ${result.tenor} Minggu\n\nKeuntungan : ${result.keuntunganPercent}%\n             ${formatRupiah(result.keuntunganNominal)}\n\nTotal Bayar: ${formatRupiah(result.totalBayar)}\n\nAngsuran\n\n${formatRupiah(result.angsuran)} / Minggu`;
    try {
      await navigator.clipboard.writeText(text)
      setToast('Hasil berhasil disalin.')
      setTimeout(()=>setToast(''),2500)
    } catch (err) {
      setToast('Gagal menyalin ke clipboard.')
      setTimeout(()=>setToast(''),2500)
    }
  }

  return (
    <div className="calculator-container">
      <h1>Mikuans Calculator</h1>
      <p className="subtitle">Kalkulator Pinjaman Mikuans</p>

      <form onSubmit={calculate} className="calculator-form">
        <div className="form-group">
          <label>Jumlah Pinjaman (Rp)</label>
          <div style={{display:'flex',gap:8}}>
            <select value={principal} onChange={(e)=>setPrincipal(e.target.value)}>
              <option value="">-- Pilih atau ketik manual --</option>
              {presetPrincipals.map((p)=> (
                <option key={p} value={p}>{formatRupiah(p)}</option>
              ))}
            </select>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Contoh: 3000000"
              min={100000}
              max={20000000}
              style={{flex:1}}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Tenor (Minggu)</label>
          <select value={tenor} onChange={(e)=>setTenor(e.target.value)}>
            {presetTenors.map(t=> (
              <option key={t} value={t}>{t} Minggu</option>
            ))}
          </select>
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
              <span className="result-label">Pokok Pinjaman</span>
              <span className="result-value">{formatRupiah(result.principal)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Tenor</span>
              <span className="result-value">{result.tenor} Minggu</span>
            </div>
            <div className="result-item">
              <span className="result-label">Keuntungan</span>
              <span className="result-value">{result.keuntunganPercent}% — {formatRupiah(result.keuntunganNominal)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Total Bayar</span>
              <span className="result-value">{formatRupiah(result.totalBayar)}</span>
            </div>
            <div className="result-item" style={{background:'#fff9f9'}}>
              <span className="result-label">Angsuran / Minggu</span>
              <span className="result-value" style={{fontSize:22,color:'#7b0f0f'}}>{formatRupiah(result.angsuran)}</span>
            </div>
            <div style={{display:'flex',gap:8,marginTop:4}}>
              <button className="btn-calculate" onClick={copyResult}>📋 Copy Hasil</button>
              <button className="btn-clear" onClick={()=>{navigator.share ? navigator.share({text:'Cek hasil'}):null}}>Share</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{position:'fixed',right:20,bottom:20,background:'#222',color:'#fff',padding:'10px 14px',borderRadius:8}}>{toast}</div>
      )}
    </div>
  )
}

export default LoanCalculator
