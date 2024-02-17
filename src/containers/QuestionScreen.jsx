import React, { useState, useEffect } from "react";
import QuestionsTable from "../components/QuestionsTable";
import CsvUploader from "../components/CsvUploader";
import { Button } from "@mui/material";
import AddUpdateQuestionDialog from "../components/AddUpdateQuestionDialog";
import AddIcon from "@mui/icons-material/Add";

const getLocalStorage = () => {
  const lists = localStorage.getItem("questionList");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const QuestionScreen = () => {
  const [questions, setQuestions] = useState(getLocalStorage());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [action, setAction] = useState("add");

  useEffect(() => {
    localStorage.setItem("questionList", JSON.stringify(questions));
  }, [questions]);

  const checkDuplicates = (array, idToCheck) => {
    return array.some((item) => item.questionId === idToCheck);
  };

  const handleAddQuestion = (newQuestion) => {
    if (checkDuplicates(questions, newQuestion.questionId)) {
      alert("Question with the same ID already exists!");
      return;
    }
    setQuestions([...questions, newQuestion]);
  };

  const handleUpdateQuestion = (updatedQuestion) => {
    const updatedQuestions = questions.map((question) =>
      question.questionId === updatedQuestion.questionId
        ? updatedQuestion
        : question
    );
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = (questionId) => {
    const filteredQuestions = questions.filter(
      (question) => question.questionId !== questionId
    );
    setQuestions(filteredQuestions);
  };

  const handleOpenDialog = (action, question) => {
    setAction(action);
    setSelectedQuestion(action === "add" ? null : question);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedQuestion(null);
  };

  const handleCSVUpload = (csvData) => {
    // Check for duplicates in csvData
    const duplicatesWithCSV = csvData.filter((csvItem) =>
      checkDuplicates(questions, csvItem.questionId)
    );

    if (duplicatesWithCSV.length > 0) {
      // Replace existing questions with the new ones from csvData
      const updatedQuestions = questions.map((question) => {
        const updatedItem = duplicatesWithCSV.find(
          (csvItem) => csvItem.questionId === question.questionId
        );
        return updatedItem ? updatedItem : question;
      });

      // Add the remaining items from csvData
      const remainingItems = csvData.filter(
        (csvItem) =>
          !duplicatesWithCSV.some(
            (duplicate) => duplicate.questionId === csvItem.questionId
          )
      );

      setQuestions([...updatedQuestions, ...remainingItems]);
    } else {
      // No duplicates, just add the new questions
      setQuestions([...questions, ...csvData]);
    }
  };

  return (
    <>
      <CsvUploader onUpload={handleCSVUpload} />
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog("add", null)}
        >
          Add Question
        </Button>
      </div>

      <QuestionsTable
        questions={questions}
        onEdit={(question) => handleOpenDialog("update", question)}
        onDelete={handleDeleteQuestion}
        actionShow={true}
      />
      <AddUpdateQuestionDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSubmit={action === "add" ? handleAddQuestion : handleUpdateQuestion}
        action={action}
        selectedQuestion={selectedQuestion}
      />
    </>
  );
};

export default QuestionScreen;
