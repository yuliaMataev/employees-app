import Joi from "joi";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ICity, IEmployee } from "./types";

function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cities, setCities] = useState<Array<ICity>>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [cityId, setCityId] = useState<string>("");
  const [active, setActive] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost/employees-app/api/get_cities.php")
      .then((res) => res.json())
      .then((json) => {
        setCities(json);
        setCityId(json[0].id);
      });

    if (!id) return;

    fetch(`http://localhost/employees-app/api/get_emp1.php?id=${id}`)
      .then((res) => res.json())
      .then((json) => {
        const data = json[0];

        setFirstName(data.firstName);
        setLastName(data.lastName);
        setAddress(data.address);
        setCityId(data.cityId);
        setActive(data.active);
      });
  }, []);

  function addEmployee(data: IEmployee) {
    fetch("http://localhost/employees-app/api/add_employee.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          navigate("/");
        } else {
          setError(`Failed to add employee. ${json.error}`);
        }
      });
  }

  function updateEmployee(data: IEmployee) {
    fetch(`http://localhost/employees-app/api/update_employee.php?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          navigate("/");
        } else {
          setError(`Failed to update employee. ${json.error}`);
        }
      });
  }

  function handleSubmit() {
    const schema = Joi.object().keys({
      firstName: Joi.string().required().min(2),
      lastName: Joi.string().required().min(2),
      address: Joi.string().required().min(3),
    });

    const { error, value } = schema.validate({
      firstName,
      lastName,
      address,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const data = {
      ...value,
      cityId,
      active,
    };

    if (!id) {
      addEmployee(data);
    } else {
      updateEmployee(data);
    }
  }

  return (
    <div className="p-4">
      <div className="mb-3">
        <input
          type="text"
          placeholder="First Name"
          className="form-control"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Last Name"
          className="form-control"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Address"
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <select
          className="form-select"
          value={cityId}
          onChange={(e) => setCityId(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-check mt-2">
        <input
          type="checkbox"
          className="checkbox"
          checked={active}
          onChange={(e) => setActive(!active)}
        />
        <label className="form-check-label">Active</label>
      </div>

      <div className="mt-3">
        <button onClick={handleSubmit} className="btn btn-primary me-3">
          Submit
        </button>
        <Link to="/" className="btn btn-secondary">
          Cancel
        </Link>
      </div>

      {error && <div className="text-danger">{error}</div>}
    </div>
  );
}

export default Details;
