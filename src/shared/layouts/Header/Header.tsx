import type { FunctionComponent } from 'react';
import style from './Header.scss';
import { NavLink, Link } from 'react-router-dom';
import emitter from '../../emitter';
import { TOGGLE_MODAL } from '../../emitter/constants';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

export const Header: FunctionComponent = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
  }

  return (
    <header>
      <div className={cx('container', style.container)}>
        <div className={style.wrapper}>
          <div className={style.logoContainer}>
            <Link to="/">Woreact<small>JS</small></Link>
          </div>
          <ul className={style.changeLanguage}>
            <li>
              <span onClick={() => changeLanguage('ru')}>ru</span>
            </li>
            <li>
              <span onClick={() => changeLanguage('en')}>en</span>
            </li>
          </ul>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/products" className={({ isActive }) => isActive ? style.active : null}>{t('products')}</NavLink>
            </li>
            <li>
              <span onClick={() => emitter.emit(TOGGLE_MODAL, { name: 'About', isShow: true })}>{t('about')}</span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
