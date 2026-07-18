import React from 'react';

const formatCurrency = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) return 'Rp0';
  return `Rp${amount.toLocaleString('id-ID')}`;
};

const CalculatorOutput = ({ loan, tenor, profit, totalPay, installment }) => (
  <div className="output-card">
    <h3>Simulasi Pinjaman Mikuans</h3>
    <div className="output-row"><span className="label">Pokok</span><span className="value">{formatCurrency(loan)}</span></div>
    <div className="output-row"><span className="label">Tenor</span><span className="value">{tenor ? `${tenor} Minggu` : ''}</span></div>
    <div className="output-row"><span className="label">Keuntungan</span><span className="value">{formatCurrency(profit)}</span></div>
    <div className="output-row"><span className="label">Total Bayar</span><span className="value">{formatCurrency(totalPay)}</span></div>
    <div className="installment-section"><span className="label">Angsuran / Minggu</span><span className="value large">{formatCurrency(installment)}</span></div>
  </div>
);

export default CalculatorOutput;
