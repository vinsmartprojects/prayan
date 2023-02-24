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
import { IVehicletype } from 'src/@types/vehicletype';
import { useVehicletype } from 'src/modules/vehicletype/hooks/useVehicletype';
import { useUploader } from 'src/modules/cdn/useUploader';
// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IVehicletype, 'createdAt,updatedAt'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  vehicletype?: IVehicletype;
};

export default function VehicletypeEditForm({ isEdit = false, vehicletype }: Props) {
  const { push, reload } = useRouter();
  const { update } = useVehicletype();
  const { enqueueSnackbar } = useSnackbar();
  const { uploadFile, cdnPath } = useUploader();

  const EditVehicletypeSchema = Yup.object().shape({
    name: Yup.string().required('Segment Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      image:
        (vehicletype?.image && { file: cdnPath(vehicletype?.image), isNew: false }) || undefined,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [vehicletype]
  );
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(EditVehicletypeSchema),
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
    var _inputs: any = {};
    if (data?.image?.isNew === true) {
      const _fileUploaded: any = await uploadFile(data?.image?.file);
      await _fileUploaded;

      if (_fileUploaded?.data?.filename) {
        _inputs.image = _fileUploaded?.data?.filename;
      }
    }

    const _vehicletype = {
      name: data.name,
      ..._inputs,
    };
    try {
      const _updatedItem = await update(vehicletype?.id, _vehicletype);
      await _updatedItem;
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      reload();
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      enqueueSnackbar(error?.message, {
        variant: 'error',
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
              <RHFTextField name="name" label="Segment Name*" />
              <RHFTextField name="features" label="Segement Description" />
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
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="image"
                maxSize={3145728}
                onDrop={(data: any) => handleDocUpload(data, 'image')}
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
