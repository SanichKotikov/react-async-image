import * as React from 'react';

type Decoding = 'auto' | 'sync' | 'async';

interface Props {
  src: string;
  alt?: string;
  decoding?: Decoding;
  prefixClass?: string;
  className?: string;
  placeholder?: React.ReactNode | string;
}

interface DefaultProps {
  decoding: Decoding;
  prefixClass: string;
}

interface State {
  loading: boolean;
  error: boolean;
  src: string;
}

class AsyncImage extends React.Component<Props & DefaultProps, State> {

  image: React.RefObject<HTMLImageElement> = React.createRef();

  state: State = { loading: true, error: false, src: '' };

  static defaultProps: DefaultProps = {
    decoding: 'async',
    prefixClass: 'async-image'
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.src !== state.src) {
      return { loading: true, error: false, src: props.src }
    }
    return null;
  }

  componentDidMount() {
    const image = this.image.current;

    if (image) {
      image.addEventListener('load', this.onLoad);
      image.addEventListener('error', this.onError);
    }
  }

  componentWillUnmount() {
    const image = this.image.current;

    if (image) {
      image.removeEventListener('load', this.onLoad);
      image.removeEventListener('error', this.onError);
    }
  }

  onLoad = () => this.setState({ loading: false, error: false });
  onError = () => this.setState({ loading: false, error: true });

  render() {
    const { loading, error } = this.state;
    const { prefixClass, className, placeholder, ...restProps } = this.props;

    const classNames: Array<string | undefined> = [prefixClass];
    if (loading) classNames.push(`${prefixClass}-loading`);
    classNames.push(className);

    const styles: React.CSSProperties = error ? { display: 'none' } : {};

    return (
      <React.Fragment>
        <img
          ref={this.image}
          className={classNames.join(' ')}
          style={styles}
          {...restProps}
        />
        {error && placeholder}
      </React.Fragment>
    );
  }

}

export default AsyncImage;
