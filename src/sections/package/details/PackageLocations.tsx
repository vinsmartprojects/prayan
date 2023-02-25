import React, { useEffect, useState } from 'react'
import EmptyContent from 'src/components/empty-content';
import { usePackage } from 'src/modules/package/hooks/usePackage';
import PackageAboutDetail from './components/About';

type Props = {
    id: any
}

function PackageLocations({ id }: Props) {

    const [_package, set_package] = useState<any>();
    const { update, get } = usePackage();
    useEffect(() => {
        if (id) {
            packageGet(id);
        }
    }, [id]);


    async function packageGet(id: any) {
        await get(id)
            .catch((e: any) => {
                console.log();
            })
            .then((res) => {
                console.log(res);
                set_package(res?.data);
            });
    }


    return (<div><EmptyContent
        title="No Data"
        sx={{
          '& span.MuiBox-root': { height: 160 },
        }}
      /></div>)
}

export default PackageLocations