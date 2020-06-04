import React, { useMemo, useState, useCallback, useRef } from 'react';
import { Table, Tag, Icon, Button, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import Highlighter from 'react-highlight-words';
import CurrencyFormat from 'react-currency-format';
import { activeOrder } from 'modules/Account/redux/actions';
import Active from './Active';
import Detail from './Detail';

const Index = React.memo((props) => {
  const { orders } = useSelector((state) => state.AuthReducer),
    [visible, setVisible] = useState(false),
    [visibleDetail, setVisibleDetail] = useState(false),
    [detailOrder, setDetailOrder] = useState([]),
    [loadingBtnActive, setLoadingBtnActive] = useState(false),
    [courseID, setCourseID] = useState(-1),
    [searchText, setSearchText] = useState(''),
    [searchedColumn, setSearchedColumn] = useState(''),
    dispatch = useDispatch(),
    searchInput = useRef();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render: (txt, _) => {
        return (
          <Icon
            onClick={() => {
              _onViewDetail(txt);
            }}
            type="eye"
            className="gx-text-primary"
            theme="filled"
          />
        );
      }
    },
    {
      title: 'Đơn hàng',
      dataIndex: 'order_code',
      key: 'order_code',
      ...getColumnSearchProps('order_code')
    },
    {
      title: 'Mã khuyến mãi | Giá trị',
      dataIndex: 'promotion_code',
      key: 'promotion_code',
      render: (txt, record) => {
        return (
          <span>
            {record.promotion_code ? record.promotion_code : 'Không áp dụng'} |{' '}
            {record.promotion_value ? (
              <CurrencyFormat
                value={record.promotion_value ? record.promotion_value : 0}
                displayType="text"
                decimalSeparator=","
                thousandSeparator="."
                suffix={'vnđ'}
              />
            ) : (
              '0vnđ'
            )}
          </span>
        );
      }
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'sum',
      key: 'sum',
      render: (_txt, record) => {
        return (
          <CurrencyFormat
            value={record.sum ? record.sum : 0}
            displayType="text"
            decimalSeparator=","
            thousandSeparator="."
            suffix={'vnđ'}
          />
        );
      }
    },
    {
      title: 'Hình thức thanh toán',
      dataIndex: 'payment_type',
      key: 'payment_type'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'address',
      key: 'address',
      render: (_, record) => {
        return (
          <>
            <Tag
              className="gx-pointer"
              onClick={() => _onShowPopup(record.id)}
              color="geekblue"
            >
              Nhập mã kích hoạt
            </Tag>
          </>
        );
      }
    }
  ];

  const _onViewDetail = useCallback(
    (id) => {
      const orderSelected = orders.filter((order) => order.id === +id);
      setDetailOrder(orderSelected[0].detailOrders);
      setVisibleDetail(true);
    },
    [orders]
  );

  const showItem = (data) => {
      let result = [];
      if (data.length > 0) {
        result = data.map((item) => ({ key: item.id, ...item }));
      }
      return result;
    },
    arrayItem = useMemo(() => showItem(orders), [orders]);

  /********* popupview ********/

  const onGetListCoursePurchased = () =>
    {
      return ;
    }

  const handleSubmitActive = (data) => {
    data.orderId = courseID;
    setLoadingBtnActive(true);
    dispatch(
      activeOrder({
        data,
        cbError: () => {
          NotificationManager.warning('Không thể kích hoạt đơn hàng', '', 5000);
        },
        cbSuccess: () => {
          NotificationManager.success('Kích hoạt thành công', '', 5000);
          onGetListCoursePurchased();
          setVisible(false);
        },
        cbLoader: () => {
          setLoadingBtnActive(false);
        }
      })
    );
  };

  const onVisibleModal = (boolean) => setVisible(boolean);

  const _onShowPopup = (id) => {
    setCourseID(id);
    onVisibleModal(true);
  };

  return (
    <div className="gx-mt-1 history">
      <Table pagination={false} columns={columns} dataSource={arrayItem} />
      <Active
        visible={visible}
        loading={loadingBtnActive}
        onVisibleModal={(boolean) => onVisibleModal(boolean)}
        callbackSubmit={(data) => handleSubmitActive(data)}
      />
      <Detail
        visible={visibleDetail}
        onVisibleModal={(boolean) => setVisibleDetail(boolean)}
        data={detailOrder}
      />
    </div>
  );
});

export default Index;
