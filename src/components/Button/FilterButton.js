import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { buttonStateSelector } from "../../store/selectors/tablepropsSelector";
import { setButtonState } from "../../store/actions/tablepropsAction";
import "./FilterButton.scss";

const FilterButton = ({ buttonKey, text }) => {
  // Selector Dispatch useState
  const dispatch = useDispatch();
  const selected = useSelector((state) => buttonStateSelector(state, buttonKey));

  // Handle Button Click when clicked
  const handleButtonClick = () => {
    // toggle the state of the button
    dispatch(setButtonState(buttonKey, !selected));
  };

  return (
    <button
      className={`filter-button-normal ${selected ? "filter-button-selected" : ""}`}
      onClick={handleButtonClick}
    >
      {selected && (
        <span className="filter-button-icon">
          <FontAwesomeIcon icon={faCheck} style={{ color: "white" }} />
        </span>
      )}
      <span className="filter-button-text">{text}</span>
    </button>
  );
};

export default FilterButton;
