import React from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteAchievement } from "../../store/achievementSlice";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import "../../styles/AchievementCard.css"; // Import CSS

interface Props {
  id: number;
  title: string;
  description: string;
  temperature: string;
  humidity: string;
  onEdit: () => void;
}

const AchievementCard: React.FC<Props> = ({ id, title, description, temperature, humidity, onEdit }) => {
  const dispatch = useDispatch();

  return (
    <Card className="project-card-view">
      <Card.Body>
        <div>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <div className="weather-info">🌡️ {temperature}</div>
          <div className="weather-info">💧 {humidity}</div>
        </div>
        <div className="action-buttons">
          <Button variant="warning" onClick={onEdit}>
            <CiEdit />
          </Button>
          <Button variant="danger" style={{ marginLeft: "10px" }} onClick={() => dispatch(deleteAchievement(id))}>
            <MdDeleteOutline />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AchievementCard;
