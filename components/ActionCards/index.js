import React from "react";
import { Box, Card, CardContent, Typography, CardActionArea } from "@mui/material";
import Link from "next/link";

export default function ActionCards() {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        mt: 4,
      }}
    >
      <Card
        sx={{
          textAlign: "center",
          p: 2,
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          },
        }}
      >
        <CardActionArea component={Link} href="/upload">
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: "1.25rem",
                color: "#1a1a1a",
                mb: 1,
              }}
            >
              Upload Job
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#4d4d4d",
                fontSize: "0.875rem",
              }}
            >
              Upload a `.sbatch` file and submit it to the cluster.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card
        sx={{
          textAlign: "center",
          p: 2,
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          },
        }}
      >
        <CardActionArea component={Link} href="/logs">
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: "1.25rem",
                color: "#1a1a1a",
                mb: 1,
              }}
            >
              View Logs
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#4d4d4d",
                fontSize: "0.875rem",
              }}
            >
              Monitor job output and status in real-time.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
