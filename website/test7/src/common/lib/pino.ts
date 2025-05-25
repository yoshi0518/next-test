import pino from 'pino';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Options = Record<string, any>;

export const Logger = class {
  #logger: pino.Logger;

  constructor(file: string) {
    this.#logger = pino({
      level: !!process.env.DEBUG ? 'debug' : 'info',
      timestamp: pino.stdTimeFunctions.isoTime,
      formatters: {
        level: (label: string) => ({ level: label }),
      },
      browser: {
        asObject: true,
        serialize: true,
      },
    }).child({ file });
  }

  info = (message: string, options?: Options) => {
    this.#logger.info(options, message);
  };

  error = (message: string, options?: Options) => {
    this.#logger.error(options, message);
  };

  debug = (message: string, options?: Options) => {
    this.#logger.debug(options, message);
  };
};
