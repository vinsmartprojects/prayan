import React from 'react';
import { APP_NAME, APP_VERSION } from 'src/assets/data/common';

type Props = {
  title?: string;
};

export  function PageHeaderTitle({ title }: Props) {
  return (<React.Fragment>
    <title>
      {APP_NAME} -{APP_VERSION}
    </title></React.Fragment>
  );
}
