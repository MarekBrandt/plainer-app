import { TimeRange } from "../types/calendar";
import { Task, TaskInput } from "../types/task";

const API_URL = "http://localhost:5000/api";
const TASK_ENDPOINT = "/tasks";
const CALENDAR_ENPOINT = "/free-slots";

export const fetchFreeSlots = async (): Promise<TimeRange[]> => {
  const response = await fetch(API_URL + CALENDAR_ENPOINT);
  if (!response.ok) throw new Error("Failed to fetch free slots");
  return await response.json();
};

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_URL + TASK_ENDPOINT);
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return await response.json();
};

export const createTask = async (task: TaskInput): Promise<Task> => {
  const response = await fetch(API_URL + TASK_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error("Failed to create task");
  return await response.json();
};

export const deleteTask = async (taskId: number): Promise<void> => {
  const response = await fetch(`${API_URL + TASK_ENDPOINT}/${taskId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete task");
};
