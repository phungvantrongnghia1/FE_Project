import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Upload, Button, Icon, message } from 'antd';
import PropTypes from 'prop-types';

const FileUpload = forwardRef((props, ref) => {
  const { actCreate, url, typeFileUpload, buttonClick, cbOnChange } = props;
  const [fileAvatar, setFileAvatar] = useState(null),
    [fileList, setFileList] = useState([]);
  useEffect(() => {
    if (!actCreate) {
      setFileList([
        {
          uid: '-1',
          status: 'done',
          url
        }
      ]);
    }
  }, [url]);
  useImperativeHandle(ref, () => ({
    _onGetFile: () => {
      return fileAvatar;
    },
    _onResetFile: () => {
      fileAvatar && setFileList([]);
      setFileAvatar(null);
    }
  }));

  const _propsUpload = {
    beforeUpload: file => {
      setFileAvatar(null);
      handleCheckFile(typeFileUpload, file, 'beforeUpload');
      return false;
    },
    accept: typeFileUpload === 'image' ? '.jpg,.jpeg,.png' : '.mp4,.avi,.mov,.wmv',
    showUploadList: false,
    listType: 'picture',
    fileList,
    fileAvatar
  };
  const handleCheckFile = (typeUpload, file, zone) => {
    const typeFile = file.type,
      { size } = file;
    let flag = true;
    if (typeUpload === 'image') {
      if (typeFile === 'image/jpeg' || typeFile === 'image/png') {
        if (size <= 2097000) {
          if (zone === 'beforeUpload') {
            setFileAvatar(file);
            if (cbOnChange) cbOnChange(file);
          } else flag = false;
        } else {
          message.error('Vui lòng chọn ảnh dung lượng ít hơn 2Mb!');
        }
      } else {
        message.error('Bạn chỉ có thể chọn ảnh loại JPEG hoặc PNG!');
      }
    } else if (typeUpload === 'video') {
      if (
        typeFile === 'video/mp4' ||
        typeFile === 'video/avi' ||
        typeFile === 'video/mov' ||
        typeFile === 'video/wmv'
      ) {
        if (zone === 'beforeUpload') {
          setFileAvatar(file);
          if (cbOnChange) cbOnChange(file);
        } else flag = false;
      } else {
        message.error('You can only upload MP4, AVI, MOV, WMV file!');
      }
    } else if (typeUpload === 'application/pdf' && typeFile === 'application/pdf') {
      setFileAvatar(file.originFileObj);
    } else if (typeUpload === 'application/pdf' && typeFile !== 'application/pdf') {
      message.error('Chỉ nhận dạng file pdf!');
    }
    else throw new Error('typeFileUpload must be "image" or "video"');
    return flag;
  };

  const _onChangeFile = info => {
    let fileList = [...info.fileList];
    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      if (handleCheckFile(typeFileUpload, file, 'onChange')) {
        file.status = 'error';
      }
      return file;
    });
    setFileList(fileList);
  };

  const _onRemoveFile = () => setFileAvatar(null);
  return (
    <>
      <Upload {..._propsUpload} onChange={_onChangeFile} onRemove={_onRemoveFile}>
        {buttonClick}
      </Upload>
      {fileAvatar ? <p>{fileAvatar.name}</p> : <></>}
      {url && !fileAvatar ? <a href={`${process.env.APP_URL}${url.url}`} target={"_blank"}>{url.fileName}</a> : <></>}
    </>
  );
});

FileUpload.propTypes = {
  actCreate: PropTypes.bool.isRequired, // type action: true => create, false => update
  typeFileUpload: PropTypes.oneOf(['image', 'video', 'application/pdf']),
  buttonClick: PropTypes.node,
  cbOnChange: PropTypes.func
};
FileUpload.defaultProps = {
  typeFileUpload: 'image',
  buttonClick: (
    <Button>
      <Icon type="upload" /> Select File
    </Button>
  )
};

export default FileUpload;
