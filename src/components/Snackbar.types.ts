export interface SnackbarProps {
  isVisible?: boolean;
  message: string;
  onDismiss?: () => void;
}
