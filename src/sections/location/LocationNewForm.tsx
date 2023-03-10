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
import { PATH_LOCATION } from 'src/routes/paths';
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
import { ILocation, ILocationCreateInput, ILocationEdit, RentingType } from 'src/@types/location';
import { useLocation } from 'src/modules/location/hooks/useLocation';
import { useUploader } from 'src/modules/cdn/useUploader';
import { create } from 'lodash';
// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<ILocationEdit, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  location?: ILocation;
};

export default function LocationNewForm(props: Props) {
  const { push, reload } = useRouter();
  const { create } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { uploadFile, cdnPath } = useUploader();

  const NewLocationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    code: Yup.string().required('Code is required'),
    pincode: Yup.string().required('Pincode is required'),
    longitude: Yup.string().required('Longitude is required'),
    latitude: Yup.string().required('Latitude is required'),
    
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      code: '',
      type: RentingType.ONEWAY,
      minKM: '',
      perKm: '',
      vechicleType: '',
      minDistance: '',

      isActive: false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewLocationSchema),
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

  const onSubmit = async (data: FormValuesProps) => {};

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
              <RHFTextField name="title" label="Location Name *" />
              <RHFTextField name="code" label="Code *" />
              <RHFSelect native name="rentalType" label="Rental Type" placeholder="Rental Type">
                <option value="" />
                {Object.values(RentingType).map((type:any) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="minKM" label="Minimum Kilometer *" />
              <RHFTextField name="perKm" label="Rate Per Kilometer " />
              <RHFTextField name="vechicleType" label="Vehicle Type " />
              <RHFTextField name="minDistance" label="Minimum Distance *" />
            </Box>
          </Card>

          <Card sx={{ p: 3, m: 2 }}>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Create Location
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
