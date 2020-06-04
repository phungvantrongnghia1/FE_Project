import React from 'react';
import CurrencyFormat from 'react-currency-format';

const Item = React.memo((props) => {
  const { item } = props;
  return (
    <li
      className="gx-flex-row gx-box-shadow gx-mb-3 gx-rounded-base gx-pointer"
      key={item.course_id}
    >
      <div style={{ width: '20%' }}>
        <img
          src={item.image}
          style={{ minHeight: '100%' }}
          onError={(e) =>
            (e.target.src = require('assets/images/productTest/product_1.png'))
          }
        />
      </div>
      <div
        className="gx-p-2 gx-flex-column gx-align-items-start"
        style={{ width: '80%' }}
      >
        <span className="gx-font-weight-bold gx-text-primary">
          {item.title}
        </span>
        <span className="gx-text-success gx-fs-xl gx-mt-1">
          <CurrencyFormat
            value={item.total}
            displayType="text"
            decimalSeparator=","
            thousandSeparator="."
            suffix={'vnđ'}
          />
        </span>
      </div>
    </li>
  );
});

export default Item;
