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
import { PATH_PLAN } from 'src/routes/paths';
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
import { IPlan, IPlanCreateInput, IPlanEdit, RentingType } from 'src/@types/plan';
import { usePlan } from 'src/modules/plan/hooks/usePlan';
import { useUploader } from 'src/modules/cdn/useUploader';
import { create } from 'lodash';
// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IPlanEdit, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  plan?: IPlan;
};

export default function PlanNewForm( props: Props) {
  const { push, reload } = useRouter();
  const { create } = usePlan();
  const { enqueueSnackbar } = useSnackbar();
  const { uploadFile, cdnPath } = useUploader();

  const NewPlanSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    code: Yup.string().required('Code is required'),
    type: Yup.string().required('Type is required'),
    minKM: Yup.string().required('Minimum Kilometer is required'),
    perKm: Yup.string().required('Rate Per Kilometer is required'),
    vechicleType: Yup.string().required('Vechile type is required'),
    minDistance: Yup.string().required('Minimum Distance is required'),
    
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

      isActive :false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewPlanSchema),
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
              <RHFTextField name="title" label="Plan Name *" />
              <RHFTextField name="code" label="Code *" />
              <RHFTextField name="rentalType" label="Rental Type *" />
              <RHFTextField name="minKM" label="Minimum Kilometer *" />
              <RHFTextField name="perKm" label="Rate Per Kilometer " />
              <RHFTextField name="vechicleType" label="Vehicle Type " />
              <RHFTextField name="minDistance" label="Minimum Distance *" />
            </Box>
          </Card>

          <Card sx={{ p: 3, m: 2 }}>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Create Plan 
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
        
      </Grid>
    </FormProvider>
  );
}
