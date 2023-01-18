import { useEffect, useState } from 'react';

export function UserComponent({ username, role }: any) {
  const [name, setName] = useState('');
  const [roleOfUser, setroleOfUser] = useState(role);

  useEffect(() => {
    setName(username);
    setroleOfUser(role);
  }, [username, role]);

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
      <h1 style={{ paddingLeft: 5, paddingTop: 5, fontSize: 24 }}>{name} </h1>
      <p style={{ paddingLeft: 5, paddingTop: 10, fontSize: 12 }}>{roleOfUser} </p>
    </div>
  );
}
