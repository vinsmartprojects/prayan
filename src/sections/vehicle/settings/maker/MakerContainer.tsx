import React from 'react';
import {
  Box,
  Paper,
  Grid,
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  Container,
  IconButton,
  TableContainer,
  styled,
} from '@mui/material';
import { useSettingsContext } from 'src/components/settings';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
type Props = {};
function MakerContainer({}: Props) {
  const { themeStretch } = useSettingsContext();
  return (
    <>
      <head>
        <title>Vehicle - Maker</title>
      </head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Item sx={{ fontSize: 20 }}>Vehicle Maker List</Item>
          </Grid>
          <Grid item xs={6} md={4}>
            <Item>
              <Button variant="contained">New Maker</Button>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MakerContainer;
