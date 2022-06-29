import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./InviteGuests.css";

function GuestsList({ list, updateGuest, deleteGuest }) {
  //let valueOfChecked = list.checked ? true : false;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    setValue("checked", list.checked ? true : false);
  }, [list.checked]);
  return (
    <tr>
      <td>{list.id}</td>
      <td>
        <input
          className="form-check-input"
          {...register("checked")}
          type="checkbox"
          id="flexCheckDefault"
          disabled
        />
        <label class="form-check-label" htmlFor="flexCheckDefault">
          Invited
        </label>
      </td>
      <td>{list.firstname}</td>
      <td>{list.lastname}</td>
      <td>{list.number}</td>
      <td>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => updateGuest(list)}
        >
          Edite
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteGuest(list.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default GuestsList;
