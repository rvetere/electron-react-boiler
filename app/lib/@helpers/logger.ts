// tslint:disable:no-console

class Logger {
  public log = (msg: string): void => {
    console.log(msg)
  }

  public warn = (msg: string): void => {
    console.warn(msg)
  }

  public info = (msg: string): void => {
    console.info(msg)
  }

  public error = (msg: string): void => {
    console.error(msg)
  }
}

const logger = new Logger()

export default logger
