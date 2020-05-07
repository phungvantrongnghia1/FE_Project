import React, { useMemo } from "react";
import { compareDate } from "base/helper";
import CurrencyFormat from "react-currency-format";
import PropTypes from "prop-types";

const TotalPrice = React.memo(props => {
  const { data, unitSuffix, promotion } = props;
  
  const _showTotalPrice = listCart => {
      const price = listCart.reduce((sum, item) => {
        if (compareDate(item.promotion_from, item.promotion_to)) {
          return (sum += item.price_promotion);
        }
        return (sum += item.price);
      }, 0);
      return (
        <CurrencyFormat
          value={price-promotion}
          displayType="text"
          decimalSeparator=","
          thousandSeparator="."
          suffix={unitSuffix}
        />
      );
    },
    totalPrice = useMemo(() => _showTotalPrice(data), [data]);
  return totalPrice;
});

TotalPrice.propTypes = {
  unitSuffix: PropTypes.string,
  promotion: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      promotion_from: PropTypes.string,
      promotion_to: PropTypes.string,
      price: PropTypes.number.isRequired,
      price_promotion: PropTypes.number
    })
  ).isRequired
};

TotalPrice.defaultProps = {
  unitSuffix: "đ",
  data: [],
  promotion: 0
};

export default TotalPrice;
