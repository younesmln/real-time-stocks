import React from 'react';

function Loader() {
  return (
    <div
      data-testid="loader"
      className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-36 w-36 inline-block"
    ></div>
  );
}

export default Loader;
