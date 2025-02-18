import React, { useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import AchievementCard from "./AchivementCards";
import AchievementForm from "./AchievementForm";
import { RootState } from "../../store/store";

const Achievements = () => {
  const achievements = useSelector((state: RootState) => state.achievements);
  const [showModal, setShowModal] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);

  return (
    <Container>
      <h1>Achievements</h1>
      <Button onClick={() => setShowModal(true)}>Add Achievement</Button>
      <Row style={{padding:"50px 0"}}>
        {achievements.map((ach) => (
          <AchievementCard key={ach.id} {...ach} onEdit={() => { setEditingAchievement(ach); setShowModal(true); }} />
        ))}
      </Row>
      <AchievementForm show={showModal} handleClose={() => setShowModal(false)} editingAchievement={editingAchievement} />
    </Container>
  );
};

export default Achievements;
