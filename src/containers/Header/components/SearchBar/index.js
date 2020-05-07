import React, { useMemo, useState } from 'react';
import { Input, Icon, Dropdown, Spin } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { debounce } from 'lodash';
import './styles.less';
const loading = <Icon type="loading" spin />;
const Index = React.memo((props) => {
  const { suggests, loader } = props,
    [keyword, setKeyword] = useState('');

  const onCallSearch = debounce((keyword) => {
    props.hanldeGetSeuggestsSearch(keyword);
  }, 1000);

  const _onGetKeyword = (e) => {
    const { value } = e.target;
    if (keyword !== value.trim()) {
      setKeyword(value.trim());
      if (!!value) onCallSearch(value);
    }
  };

  const _onSearch = () => {
    if (!!keyword) props.history.push(`/course?c=0&f=moi-nhat&q=${keyword}`);
  };

  const showSuggets = (data) => {
      let result = [];
      if (data.length > 0) {
        result = data.map((item, index) => {
          switch (item.type) {
            case 'keyword':
              return (
                <li key={index}>
                  <Link to={`/course?c=0&f=moi-nhat&q=${item.data}`}>
                    <Icon type="search" /> {item.data}
                  </Link>
                </li>
              );
            case 'post':
              return (
                <li key={index}>
                  <Link
                    to={`/news/${item.data.slug}-p${item.data.id}-c${item.data.category_id}`}
                  >
                    <Icon type="book" /> {item.data.title}
                  </Link>
                </li>
              );
            default:
              return (
                <li key={index}>
                  <Link to={`/course/${item.data.slug}-p${item.data.id}`}>
                    <Icon type="file-search" /> {item.data.title}
                  </Link>
                </li>
              );
          }
        });
      }
      return result;
    },
    elmSuggets = useMemo(() => showSuggets(suggests), [suggests]);

  const showLoaderSearch = (loader) => {
      let result = (
        <span className="gx-search-icon gx-pointer" onClick={_onSearch}>
          <Icon type="search" />
        </span>
      );
      if (loader)
        result = <Spin className="gx-search-icon" indicator={loading} />;
      return result;
    },
    elmLoaderSearch = useMemo(() => showLoaderSearch(loader), [loader]);

  return (
    <div className="gx-search-bar vz-search-bar ">
      <div className="gx-form-group">
        <Dropdown
          overlayClassName="gx-bg-white vz-drop-suggest"
          overlay={<ul>{elmSuggets}</ul>}
          trigger={['click']}
        >
          <Input
            className="ant-input "
            placeholder="Nhập từ khóa tìm kiếm..."
            onKeyUp={_onGetKeyword}
          />
        </Dropdown>
        {elmLoaderSearch}
      </div>
    </div>
  );
});

export default withRouter(Index);
