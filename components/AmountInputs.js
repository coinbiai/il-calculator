import TextField from "@material-ui/core/TextField";
import { Controller } from "react-hook-form";
import bn from 'bignumber.js';

/* TODO: custom amount */
const AmountInputs = ({ control, setValue, price1, price2 }) => {
  const handleChangeAmount1 = (e) => {
    setValue("amount1", e.target.value);
    const amount2 =  bn(price1).times(e.target.value).div(price2).toFixed();
    setValue("amount2", amount2);
  };

  const handleChangeAmount2 = (e) => {
    setValue("amount2", e.target.value);
    const amount1 =  bn(price2).times(e.target.value).div(price1).toFixed();
    setValue("amount1", amount1);
  };

  return (
    <div>
      <Controller
        name="amount1"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value}
            onChange={handleChangeAmount1}
          />
        )}
      />
      <Controller
        name="amount2"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value}
            onChange={handleChangeAmount2}
          />
        )}
      />
    </div>
  );
};

export default AmountInputs;
