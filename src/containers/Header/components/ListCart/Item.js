import React from 'react';
import { Icon } from 'antd';
import PriceView from 'components/PriceView';

const Item = React.memo((props) => {
  const { item } = props;

  const _onDelItemCart = (id) => props.onDelItemCart(id);

  return (
    <li
      className="gx-flex-row gx-box-shadow gx-mb-3 gx-rounded-base gx-pointer"
      key={item.id}
    >
      <div style={{ width: '25%' }}>
        {/* update image later */}
        <img
          src={item.image}
          style={{ minHeight: '100%' }}
          onError={(e) =>
            (e.target.src = require('assets/images/productTest/product_1.png'))
          }
        />
      </div>
      <div className="gx-p-2 gx-flex-column" style={{ width: '75%' }}>
        <h3 className="gx-fs-md gx-font-weight-bold gx-text-primary">
          {item.title}
        </h3>
        <div className="gx-flex-row gx-justify-content-between gx-align-items-end">
          <div className="gx-flex-column">
            <PriceView
              item={item}
              classNameDelPrice="gx-text-grey gx-font-italic gx-fs-sm gx-mr-1"
              classNamePrice="gx-text-success gx-fs-md"
            />
          </div>
          <a onClick={() => _onDelItemCart(item.id)}>
            <Icon type="delete" theme="filled" className="gx-text-danger" />
          </a>
        </div>
      </div>
    </li>
  );
});

export default Item;
