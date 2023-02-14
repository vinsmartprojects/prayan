import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
import { PATH_DRIVER } from 'src/routes/paths';
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
import { IDriver, IDriverCreateInput, IDriverEdit, DriverStatus } from 'src/@types/driver';
import { useDriver } from 'src/modules/driver/hooks/useDriver';
// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IDriverEdit, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  driver?: IDriver;
};

export default function DriverEditForm({ isEdit = false, driver }: Props) {
  const { push } = useRouter();
  const { update } = useDriver();
  const { enqueueSnackbar } = useSnackbar();

  const NewDriverSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    contactMobile: Yup.string().required('Mobile No  is required'),
    contactPerson: Yup.string().required('Phone number is required'),
    addressLine1: Yup.string().required('Address Line 1 is required'),
    area: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    pincode: Yup.string().required('Role is required'),
  });

  const defaultValues = useMemo(
    () => ({
      id: driver?.id || undefined,
      title: driver?.title || '',
      contactPerson: driver?.contactPerson || '',
      contactMobile: driver?.contactMobile || '',
      contactEmail: driver?.contactEmail || '',
      addressLine1: driver?.address?.addressLine1 || '',
      addressLine2: driver?.address?.addressLine2 || '',
      area: driver?.address?.area || '',
      landmark: driver?.address?.landmark || '',
      city: driver?.address?.city || '',
      pincode: driver?.address?.pincode || '0',
      state: driver?.address?.state || '',
      status:driver?.status || DriverStatus.PENDING,

      country: driver?.country || 'India',
      pan: driver?.pan || '',
      gst: driver?.gst || '',
      tin: driver?.tin || '',
      cin: driver?.cin || '',
      isVerified: driver?.isVerified || false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [driver]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewDriverSchema),
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
    if (isEdit && driver) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, driver]);

  const onSubmit = async (data: FormValuesProps) => {
    console.log('driver Data: ' + data);

    const _communication = {
      contactPerson: data.contactPerson,
      contactMobile: data.contactMobile,
      contactEmail: data.contactEmail,
    };
    const _address = {
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine1,
      area: data.area,
      landmark: data.landmark,
      city: data.city,
      pincode: data.pincode,
      state: data.state,
      country: data.country,
    };

    const _documents = {
      gst: data.gst,
      tin: data.tin,
      cin: data.cin,
      pan: data.pan,
    };

    const _driver = {
      title: data.title,
      address: _address,
      ..._documents,
    };
    console.log('driver: ', driver);

    const _updatedItem = await update(driver?.id, _driver);
    await _updatedItem;
    console.log('newItemCreated: ', _updatedItem);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      /*    push(PATH_DRIVER.list); */
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
              <RHFTextField name="title" label="driver Title *" />
              <RHFTextField name="contactPerson" label="Owner/ Auth Person *" />
              <RHFTextField name="contactMobile" label="Phone Number *" />
              <RHFTextField name="contactEmail" label="Email  Number " />
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
              <RHFTextField name="addressLine1" label="Address Line 1*" />
              <RHFTextField name="addressLine2" label="Address Line 2" />
              <RHFTextField name="area" label="Area / Location " />
              <RHFTextField name="landmark" label="Landmark / Nearby" />
              <RHFTextField name="pincode" label="Pincode*" />
              <RHFTextField name="city" label="City* " />
              <RHFTextField name="state" label="State" />
              <RHFSelect native name="country" label="Country" placeholder="Country">
                <option value="" />
                {countries.map((country) => (
                  <option key={country.code} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </RHFSelect>
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
              <RHFTextField name="gst" label="driver's GST" />
              <RHFTextField name="pan" label="driver's PAN" />
              <RHFTextField name="tin" label="driver's TIN" />
              <RHFTextField name="cin" label="driver's CIN" />
            </Box>
          </Card>
          <Card sx={{ p: 3, m: 2 }}>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create driver' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {isEdit && (
              <Label
                color={values.isVerified ? 'success' : 'error'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.isVerified}
              </Label>
            )}

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

            {isEdit && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        onChange={(event) => field.onChange(event.target.checked ? true : false)}
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Is Verified?
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            <RHFSwitch
              name="status"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Account Status
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    driver's Account Status
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
