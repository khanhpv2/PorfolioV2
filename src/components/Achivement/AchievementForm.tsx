import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addAchievement, fetchWeatherData, updateAchievement } from "../../store/achievementSlice";
import { AppDispatch } from "../../store/store";

interface Props {
  show: boolean;
  handleClose: () => void;
  editingAchievement?: any;
}

const AchievementForm: React.FC<Props> = ({ show, handleClose, editingAchievement }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [weather, setWeather] = useState({ temperature: "", humidity: "" });

  useEffect(() => {
    if (editingAchievement) {
      setTitle(editingAchievement.title);
      setDescription(editingAchievement.description);
      setWeather({ temperature: editingAchievement.temperature, humidity: editingAchievement.humidity });
    } else {
      setTitle("");
      setDescription("");
      dispatch(fetchWeatherData()).then((result) => setWeather(result.payload));
    }
  }, [editingAchievement, dispatch]);

  const handleSubmit = () => {
    if (editingAchievement) {
      dispatch(updateAchievement({ id: editingAchievement.id, title, description, ...weather }));
    } else {
      dispatch(addAchievement({ title, description, ...weather }));
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editingAchievement ? "Edit Achievement" : "New Achievement"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AchievementForm;
