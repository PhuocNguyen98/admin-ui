import classNames from 'classnames/bind';
import styles from './Customer.modules.scss';
import { Container } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import { addCustomer, getCustomerById, editCustomer } from '~/api/customerApi';
import {
  fetchAddSuccess,
  fetchEditSuccess,
} from '~/store/actionsType/customerActions';

const cx = classNames.bind(styles);

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
  .object({
    firstName: yup.string().required('Vui lòng nhập First Name'),
    lastName: yup.string().required('Vui lòng nhập Last Name'),
    email: yup
      .string()
      .email('Đây không phải là email')
      .required('Vui lòng nhập Email'),
    phone: yup
      .string()
      .required('Vui lòng nhập số điện thoại.')
      .matches(phoneRegExp, 'Vui lòng nhập đúng định dạng số điện thoại.'),
    address: yup.string(),
  })
  .required();

function CustomerForm() {
  const dispatch = useDispatch();
  const { customerId } = useParams();
  const navigate = useNavigate(); // Dung de lay history link

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = handleSubmit(async (data) => {
    const res = await addCustomer(data);
    if (res) {
      dispatch(fetchAddSuccess(res));
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
      });
    }
  });

  const getCustomer = async () => {
    const res = await getCustomerById(customerId);
    if (res.data[0]) {
      setValue('firstName', res.data[0].firstName);
      setValue('lastName', res.data[0].lastName);
      setValue('email', res.data[0].email);
      setValue('phone', res.data[0].phone);
      setValue('address', res.data[0].address);
    }
  };

  useEffect(() => {
    getCustomer();
  }, [customerId]);

  const handleUpdateCustomer = handleSubmit(async (data) => {
    const res = await editCustomer(customerId, data);
    if (res) {
      dispatch(fetchEditSuccess({ ...data, customerId }));
    }
  });

  return (
    <div className={cx('wraper')}>
      <Container>
        <div className={cx('inner')}>
          <div className={cx('form-header')}>
            <Button
              onClick={() => navigate(-1)}
              iconLeft={<FontAwesomeIcon icon={faChevronLeft} />}
              className={cx('back-btn')}
            >
              Back
            </Button>
            <h2 className={cx('form-title')}>Add Form Customer</h2>
          </div>
          <form className={cx('form-body')}>
            <Controller
              control={control}
              name="firstName"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <div className={cx('form-group')}>
                  <label htmlFor="firstName" className={cx('form-label')}>
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    className={cx('form-controls')}
                    onChange={onChange}
                    value={value}
                  />
                  <span className={cx('msg-error')}>{error?.message}</span>
                </div>
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <div className={cx('form-group')}>
                  <label htmlFor="lastName" className={cx('form-label')}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    className={cx('form-controls')}
                    onChange={onChange}
                    value={value}
                  />
                  <span className={cx('msg-error')}>{error?.message}</span>
                </div>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <div className={cx('form-group')}>
                  <label htmlFor="email" className={cx('form-label')}>
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Last Name"
                    className={cx('form-controls')}
                    onChange={onChange}
                    value={value}
                  />
                  <span className={cx('msg-error')}>{error?.message}</span>
                </div>
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <div className={cx('form-group')}>
                  <label htmlFor="phone" className={cx('form-label')}>
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="Last Name"
                    className={cx('form-controls')}
                    onChange={onChange}
                    value={value}
                  />
                  <span className={cx('msg-error')}>{error?.message}</span>
                </div>
              )}
            />
            <Controller
              control={control}
              name="address"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <div className={cx('form-group')}>
                  <label htmlFor="address" className={cx('form-label')}>
                    Address
                  </label>
                  <textarea
                    id="address"
                    rows={2}
                    placeholder="Last Name"
                    className={cx('form-controls')}
                    onChange={onChange}
                    value={value}
                  />
                  <span className={cx('msg-error')}>{error?.message}</span>
                </div>
              )}
            />
          </form>
          {customerId ? (
            <Button btnSuccess onClick={() => handleUpdateCustomer()}>
              Update
            </Button>
          ) : (
            <Button btnSuccess onClick={() => handleSubmitForm()}>
              Submit
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
}

export default CustomerForm;
