import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Providers.css";

const ProvidersList = ({ provider, onDelete, onUpdate }) => {
  return (
    <tr>
      <th scope="row">{provider.id}</th>
      <td>{provider.title}</td>
      <td>{provider.mobile}</td>
      <td>{provider.email}</td>
      {/*   <td>
        {provider.services.map((item) => (
          <span key={item.value}>{item.label} ,</span>
        ))}
      </td> */}
      <td>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => onUpdate(provider.id)}
        >
          Edite
        </button>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => onDelete(provider.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
export default ProvidersList;
