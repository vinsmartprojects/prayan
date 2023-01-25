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
import { PATH_VENDOR } from 'src/routes/paths';
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
import { IVendorCreateInput } from 'src/@types/vendor';
// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IVendorCreateInput, 'avatarUrl'> {
    avatarUrl: CustomFile | string | null;
}

type Props = {
    isEdit?: boolean;
    currentVendor?: IVendorCreateInput;
};

export default function VendorNewEditForm({ isEdit = false, currentVendor }: Props) {
    const { push } = useRouter()

    const { enqueueSnackbar } = useSnackbar();

    const NewVendorSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        phoneNumber: Yup.string().required('Phone number is required'),
        address: Yup.string().required('Address is required'),
        country: Yup.string().required('Country is required'),
        company: Yup.string().required('Company is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
        role: Yup.string().required('Role is required'),
        avatarUrl: Yup.string().required('Avatar is required').nullable(true),
    });

    const defaultValues = useMemo(
        () => ({
            title: currentVendor?.title || '',
            primaryContactPerson: currentVendor?.primaryContactPerson || '',

        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentVendor]
    );

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(NewVendorSchema),
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
        if (isEdit && currentVendor) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentVendor]);

    const onSubmit = async (data: FormValuesProps) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            reset();
            enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
            push(PATH_VENDOR.list);
            console.log('DATA', data);
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
                        {isEdit && (
                            <Label
                                color={values.status === 'active' ? 'success' : 'error'}
                                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                            >
                                {values.status}
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
                                                checked={field.value !== 'active'}
                                                onChange={(event) =>
                                                    field.onChange(event.target.checked ? 'banned' : 'active')
                                                }
                                            />
                                        )}
                                    />
                                }
                                label={
                                    <>
                                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                                            Banned
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
                            name="isVerified"
                            labelPlacement="start"
                            label={
                                <>
                                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                                        Email Verified
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Disabling this will automatically send the Vendor a verification email
                                    </Typography>
                                </>
                            }
                            sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                        />
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
                            <RHFTextField name="title" label="Vendor Title *" />
                            <RHFTextField name="primaryContactPerson" label="Owner/ Auth Person *" />
                            <RHFTextField name="primaryContactMobile" label="Phone Number *" />
                            <RHFTextField name="primaryContactEmail" label="Email  Number " />
                        </Box>
                    </Card>
                    <Card sx={{ p: 3 }}>
                        <Box
                            rowGap={3}
                            columnGap={3}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(1, 1fr)',
                            }}
                        >
                            <RHFTextField name="title" label="Vendor Title" />
                            <RHFTextField name="email" label="Email Address" />
                            <RHFTextField name="phoneNumber" label="Phone Number" />

                        </Box>

                    </Card>
                    <Card sx={{ p: 3 }}>
                        <Box
                            rowGap={3}
                            columnGap={3}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(1, 1fr)',
                            }}
                        >
                            <RHFTextField name="title" label="Vendor Title" />
                            <RHFTextField name="email" label="Email Address" />
                            <RHFTextField name="phoneNumber" label="Phone Number" />

                            <RHFSelect native name="country" label="Country" placeholder="Country">
                                <option value="" />
                                {countries.map((country) => (
                                    <option key={country.code} value={country.label}>
                                        {country.label}
                                    </option>
                                ))}
                            </RHFSelect>

                            <RHFTextField name="state" label="State/Region" />
                            <RHFTextField name="city" label="City" />
                            <RHFTextField name="address" label="Address" />
                            <RHFTextField name="zipCode" label="Zip/Code" />
                            <RHFTextField name="company" label="Company" />
                            <RHFTextField name="role" label="Role" />
                        </Box>

                        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                {!isEdit ? 'Create Vendor' : 'Save Changes'}
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
