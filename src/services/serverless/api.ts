import request from "@/services/request/request";
import {FormValueType} from "@/pages/serverless/components/CreateForm";
import {toNumber} from "lodash";

export async function getServerlessTunnel(page: number, size: number) {
  return request<{
    success: boolean;
    data: Serverless.Tunnel[];
  }>('/api/tunnel?page=' + page + '&size=' + size, {
    method: 'GET',
    headers: {
      'Authorization': localStorage.getItem("token") || "",
    },
  });
}

export async function createServerlessTunnel(data: FormValueType) {
  const params = {
    "cloud_provider_id": data.cloud_provider_id,
    "name": data.name,
    "port":data.port?.toString(),
    "type": data.type,
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
  return request<{
    success: boolean;
    data: Serverless.Tunnel[];
  }>('/api/tunnel', {
    method: 'POST',
    data: params,
    headers: {
      'Authorization': localStorage.getItem("token") || "",
    },
  });
}

export async function updateServerlessTunnel(data: FormValueType) {
  return request<{
    success: boolean;
    data: Serverless.Tunnel[];
  }>('/api/tunnel/' + data.id + "/", {
    method: 'PUT',
    data: data,
    headers: {
      'Authorization': localStorage.getItem("token") || "",
    },
  });
}

export async function deleteServerlessTunnel(id: number | undefined) {
  return request<{
    success: boolean;
    data: Serverless.Tunnel[];
  }>('/api/tunnel/' + id + "/", {
    method: 'DELETE',
    headers: {
      'Authorization': localStorage.getItem("token") || "",
    },
  });
}
