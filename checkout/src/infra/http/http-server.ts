export interface HttpServer {
  listen (port: number, callback?: Function): void
  on (method: string, url: string, callback: Function): void
}