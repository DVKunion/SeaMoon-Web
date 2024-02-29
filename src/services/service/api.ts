import request from "@/services/request";
import {FormValueType} from "@/pages/service/components/CreateForm";
import {toNumber} from "lodash";

export async function getServiceProxy(page: number, size: number) {
  return request<{
    success: boolean;
    data: Service.Proxy[];
  }>('/api/proxy?page=' + page + '&size=' + size, {
    method: 'GET',
    headers: {
      'Authorization': localStorage.getItem("token") || "",
    },
  });
}

export async function createServiceProxy(data: FormValueType) {
  const params = {
    "name": data.name,
    "type": data.type,
    "listen_address": data.listen_address,
    "listen_port": data.listen_port,
    "status": data.status,
  }
  // 说明是 tunnel 关联
  if (data.tunnel_id !== undefined && data.tunnel_id !== 0) {
    params["tunnel_id"] = data.tunnel_id;
  }
  // 说明是 provider 关联
  if (data.cloud_provider_id !== undefined && data.cloud_provider_id !== 0) {
    params["tunnel_id"] = 0
    params["tunnel_create_api"] = {
      "cloud_provider_id": data.cloud_provider_id,
      "port": data.port.toString(),
      "name": data.tunnel_name,
      "type": data.tunnel_type,
      "status": 1,
      "tunnel_config": {
        "cpu": toNumber(data.cpu),
        "memory": toNumber(data.memory),
        "instance": toNumber(data.instance),
        "tunnel_auth_type": data.tunnel_auth_type,
        "tls": data.tls,
        "tor": data.tor,
      }
    }
  }

  return request<{
    success: boolean;
    msg?: string;
    code?: number;
    data: Service.Proxy[];
  }>('/api/proxy', {
    method: 'POST',
    data: params,
    headers: {
      'Authorization': localStorage.getItem("token") || "",
    },
  });
}

export async function updateServiceProxy(data: FormValueType) {
  return request<{
    success: boolean;
    msg?: string;
    code?: number;
    data: Service.Proxy[];
  }>('/api/proxy/' + data.id + '/', {
    method: 'PUT',
    data: data,
    headers: {
      'Authorization': localStorage.getItem("token") || "",
    },
  });
}

export async function deleteServiceProxy(data: FormValueType) {
  return request<{
    success: boolean;
    msg?: string;
    code?: number;
    data: Service.Proxy[];
  }>('/api/proxy/' + data.id + '/', {
    method: 'DELETE',
    headers: {
      'Authorization': localStorage.getItem("token") || "",
    },
  });
}
