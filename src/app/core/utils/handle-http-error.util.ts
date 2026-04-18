import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '@shared/toast/services/toast.service';

interface ErrorMessages {
  [statusCode: number]: string;

  default: string;
}

export const handleHttpError = (
  toastService: ToastService,
  err: HttpErrorResponse,
  operationName: string,
  messages: ErrorMessages,
): void => {
  const description = messages[err.status] ?? messages['default'];

  const message = {
    title: operationName,
    description,
  };
  toastService.error(message);
};
