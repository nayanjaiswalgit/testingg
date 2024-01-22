import { Avatar } from "antd";
import profile from "../../assets/profile-photo.jpeg";
import "./comments.scss";

const Comments = ({ data }) => (
  <div className="comment-main-container">
    <div className="comment-author-thumbnail">
      <div className="comment-left-header">
        <div className="comment-avatar">
          <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            U
          </Avatar>
        </div>
        <div className="comment-author-detail">
          <div className="comment-author-name">{`${data.owner.first_name} ${data.owner.last_name}`}</div>
          <div className="comment-author-profile">Interviewers 1</div>
        </div>
      </div>
      <div className="comment-date">11-Aug-2023</div>
    </div>
    <div className="comment-author-review">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamc
    </div>
  </div>
);

export default Comments;
