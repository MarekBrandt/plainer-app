"use client";

import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { fetchFreeSlots } from "../services/api";
import { useEffect, useState } from "react";
import { TimeRange } from "../types/calendar";

export const FreeSlots = () => {
  const [freeSlots, setFreeSlots] = useState<TimeRange[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadFreeSlots = async () => {
    try {
      const data = await fetchFreeSlots();
      setFreeSlots(data);
    } catch (e) {
      setError("Failed to fetch free slots.");
    }
  };
  useEffect(() => {
    loadFreeSlots();
  }, []);
  return (
    <Box>
      <Typography variant="h5">Free Slots</Typography>
      {freeSlots.length === 0 ? (
        <Typography>No free slots available.</Typography>
      ) : (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {freeSlots.map((slot, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ border: "1px solid #ccc", borderRadius: "8px" }}>
                <CardContent>
                  <Typography>
                    Start:{" "}
                    <strong>{new Date(slot.start).toLocaleString()}</strong>
                  </Typography>
                  <Typography>
                    End: <strong>{new Date(slot.end).toLocaleString()}</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
