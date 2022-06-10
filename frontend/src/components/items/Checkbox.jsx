import React from "react";

import "./Items.css";
const Checkbox = ({ label, value, onChange }) => {
  return (
    <label id="privacy" class="form-check-label ml-3">
      <input
        for="privacy"
        class="form-check-input"
        type="checkbox"
        checked={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};
export default Checkbox;
