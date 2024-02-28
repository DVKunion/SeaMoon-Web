import request from '../request/request'
import {message} from "antd";

/** 获取 SysConfig 列表 GET /api/config */
export async function getSysConfig() {
  return request<{
    data: Config.SystemConfig[];
  }>('/api/config', {
    headers: {
      'Authorization': localStorage.getItem("token") || "",
    },
    method: 'GET',
  });
}

/** 更新 SysConfig */
export async function updateSysConfig(data: Config.SystemConfig) {
  return request<{
    code?: string;
    msg?: string;
    success: boolean;
    data: Config.SystemConfig;
  }>('/api/config/' + data.ID + "/", {
    method: 'PUT',
    headers: {
      'Authorization': localStorage.getItem("token") || "",
    },
    data: {
      value: data.Value
    },
  }).then(
    ({code, success, msg}) => {
      if (success) {
        message.success("保存成功");
      } else {
        message.error(code + ":" + msg)
      }
    }
  );
}
