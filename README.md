# react-async-image

ReactJS 'img' tag rendering with loading styles, async decoding and error fallback.

## Install

```bash
npm i -S react-async-image
```

## Usage

```typescript jsx
import Image from 'react-async-image';
const images = ['./images/picture1.jpg', './images/picture2.png'];

<div className="wrapper">
  {images.map((src, index) => (
    <div key={index} style={{ width: 100, height: 100 }}>
      <Image
        src={src}
        prefixClass="image"
        placeholder={<div className="placeholder">oops</div>}
      />
    </div>
  ))}
</div>

```

```css
.image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 1;
  transition: opacity .5s;
}

.image-loading {
  opacity: 0;
  transition: none;
}
```

### Props

| name | description | type | default |
|------|-------------|------|---------|
| src | The image URL | string | |
| alt? | An alternative text description of the image | string | |
| decoding? | Decoding hint to the browser | auto \| sync \| async | async |
| prefixClass? | Prefix class | string | async-image |
| className? | Additional css class of the image | string | |
| placeholder? | A fallback element if the image could be loaded | React.ReactNode \| string | |
