import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, Divider } from '@mui/material';
import { useSnackbar } from 'notistack';

import Label from 'src/components/label';
import { CustomFile } from 'src/components/upload';
import { fData } from 'src/utils/formatNumber';
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import {
  BodySegment,
  CarSeating,
  FuelType,
  IVehicle,
  IVehicleEdit,
  Maker,
  PermitType,
  RegistrationType,
  TransmissionType,
} from 'src/@types/vehicle';
import { useVehicle } from 'src/modules/vehicle/hooks/useVehicle';
import { useUploader } from 'src/modules/cdn/useUploader';
import { useVendor } from 'src/modules/vendor/hooks/useVendor';
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
  const { create } = useVehicle();
  const { getMany } = useVendor();
  const { enqueueSnackbar } = useSnackbar();
  const { uploadFile, cdnPath } = useUploader();
  const [vendors, setvendors] = useState<any>([]);

  useEffect(() => {
    loadVendors();
  }, []);

  async function loadVendors() {
    const { data } = await getMany();

    await data;
    console.log(data);

    if (data && data.length > 0) {
      setvendors(data);
    }
  }
  const NewVehicleSchema = Yup.object().shape({
    model: Yup.string().required('Model Number is required'),
    code: Yup.string().required('Code is required'),
  });

  const defaultValues = useMemo(
    () => ({
      model: '',
      code: undefined,
      isAc: false,
      isActive: false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [vehicle]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewVehicleSchema),
    defaultValues,
  });
  async function onSubmit(data: any) {
    const { rcBookDoc, vehicleImage, vendor, ..._data }: any = data;
    console.log("vendor",vendor);

    var _vehicleData: any = {};
    if (rcBookDoc?.isNew === true) {
      const _fileUploaded: any = await uploadFile(rcBookDoc?.file);
      await _fileUploaded;
      if (_fileUploaded?.data?.filename) {
        _vehicleData.rcBookDoc = _fileUploaded?.data?.filename;
      }
    }
    if (vehicleImage?.isNew === true) {
      const _fileUploaded: any = await uploadFile(rcBookDoc?.file);
      await _fileUploaded;
      if (_fileUploaded?.data?.filename) {
        _vehicleData.vehicleImage = _fileUploaded?.data?.filename;
      }
    }
    const vehicleData = { vendor: vendor, ..._vehicleData, ..._data };
    try {
      const _newVehicleData = await create(vehicleData);
      await _newVehicleData;
      if (_newVehicleData?.data) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        reset();
        enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
        reload();
      } else {
        enqueueSnackbar(_newVehicleData?.error?.message, {
          variant: 'error',
        });
      }
    } catch (error) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
    }
  }
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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={12}>
        <Grid item xs={12} md={5}>
          <Card sx={{ p: 3, my: 2 }}>
            <Box
              rowGap={3}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
             
              <RHFTextField name="Model Name" label="Model Name *" />
               <RHFTextField name="Model Code" label="Model Code *" />
         
            </Box>
          </Card>
          <Card sx={{ p: 3, m: 0 }}>
            <Box
              rowGap={3}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
             
              <Divider />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ p: 3, my: 2 }}>
            <Box
              rowGap={3}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              
            </Box>
          </Card>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {isEdit && (
              <Label
                color={values.isActive ? 'success' : 'error'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.isActive}
              </Label>
            )}
            
            
          </Card>
          <Card sx={{ p: 3, my: 2 }}>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Add Model' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </FormProvider>
  );
}
