import axios from "axios";
import DatePicker from "react-date-picker";
import React, { useState, useEffect } from "react";

export default function Todo() {
  const [name, setname] = useState();
  const [task, settask] = useState();
  const [description, setdescription] = useState();
  const [searchitem, setsearchitem] = useState("");
  const [updateId, setupdateId] = useState();
  const [modalname, setmodalname] = useState("");
  const [modaltask, setmodaltask] = useState("");
  const [modaldescription, setmodaldescription] = useState("");
  const [alltodo, setalltodo] = useState([]);

  const addTodo = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/todos", {
      name,
      task,
      description,
    });
    e.target.reset();
  };

  const getalltodo = async () => {
    const { data } = await axios.get("http://localhost:5000/api/todos"); //data is key of axios {Data} ===>> destructuring
    setalltodo(data.result);
  };

  let deleteId; //this created just coz id will get conti. change
  const deleteTodo = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/todos/${deleteId}`
      );
      console.log("deleteId" + deleteId);
    } catch (error) {
      console.log("error" + error);
    }
    getalltodo();
  };

  const updateTodo = async () => {
    const { data } = await axios.put(
      `http://localhost:5000/api/todos/${updateId}`,
      {
        name: modalname,
        task: modaltask,
        description: modaldescription,
      }
    ); //put will always take to parameter one is id and another is what type of data we want to change
    getalltodo();
    console.log(updateId);
  };

  useEffect(() => {
    getalltodo();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-3">
            <div className="card mt-5">
              <div className="card-header alert-primary">Todo Application</div>
              <div className="card-body">
                <form onSubmit={addTodo}>
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Task"
                    className="form-control"
                    onChange={(e) => {
                      settask(e.target.value);
                    }}
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Description"
                    className="form-control"
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                  />
                  <br />
                  <input
                    type="submit"
                    value="submit"
                    className="btn btn-success w-100"
                  />
                </form>
              </div>
            </div>
            <br />
            <input
              type="text"
              placeholder="SEARCH BY NAME"
              className="form-control"
              onChange={(e) => {
                setsearchitem(e.target.value);
              }}
            />
            <br />
            {alltodo
              .filter((value) => {
                if (searchitem === "") {
                  return value;
                } else if (
                  value.name.toLowerCase().includes(searchitem.toLowerCase())
                ) {
                  return value;
                }
              })
              .map((item) => (
                <>
                  <br />
                  <div className="card">
                    <div className="card-header bg-primary text-light">
                      <div className="d-flex justify-content-around">
                        <div> {item.name}</div>
                        <div>
                          <button
                            className="btn btn-warning"
                            data-bs-target="#editModel"
                            data-bs-toggle="modal"
                            onClick={(e) => {
                              setmodalname(item.name);
                              setmodaltask(item.task);
                              setmodaldescription(item.description);
                              setupdateId(item._id);
                              console.log(updateId);
                            }}
                          >
                            edit
                          </button>{" "}
                          &nbsp;
                          <button
                            onClick={(e) => {
                              deleteId = item._id;
                            }}
                            className="btn btn-sm btn-danger"
                            data-bs-target="#delModel"
                            data-bs-toggle="modal"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <h4>{item.task}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
      <div className="modal fade" id="delModel">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h1>Are You Sure?</h1>
              <button
                data-bs-dismiss="modal"
                className="btn btn-lg btn-danger me-4"
                onClick={deleteTodo}
              >
                Yes
              </button>
              <button
                data-bs-dismiss="modal"
                className="btn btn-lg btn-success"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*Edit Modal */}
      <div class="modal fade" id="editModel">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={modalname}
                onChange={(e) => setmodalname(e.target.value)}
              />{" "}
              <br />
              <input
                type="text"
                className="form-control"
                value={modaltask}
                onChange={(e) => setmodaltask(e.target.value)}
              />{" "}
              <br />
              <input
                type="text"
                className="form-control"
                value={modaldescription}
                onChange={(e) => setmodaldescription(e.target.value)}
              />{" "}
              <br />
              <br />
              <button
                data-bs-dismiss="modal"
                className="btn btn-lg btn-danger me-4"
                onClick={updateTodo}
              >
                Edit
              </button>
              <button
                data-bs-dismiss="modal"
                className="btn btn-lg btn-success"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
