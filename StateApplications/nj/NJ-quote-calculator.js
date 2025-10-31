// NJ Temporary Disability Benefits Quote Calculator
function calculateNJQuote(params) {
  // NJ TDI rates are typically based on employee contributions
  // This is a placeholder structure - adjust rates as needed
  const employeeCount = Number(params.employeeCount || 0);
  const billingOption = params.billingOption === 'quarterly' ? 'quarterly' : 'annual';

  // Placeholder calculation - adjust based on actual NJ TDI rates
  const monthlyRatePerEmployee = 1.50; // Placeholder rate
  const annualTotal = employeeCount * monthlyRatePerEmployee * 12;
  const displayAmount = billingOption === 'quarterly' ? (annualTotal / 4) : annualTotal;

  return {
    displayAmount: displayAmount,
    billingPeriod: billingOption === 'quarterly' ? 'quarter' : 'year',
    breakdown: {
      totalEmployees: employeeCount,
      monthlyRate: monthlyRatePerEmployee,
      totalCost: displayAmount,
    },
  };
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value || 0);
}

// Expose globals for non-module usage
window.calculateNJQuote = calculateNJQuote;
window.formatCurrency = formatCurrency;

