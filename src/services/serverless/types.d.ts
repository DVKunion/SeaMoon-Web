declare namespace Serverless {
  type Tunnel = {
    cloud_provider_id: number,
    cloud_provider_type: number,
    cloud_provider_region: string,
    id: number,
    created_at: string,
    updated_at: string,
    name: string,
    address: string,
    port: string,
    type: string,
    status: number,
    tunnel_config: {
      cpu: number,
      memory: number,
      instance: number,
      tunnel_auth_type: number,
      tls: false,
      tor: false
    }
  }
}
