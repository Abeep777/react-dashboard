import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const QuestionsTable = ({ questions, onEdit, onDelete, actionShow }) => {
  return (
    <>
      {questions.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Question ID</TableCell>
                <TableCell>Question Text</TableCell>
                {actionShow && <TableCell>Actions</TableCell>}
                {/* Add more table headers for additional question properties */}
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question.questionId}>
                  <TableCell>{question.questionId}</TableCell>
                  <TableCell>{question.questionText}</TableCell>
                  {actionShow && (
                    <TableCell>
                      <IconButton onClick={() => onDelete(question.questionId)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => onEdit(question)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  )}
                  {/* Add more table cells for additional question properties */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          variant="h5"
          sx={{ textAlign: "center", paddingTop: "40px" }}
        >
          No question added.
        </Typography>
      )}
    </>
  );
};

export default QuestionsTable;
