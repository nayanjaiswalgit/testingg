import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CustomSortIconAntd.scss";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export const CustomSortIconAntd = ({ sortOrder }) => (
    <span className={`sort-icon-antd-${sortOrder}`}>
      <FontAwesomeIcon size={"sm"} icon={faArrowUp} />
    </span>
);
