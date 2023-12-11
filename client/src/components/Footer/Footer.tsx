import { Typography } from "@mui/material";

export default function Footer() {
  return (
    <Typography
      sx={{
        textAlign: "end",
        padding: 5,
        fontWeight: "bolder",
        fontSize: {
          xs: "0.75rem",
          sm: "1rem",
          md: "1.3rem",
        },
      }}
      variant="h6"
    >
      ErnAbr &copy; 2023 All Rights Reserved.
    </Typography>
  );
}
