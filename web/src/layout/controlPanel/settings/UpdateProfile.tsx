import classnames from 'classnames';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { API } from '../../../api';
import { AppCtx, updateUser } from '../../../context/AppCtx';
import { Profile, UserFullName } from '../../../types';
import alertDispatcher from '../../../utils/alertDispatcher';
import InputField from '../../common/InputField';

interface Props {
  onAuthError: () => void;
  profile: Profile | null | undefined;
}

interface User {
  firstName?: string;
  lastName?: string;
}

interface FormValidation {
  isValid: boolean;
  user: User;
}

const UpdateProfile = (props: Props) => {
  const { dispatch } = useContext(AppCtx);
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [profile, setProfile] = useState<Profile | null | undefined>(props.profile);

  useEffect(() => {
    setProfile(props.profile);
  }, [props.profile]);

  async function updateProfile(user: UserFullName) {
    try {
      setIsSending(true);
      await API.updateUserProfile(user);
      dispatch(updateUser(user));

      setIsSending(false);
    } catch (err) {
      setIsSending(false);
      if (err.statusText !== 'ErrLoginRedirect') {
        alertDispatcher.postAlert({
          type: 'danger',
          message: 'An error occurred updating your profile, please try again later',
        });
      } else {
        props.onAuthError();
      }
    }
  }

  const submitForm = () => {
    setIsSending(true);
    if (form.current) {
      const { isValid, user } = validateForm(form.current);
      if (isValid) {
        updateProfile(user);
      } else {
        setIsSending(false);
      }
    }
  };

  const validateForm = (form: HTMLFormElement): FormValidation => {
    let user: User = {};
    const isValid = form.checkValidity();

    if (isValid) {
      const formData = new FormData(form);
      if (formData.get('firstName') !== '') {
        user['firstName'] = formData.get('firstName') as string;
      }

      if (formData.get('lastName') !== '') {
        user['lastName'] = formData.get('lastName') as string;
      }
    }

    setIsValidated(true);
    return { isValid, user };
  };

  return (
    <form
      data-testid="updateProfileForm"
      ref={form}
      className={classnames('w-100', { 'needs-validation': !isValidated }, { 'was-validated': isValidated })}
      autoComplete="on"
      noValidate
    >
      <InputField
        type="text"
        label="Username"
        name="alias"
        value={!isUndefined(profile) && !isNull(profile) ? profile.alias : ''}
        readOnly
      />

      <InputField
        type="email"
        label="Email address"
        name="email"
        value={!isUndefined(profile) && !isNull(profile) ? profile.email : ''}
        readOnly
      />

      <InputField
        type="text"
        label="First Name"
        name="firstName"
        autoComplete="given-name"
        value={!isUndefined(profile) && !isNull(profile) ? profile.firstName : ''}
      />

      <InputField
        type="text"
        label="Last Name"
        name="lastName"
        autoComplete="family-name"
        value={!isUndefined(profile) && !isNull(profile) ? profile.lastName : ''}
      />

      <div className="text-right mt-4">
        <button
          className="btn btn-secondary"
          type="button"
          disabled={isSending}
          onClick={submitForm}
          data-testid="updateProfileBtn"
        >
          {isSending ? (
            <>
              <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
              <span className="ml-2">Updating profile</span>
            </>
          ) : (
            <>Update</>
          )}
        </button>
      </div>
    </form>
  );
};

export default UpdateProfile;