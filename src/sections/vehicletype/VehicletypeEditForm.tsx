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
import { PATH_VEHICLETYPE } from 'src/routes/paths';
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
import { IVehicletype, IVehicletypeCreateInput, IVehicletypeEdit, VehicletypeStatus } from 'src/@types/vehicletype';
import { useVehicletype } from 'src/modules/vehicletype/hooks/useVehicletype';
// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IVehicletypeEdit, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  vehicletype?: IVehicletype;
};

export default function VehicletypeEditForm({ isEdit = false, vehicletype }: Props) {
  const { push } = useRouter();
  const { update } = useVehicletype();
  const { enqueueSnackbar } = useSnackbar();

  const NewVehicletypeSchema = Yup.object().shape({
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
      id: vehicletype?.id || undefined,
      title: vehicletype?.title || '',
      contactPerson: vehicletype?.contactPerson || '',
      contactMobile: vehicletype?.contactMobile || '',
      contactEmail: vehicletype?.contactEmail || '',
      addressLine1: vehicletype?.address?.addressLine1 || '',
      addressLine2: vehicletype?.address?.addressLine2 || '',
      area: vehicletype?.address?.area || '',
      landmark: vehicletype?.address?.landmark || '',
      city: vehicletype?.address?.city || '',
      pincode: vehicletype?.address?.pincode || '0',
      state: vehicletype?.address?.state || '',
      status: vehicletype?.status || VehicletypeStatus.PENDING,

      country: vehicletype?.country || 'India',
      pan: vehicletype?.pan || '',
      gst: vehicletype?.gst || '',
      tin: vehicletype?.tin || '',
      cin: vehicletype?.cin || '',
      isVerified: vehicletype?.isVerified || false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [vehicletype]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewVehicletypeSchema),
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
    if (isEdit && vehicletype) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, vehicletype]);

  const onSubmit = async (data: FormValuesProps) => {
    console.log('vehicle type Data: ' + data);

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

    const _vehicletype = {
      title: data.title,
      address: _address,
      ..._documents,
    };
    console.log('vehicletype: ', vehicletype);

    const _updatedItem = await update(vehicletype?.id, _vehicletype);
    await _updatedItem;
    console.log('newItemCreated: ', _updatedItem);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      /*    push(PATH_VEHICLETYPE.list); */
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
              <RHFTextField name="title" label="Vehicletype Title *" />
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
              <RHFTextField name="gst" label="vehicle type's GST" />
              <RHFTextField name="pan" label="vehicle type's PAN" />
              <RHFTextField name="tin" label="vehicle type's TIN" />
              <RHFTextField name="cin" label="vehicle type's CIN" />
            </Box>
          </Card>
          <Card sx={{ p: 3, m: 2 }}>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Vehicletype' : 'Save Changes'}
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
                    vehicle type's Account Status
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
