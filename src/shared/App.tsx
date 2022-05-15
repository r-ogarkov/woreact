import './App.scss';
import { StrictMode, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import routes from './routes';
import { setOverflow } from 'client/helpers/set-overflow';
import emitter from './emitter';
import { TOGGLE_MODAL } from './emitter/constants';
import { Header } from 'shared/layouts/Header/Header';
import type { ModalName } from './components/_common/Modals/Modal';
import { Modal } from './components/_common/Modals/Modal';


interface ModalSettings {
  name?: ModalName;
  isShow: boolean;
  data?: Record<string, any>;
  isNotClose: boolean;
}

export const App = () => {
  const { pathname } = useLocation();

  const [currentPathname, setPathname] = useState(pathname);
  const [modal, setModal] = useState<ModalSettings>({
    isShow: false,
    isNotClose: false
  });

  const toggleModal = ({ name, isShow = false, data, isNotClose = false }: ModalSettings): void => {
    setModal({ name, isShow, data, isNotClose });
    setOverflow(isShow);
  };

  useEffect(() => {
    emitter.addListener(TOGGLE_MODAL, toggleModal);
    if(currentPathname !== pathname) {
      window.scrollTo(0,0);
      setPathname(pathname);
    }
  }, [pathname]);


  return (
    <StrictMode>
      <main>
        <Header/>
        <Routes>
          {routes.map(({ path, exact, component: Component, initialAction }, i) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <Route key={i} {...{ path, exact } } element={<Component { ...{ initialAction } }/>} />
          )}
        </Routes>
      </main>
      { modal.isShow ?
        <Modal { ...{ name: modal.name, data: modal.data, isNotClose: modal.isNotClose } }/> : null }
    </StrictMode>
  )
};

