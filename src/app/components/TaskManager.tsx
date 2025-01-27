"use client";

import { Container, Box, Typography, Snackbar, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchTasks, createTask, deleteTask } from "../services/api";
import { Task, TaskInput } from "../types/task";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

export const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (e) {
      setError("Failed to fetch tasks.");
    }
  };

  const handleAddTask = async (taskInput: TaskInput) => {
    try {
      const newTask = await createTask(taskInput);
      setTasks((prev) => [...prev, newTask]);
      setSuccess("Task added successfully!");
    } catch (e) {
      setError("Failed to add task.");
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      setSuccess("Task deleted successfully!");
    } catch (e) {
      setError("Failed to delete task.");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Task Manager
        </Typography>
        <TaskForm onAdd={handleAddTask} />
        <Box mt={4}>
          <TaskList tasks={tasks} onDelete={handleDeleteTask} />
        </Box>
      </Box>
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success">{success}</Alert>
      </Snackbar>
    </Container>
  );
};
