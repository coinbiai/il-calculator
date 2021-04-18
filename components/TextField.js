import { forwardRef } from "react";
import TextField from "@material-ui/core/TextField";

const WrappedTextField = forwardRef((props, ref) => (
  <TextField inputRef={ref} {...props} />
));

export default WrappedTextField;
