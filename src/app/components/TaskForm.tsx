"use client";

import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { TaskInput } from "../types/task";

interface TaskFormProps {
  onAdd: (task: TaskInput) => void;
}

const TaskForm = ({ onAdd }: TaskFormProps) => {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAdd({ name: taskName });
      setTaskName("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={2}>
      <TextField
        label="New Task"
        variant="outlined"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
};

export default TaskForm;
