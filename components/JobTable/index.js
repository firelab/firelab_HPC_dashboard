import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

export default function JobTable() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/jobs")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  return (
    <Box sx={{ mt: 6, flexGrow: 1 }}>
      <Typography variant="h5" gutterBottom>
        Current Jobs
      </Typography>
      <TableContainer component={Paper} sx={{ minHeight: "300px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Job ID</strong></TableCell>
              <TableCell><strong>Job Name</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Submitted At</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.id}</TableCell>
                <TableCell>{job.name}</TableCell>
                <TableCell>{job.status}</TableCell>
                <TableCell>{job.submittedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
