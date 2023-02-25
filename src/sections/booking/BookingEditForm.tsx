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
import { PATH_BOOKING } from 'src/routes/paths';
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
import { IBooking, IBookingCreateInput, IBookingEdit, BookingStatus } from 'src/@types/booking';
import { useBooking } from 'src/modules/booking/hooks/useBooking';
import { useUploader } from 'src/modules/cdn/useUploader';
// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IBookingEdit, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  booking?: IBooking;
};

export default function BookingEditForm({ isEdit = false, booking }: Props) {
  const { push, reload } = useRouter();
  const { update } = useBooking();
  const { enqueueSnackbar } = useSnackbar();
  const { uploadFile, cdnPath } = useUploader();

  const [profileImageToBeUpload, setProfileImageToBeUpload] = useState<File>();
  const NewBookingSchema = Yup.object().shape({
    id: Yup.string().required('Id is required'),
    title: Yup.string().required('Id is required'),
    contactPerson: Yup.string().required("Contact Person Name is required"),
    contactMobile: Yup.string().required("Contact Person Mobile is required")
    ,

  });

  const defaultValues = useMemo(
    () => ({
      id: booking?.id || undefined,
      title: booking?.title || '',
      contactPerson: booking?.contactPerson || '',
      contactMobile: booking?.contactMobile || '',
      contactEmail: booking?.contactEmail || '',
      addressLine1: booking?.address?.addressLine1 || '',
      addressLine2: booking?.address?.addressLine2 || '',
      area: booking?.address?.area || '',
      landmark: booking?.address?.landmark || '',
      city: booking?.address?.city || '',
      pincode: booking?.address?.pincode || '0',
      state: booking?.address?.state || '',
      profileImage:
        (booking?.profileImage && { file: cdnPath(booking?.profileImage), isNew: false }) ||
        undefined,
      country: booking?.country || 'India',
      pan: booking?.pan || '',
      panDoc: (booking?.panDoc && { file: cdnPath(booking?.panDoc), isNew: false }) || undefined,
      gst: booking?.gst || '',
      gstDoc: (booking?.gstDoc && { file: cdnPath(booking?.gstDoc), isNew: false }) || undefined,
      estbId: booking?.estbId || '',
      estbtDoc:
        (booking?.estbtDoc && { file: cdnPath(booking?.estbtDoc), isNew: false }) ||
        undefined,
      cin: booking?.cin || '',
      cinDoc: (booking?.cinDoc && { file: cdnPath(booking?.cinDoc), isNew: false }) || undefined,
      isVerified: booking?.isVerified || false,
      isActive: booking?.isActive || false,
      username: booking?.user?.username || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [booking]
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
    console.log("booking ", booking?.isVerified)


    if (isEdit && booking) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, booking]);

  const onSubmit = async (data: FormValuesProps) => {
    var _bookingUpdateParams: any = {};
    if (data?.profileImage?.isNew === true) {
      const _fileUploaded: any = await uploadFile(data?.profileImage?.file);
      await _fileUploaded;
      if (_fileUploaded?.data?.filename) {
        _bookingUpdateParams.profileImage = _fileUploaded?.data?.filename;
      }
    }
    if (data?.panDoc?.isNew === true) {
      const _fileUploaded: any = await uploadFile(data?.panDoc?.file);
      await _fileUploaded;
      if (_fileUploaded?.data?.filename) {
        _bookingUpdateParams.panDoc = _fileUploaded?.data?.filename;
      }
    }
    if (data?.gstDoc?.isNew === true) {
      const _fileUploaded: any = await uploadFile(data?.gstDoc?.file);
      await _fileUploaded;

      if (_fileUploaded?.data?.filename) {
        _bookingUpdateParams.gstDoc = _fileUploaded?.data?.filename;
      }
    }
    if (data?.estbtDoc?.isNew === true) {
      const _fileUploaded: any = await uploadFile(data?.estbtDoc?.file);
      await _fileUploaded;

      if (_fileUploaded?.data?.filename) {
        _bookingUpdateParams.estbtDoc = _fileUploaded?.data?.filename;
      }
    }
    if (data?.cinDoc?.isNew === true) {
      const _fileUploaded: any = await uploadFile(data?.cinDoc?.file);
      await _fileUploaded;

      if (_fileUploaded?.data?.filename) {
        _bookingUpdateParams.cinDoc = _fileUploaded?.data?.filename;
      }
    }

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

    const _ids = {
      gst: data.gst,
      estbId: data.estbId,
      cin: data.cin,
      pan: data.pan,
    };

    const _booking: any = {
      title: data.title,
      isVerified: data?.isVerified,
      isActive: data?.isActive,
      address: _address,
      ..._bookingUpdateParams,
      ..._ids,
      ..._communication
    };
    try {
      const _updatedItem = await update(booking?.id, _booking);
      await _updatedItem;
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      reload();
    } catch (error) {

      await new Promise((resolve) => setTimeout(resolve, 500));

      enqueueSnackbar(error?.message, {
        variant: "error"
      });

    };
  }

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
              <RHFTextField name="title" label="booking Title *" />
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
              <Box
                rowGap={3}
                columnGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                }}
              >
                <RHFTextField name="gst" label="booking's GST" />
                <RHFUploadAvatar
                  name="gstDoc"
                  placeholder=" Upload GST Doc"
                  maxSize={3145728}
                  onDrop={(data: any) => handleDocUpload(data, 'gstDoc')}
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
              <Box
                rowGap={3}
                columnGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                }}
              >
                <RHFTextField name="pan" label="booking's PAN" />
                <RHFUploadAvatar
                  name="panDoc"
                  placeholder=" Upload PAN Doc"
                  maxSize={3145728}
                  onDrop={(data: any) => handleDocUpload(data, 'panDoc')}
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
              <Box
                rowGap={3}
                columnGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                }}
              >
                <RHFTextField name="cin" label="booking's CIN" />
                <RHFUploadAvatar
                  name="cinDoc"
                  placeholder=" Upload CIN Doc"
                  maxSize={3145728}
                  onDrop={(data: any) => handleDocUpload(data, 'cinDoc')}
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

              <Box
                rowGap={3}
                columnGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                }}
              >
                <RHFTextField name="estbId" label="booking's Establishment  Doc" />
                <RHFUploadAvatar
                  name="estbtDoc"
                  placeholder=" Upload Establishment Doc"
                  maxSize={3145728}
                  onDrop={(data: any) => handleDocUpload(data, 'estbtDoc')}
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
                {!isEdit ? 'Create booking' : 'Save Changes'}
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
              <Typography> booking Credentials</Typography>
              <RHFTextField name="username" label=" Username" />
              <RHFTextField name="username" label="Password" type={'password'} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
