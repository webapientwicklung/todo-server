import type { ToDo } from "./toDo";

interface Props {
  input: ToDo;
  onClickDone: (id: number) => void;
  onClickEdit: (id: number) => void;
  onClickDelete: (id: number) => void;
}

function ToDoDisp({ input, onClickDone, onClickDelete, onClickEdit }: Props) {
  function dateColorGenerator(datum: string, isDone: boolean) {
    const today = new Date().toISOString().split("T")[0];
    let dateColor = "text-secondary";
    if (datum < today && !isDone) {
      dateColor = "text-danger";
    } else if (datum === today && !isDone) {
      dateColor = "text-warning";
    } else if (isDone) {
      dateColor = "text-success";
    }
    return dateColor;
  }
  return (
    <div className={"d-flex align-items-center justify-content-between "}>
      <div className="d-flex align-items-center gap-3">
        <span
          onClick={() => onClickDone(input.id)}
          style={{ cursor: "pointer" }}
        >
          {input.isDone ? "✅" : "⬜️"}
        </span>

        <div className="d-flex flex-column">
          <p className={`mb-0 lh-sm ${input.onEdit ? "text-primary" : ""}`}>
            {input.text}
          </p>
          <small
            className={`mt-0 lh-sm ${
              input.dueDate
                ? dateColorGenerator(input.dueDate, input.isDone)
                : "text-secondary"
            }`}
            style={{ lineHeight: "1" }}
          >
            {input.dueDate
              ? new Date(input.dueDate).toLocaleString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </small>
        </div>
      </div>
      <div className="d-flex align-items-center gap-3">
        <button
          className={"btn btn-sm btn-outline-dark"}
          onClick={() => onClickEdit(input.id)}
        >
          Edit
        </button>
        <button
          className={"btn btn-sm btn-outline-danger"}
          onClick={() => onClickDelete(input.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ToDoDisp;
