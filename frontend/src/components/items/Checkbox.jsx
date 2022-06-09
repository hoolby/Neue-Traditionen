/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
}
export default Checkbox;
