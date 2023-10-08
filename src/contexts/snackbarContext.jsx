import React, { createContext, useState, ReactNode, useEffect } from 'react';

import Snackbar from '../components/Snackbar';

import { SnackbarProps } from 'src/components/Snackbar.types';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

const SnackbarContext = createContext({
  snackbarConfig: { isVisible: false },
  showSnackbar: (config: SnackbarProps) => {
    console.log(config);
  },
  hideSnackbar: () => {},
} as SnackbarContextValue);

export default SnackbarContext;

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbarConfig, setSnackbarConfig] = useState<SnackbarProps>({
    isVisible: false,
    message: '',
    onDismiss: () => {},
  });

  const hideSnackbar = () => {
    setSnackbarConfig((prev) => ({ ...prev, isVisible: false }));
  };

  const showSnackbar = ({ isVisible = true, ...rest }: SnackbarProps) => {
    setSnackbarConfig({ isVisible, ...rest });
  };

  const contextData = {
    snackbarConfig: snackbarConfig,
    showSnackbar,
    hideSnackbar,
  };

  useEffect(() => {
    console.log('new: ', snackbarConfig);
  }, [snackbarConfig]);

  return (
    <SnackbarContext.Provider value={contextData}>
      <View style={styles.container}>
        <Snackbar {...snackbarConfig} onDismiss={hideSnackbar} />
        {children}
      </View>
    </SnackbarContext.Provider>
  );
};

export interface SnackbarContextValue {
  snackbarConfig: SnackbarProps;
  showSnackbar: (config: SnackbarProps) => void;
  hideSnackbar: () => void;
}

const styles = StyleSheet.create({
  container: { height: '100%', position: 'relative', zIndex: 1 },
});
