// tslint:disable:no-console

class Logger {
  // tslint:disable-next-line:no-any
  public log = (msg: string, ...params: any[]): void => {
    console.log(msg, ...params)
  }

  // tslint:disable-next-line:no-any
  public warn = (msg: string, ...params: any[]): void => {
    console.warn(msg, ...params)
  }

  // tslint:disable-next-line:no-any
  public info = (msg: string, ...params: any[]): void => {
    console.info(msg, ...params)
  }

  // tslint:disable-next-line:no-any
  public error = (msg: string, ...params: any[]): void => {
    console.error(msg, ...params)
  }
}

const logger = new Logger()

export default logger
