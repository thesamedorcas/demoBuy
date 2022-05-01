import React , { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper } from "@material-ui/core"

export default function Chart() {
  const [chartData, setChartData] = useState(undefined);

  useEffect(() => {
    const getData = async () => {
    //   const url = config.base_url + `/api/data/random`;
    //   const response = await Axios.get(url);
    //   if (response.data.status === "success") {
    //     setChartData(response.data);
    //   }
    // };
    getData();
  }, []);

  return (
    <Container maxWidth="lg">
      Dashboard
    </Container>
  );
}