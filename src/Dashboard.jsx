import { useState } from "react";
import { mockBudgetData } from "./data";
import StatCard from "./StatCard";
import CategoryBreakdownCard from "./CategoryBreakdownCard";

function formatCurrency(amount) {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  }).format(amount);
}

function formatMonthYear(monthYear) {
  const [year, month] = monthYear.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' });
}

function Dashboard() {
  const [monthYear, setMonthYear] = useState('2025-04');

  const changeMonth = (offset) => {
    const [year, month] = monthYear.split('-').map(Number);
    const date = new Date(year, month - 1 + offset, 1);
    const newMonthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    setMonthYear(newMonthYear);
  };

  const summary = mockBudgetData[monthYear];

  function phraseHandle(savingsRate) {
    if( savingsRate >= 80) {
      return 'Swietna robota'
    } 
    if( savingsRate >= 60) {
      return 'Dobrze jest!'
    }
    if( savingsRate >= 40) {
      return 'Nie żle jest!'
    }
    if( savingsRate >= 20) {
      return 'Musisz się skupić!'
    }
    if( savingsRate < 20) {
      return 'Oszczedzaj więcej'
    }
  }

  return (
    <div className="container">
      <div className="page-header">
        <h2 className="page-title">Dashboard 💰</h2>
        <div className="month-selector">
          <button className="btn" onClick={() => changeMonth(-1)}>←</button>
          <div className="month-display">{formatMonthYear(monthYear)}</div>
          <button className="btn" onClick={() => changeMonth(1)}>→</button>
        </div>
      </div>

      {!summary ? (
        <p className="no-data">Brak danych dla wybranego miesiąca.</p>
      ) : (
        <>
          <div className="stats-grid">
            <StatCard
              title="Przychody"
              value={formatCurrency(summary.totalIncome)}
              subtitle={`${summary.transactionCount} transakcji`}
              variant="income"
            />
            <StatCard
              title="Wydatki"
              value={formatCurrency(summary.totalExpenses)}
              variant="expense"
            />
            <StatCard
              title="Bilans"
              value={formatCurrency(summary.net)}
              variant={summary.net >= 0 ? 'income' : 'expense'}
            />
            <StatCard
              title="Oszczędności"
              value={`${summary.savingsRate.toFixed(1)}%`}
              subtitle={phraseHandle(summary.savingsRate.toFixed(1))}
            />
          </div>

          <CategoryBreakdownCard breakdown={summary.categoryBreakdown} />
        </>
      )}
    </div>
  );
}

export default Dashboard;
