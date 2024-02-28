import request from "@/services/request/request";
import {FormValueType} from "@/pages/service/components/CreateForm";

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
  return request<{
    success: boolean;
    msg?: string;
    code?: number;
    data: Service.Proxy[];
  }>('/api/proxy', {
    method: 'POST',
    data: data,
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
