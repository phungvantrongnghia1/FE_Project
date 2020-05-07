import React, { useMemo } from "react";
import CurrencyFormat from "react-currency-format";
import PropTypes from "prop-types";
import { compareDate } from "base/helper";

const Index = React.memo(props => {
  const { classNameDelPrice, classNamePrice, item, classWrap } = props;

  const showPrice = data => {
      let result = (
        <span className={classNamePrice}>
          <CurrencyFormat
            value={data.price}
            displayType="text"
            decimalSeparator=","
            thousandSeparator="."
            suffix={"đ"}
          />
        </span>
      );
      if (compareDate(data.promotion_from, data.promotion_to)) {
        result = (
          <React.Fragment>
            <del className={classNameDelPrice}>
              <CurrencyFormat
                value={data.price}
                displayType="text"
                decimalSeparator=","
                thousandSeparator="."
                suffix={"đ"}
              />
            </del>
            <span className={classNamePrice}>
              <CurrencyFormat
                value={data.price_promotion}
                displayType="text"
                decimalSeparator=","
                thousandSeparator="."
                suffix={"đ"}
              />
            </span>
          </React.Fragment>
        );
      }
      return result;
    },
    elmPrice = useMemo(() => showPrice(item), [item]);
  return <div className={classWrap}>{elmPrice}</div>;
});

Index.propTypes = {
  classNameDelPrice: PropTypes.string,
  classNamePrice: PropTypes.string,
  classWrap: PropTypes.string,
  item: PropTypes.shape({
    price: PropTypes.number,
    price_promotion: PropTypes.number,
    promotion_from: PropTypes.string,
    promotion_to: PropTypes.string
  }).isRequired
};

export default Index;
