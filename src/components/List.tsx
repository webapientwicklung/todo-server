import type { ToDo } from "./toDo";
import ToDoDisp from "./ToDoDisp";

interface Props {
  items: ToDo[] | null | undefined;
  selectedForEdit: number | null;

  onClickDone: (id: number) => void;
  onClickEdit: (id: number) => void;
  onClickDelete: (id: number) => void;
}

function List(props: Props) {
  if (props.items != null || props.items != undefined)
    return (
      <ul className="list-group">
        {props.items.map((item) => (
          <li className={"list-group-item "}>
            <ToDoDisp
              input={item}
              onClickDone={props.onClickDone}
              onClickEdit={props.onClickEdit}
              onClickDelete={props.onClickDelete}
            ></ToDoDisp>
          </li>
        ))}
      </ul>
    );
}

export default List;

{
  /* <ul class="list-group">
  <li class="list-group-item">Cras justo odio</li>
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item">Morbi leo risus</li>
  <li class="list-group-item">Porta ac consectetur ac</li>
  <li class="list-group-item">Vestibulum at eros</li>
</ul> */
}

/* props.items.map((item) => (
        <li
          className={
            "list-group-item " + (item.id === props.selected ? "active" : "")
          }
          style={{ cursor: "pointer" }}
          onClick={() => props.onClick(item.id)}
        >
          <ToDoDisp input={item} onClickDone={props.onClickDone}></ToDoDisp>
        </li>
      )) */
