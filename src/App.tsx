import { useEffect, useState } from "react";
import Button from "./components/Button";
import type { ToDo } from "./components/toDo";
import Input from "./components/input";
import Dropdown from "./components/DropDown";

import "./App.css";
import List from "./components/List";

function App() {
  // useState elemente
  const [items, setItems] = useState<ToDo[]>([]);
  const [filteredItems, setFilteredItems] = useState<ToDo[]>();
  const [filterMode, setFilterMode] = useState<
    "showAll" | "showDone" | "showNotDone"
  >("showAll");
  const [editedText, setEditedText] = useState<string>("");
  const [selectedForEdit, setSelectedForEdit] = useState<number | null>(0);
  const [newItem, setNewItem] = useState<string>("");
  const [newDate, setNewDate] = useState<string>("");
  const [, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // -------------------------------------

  // useEffect to save in localstorage:

  /*   useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("toDos", JSON.stringify(items));
    }
  }, [items]);

  useEffect(() => {
    const saved = localStorage.getItem("toDos");
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      console.log("nothing saved!");
    }
    setIsLoaded(true);
  }, []); */

  // handle Functions:

  // Bei Loading
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/todos`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoaded(true);
      });
  }, []);

  const handleAddItem = () => {
    fetch(`${import.meta.env.VITE_API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: newItem,
        isDone: false,
        dueDate: newDate,
        onEdit: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems([...items, data]);
        setNewItem("");
        setNewDate("");
      });
  };
  //*********** */
  const handleDeleteItem = (id: number) => {
    fetch(`${import.meta.env.VITE_API_URL}/deletetodo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const update = items?.filter((item) => item.id != data.id);
        setItems(update);
      });
  };

  //*********** */

  //*********** */
  const handleClickEdit = (id: number) => {
    const isCurrentlyEditing = selectedForEdit === id;
    setShowEditModal(true);
    setSelectedForEdit(id);
    const update = items?.map((item) =>
      item.id === id
        ? { ...item, onEdit: !isCurrentlyEditing }
        : { ...item, onEdit: false }
    );
    setItems(update);
    setSelectedForEdit(isCurrentlyEditing ? null : id);
    setEditedText("");
  };

  //*********** */
  const handleSaveEdit = () => {
    fetch(`${import.meta.env.VITE_API_URL}/edittodo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selectedForEdit,
        text: editedText,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const update = items?.map((item) =>
          item.id === data.id
            ? { ...item, text: data.text, onEdit: false }
            : item
        );
        setItems(update);
        setSelectedForEdit(null);
      });
  };

  //*********** */
  // handle functions for filter
  const handleShowDone = () => {
    setFilterMode("showDone");
  };
  const handleShowNotDone = () => {
    setFilterMode("showNotDone");
  };
  const handleShowAll = () => {
    setFilterMode("showAll");
  };

  // UserEffect für Filter
  useEffect(() => {
    if (!items) return;
    let tempfilteredItems: ToDo[];
    if (filterMode === "showDone") {
      tempfilteredItems = items.filter((item) => item.isDone);
    } else if (filterMode === "showNotDone") {
      tempfilteredItems = items.filter((item) => !item.isDone);
    } else {
      tempfilteredItems = [...items];
    }
    setFilteredItems(tempfilteredItems);
  }, [items, filterMode]);

  //*********** */
  const handleClickDone = (id: number) => {
    const currentItem = items?.find((item) => item.id === id);
    if (!currentItem) return;
    const newIsDone = !currentItem?.isDone;
    const updatedItems = items?.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    );
    setItems(updatedItems);

    fetch(`${import.meta.env.VITE_API_URL}/clickdonetodo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        isDone: newIsDone,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Database ist aktualisiert!", data);
      })
      .catch((error) => {
        console.error("fehler beim speichern:,", error);
      });
  };

  function handlePupUp(): void {
    setShowModal(!showModal);
  }

  const handleEditPupUp = () => {
    setShowEditModal(!showEditModal);
  };

  //***************************************** */
  return (
    <div className={"container my-5"}>
      <div className={"row justify-content-center"}>
        <div className="col-lg-8">
          <div className="card shadow p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold">Filter: </span>
              <Dropdown
                onClickFilterShowAll={handleShowAll}
                onClickFilterShowDone={handleShowDone}
                onClickFilterShowNotDone={handleShowNotDone}
              ></Dropdown>
              <Button text="Add New Item" onClick={handlePupUp}></Button>
            </div>
            <div className=" rounded p-1">
              <List
                items={filteredItems}
                selectedForEdit={selectedForEdit}
                onClickDone={handleClickDone}
                onClickEdit={handleClickEdit}
                onClickDelete={handleDeleteItem}
              ></List>
            </div>
          </div>
        </div>
        <div className="row mb-2 mt-2"></div>
      </div>
      <div className={"col-sm-2 col-lg-4"}>
        {showModal && (
          <div className="modal d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">new ToDo</h5>
                </div>
                <div className="modal-body">
                  <Input
                    text={newItem}
                    onChange={setNewItem}
                    description="new Item"
                  ></Input>
                  <Input
                    text={newDate}
                    onChange={setNewDate}
                    description="Date"
                  ></Input>
                </div>
                <div className="modal-footer">
                  {" "}
                  <Button text="Add Item" onClick={handleAddItem}></Button>
                  <Button text="Close" onClick={handlePupUp}></Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showEditModal && (
          <div className="modal d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit ToDo</h5>
                </div>
                <div className="modal-body">
                  <Input
                    text={editedText}
                    description="edit Item"
                    onChange={setEditedText}
                  ></Input>
                </div>
                <div className="modal-footer">
                  {" "}
                  <Button text="Save" onClick={handleSaveEdit}></Button>
                  <Button text="Close" onClick={handleEditPupUp}></Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
