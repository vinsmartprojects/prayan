import React from 'react';
import {
  Typography,
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
function ModelsContainer({}: Props) {
  const { themeStretch } = useSettingsContext();
  return (
    <>
      <head>
        <title>Vehicle - Models</title>
      </head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" component="h4">
              Vehicle Model
            </Typography>
          </Box>

          <Box sx={{}}>
            <Button variant="contained">New Models</Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default ModelsContainer;
