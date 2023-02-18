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
import { PATH_BOOKING } from 'src/routes/paths';
import { useSnackbar } from 'notistack';
import { countries } from 'src/assets/data';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import Label from 'src/components/label';
import { CustomFile } from 'src/components/upload';
import { fData } from 'src/utils/formatNumber';
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../components/hook-form';
import { IBookingCreateInput, BookingStatus } from 'src/@types/booking';
import { useBooking } from 'src/modules/booking/hooks/useBooking';
import { RegistrationType } from 'src/@types/vehicle';
import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IBookingCreateInput, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  currentBooking?: IBookingCreateInput;
};

export default function BookingNewEditForm({ isEdit = false, currentBooking }: Props) {
  const { push } = useRouter();
  const { create } = useBooking();
  const { enqueueSnackbar } = useSnackbar();

  const NewBookingSchema = Yup.object().shape({
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
      title: currentBooking?.title || '',
      contactPerson: currentBooking?.contactPerson || '',
      contactMobile: currentBooking?.contactMobile || '',
      contactEmail: currentBooking?.contactEmail || '',

      addressLine1: currentBooking?.addressLine1 || '',
      addressLine2: currentBooking?.addressLine2 || '',
      area: currentBooking?.area || '',
      landmark: currentBooking?.landmark || '',
      city: currentBooking?.city || '',
      pincode: currentBooking?.pincode || '',
      state: currentBooking?.state || 'Karnataka',
      status: currentBooking?.status || BookingStatus.PENDING,
      country: currentBooking?.country || 'India',

      pan: currentBooking?.pan || '',
      gst: currentBooking?.gst || '',
      tin: currentBooking?.tin || '',
      cin: currentBooking?.cin || '',
      isVerified: currentBooking?.isVerified || false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentBooking]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewBookingSchema),
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
    if (isEdit && currentBooking) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentBooking]);

  const onSubmit = async (data: FormValuesProps) => {
    console.log('Booking Data: ' + data);

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

    const booking = {
      title: data.title,
      bookingCommuncation: _communication,
      bookingDocument: _documents,
      bookingAddress: _address,
    };


    const _newItemCreated = await create(booking);
    await _newItemCreated;


    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      push(PATH_BOOKING.list);
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
        <Grid container spacing={3} sx={{ mx: 0.5 }}>
          <Grid item xs={6} md={6}  >
            <Card sx={{ pt: 5, pb: 5, px: 3 }}>


              <RHFSwitch
                name="isVerified"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>
                      Register Client?
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>

                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
              <Box
                rowGap={3}
                columnGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                }}
              >
                <RHFTextField name="title" label="Client Name*" />
                <RHFTextField name="contactMobile" label="Phone Number *" />
                <RHFTextField name="contactEmail" label="Email  Number " />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={6} md={6}>
            <Card sx={{ p: 3, mx: 2 }}>
              <Box
                rowGap={3}
                columnGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                }}
              >

                <RHFSelect native name="type" label="Vehicle Type" placeholder="Vehicle ">
                  <option value="" />
                  {Object.keys(RegistrationType).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}

                </RHFSelect>
                <RHFSelect native name="type" label="Renting Type" placeholder="Vehicle ">
                  <option value="" />
                  {Object.keys(RegistrationType).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}

                </RHFSelect>
                <RHFTextField name="tin" label="Choose Package" />
                <RHFTextField name="cin" label="RATE" />
              </Box>
            </Card>

          </Grid>

        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Card sx={{ p: 3, m: 2 }}>
              <Box
                rowGap={3}
                columnGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                }}
              > <Box

                display="flex"

              ><Typography sx={{ flexGrow: 1,fontWeight:"bold" }}> Pickup </Typography>
                  <AddLocationAltIcon  sx={{ my:1 }}/>
                </Box>

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
          </Grid>

          <Grid item xs={6} md={6}>
            <Card sx={{ p: 3, m: 2 }}>
             <Box
              rowGap={3}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            > <Box

              display="flex"

            ><Typography sx={{ flexGrow: 1,fontWeight:"bold" }}> Drop </Typography>
                <AddLocationAltIcon  sx={{ my:1 }}/>
              </Box>


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

          </Grid>

        </Grid>

        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3, m: 2 }}>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create booking' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card></Grid>
      </Grid>

    </FormProvider>
  );
}
