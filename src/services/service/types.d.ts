declare namespace Service {
  type Proxy = {
    id: number,
    name: string,
    type: string,
    status: number,
    listen_addr: string,
    listen_port: string
    conn: number,
    speed: number,
    lag: number,
    created_at: string,
    updated_at: string,
  }
}
