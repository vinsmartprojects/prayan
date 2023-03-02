import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  Typography,
  FormControlLabel,
  Divider,
} from '@mui/material';
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
  IVehicleEdit,
  Makers,
  PermitType,
  RegistrationType,
} from 'src/@types/vehicle';
import { useVehicle } from 'src/modules/vehicle/hooks/useVehicle';
import { useUploader } from 'src/modules/cdn/useUploader';
import { create } from 'lodash';
// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IVehicleEdit, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  vehicle?: IVehicle;
};

export default function VehicleEditForm({ isEdit = false, vehicle }: Props) {
  const { push, reload } = useRouter();
  const { create } = useVehicle();
  const { enqueueSnackbar } = useSnackbar();
  const { uploadFile, cdnPath } = useUploader();

  const NewVehicleSchema = Yup.object().shape({
    registerNo: Yup.string().required('Registration Number is required'),
    registrationType: Yup.string().required('Registration Type No  is required'),
    permitType: Yup.string().required('Permit Type is required'),
    permitNo: Yup.string().required('Permit Number is required'),
    make: Yup.string().required('Make is required'),
    model: Yup.string().required('Model is required'),
  });

  const defaultValues = useMemo(
    () => ({
      registerNo: '',
      registrationType: undefined,
      permitType: undefined,
      permitNo: '',
      make: '',
      model: '',
      year: '',
      color: '',
      vin: '',
      trNo: '',
      chassiNo: '',
      engineNo: '',
      seatingCapacity: '',

      rcBookDoc: undefined,
      rcNo: '',
      rcExpritationDate: '',
      insuranceDoc: undefined,
      insuranceNo: '',
      insurationExpritationDate: '',
      emissionDoc: undefined,
      emissionNo: '',
      emissionExpritationDate: '',
      taxDoc: undefined,
      taxno: '',
      taxExpritationDate: '',
      fcExpritationDate: '',
      remarks: '',
      fuelType: undefined,
      type: undefined,
      vendor: undefined,
      gpsBox: false,
      mobileDevice: false,
      isAc: false,

      isActive: false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [vehicle]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewVehicleSchema),
    defaultValues,
  });
  function onSubmit(data: any) { }
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
    if (isEdit && vehicle) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, vehicle]);

  const handleDocUpload = useCallback(
    async (acceptedFiles: File[], type: any) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue(type, { file: newFile, isNew: true }, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, m: 2 }}>
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

              <RHFSelect native name="fuelType" label="Fuel Type" placeholder="Rental Type">
                <option value="" />
                {Object.values(FuelType).map((type: any) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect native name="make" label="Maker" placeholder="Maker">
                <option value="" />
                {Object.values(Makers).map((type: any) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="model" label="Model" />
              <RHFTextField name="year" label="Year " />
              <RHFTextField name="color" label="Color " />
              <RHFTextField
                name="seatingCapacity"
                label="Seating Capacity "
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
              <Divider />

              <RHFSelect native name="regType" label="Registration Type" placeholder="Rental Type">
                <option value="" />
                {Object.values(RegistrationType).map((type: any) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect native name="permitType" label="Permit Type" placeholder="Rental Type">
                <option value="" />
                {Object.values(PermitType).map((type: any) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="permitNo" label="Permit No " />
              <RHFTextField name="vin" label="VIN No " />
              <RHFTextField name="trNo" label="TR Number " />
              <RHFTextField name="chassiNo" label="Chassi Number " />
              <RHFTextField name="engineNo" label="Engine Number " />
            </Box>
          </Card>
          <Card sx={{ p: 3, m: 2 }}>
            <Box
              rowGap={3}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              <Box
                rowGap={3}
                columnGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                }}
              >
                <RHFTextField name="rcNo" label="Vehicle's RC No" />
                <RHFUploadAvatar
                  name="rcBookDoc"
                  placeholder=" Upload RC Doc"
                  maxSize={3145728}
                  onDrop={(data: any) => handleDocUpload(data, 'rcBookDoc')}
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
  
            </Box>
          </Card>
          <Card sx={{ p: 3, m: 2 }}>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create vehicle type' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {isEdit && (
              <Label
                color={values.isActive ? 'success' : 'error'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.isActive}
              </Label>
            )}
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="profileImage"
                maxSize={3145728}
                onDrop={(data: any) => handleDocUpload(data, 'profileImage')}
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
            <Divider />

            <Box sx={{ mb: 5, mt: 5 }}>
              <RHFSwitch
                name="isAc"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      AC{' '}
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
                      GPS Box{' '}
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
                      Mobile Device{' '}
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
