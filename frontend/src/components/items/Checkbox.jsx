import React from "react";
import PropTypes from "prop-types";
import "./Items.css";

function Checkbox({ label, value, onChange }) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
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

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
};

export default Checkbox;
