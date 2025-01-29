import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function PlusMinusBtn(props) {
  const [btn, setBtn] = useState(1);

  useEffect(() => {
  if (props.count !== btn) {
    props.setCount?.(btn); 
    props.changeCount?.(props.id, btn);
  }
}, [btn]);


 useEffect(() => {
  if (props.count !== undefined && props.count !== btn) {
    setBtn(props.count);
  }
}, [props.count]);


  return (
    <div className="input-group d-flex align-items-center gap-2">
      <span
        className="input-group-btn"
        onClick={(e) => {
          if (btn > 0) {
            setBtn((prev) => prev - 1);
          } else {
            setBtn(0);
          }
        }}
      >
        <button
          type="button"
          className="btn btn-danger btn-number"
          data-type="minus"
          data-field="quant[2]"
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </span>
      <div className="">
        <input
          type="number"
          name="quant[2]"
          className="form-control input-number"
          min={1}
          max={100}
          value={btn}
         onChange={(e) => {
  let value = Number(e.target.value);
  if (value > 0) {
    setBtn(value);
  } else {
    setBtn(0);
  }
}}

        />
      </div>
      <span
        className="input-group-btn"
        onClick={() => setBtn((prev) => prev + 1)}

      >
        <button
          type="button"
          className="btn btn-success btn-number"
          data-type="plus"
          data-field="quant[2]"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </span>
    </div>
  );
}
