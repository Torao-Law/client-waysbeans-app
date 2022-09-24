import React from "react";

//component
import Header from "../../components/Headers/AdminHeader";

function dashboard() {
  return (
    <div>
      <Header />
      <div className="container">
        <h3 style={{ marginTop: 83, color: "#613D2B", fontWeight: 900 }}>
          Income Transaction
        </h3>
        <table className="table table-bordered " style={{ marginTop: 52 }}>
          <thead className="bg-secondary">
            <tr>
              <th scope="col" className="text-center">
                No
              </th>
              <th scope="col" className="text-center">
                Name
              </th>
              <th scope="col" className="text-center">
                Address
              </th>
              <th scope="col" className="text-center">
                Post Code
              </th>
              <th scope="col" className="text-center">
                Products Order
              </th>
              <th scope="col" className="text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row d-flex text-align-center">1</th>
              <td className="m-0">Mark</td>
              <td className="m-0">Otto</td>
              <td className="m-0 text-center">@mdo</td>
              <td className="m-0 text-center">@mdo</td>
              <td className="m-0">@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default dashboard;
