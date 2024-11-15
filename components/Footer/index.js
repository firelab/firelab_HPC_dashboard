import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'center',
        padding: '1rem',
        borderTop: '1px solid #ccc',
        mt: 'auto',
      }}
    >
      <Typography variant="body2">© 2024 Misosula FireLab. All rights reserved.</Typography>
    </Box>
  );
}
