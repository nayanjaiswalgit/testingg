import "./Marks.scss";

const Marks = ({ marks }) => {
  const RenderMarksDiv = ({ marks }) => {
    let colClass = "";
    if (marks < 3) colClass = "low";
    else if (marks === 3) {
      colClass = "medium";
    } else {
      colClass = "high";
    }
    const marksArr = [1, 2, 3, 4, 5];
    return marksArr.map((i, key) => (
        <div
          key={key}
          className={`marks-unit  ${
            (i === 1 ? "bround-l " : "")
            + (i === 5 ? "bround-r " : "")
            + (i <= marks ? colClass : " ")
          } `}
        />
    ));
  };
  return (
    <div className="marks-container">
      <RenderMarksDiv marks={marks} />
    </div>
  );
};

export default Marks;
