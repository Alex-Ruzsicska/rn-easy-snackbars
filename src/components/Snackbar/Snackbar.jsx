import React, { useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

// import { SnackbarProps } from '../Snackbar.types';

const Snackbar = ({ isVisible, message, onDismiss = () => {} }) => {
  const translateY = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    console.log("SNACK update");
    if (isVisible) {
      Animated.timing(translateY, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      //   Animated.timing(translateY, {
      //     toValue: 0,
      //     duration: 300,
      //     useNativeDriver: false,
      //   }).start(() => {
      //     onDismiss();
      //   });
    }
  }, [isVisible, translateY, onDismiss]);

  return (
    <View style={[styles.container, !isVisible && styles.hideSnackbar]}>
      <Animated.View
        style={[
          styles.snackbar,
          {
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity onPress={onDismiss}>
          <Text style={styles.dismissButton}>Dismiss</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 80,
    left: 10,
    right: 10,
    alignItems: "center",
    zIndex: 2,
  },
  snackbar: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  message: {
    color: "white",
    flex: 1,
  },
  dismissButton: {
    color: "white",
    marginLeft: 16,
  },
  hideSnackbar: {
    display: "none",
  },
});

export default Snackbar;
