import classNames from 'classnames/bind';
import styles from './Customer.modules.scss';
import { Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '~/components/Button';
import config from '~/config';
import {
  getCustomers,
  deleteCustomer,
  editMultipleCustomer,
} from '~/api/customerApi';
import {
  fetchDataSuccess,
  fetchDeleteSuccess,
} from '~/store/actionsType/customerActions';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const schema = yup.object().shape({
  formList: yup.array(
    yup.object({
      evaluate: yup.string().required(),
      reason: yup.string().nullable(),
    }),
  ),
});

function Customer() {
  const [pagination, setPagination] = useState({});
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer);
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      formList: [],
    },
    resolver: yupResolver(schema),
  });

  const { fields } = useFieldArray({
    control,
    name: 'formList',
  });

  //----------------------------------------------------------------
  const getData = async (page, size) => {
    const res = await getCustomers(page, size);
    dispatch(fetchDataSuccess(res));
  };

  useEffect(() => {
    if (customers.data.length === 0) {
      getData(pageCurrent, pageSize);
    }
  }, [customers.data.length]);

  const handleDelete = async (id) => {
    const res = await deleteCustomer(id);
    if (res) {
      dispatch(fetchDeleteSuccess(id));
    }
  };
  // ----------------------------------------------------------------

  const checkDataChange = (data) => {
    let isCheck = false;
    const customer = customers.data.find((item) => {
      return item.customerId === data.customerId;
    });
    if (customer) {
      if (
        customer.evaluate !== +data.evaluate ||
        customer.reason !== data.reason
      ) {
        isCheck = true;
      }
    }
    return isCheck;
  };

  const onSubmit = handleSubmit(async (data) => {
    const newData = [];
    data.formList.map((item) => {
      let isCheck = checkDataChange(item);
      if (isCheck) {
        if (+item.evaluate === 1) {
          item.reason = null;
          return newData.push(item);
        }
        return newData.push(item);
      }
      return 0;
    });
    console.log(newData);
    const res = await editMultipleCustomer(newData);
  });

  const handleAddFields = () => {
    for (let i = 0; i < customers.data.length; i++) {
      setValue(`formList.${i}.customerId`, customers.data[i].customerId);
      setValue(`formList.${i}.evaluate`, customers.data[i].evaluate);
      setValue(`formList.${i}.reason`, customers.data[i].reason);
    }
  };

  const renderTable = () => {
    handleAddFields();
    return customers.data.map((customer, index) => {
      return (
        <tr key={index}>
          <td>
            <Controller
              control={control}
              name={`formList.${index}.customerId`}
              render={({ field: { value } }) => <span>{value}</span>}
            />
          </td>
          <td>{customer.firstName}</td>
          <td>{customer.lastName}</td>
          <td>{customer.email}</td>
          <td>{customer.phone}</td>
          <td>{customer.address}</td>
          <td>
            <Controller
              control={control}
              name={`formList.${index}.evaluate`}
              render={({ field: { onChange, value } }) => (
                <select
                  name={`formList.${index}.evaluate`}
                  onChange={onChange}
                  defaultValue={value}
                >
                  <option value="">Chọn....</option>
                  <option value="0">Chưa đạt</option>
                  <option value="1">Đạt</option>
                </select>
              )}
            />
          </td>
          <td>
            <Controller
              control={control}
              reason
              name={`formList.${index}.reason`}
              render={({ field: { onChange, value } }) => (
                <input
                  placeholder="Reason..."
                  value={value ? value : ''}
                  onChange={onChange}
                />
              )}
            />
          </td>
          <td width="20%">
            <Button
              to={`${config.routes.customer}/edit/${customer.customerId}`}
              btnInfo
              iconLeft={<FontAwesomeIcon icon={faPenToSquare} />}
            >
              Edit
            </Button>
            <Button
              btnDanger
              iconLeft={<FontAwesomeIcon icon={faTrashCan} />}
              onClick={() => handleDelete(customer.customerId)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className={cx('wrapper')}>
      <Container>
        <div className={cx('inner')}>
          <div className={cx('header')}>
            <h2 className={cx('title')}>Customers List</h2>
            <Button
              to={config.pages.addCustomer}
              iconLeft={<FontAwesomeIcon icon={faPlus} />}
            >
              Add
            </Button>

            <Button btnSuccess onClick={() => onSubmit()}>
              Submit
            </Button>
          </div>
          <div className={cx('body')}>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Evaluate</th>
                  <th>Reason</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderTable()}</tbody>
            </Table>
          </div>
          <div>
            <span>Rows per page:</span>
            <select onChange={(e) => getData(pageCurrent, e.target.value)}>
              <option value="2">2</option>
              <option value="4">4</option>
            </select>

            <span>
              &nbsp;
              {pagination.page} - {pagination.pageSize}
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Customer;
