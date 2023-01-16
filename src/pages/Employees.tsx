import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IEmployee } from "./types";

function Employees() {
  const [employees, setEmployees] = useState<Array<IEmployee>>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost/employees-app/api/get_employees.php")
      .then((res) => res.json())
      .then((json) => {
        setEmployees(json);
      });
  }, []);

  function handleDelete(id: number) {
    fetch(`http://localhost/employees-app/api/del_employee.php?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          const updated = [...employees].filter(
            (employee) => employee.id !== id
          );
          setEmployees(updated);
        } else {
          setError(`Failed to delete employee. ${json.error}`);
        }
      });
  }

  return (
    <>
      <div className="bg-dark p-3">
        <Link to="/details" className="btn btn-primary">
          Add Employee
        </Link>
      </div>

      {error && <div className="text-danger">{error}</div>}

      <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <Link to={`/details/${employee.id}`}>{employee.id}</Link>
              </td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>
                {employee.address}, {employee.cityId}
              </td>
              <td>{employee.active}</td>
              <td>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="btn btn-default"
                >
                  <i className="bi-trash" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Employees;
