import React from 'react';
import {
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  FormControlLabel,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  FormControl,
  Dialog,
  DialogProps,
  Switch,
  Select,
  Box,
  Paper,
  Typography,
  TextField,
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
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings';

type Props = {};
export default function MakerContainer({}: Props) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullWidth(event.target.checked);
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const { themeStretch } = useSettingsContext();
  type Props = {};
  return (
    <React.Fragment>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" component="h4">
              Vehicle Maker
            </Typography>
          </Box>

          <Box sx={{}}>
            <Button variant="outlined" onClick={handleClickOpen}>
              Add Maker
            </Button>
          </Box>
        </Box>
      </Container>

      <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose}>
        <DialogTitle>New Maker</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
              Add new vehicle maker details.
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <TextField sx={{ mb: 2 }} id="maker" label="Maker Name" variant="outlined" />

              <TextField sx={{ mb: 2 }} id="code" label="Maker Code" variant="outlined" />
              {/* <InputLabel htmlFor="max-width">maxWidth</InputLabel>
              <Select
                autoFocus
                value={maxWidth}
                onChange={handleMaxWidthChange}
                label="maxWidth"
                inputProps={{
                  name: 'max-width',
                  id: 'max-width',
                }}
              >
                <MenuItem value={false as any}>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select> */}
            </FormControl>
            {/* <FormControlLabel
              sx={{ mt: 1 }}
              control={<Switch checked={fullWidth} onChange={handleFullWidthChange} />}
              label="Full width"
            /> */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button>Add</Button>
          <Button>Reset</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
