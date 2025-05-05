'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

interface Iprops {
  children: ReactNode;
}

const ReduxProvider = ({ children }: Iprops) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{() => <>{children}</>}</PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
