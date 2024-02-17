import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const AddUpdateQuestionDialog = ({
  open,
  onClose,
  onSubmit,
  action,
  selectedQuestion,
}) => {
  const [questionId, setQuestionId] = useState(selectedQuestion ? selectedQuestion.questionId : "");
  const [questionText, setQuestionText] = useState(selectedQuestion ? selectedQuestion.questionText : "");

  // Handle initial state when action or selectedQuestion changes
  useEffect(() => {
    if (action === "add") {
      // Clear the fields for 'add' action
      setQuestionId("");
      setQuestionText("");
    } else if (selectedQuestion) {
      // Set values based on selected question for 'update' action
      setQuestionId(selectedQuestion.questionId);
      setQuestionText(selectedQuestion.questionText);
    }
  }, [action, selectedQuestion]);

  const resetAndCloseDialog = () => {
    setQuestionId('');
    setQuestionText('');
    onClose();
  };

  const handleSubmit = () => {
    let id = questionId.trim();
    let text = questionText.trim();
    if(id === '' || text === '') {
      resetAndCloseDialog();
      return;
    }
    onSubmit({ questionId: id, questionText: text, category: 'M'});
    resetAndCloseDialog();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {action === "add" ? "Add Question" : "Update Question"}
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Question ID"
          value={questionId}
          disabled={action === "update"}
          onChange={(e) => setQuestionId(e.target.value)}
          sx={{margin: '10px'}}
        />
        <TextField
          label="Question Text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          sx={{margin: '10px'}}
        />
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          {action === "add" ? "Add" : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUpdateQuestionDialog;
