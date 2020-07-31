import React, { useContext, useState } from 'react';

import { AppCtx, updateTheme, enableAutomaticTheme } from '../../context/AppCtx';
import styles from './ThemeMode.module.css';
import { FaPalette, FaCaretDown, FaCaretRight } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import { GoBrowser } from 'react-icons/go';

const ThemeMode = () => {
  const { ctx, dispatch } = useContext(AppCtx);
  const [openStatus, setOpenStatus] = useState<boolean>(false);
  const { configured, automatic } = ctx.prefs.theme;

  return (
    <>
      <button className="btn btn-link btn-block px-0 text-reset" onClick={() => setOpenStatus(!openStatus)}>
        <div className="d-flex align-items-center">
          <FaPalette className="mr-2" />
          <div>Theme</div>

          <div className="ml-auto">{openStatus ? <FaCaretDown /> : <FaCaretRight />}</div>
        </div>
      </button>

      {openStatus && (
        <>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="theme"
              id="automatic"
              value="automatic"
              checked={automatic}
              onChange={() => dispatch(enableAutomaticTheme(true))}
              required
            />
            <label className={`form-check-label font-weight-bold ${styles.label}`} htmlFor="automatic">
              <GoBrowser className="mx-1" />
              Automatic
            </label>
          </div>

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="theme"
              id="light"
              value="light"
              checked={!automatic && configured === 'light'}
              onChange={() => dispatch(updateTheme('light'))}
              required
            />
            <label className={`form-check-label font-weight-bold ${styles.label}`} htmlFor="light">
              <FiSun className="mx-1" /> Light
            </label>
          </div>

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="theme"
              id="dark"
              value="dark"
              checked={!automatic && configured === 'dark'}
              onChange={() => dispatch(updateTheme('dark'))}
              required
            />
            <label className={`form-check-label font-weight-bold ${styles.label}`} htmlFor="dark">
              <FiMoon className="mx-1" /> Dark
            </label>
          </div>
        </>
      )}
    </>
  );
};

export default ThemeMode;
