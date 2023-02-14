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
import { IVehicletypeCreateInput } from 'src/@types/vehicletype';
import { useVehicletype } from 'src/modules/vehicletype/hooks/useVehicletype';
// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IVehicletypeCreateInput, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  currentVehicletype?: IVehicletypeCreateInput;
};

export default function VehicletypeNewEditForm({ isEdit = false, currentVehicletype }: Props) {
  const { push } = useRouter();
  const { create } = useVehicletype();
  const { enqueueSnackbar } = useSnackbar();

  const NewVehicletypeSchema = Yup.object().shape({
    name: Yup.string().required('Title is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentVehicletype?.name || '',
      features: currentVehicletype?.features || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentVehicletype]
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
    if (isEdit && currentVehicletype) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentVehicletype]);

  const onSubmit = async (data: FormValuesProps) => {
    console.log('Vehicle type Data: ' + data);

    const vehicletype = {
      name: data.name,
      features: data.features,
    };
    console.log('vehicletype: ', vehicletype);

    const _newItemCreated = await create(vehicletype);
    await _newItemCreated;
    console.log('newItemCreated: ', _newItemCreated);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      push(PATH_VEHICLETYPE.list);
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
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
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
          </Card>
        </Grid>

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
              <RHFTextField name="name" label="Vehicle type  *" />
              <RHFTextField name="features" label="Features of Type" />
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
      </Grid>
    </FormProvider>
  );
}
