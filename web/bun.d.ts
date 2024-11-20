declare module 'bun' {
  interface Env {
    HOST: string | undefined
    PORT: number | undefined
  }
}
