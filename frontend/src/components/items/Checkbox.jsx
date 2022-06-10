
import React from "react";

import "./Items.css";

function Checkbox({ label, value, onChange }) {
  return (
    <label id="privacy" className="form-check-label ml-3">
      <input
        htmlFor="privacy"
        className="form-check-input"
        type="checkbox"
        checked={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};
export default Checkbox;
