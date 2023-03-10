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
import { useUploader } from 'src/modules/cdn/useUploader';
import { create } from 'lodash';
// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IDriverEdit, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  driver?: IDriver;
};

export default function DriverEditForm({ isEdit = false, driver }: Props) {
  const { push, reload } = useRouter();
  const { create } = useDriver();
  const { enqueueSnackbar } = useSnackbar();
  const { uploadFile, cdnPath } = useUploader();


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
      title: '',
      contactPerson: '',
      contactMobile: '',
      contactEmail: '',
      addressLine1: '',
      addressLine2: '',
      area: '',
      landmark: '',
      city: '',
      pincode: '',
      state: '',

      profileImage:
        (driver?.profileImage && { file: cdnPath(driver?.profileImage), isNew: false }) ||
        undefined,
      country: driver?.country || 'India',
      pan: driver?.pan || '',
      panDoc: (driver?.panDoc && { file: cdnPath(driver?.panDoc), isNew: false }) || undefined,
      gst: driver?.gst || '',
      gstDoc: (driver?.gstDoc && { file: cdnPath(driver?.gstDoc), isNew: false }) || undefined,
      estbId: driver?.estbId || '',
      estbtDoc:
        (driver?.estbtDoc && { file: cdnPath(driver?.estbtDoc), isNew: false }) ||
        undefined,
      cin: driver?.cin || '',
      cinDoc: (driver?.cinDoc && { file: cdnPath(driver?.cinDoc), isNew: false }) || undefined,
      isVerified: driver?.isVerified || false,
      isActive: driver?.isVerified || false,
      username: driver?.user?.username || '',
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
    var _driverDocs: any = {};
    if (data?.profileImage?.isNew === true) {
      const _fileUploaded: any = await uploadFile(data?.profileImage?.file);
      await _fileUploaded;

      if (_fileUploaded?.data?.filename) {
        _driverDocs.profileImage = _fileUploaded?.data?.filename;
      }
    }
    if (data?.panDoc?.isNew === true) {
      const _fileUploaded: any = await uploadFile(data?.panDoc?.file);
      await _fileUploaded;
      if (_fileUploaded?.data?.filename) {
        _driverDocs.panDoc = _fileUploaded?.data?.filename;
      }
    }
    if (data?.gstDoc?.isNew === true) {
      const _fileUploaded: any = await uploadFile(data?.gstDoc?.file);
      await _fileUploaded;

      if (_fileUploaded?.data?.filename) {
        _driverDocs.gstDoc = _fileUploaded?.data?.filename;
      }
    }
    if (data?.estbtDoc?.isNew === true) {
      const _fileUploaded: any = await uploadFile(data?.estbtDoc?.file);
      await _fileUploaded;

      if (_fileUploaded?.data?.filename) {
        _driverDocs.estbtDoc = _fileUploaded?.data?.filename;
      }
    }
    if (data?.cinDoc?.isNew === true) {
      const _fileUploaded: any = await uploadFile(data?.cinDoc?.file);
      await _fileUploaded;

      if (_fileUploaded?.data?.filename) {
        _driverDocs.cinDoc = _fileUploaded?.data?.filename;
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
    const _driver = {
      title: data.title,
      address: _address,
      communication: _communication,
      docs: _driverDocs,
      ids: _ids,
    };
    try {
      const _updatedItem = await create(_driver);
      await _updatedItem;
      if (_updatedItem?.data) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        reset();
        enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
        reload();
      }
      else {
        enqueueSnackbar(_updatedItem?.error?.message, {
          variant: "error"
        });
      }

    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: "error"
      });
    }
  };

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
                <RHFTextField name="pan" label="driver's PAN" />
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
                <RHFTextField name="cin" label="driver's CIN" />
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
                <RHFTextField name="estbId" label="driver's Establishment  Doc" />
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




          </Card>

        </Grid>
      </Grid>
    </FormProvider>
  );
}
