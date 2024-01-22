import { useDispatch } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import ActionButton from "../Button/ActionButton";
import { AddButton } from "../Button/Button";
import "./SubHeaderWithSearchAndButtons.scss";
import { openModal } from "../../store/actions/modalDrawerActions";

const SubHeaderWithSearchAndButtons = ({ id, onSearch }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openModal(id));
  };

  return (
    <div className="search-button-container">
      <SearchBar onSearch={onSearch} /> <ActionButton />{" "}
      <AddButton handleClick={handleClick} />
    </div>
  );
};

export default SubHeaderWithSearchAndButtons;
