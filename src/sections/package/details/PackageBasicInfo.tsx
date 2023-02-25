import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { usePackage } from 'src/modules/package/hooks/usePackage';
import PackageAboutDetail from './components/About';
import PackageDocumentationDetail from './components/Documentation';

type Props = {
    id: any
}

function PackageBasicInfo({ id }: Props) {

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


    return (<Box
        rowGap={3}
        columnGap={3}
        display="grid"
        gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
        }}
    ><PackageAboutDetail {..._package} />
        <PackageDocumentationDetail {..._package} /></Box>)
}

export default PackageBasicInfo