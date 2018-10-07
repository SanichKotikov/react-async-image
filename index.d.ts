import * as React from 'react';

export type AsyncImageDecoding = 'auto' | 'sync' | 'async';

export interface AsyncImageProps {
  src: string;
  alt?: string;
  decoding?: AsyncImageDecoding;
  prefixClass?: string;
  className?: string;
  placeholder?: React.ReactNode | string;
}

export default class AsyncImage extends React.Component<AsyncImageProps> {}
