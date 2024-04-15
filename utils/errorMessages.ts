import ERROR_CODE_JSON from './data/errorCode.json';
export class ErrorMessages {
  static getErrorMessage(code: string) {
    return ERROR_CODE_JSON[code] || `관리자에게 문의해주세요. ${code}`;
  }
}
