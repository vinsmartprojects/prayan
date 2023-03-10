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
} from '../../components/hook-form';
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
    registerNo: Yup.string().required('Registration Number is required'),
    registrationType: Yup.string().required('Registration Type No  is required'),
    permitType: Yup.string().required('Permit Type is required'),
    permitNo: Yup.string().required('Permit Number is required'),
    make: Yup.string().required('Make is required'),
    model: Yup.string().required('Model is required'),
  });

  const defaultValues = useMemo(
    () => ({
      registerNo: '',
      registrationType: undefined,
      bodySegment: undefined,
      permitType: undefined,
      permitNo: '',
      make: undefined,
      model: '',
      year: '',
      color: '',
      vin: '',
      trNo: '',
      chassiNo: '',
      transmissionType: undefined,
      engineNo: '',
      seatingCapacity: undefined,
      rcBookDoc: undefined,
      rcNo: '',
      rcExpritationDate: undefined,
      insuranceDoc: undefined,
      vehicleImage: undefined,
      insuranceNo: '',
      insurationExpritationDate: undefined,
      emissionDoc: undefined,
      emissionNo: '',
      emissionExpritationDate: undefined,
      taxDoc: undefined,
      taxno: '',
      taxExpritationDate: undefined,
      fcExpritationDate: undefined,
      remarks: '',
      fuelType: undefined,
      vendor: undefined,
      gpsBox: false,
      mobileDevice: false,
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
              <RHFSelect
                native
                name="vendor"
                label="Vendor ( Ownership )"
                placeholder="Rental Type"
              >
                <option value={undefined} />
                {vendors.map((type: any) => (
                  <option key={type?.id} value={type?.id}>
                    {type?.title}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="registerNo" label="Registration Number *" />
              <RHFTextField name="rcNo" label="Vehicle's RC No *" />
              <RHFUploadAvatar
                name="rcBookDoc"
                placeholder=" Upload RC Doc"
                maxSize={3145728}
                onDrop={(data: any) => handleDocUpload(data, 'rcBookDoc')}
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
              <RHFSelect native name="bodySegment" label="Segment" placeholder="Segment">
                <option value={undefined} />
                {Object.values(BodySegment).map((type: any) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect native name="fuelType" label="Fuel Type" placeholder="Rental Type">
                <option value={undefined} />
                {Object.values(FuelType).map((type: any) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect
                native
                name="transmissionType"
                label=" Transmission Type"
                placeholder="Transmission Type"
              >
                <option value={undefined} />
                {Object.values(TransmissionType).map((type: any) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect native name="make" label="Maker" placeholder="Maker">
                <option value={undefined} />
                {Object.values(Maker).map((type: any) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="model" label="Model" />
              <RHFTextField name="year" label="Year " />
              <RHFTextField name="color" label="Color " />
              <RHFSelect
                native
                name="seatingCapacity"
                label="Car Seating"
                placeholder="Car Seatingr"
              >
                <option value="" />
                {Object.values(CarSeating).map((type: any) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </RHFSelect>
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
              <RHFSelect native name="registrationType" label="Reg Type" placeholder="Reg Type">
                <option value={undefined} />
                {Object.values(RegistrationType).map((type: any) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect native name="permitType" label="Permit Type" placeholder="Rental Type">
                <option value={undefined} />
                {Object.values(PermitType).map((type: any) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="permitNo" label="Permit No " />
              <RHFTextField name="vin" label="VIN No " />
              <RHFTextField name="trNo" label="TR Number " />
              <RHFTextField name="chassiNo" label="Chassi Number " />
              <RHFTextField name="engineNo" label="Engine Number " />
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
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="vehicleImage"
                maxSize={3145728}
                onDrop={(data: any) => handleDocUpload(data, 'vehicleImage')}
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
            <Box sx={{ mb: 1, mt: 1 }}>
              <Typography gutterBottom> Vehicle Features</Typography>
            </Box>
            <Divider />
            <Box sx={{ mb: 5, mt: 5 }}>
              <RHFSwitch
                name="isAc"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      AC{' '}
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
              <RHFSwitch
                name="gpsBox"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      GPS Box{' '}
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
              <RHFSwitch
                name="mobileDevice"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Mobile Device{' '}
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
            </Box>
          </Card>
          <Card sx={{ p: 3, my: 2 }}>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Add Vehicle' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </FormProvider>
  );
}
