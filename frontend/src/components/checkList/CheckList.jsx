import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./CheckList.css";

function CheckList() {
  return (
    <section className="table-container">
      <table className="table table-striped table-bordered table-responsive-lg">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Done</th>
            <th scope="col">Title</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <th scope="row">{provider.id}</th>
                <td></td>
            </tr> */}
          {/*  {providers.map((provider) => (
            <ProvidersList
              key={provider.id}
              provider={provider}
              updateProvider={updateProvider}
              deleteProvider={deleteProvider}
            />
          ))} */}
        </tbody>
      </table>
    </section>
  );
}

export default CheckList;
