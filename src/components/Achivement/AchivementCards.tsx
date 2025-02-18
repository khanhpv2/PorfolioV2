import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteAchievement } from "../../store/achievementSlice";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

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
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={2} className="project-card">
            <Card.Title>{title}</Card.Title>
          </Col>
          <Col md={8} className="project-card">
            <Card.Text style={{ textAlign: "justify" }}>
              {description}
            </Card.Text>
            <div style={{textAlign:"left"}}>🌡️ : {temperature}</div>
            <div style={{textAlign:"left"}}>💧 : {humidity}</div>
          </Col>
          <Col md={2} className="project-card" style={{display:"flex",alignItems:"center"}}>
          <Button variant="warning" onClick={onEdit}>
              <CiEdit  />
            </Button>
            <Button
              variant="danger"
              style={{ marginLeft: "10px" }}
              onClick={() => dispatch(deleteAchievement(id))}
            >
              <MdDeleteOutline />
            </Button>
          </Col>

        </Row>
      </Card.Body>
    </Card>
  );
};

export default AchievementCard;
