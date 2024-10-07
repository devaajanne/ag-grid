import { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function TodoList() {
  const [todo, setTodo] = useState({
    description: "",
    priority: "",
    date: "",
  });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  // Määritetään AG-Gridin taulukon sarakkeet
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "description",
      // Sarakkeen sorttaus kytketty pois päältä
      sortable: false,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "priority",
      filter: true,
      // Priorityn teksti näytetään punaisena, jos priority on "High"
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
      floatingFilter: true,
    },
    { field: "date", filter: true, floatingFilter: true },
  ]);

  const addTodo = () => {
    if (todo.description == "") {
      alert("A todo cannot be empty.");
    } else if (todo.priority == "") {
      alert("A todo must have a priority.");
    } else if (todo.date == "") {
      alert("A todo must have a date.");
    } else {
      setTodos([...todos, todo]);
      setTodo({ ...todo, description: "", priority: "", date: "" });
    }
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (todo, index) => index != gridRef.current.getSelectedNodes()[0].id
        )
      );
    } else {
      alert("Select a row first!");
    }
  };

  return (
    <>
      <input
        placeholder="Description"
        type="text"
        onChange={(event) =>
          setTodo({ ...todo, description: event.target.value })
        }
        value={todo.description}
      ></input>
      <input
        placeholder="Priority"
        type="text"
        onChange={(event) => setTodo({ ...todo, priority: event.target.value })}
        value={todo.priority}
      ></input>
      <input
        placeholder="Date"
        type="text"
        onChange={(event) => setTodo({ ...todo, date: event.target.value })}
        value={todo.date}
      ></input>
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>
      <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
        {/* Renderöidään AG-Grid */}
        {/* ref antaa pääsyn komponentin metodeihin */}
        {/* params.api sisältää komponentin metodit */}
        {/* AG-Grid taulukon sisältö (rowData)saadaan taulukkomuotoisesta ( [] ) todos-tilamuuttujasta */}
        {/* AG-Grid taulukon sarakkeet (columnDefs) saadaan columnDefs-tilamuuttujasta */}
        {/* rowSelection mode singleRow valitsee kerralla koko rivin */}
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowData={todos}
          columnDefs={columnDefs}
          rowSelection={{ mode: "singleRow" }}
        />
      </div>
    </>
  );
}

export default TodoList;
