import React, { useEffect, useState } from "react";
import "./FeedbackModal.scss";
import { Modal, Spin, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Marks from "../MarksOut5/Marks";
import { closeModal } from "../../store/actions/modalDrawerActions";
import { INTERVIEW_FEEDBACK } from "../../store/actiontypes";
import {
  isModalOpenSelector,
  modalPayloadSelector,
} from "../../store/selectors/modalDrawerSelector";
import { getFeedback } from "../../services/interview/feedback";

export const FeedbackModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => isModalOpenSelector(state, INTERVIEW_FEEDBACK));
  const ivid = useSelector((state) => modalPayloadSelector(state, INTERVIEW_FEEDBACK));

  const [feedback, setFeedbackData] = useState([]);
  const id = ivid.candidate.url.split("/").filter(Boolean).pop();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFeedback(id);
        setFeedbackData(data.results);
      } catch (error) {
        console.error("Error in fetchData: ", error);
      }
    };

    fetchData();
  }, []);
  console.log(feedback);

  const RatingItem = ({ label, data }) => (
    <div className="rating-item">
      <div className="rating-item-text">{label}</div>
      <div className="rating-item-data">{data}</div>
    </div>
  );

  const FeedbackRating = ({ results }) => (
    <div className="feedback-ratings">
      <RatingItem
        label="Should be Recruited"
        data={results.should_hire ? "Yes" : "No"}
      />
      {results.ratings.map((rating, index) => (
        <RatingItem
          key={index}
          label={rating?.param_name}
          data={<Marks marks={rating.rating} />}
        />
      ))}
      <RatingItem
        className="feedback-description "
        label="Overall Performance"
        data={results.feedback}
      />
    </div>
  );

  const interviewerList = feedback.map((data, index) => ({
    key: index,
    label: `${data?.interviewer?.first_name} ${data?.interviewer?.last_name}`,
    children: <FeedbackRating results={data} />,
  }));

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => dispatch(closeModal(INTERVIEW_FEEDBACK))}
      title={"Interview Feedback"}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className="ant-modaldata-feedback-wrapper">
        <Tabs defaultActiveKey="1" items={interviewerList} />
      </div>
    </Modal>
  );
};
