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
import { FuelType, IVehicle, IVehicleEdit } from 'src/@types/vehicle';
import { useVehicle } from 'src/modules/vehicle/hooks/useVehicle';
import { useUploader } from 'src/modules/cdn/useUploader';
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
  const { update } = useVehicle();
  const { enqueueSnackbar } = useSnackbar();
  const { uploadFile, cdnPath } = useUploader();

  const [profileImageToBeUpload, setProfileImageToBeUpload] = useState<File>();
  const NewVehicleSchema = Yup.object().shape({
    registerNo: Yup.string().required('Registration No is required'),
  });

  const defaultValues = useMemo(
    () => ({
      id: vehicle?.id || undefined,
      registerNo: vehicle?.registerNo || '',
      registrationType: vehicle?.registrationType || undefined,
      permitType: vehicle?.permitType || undefined,
      permitNo: vehicle?.permitNo || '',
      make: vehicle?.make || '',
      model: vehicle?.model || '',
      year: vehicle?.year || '',
      color: vehicle?.color || '',
      vin: vehicle?.vin || '',
      trNo: vehicle?.trNo || '',
      chassiNo: vehicle?.chassiNo || '',
      engineNo: vehicle?.engineNo || '',
      seatingCapacity: vehicle?.seatingCapacity || '',
      rcBookDoc:
        (vehicle?.rcBookDoc && { file: cdnPath(vehicle?.rcBookDoc), isNew: false }) || undefined,
      rcNo: vehicle?.rcNo || '',
      rcExpritationDate: vehicle?.rcExpritationDate || '',
      insuranceDoc:
        (vehicle?.insuranceDoc && { file: cdnPath(vehicle?.insuranceDoc), isNew: false }) ||
        undefined,
      insuranceNo: vehicle?.insuranceNo || '',
      insurationExpritationDate: vehicle?.insurationExpritationDate || '',
      emissionDoc:
        (vehicle?.emissionDoc && { file: cdnPath(vehicle?.emissionDoc), isNew: false }) ||
        undefined,
      emissionNo: vehicle?.emissionNo || '',
      emissionExpritationDate: vehicle?.emissionExpritationDate || '',
      taxDoc: (vehicle?.taxDoc && { file: cdnPath(vehicle?.taxDoc), isNew: false }) || undefined,
      taxno: vehicle?.taxno || '',
      taxExpritationDate: vehicle?.taxExpritationDate || '',
      fcExpritationDate: vehicle?.fcExpritationDate || '',
      remarks: vehicle?.remarks || '',
      fuelType: vehicle?.fuelType || FuelType.DIESEL,
      type: vehicle?.type || undefined,
      vendor: vehicle?.vendor || undefined,
      gpsBox: vehicle?.gpsBox || false,
      mobileDevice: vehicle?.mobileDevice || false,
      isAc: vehicle?.isAc || false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [vehicle]
  );
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
    console.log('vehicle ', vehicle);

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

  function onSubmit(data: any) {}

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
              <RHFTextField name="registrationType" label="Registration Type *" />
              <RHFTextField name="permitType" label="Permit Type *" />
              <RHFTextField name="permitNo" label="Permit No " />
              <RHFTextField name="make" label="Make " />
              <RHFTextField name="model" label="Model" />
              <RHFTextField name="year" label="Year " />
              <RHFTextField name="color" label="Color " />
              <RHFTextField name="vin" label="vin " />
              <RHFTextField name="trNo" label="Tr Number " />
              <RHFTextField name="chassiNo" label="Chassi Number " />
              <RHFTextField name="engineNo" label="Engine Number " />
              <RHFTextField name="seatingCapacity" label="Seating Capacity " />
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
                <RHFTextField name="rcExpritationDate" label="RC Expritation Date " />
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
                <RHFTextField name="insuranceNo" label="Insurance Number" />
                <RHFUploadAvatar
                  name="insuranceDoc"
                  placeholder=" Upload Insurance Doc"
                  maxSize={3145728}
                  onDrop={(data: any) => handleDocUpload(data, 'insuranceDoc')}
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
                <RHFTextField
                  name="insurationExpritationDate"
                  label="Insurance Expritation Date "
                />
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
                <RHFTextField name="emissionNo" label="Emission Number" />
                <RHFUploadAvatar
                  name="emissionDoc"
                  placeholder=" Upload Emission Doc"
                  maxSize={3145728}
                  onDrop={(data: any) => handleDocUpload(data, 'emissionDoc')}
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
                <RHFTextField name="emissionExpritationDate" label="Emission Expritation Date " />
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
                <RHFTextField name="taxno" label="Tax Number" />
                <RHFUploadAvatar
                  name="taxDoc"
                  placeholder=" Upload Tax Doc"
                  maxSize={3145728}
                  onDrop={(data: any) => handleDocUpload(data, 'taxDoc')}
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
                <RHFTextField name="taxExpritationDate" label="Tax Expritation Date " />
                <RHFTextField name="fcExpritationDate" label="FC Expritation Date " />
                <RHFTextField name="remarks" label="Remarks " />
                <RHFTextField name="fuelType" label="Fuel Type " />
                <RHFTextField name="type" label="Type " />
                <RHFTextField name="vendor" label="Vendor Name " />
                <RHFTextField name="gpsBox" label="GPS Box " />
                <RHFTextField name="mobileDevice" label="Mobile Device " />
                <RHFTextField name="isAc" label="Is AC Available " />
              </Box>
            </Box>
          </Card>
          <Card sx={{ p: 3, m: 2 }}>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Vehicle type' : 'Save Changes'}
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

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Account Status
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Driver's Account Status
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />

            <RHFSwitch
              name="isActive"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Account Status
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Driver's Account Status
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
          </Card>
          <Card sx={{ mt: 3, pt: 2, pb: 2, px: 3 }}>
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
              <Typography> Vehicle type Credentials</Typography>
              <RHFTextField name="username" label=" Username" />
              <RHFTextField name="username" label="Password" type={'password'} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
