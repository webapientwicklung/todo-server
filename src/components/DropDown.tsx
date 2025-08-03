interface Props {
  onClickFilterShowAll: () => void;
  onClickFilterShowDone: () => void;
  onClickFilterShowNotDone: () => void;
}

function Dropdown({
  onClickFilterShowAll,
  onClickFilterShowDone,
  onClickFilterShowNotDone,
}: Props) {
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-primary"
        onClick={onClickFilterShowAll}
      >
        All
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={onClickFilterShowDone}
      >
        Done
      </button>

      <button
        type="button"
        className="btn btn-primary"
        onClick={onClickFilterShowNotDone}
      >
        no tDone
      </button>
    </div>
  );
}

export default Dropdown;

{
  /* <div class="btn-group">
  <button type="button" class="btn btn-primary">Apple</button>
  <button type="button" class="btn btn-primary">Samsung</button>
  <div class="btn-group">
    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">Sony</button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Tablet</a></li>
      <li><a class="dropdown-item" href="#">Smartphone</a></li>
    </ul>
  </div>
</div> */
}
