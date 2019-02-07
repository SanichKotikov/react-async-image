import React, { useState, useEffect, useCallback, useMemo } from 'react';

enum imgStatus { Loading, Loaded, Error }
export type AsyncImageDecoding = 'auto' | 'sync' | 'async';

export interface IAsyncImageProps {
  src: string;
  alt?: string;
  decoding?: AsyncImageDecoding;
  prefixClass?: string;
  className?: string;
  placeholder?: React.ReactNode | string;
}

const computeClassNames = (
  status: imgStatus,
  prefix: string = 'async-image',
  className: string | undefined
) => (
  [prefix, (status === imgStatus.Loading ? prefix + '-loading': ''), className]
    .filter(Boolean).join(' ')
);

const AsyncImage: React.FunctionComponent<IAsyncImageProps> = React.memo(
  ({ src, alt, decoding, prefixClass, className, placeholder }) => {
    const [status, updateStatus] = useState(imgStatus.Loading);
    useEffect(() => () => updateStatus(0), [src]);

    const onLoad = useCallback(() => updateStatus(imgStatus.Loaded), []);
    const onError = useCallback(() => updateStatus(imgStatus.Error), []);

    const classNames = useMemo(() => {
      return computeClassNames(status, prefixClass, className);
    }, [status, prefixClass, className]);

    const isError = status === imgStatus.Error;
    const styles = isError ? { display: 'none' } : {};

    return (
      <>
        <img
          alt={alt}
          decoding={decoding || 'async'}
          onLoad={onLoad}
          onError={onError}
          src={src}
          className={classNames}
          style={styles}
        />
        {isError && placeholder}
      </>
    );
  }
);

export default AsyncImage;
