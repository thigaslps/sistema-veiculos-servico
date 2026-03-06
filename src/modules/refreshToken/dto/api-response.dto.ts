export class ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  res?: T;

  constructor(status: 'success' | 'error', message: string, res?: T) {
    this.status = status;
    this.message = message;
    if (res) this.res = res;
  }
}