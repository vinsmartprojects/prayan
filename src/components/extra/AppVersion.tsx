import { useState } from 'react';
import { APP_NAME, APP_VERSION } from 'src/assets/data/common';

export function AppVersion() {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingLeft: 15,
      }}
    >
      <h1 style={{ paddingLeft: 5, paddingTop: 5, fontSize: 24 }}>{APP_NAME} </h1>
      <p style={{ paddingLeft: 5, paddingTop: 10, fontSize: 12 }}>{APP_VERSION} </p>
    </div>
  );
}

export function PoweredBy({ inline, dark }: any) {
  const CompanyName = 'Vinsamrt Technology Pvt Ltd';
  const Website = 'https://vinsmart.in';
  return (
    <div
      style={{
        marginBottom: 15,
        display: 'flex',
        flexDirection: inline ? 'row' : 'column',
        alignItems: 'center',

        paddingLeft: 15,
      }}
    >
      <div
        style={{ paddingLeft: 5, paddingTop: 1, fontSize: 16, color: dark ? '#fadada' : '#000' }}
      >
        {CompanyName}{' '}
      </div>
      <div style={{ paddingLeft: 5, paddingTop: 4, fontSize: 12, color: '#ddd' }}>{Website} </div>
    </div>
  );
}
