import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
import { PATH_VEHICLE } from 'src/routes/paths';
import { useSnackbar } from 'notistack';
import { countries } from 'src/assets/data';

import Label from 'src/components/label';
import { CustomFile } from 'src/components/upload';
import { fData } from 'src/utils/formatNumber';
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../components/hook-form';
import {
  FuelType,
  IVehicle,
  IVehicleCreateInput,
  PermitType,
  RegistrationType,
} from 'src/@types/vehicle';
import { useVehicle } from 'src/modules/vehicle/hooks/useVehicle';
import { brands } from 'src/assets/data/carbrand';
import { registrationTypes } from 'src/assets/data/registrationTypes';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import { useVendor } from 'src/modules/vendor/hooks/useVendor';
import { useVehicletype } from 'src/modules/vehicletype/hooks/useVehicletype';
// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IVehicleCreateInput, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  currentVehicle?: IVehicle;
};

export default function VehicleNewEditForm({ isEdit = false, currentVehicle }: Props) {
  const { push } = useRouter();
  const { create } = useVehicle();
  const { getMany: getManyVendors } = useVendor();
  const { getMany: getManyVehicleTypes } = useVehicletype();
  const { enqueueSnackbar } = useSnackbar();
  const [vendors, setvendors] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const NewVehicleSchema = Yup.object().shape({
    registerNo: Yup.string().required('Register No is required'),
  });

  const defaultValues = useMemo(
    () => ({
      registerNo: currentVehicle?.registerNo || 'KA01MH2022',
      registrationType: currentVehicle?.registrationType || RegistrationType.YELLOW,
      permitType: currentVehicle?.permitType || PermitType.INTERSTATE,
      permitNo: currentVehicle?.permitNo || '14555',
      make: currentVehicle?.make || 'HUNDAII',
      model: currentVehicle?.model || 'i20',
      year: currentVehicle?.year || '2010',
      color: currentVehicle?.color || 'Gray',
      vin: currentVehicle?.vin || '1457888',
      trNo: currentVehicle?.trNo || '1457888',
      chassiNo: currentVehicle?.chassiNo || '1457888',
      engineNo: currentVehicle?.engineNo || '1457888',
      seatingCapacity: currentVehicle?.seatingCapacity || '4',
      rcBookDoc: currentVehicle?.rcBookDoc || '1457888',
      rcNo: currentVehicle?.rcNo || '1457888',
      rcExpritationDate: currentVehicle?.rcExpritationDate || null,
      insuranceDoc: currentVehicle?.insuranceDoc || '',
      insuranceNo: currentVehicle?.insuranceNo || '1457888',
      insurationExpritationDate: currentVehicle?.insurationExpritationDate || '12/12/2025',
      emissionDoc: currentVehicle?.emissionDoc || '12/12/2025',
      emissionNo: currentVehicle?.emissionNo || '12/12/2025',
      emissionExpritationDate: currentVehicle?.emissionExpritationDate || '12/12/2025',
      taxDoc: currentVehicle?.taxDoc || '',
      taxno: currentVehicle?.taxno || '1457888',
      vendor: currentVehicle?.vendor?.id || undefined,
      vehicleType: currentVehicle?.type?.id || undefined,
      isAc: currentVehicle?.isAc || false,
      fuelType: currentVehicle?.fuelType || FuelType.DIESEL,

      taxExpritationDate: currentVehicle?.taxExpritationDate || '12/12/2025',
      fcExpritationDate: currentVehicle?.fcExpritationDate || '12/12/2025',

      gpsBox: currentVehicle?.gpsBox || false,
      mobileDevice: currentVehicle?.mobileDevice || false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentVehicle]
  );

  async function getVendors() {
    const _vendors = await getManyVendors();
    await _vendors;
    if (_vendors?.data) {
      setvendors(_vendors.data);
    }
    console.log(_vendors?.data);
  }
  async function getVehicleTypes() {
    const _types = await getManyVehicleTypes();

    await _types;

    if (_types?.data) {
      setVehicleTypes(_types.data);
    }
  }

  useEffect(() => {
    getVendors();
    getVehicleTypes();
  }, []);

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewVehicleSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentVehicle) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentVehicle]);

  const onSubmit = async (data: FormValuesProps) => {
    const vehicle = {};
    const _newItemCreated = await create(data);
    await _newItemCreated;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      push(PATH_VEHICLE.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>

          <Card sx={{ p: 3, m: 1 }}>
            <Box
              rowGap={3}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              {' '}
              <RHFSelect native name="type" label="Vehicle Type" placeholder="Vehicle ">
                <option value="" />
                {vehicleTypes.map((item: any) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect native name="fuelType" label="Fuel Type" placeholder="Fuel Type">
                <option value="" />
                {Object.keys(FuelType).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect native name="permitType" label="Permit Type" placeholder="Permit Type">
                <option value="" />
                {Object.keys(PermitType).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect
                native
                name="registrationType"
                label="Registgration Type"
                placeholder="Registgration Type"
              >
                <option value="" />
                {Object.keys(RegistrationType).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </RHFSelect>
            </Box>
          </Card>
          <Card sx={{ p: 3, m: 1 }}>
            <Box
              rowGap={3}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              <RHFSwitch
                name="isAc"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      AC
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
              <RHFSwitch
                name="gpsBox"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      GPS Enbaled
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
              <RHFSwitch
                name="mobileDevice"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Mobile Device Tracking
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, m: 2 }}>
            <Box sx={{ p: 0.1, mb: 2 }}>
              <Typography sx={{}}>Basic Details</Typography>
            </Box>
            <Box
              rowGap={3}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              <RHFTextField name="registerNo" label="Registration Number *" />

              <RHFSelect native name="country" label="Maker" placeholder="Brand">
                <option value="" />
                {brands.map((brand) => (
                  <option key={brand.code} value={brand.label}>
                    {brand.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="model" label="Model" />
              <RHFTextField name="year" label="Year" />
              <RHFTextField name="color" label="Color" />
            </Box>
          </Card>
          <Card sx={{ p: 3, m: 2 }}>
            <Box sx={{ p: 0.1, mb: 2 }}>
              <Typography sx={{}}>Vehicle Detail</Typography>
            </Box>
            <Box
              rowGap={3}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              {' '}
              <RHFSelect
                native
                name="vendor"
                label="Vehicle Belongs (Vendors) "
                placeholder="Vehicle Belongs (Vendors) "
              >
                <option value="" />
                {vendors.map((item: any) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.title}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="vin" label="Vin Number *" />
              <RHFTextField name="trNo" label="TR Number" />
              <RHFTextField name="chassiNo" label="Chassi Number" />
              <RHFTextField name="engineNo" label="Engine Number" />
              <RHFTextField name="seatingCapacity" label="Seating Capacity" />
              <RHFTextField name="fuelType" label="Fuel Type" />
            </Box>
          </Card>
          <Card sx={{ p: 3, m: 2 }}>
            <Box sx={{ p: 0.1, mb: 2 }}>
              <Typography sx={{}}>Vehicle Document</Typography>
            </Box>
            <Box
              rowGap={3}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              <RHFTextField name="rcNo" label="RC Number*" />
              <RHFDatePicker name="rcExpritationDate" label="RC Expiration Date" disablePast />
              <RHFTextField name="insuranceNo" label="Insurance Number" />
              <RHFDatePicker name="insurationExpritationDate" label="Insurance Expiration Date" />
              <RHFDatePicker name="rcExpritationDate" label="RC Expiration Date" />
              <RHFDatePicker name="taxExpritationDate" label="Tax Expiration Date" />
              <RHFDatePicker name="emissionExpritationDate" label="Emission Test Expiration Date" />

              <RHFDatePicker name="fcExpritationDate" label="FC Expiration Date" />
              <RHFTextField name="taxno" label="Tax No" />
            </Box>
          </Card>
          <Card sx={{ p: 3, m: 2 }}>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Vehicle' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </FormProvider>
  );
}
