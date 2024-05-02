export const useFireStoreError = (error: any) => {
  Notify.create({
    type: 'negative',
    message: ErrorMessages.getErrorMessage(error.code)
  });
};
