import React, { ReactNode } from 'react';

function Error({ message }: { message?: ReactNode }) {
  return <div>error {message}</div>;
}

export default Error;
