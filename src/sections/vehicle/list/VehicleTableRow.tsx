import { useState } from 'react';
// @mui
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';
// @types
import { IVehicle } from '../../../@types/vehicle';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import ConfirmDialog from '../../../components/confirm-dialog';

// ----------------------------------------------------------------------

type Props = {
  row: IVehicle;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onDetailRow: VoidFunction;
};

export default function VehicleTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onDetailRow
}: Props) {
  const { id,  registerNo, registrationType, permitType, permitNo, make, model,year,color,vin,trNo,chassiNo,engineNo,seatingCapacity,rcBookDoc, rcNo, rcExpritationDate,insuranceDoc,insuranceNo,insurationExpritationDate,emissionDoc,emissionNo,emissionExpritationDate,taxDoc,taxno,taxExpritationDate,fcExpritationDate,remarks,fuelType,type,vendor,gpsBox,mobileDevice,isAc, isVerified, isActive } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell onClick={onDetailRow} sx={{ cursor: "pointer" }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src={avatarUrl} /> */}

            <Typography variant="subtitle2" noWrap>
              {registerNo}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="left">{registrationType}</TableCell>
        <TableCell align="left">{permitType}</TableCell>
        <TableCell align="left">{permitNo}</TableCell>
        <TableCell align="left">{make}</TableCell>
        <TableCell align="left">{model}</TableCell>
        <TableCell align="left">{year}</TableCell>
        <TableCell align="left">{color}</TableCell>
        <TableCell align="left">{vin}</TableCell>
        <TableCell align="left">{trNo}</TableCell>
        <TableCell align="left">{chassiNo}</TableCell>
        <TableCell align="left">{engineNo}</TableCell>
        <TableCell align="left">{seatingCapacity}</TableCell>
        <TableCell align="left">{rcBookDoc}</TableCell>
        <TableCell align="left">{rcNo}</TableCell>
        <TableCell align="left">{rcExpritationDate}</TableCell>
        <TableCell align="left">{insuranceDoc}</TableCell>
        <TableCell align="left">{insuranceNo}</TableCell>
        <TableCell align="left">{insurationExpritationDate}</TableCell>
        <TableCell align="left">{emissionDoc}</TableCell>
        <TableCell align="left">{emissionNo}</TableCell>
        <TableCell align="left">{emissionExpritationDate}</TableCell>
        <TableCell align="left">{taxDoc}</TableCell>
        <TableCell align="left">{taxno}</TableCell>
        <TableCell align="left">{taxExpritationDate}</TableCell>
        <TableCell align="left">{fcExpritationDate}</TableCell>
        <TableCell align="left">{remarks}</TableCell>
        <TableCell align="left">{fuelType}</TableCell>
        <TableCell align="left">{type}</TableCell>
        <TableCell align="left">{vendor}</TableCell>
        <TableCell align="left">{gpsBox}</TableCell>
        <TableCell align="left">{mobileDevice}</TableCell>
        <TableCell align="left">{isAc}</TableCell>
        <TableCell align="center">
          <Iconify
            icon={isActive ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
            sx={{
              width: 20,
              height: 20,
              color: 'success.main',
              ...(!isActive && { color: 'warning.main' }),
            }}
          />
        </TableCell>
        <TableCell align="center">
          <Iconify
            icon={isVerified ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
            sx={{
              width: 20,
              height: 20,
              color: 'success.main',
              ...(!isVerified && { color: 'warning.main' }),
            }}
          />
        </TableCell>
        {/* <TableCell align="left">
          <Label
            variant="soft"
            color={(isVerified === false && 'error') || 'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            {isVerified}
          </Label>
        </TableCell> */}

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
