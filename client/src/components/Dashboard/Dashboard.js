import * as React from 'react';
import { Container, Grid, Paper } from "@material-ui/core"
import Box from '@mui/material/Box';
import Chart from './Chart'

export default function Dashboard() {
  return (
    <Container maxWidth="lg">
      Dashboard
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Box component={Paper} sx={{ height: 350}}>
          <Chart />
          </Box>

        </Grid>

        </Grid>
    </Container>
  );
}