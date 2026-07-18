import React, { useState } from 'react';
import InputSlider from './components/InputSlider.jsx';
import CalculatorOutput from './components/CalculatorOutput.jsx';
import ActionButton from './components/ActionButton.jsx';

// Options for loan amounts (in Rupiah)
const loanOptions = [
  100000, 200000, 300000, 400000, 500000, 750000,
  1000000, 1500000, 2000000, 3000000, 4000000, 5000000,
  10000000, 15000000, 20000000,
].map(v => ({ value: v, label: `Rp${v.toLocaleString('id-ID')}` }));

// Options for tenor (weeks)
const tenorOptions = Array.from({ length: 18 }, (_, i) => i + 3).map(v => ({ value: v, label: `${v} Minggu` }));

const formatCurrency = (amount) => `Rp${amount.toLocaleString('id-ID')}`;

const App = () => {
  const [loan, setLoan] = useState('');
  const [tenor, setTenor] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const loanNum = parseInt(loan, 10);
    const tenorNum = parseInt(tenor, 10);
    if (isNaN(loanNum) || isNaN(tenorNum)) return;
    const profitPct = tenorNum * 2.5; // percent
    const profit = Math.round((profitPct / 100) * loanNum);
    const totalPay = loanNum + profit;
    const installment = Math.round(totalPay / tenorNum);
    setResult({ loan: loanNum, tenor: tenorNum, profit, totalPay, installment, profitPct });
  };

  const reset = () => {
    setLoan('');
    setTenor('');
    setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `------------------------------------------------\n📄 Simulasi Pinjaman Mikuans\n\nPokok      : ${formatCurrency(result.loan)}\nTenor      : ${result.tenor} Minggu\nKeuntungan : ${result.profitPct}%\n             ${formatCurrency(result.profit)}\nTotal Bayar: ${formatCurrency(result.totalPay)}\n\nAngsuran\n\n${formatCurrency(result.installment)} / Minggu\n------------------------------------------------`;
    await navigator.clipboard.writeText(text);
    alert('Hasil berhasil disalin.');
  };

  return (
    <div className="app-container" style={{ padding: '1rem', maxWidth: '480px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Mikuans Calculator</h1>
      <InputSlider
        label="Pinjaman"
        options={loanOptions}
        value={loan}
        onChange={(e) => setLoan(e.target.value)}
        type="number"
      />
      <InputSlider
        label="Tenor"
        options={tenorOptions}
        value={tenor}
        onChange={(e) => setTenor(e.target.value)}
        type="number"
      />
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <ActionButton onClick={calculate} className="hitungan">Hitung</ActionButton>
        <ActionButton onClick={reset} className="reset">Reset</ActionButton>
        {result && <ActionButton onClick={copyResult} className="copy">Copy Hasil</ActionButton>}
      </div>
      {result && <CalculatorOutput {...result} />}
    </div>
  );
};

export default App;
