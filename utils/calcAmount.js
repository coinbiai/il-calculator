

const amount2 = bn(price1).times(e.target.value).div(price2).toFixed();

const calcAmount = ({ amount1, price2, price2 }) => {
  const amount2 = bn(price1).times(amount1).div(price2).toFixed();
  return [bn(amount1), amount2];
};

