import classNames from 'classnames/bind';
import styles from './Customer.modules.scss';
import { Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '~/components/Button';
import config from '~/config';
import { getCustomers, deleteCustomer } from '~/api/customerApi';
import {
  fetchDataSuccess,
  fetchDeleteSuccess,
} from '~/store/actionsType/customerActions';

const cx = classNames.bind(styles);

const schema = yup
  .object()
  .shape({
    formList: yup.array(
      yup.object({
        evaluate: yup.string(),
        reason: yup.string(),
      }),
    ),
  })
  .required();

function Customer() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer);
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      formList: [
        {
          evaluate: '',
          reason: '',
        },
      ],
    },
    resolver: yupResolver(schema),
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'formList',
  });

  //----------------------------------------------------------------
  const getData = async () => {
    const res = await getCustomers();
    dispatch(fetchDataSuccess(res));
  };

  useEffect(() => {
    if (customers.data.length === 0) {
      getData();
      handleAddFields();
    }
  }, [customers.data.length]);

  const handleDelete = async (id) => {
    const res = await deleteCustomer(id);
    if (res) {
      dispatch(fetchDeleteSuccess(id));
    }
  };
  // ----------------------------------------------------------------

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const handleAddFields = () => {
    for (let i = 0; i < customers.data.length; i++) {
      append({
        evaluate: '',
        reason: '',
      });
    }
  };

  console.log(fields);

  const renderTable = () => {
    return customers.data.map((customer, index) => {
      return (
        <tr key={index}>
          <td>{customer.customerId}</td>
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
                  value={value}
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
            <form action="">
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
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Customer;
