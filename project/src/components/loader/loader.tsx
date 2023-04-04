import * as React from 'react';
import Loader from 'react-ts-loaders';

function MyLoader () {
  return (
    <Loader
      type="dotspinner"
      color="blue"
      size={200}
    />);
}

export default MyLoader;
