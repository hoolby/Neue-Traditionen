import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import "./CheckList.css";

function CheckListItem({ list, updateChecklist, deleteChecklist }) {
  // let valueOfChecked = list.checked ? true : false;

  const { register, setValue } = useForm({});

  useEffect(() => {
    //eslint-disable-line
    setValue("checked", !!list.checked); //eslint-disable-line
  }, [list.checked]); //eslint-disable-line
  return (
    <tr>
      <td>{list.id}</td>
      <td>
        <input
          className="form-check-input"
          {...register("checked")} //eslint-disable-line
          type="checkbox"
          id="flexCheckDefault"
          disabled
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          You did it {/* eslint-disable-line */}
        </label>
      </td>
      <td>{list.title}</td>
      <td>{list.responsible}</td>
      <td>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => updateChecklist(list)}
        >
          Edite
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteChecklist(list.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default CheckListItem;
