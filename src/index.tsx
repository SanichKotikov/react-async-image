import * as React from 'react';

type Decoding = 'auto' | 'sync' | 'async';

interface Props {
  src: string;
  alt?: string;
  decoding?: Decoding;
  className?: string;
  placeholder?: React.ReactNode | string;
}

interface DefaultProps {
  decoding: Decoding;
  className: string;
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
    className: 'async-image'
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
    const { className, placeholder, ...restProps } = this.props;

    const classNames = [className];
    if (loading) classNames.push(`${className}-loading`);

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
