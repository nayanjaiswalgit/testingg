import DeleteIcon from "../assets/DeleteIcon.svg";
import EditIcon from "../assets/EditIcon.svg";

export const MenuActionsObj = [
  {
    icon: DeleteIcon,
    label: "Delete",
    onClick: (e) => {
      alert("Delete was clicked");
    },
  },
  {
    icon: EditIcon,
    label: "Edit",
    onClick: (e) => {
      alert("Edit was clicked");
    },
  },
];
