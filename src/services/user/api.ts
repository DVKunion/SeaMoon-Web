import request from '../request/request'

export async function login(body: Auth.User, options?: { [key: string]: any }) {
  return request<Auth.Response>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updatePasswd(passwd: string) {
  return request<Auth.Response>('/api/user/passwd', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token") || "",
    },
    data: {
      "Username": localStorage.getItem("user"),
      "Password": passwd,
    },
  });
}
