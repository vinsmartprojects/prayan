import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useBooking } from 'src/modules/booking/hooks/useBooking';
import BookingAboutDetail from './components/About';
import BookingDocumentationDetail from './components/Documentation';

type Props = {
    id: any
}

function BookingBasicInfo({ id }: Props) {

    const [_booking, set_booking] = useState<any>();
    const { update, get } = useBooking();
    useEffect(() => {
        if (id) {
            bookingGet(id);
        }
    }, [id]);


    async function bookingGet(id: any) {
        await get(id)
            .catch((e: any) => {
                console.log();
            })
            .then((res) => {
                console.log(res);
                set_booking(res?.data);
            });
    }


    return (<Box
        rowGap={3}
        columnGap={3}
        display="grid"
        gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
        }}
    ><BookingAboutDetail {..._booking} />
        <BookingDocumentationDetail {..._booking} /></Box>)
}

export default BookingBasicInfo