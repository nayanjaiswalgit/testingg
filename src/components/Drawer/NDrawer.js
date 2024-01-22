import { Drawer } from "antd";
import "./NDrawer.scss";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer } from "../../store/actions/modalDrawerActions";
import { isDrawerOpenSelector } from "../../store/selectors/modalDrawerSelector";

const NDrawer = ({ id, children, ...props }) => {
  const drawerisopen = useSelector((state) => isDrawerOpenSelector(state, id));
  const dispatch = useDispatch();

  return (
    <>
      <Drawer
        width={800}
        onClose={() => dispatch(closeDrawer(id))}
        open={drawerisopen}
        {...props}
      >
        {drawerisopen && children}
      </Drawer>
    </>
  );
};
export default NDrawer;
