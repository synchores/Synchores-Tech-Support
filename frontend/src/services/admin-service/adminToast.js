import { sileo } from "sileo";

const DEFAULT_ERROR_DESCRIPTION = "Please try again.";

export function extractErrorMessage(error, fallback = DEFAULT_ERROR_DESCRIPTION) {
  return (
    error?.graphQLErrors?.[0]?.message ||
    error?.message ||
    fallback
  );
}

export function toastSuccess(title, description) {
  sileo.success({ title, description });
}

export function toastInfo(title, description) {
  sileo.info({ title, description });
}

export function toastError(error, title = "Action failed", description = DEFAULT_ERROR_DESCRIPTION) {
  sileo.error({
    title,
    description: extractErrorMessage(error, description),
  });
}

export function confirmActionToast({
  title,
  description,
  confirmLabel = "Confirm",
  successTitle,
  successDescription,
  errorTitle = "Action failed",
  errorDescription = DEFAULT_ERROR_DESCRIPTION,
  onConfirm,
}) {
  sileo.action({
    title,
    description,
    button: {
      title: confirmLabel,
      onClick: async () => {
        try {
          await onConfirm();
          if (successTitle) {
            toastSuccess(successTitle, successDescription);
          }
        } catch (error) {
          toastError(error, errorTitle, errorDescription);
        }
      },
    },
  });
}
