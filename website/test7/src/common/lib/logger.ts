/* eslint-disable */
import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns';

export const Logger = class {
  #debug: boolean = false;

  constructor(debug: boolean = false) {
    this.#debug = debug;
  }

  private log = (logLevel: 'debug' | 'info' | 'error', message: string, ...data: any[]) => {
    if (!this.#debug && logLevel === 'debug') return;

    const currentDt = format(new TZDate(new Date(), 'Asia/Tokyo'), 'yy/MM/dd HH:mm:ss');
    switch (logLevel) {
      case 'debug':
        console.info(`[Debug] ${currentDt}  ${message}`);
        console.info(...data);
        break;
      case 'info':
        console.info(`[Info] ${currentDt}  ${message}`);
        console.info(...data);
        break;
      case 'error':
        console.error(`[Error] ${currentDt}  ${message}`);
        console.error(...data);
        break;
    }
  };

  debug = (message: string, ...data: any[]) => this.log('debug', message, ...data);
  info = (message: string, ...data: any[]) => this.log('info', message, ...data);
  error = (message: string, ...data: any[]) => this.log('error', message, ...data);
};
