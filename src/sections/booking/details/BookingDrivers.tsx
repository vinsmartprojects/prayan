import React, { useEffect, useState } from 'react'
import EmptyContent from 'src/components/empty-content';
import { useBooking } from 'src/modules/booking/hooks/useBooking';
import BookingAboutDetail from './components/About';

type Props = {
    id: any
}

function BookingDrivers({ id }: Props) {

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


    return (<div>  <EmptyContent
        title="No Data"
        sx={{
          '& span.MuiBox-root': { height: 160 },
        }}
      /></div>)
}

export default BookingDrivers