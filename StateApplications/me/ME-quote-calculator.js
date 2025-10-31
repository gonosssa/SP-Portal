// Minimal ME quote calculator
function calculateMNQuote(params) {
  const maleEmployees = Number(params.maleEmployees || 0);
  const femaleEmployees = Number(params.femaleEmployees || 0);
  const totalEmployees = maleEmployees + femaleEmployees;
  const employeesOverCap = Number(params.employeesOverCap || 0);
  const payrollBelowCap = Number(params.payrollBelowCap || 0);
  const billingOption = params.billingOption === 'quarterly' ? 'quarterly' : 'annual';

  const WAGE_LIMIT = 184500; // Social Security wage limit
  // ME ShelterPoint: 0.45% if 14 or fewer employees, else 0.90%
  const SHELTERPOINT_RATE = totalEmployees <= 14 ? 0.0045 : 0.009;
  // ME State plan: 0.5% if 14 or fewer employees, else 1%
  const STATE_PLAN_RATE = totalEmployees <= 14 ? 0.005 : 0.01;

  // ShelterPoint quote
  const annualTotal = (employeesOverCap * WAGE_LIMIT * SHELTERPOINT_RATE) + (payrollBelowCap * SHELTERPOINT_RATE);
  const displayAmount = billingOption === 'quarterly' ? (annualTotal / 4) : annualTotal;

  // State plan price
  const statePlanAnnualTotal = (employeesOverCap * WAGE_LIMIT * STATE_PLAN_RATE) + (payrollBelowCap * STATE_PLAN_RATE);
  const statePlanDisplayAmount = billingOption === 'quarterly' ? (statePlanAnnualTotal / 4) : statePlanAnnualTotal;

  // Savings from state plan
  const savings = statePlanDisplayAmount - displayAmount;

  return {
    displayAmount: displayAmount,
    billingPeriod: billingOption === 'quarterly' ? 'quarter' : 'year',
    breakdown: {
      base: 0,
      totalEmployees,
      employeesOverCap,
      payrollBelowCap,
      totalCost: displayAmount,
      statePlanPrice: statePlanDisplayAmount,
      savings: savings,
    },
  };
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value || 0);
}

// Expose globals for non-module usage
window.calculateMNQuote = calculateMNQuote;
window.formatCurrency = formatCurrency;


