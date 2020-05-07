import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Slider } from 'antd';
import './styles.less';

const Index = React.memo(
  forwardRef((props, ref) => {
    const [scale, setScale] = useState(1),
      refUpload = useRef(),
      { file } = props;
    useImperativeHandle(ref, () => ({
      _onGetFile: () => {
        const imgBase64 = refUpload.current.getImageScaledToCanvas().toDataURL();
        return imgBase64;
      }
    }));

    const _onChangeScale = value => setScale(value);
    return (
      <div className="avatar-editor">
        <AvatarEditor
          ref={refUpload}
          image={file && file}
          width={200}
          height={200}
          border={1}
          borderRadius={120}
          scale={scale}
          rotate={0}
        />
        <Slider min={1} max={2} step={0.01} tooltipVisible={false} onChange={_onChangeScale} />
      </div>
    );
  })
);

export default Index;
