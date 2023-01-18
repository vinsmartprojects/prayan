
type AddressCompType = {
  address: AddressProps;
  dark?: boolean;
  inline?: boolean;
};
export type AddressProps = {
  line1: string;
  line2?: string;
  area: string;
  city: string;
  country?: string;
  pincode: string;
};

export function Address({ address, dark, inline }: AddressCompType) {
  const { line1, line2, area, city, country, pincode } = address;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: inline ? 'row' : 'column',
        alignItems: 'flex-start',

        paddingLeft: 15,
      }}
    >
      <div
        style={{ paddingLeft: 5, paddingTop: 1, fontSize: 16, color: dark ? '#fadada' : '#000' }}
      >
        {line1}
        {', '} {line2}{' '}
      </div>

      <div
        style={{ paddingLeft: 5, paddingTop: 1, fontSize: 16, color: dark ? '#fadada' : '#000' }}
      >
        {area}
        {', '} {pincode}
      </div>
      <div
        style={{ paddingLeft: 5, paddingTop: 1, fontSize: 16, color: dark ? '#fadada' : '#000' }}
      >
        {city}
        {', '} {country}{' '}
      </div>
      <div
        style={{ paddingLeft: 5, paddingTop: 1, fontSize: 16, color: dark ? '#fadada' : '#000' }}
      >
        {' '}
      </div>
      <div
        style={{ paddingLeft: 5, paddingTop: 1, fontSize: 16, color: dark ? '#fadada' : '#000' }}
      ></div>
    </div>
  );
}
