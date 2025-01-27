import React from "react";
import { Task } from "../types/task";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: number) => void;
}

const TaskList = ({ tasks, onDelete }: TaskListProps) => {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          secondaryAction={
            <IconButton edge="end" onClick={() => onDelete(task.id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText primary={task.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
