interface Props {
  text: string;
  description: string;
  onChange: (i: string) => void;
}

function Input({ text, description, onChange }: Props) {
  return (
    <div className="input-group mb-2 me-2">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-default">
          {description}
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        value={text}
        onChange={(e) => onChange(e.target.value)}
      ></input>
    </div>
  );
}

export default Input;

{
  /* <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-default">Default</span>
  </div>
  <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
</div> */
}
