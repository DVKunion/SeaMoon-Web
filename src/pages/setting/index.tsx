import React, {useState} from "react";
import {PageContainer, ProCard, ProForm, ProFormText, ProFormSwitch} from "@ant-design/pro-components";
import {Button, message, Space, Tag} from "antd"
import {getSysConfig, updateSysConfig} from "@/services/setting/api";
import {GithubOutlined} from "@ant-design/icons";
import {updatePasswd} from "@/services/user/api";

const Setting: React.FC = () => {

  const [config, setConfig] = useState([])
  const [version, setVersion] = useState("")

  return <PageContainer
    title={<Space>系统配置 <Tag icon={<GithubOutlined/>} color="#76b39d">{version}</Tag></Space>}
  >
    <ProCard>
      <ProForm
        submitter={false}
        onFinish={async (values) => {
          if (values["admin_password"] !== "" && values["admin_password"] != undefined) {
            console.log(values["admin_password"])
            const res = await updatePasswd(values["admin_password"]);
            if (res.success) {
              message.success('修改密码成功', 1);
            } else {
              message.error(res.code + ":" + res.msg, 1)
            }
          }
          config.forEach((item: Config.SystemConfig) => {
            if (item.Value !== values[item.Key]) {
              updateSysConfig({
                ID: item.ID,
                Key: item.Key,
                Value: values[item.Key].toString(),
              })
            }
          });
        }}
        params={{}}
        request={async () => {
          const res = {};
          const {data} = await getSysConfig();
          // @ts-ignore
          setConfig(data)
          data.forEach((item: Config.SystemConfig) => {
            // 特殊处理
            if (item.Key.indexOf("enable") != -1) {
              res[item.Key] = item.Value === "true"
            } else {
              res[item.Key] = item.Value
            }
          })
          setVersion(res["version"])
          return res;
        }}
      >
        <ProForm.Group title={"HTTP 管理服务"}>
          <ProFormText
            name="control_addr"
            label="监听地址"
            tooltip={"如果你是通过 docker 启动的, 请不要修改此配置，否则可能会造成服务无法访问"}
            width={"md"}
            placeholder={"e.g.: 0.0.0.0"}
          />
          <ProFormText
            name="control_port"
            label="监听端口"
            tooltip={"如果你是通过 docker 启动的, 修改管理端口后，docker的端口映射也需要一起改变"}
            width={"md"}
            placeholder={"e.g.: 7777"}
          />
          <ProFormText
            name="control_log"
            label="服务日志"
            width={"lg"}
            placeholder={"e.g.: .seamoon.log"}
          />
        </ProForm.Group>
        <ProForm.Group title={"账户认证"}>
          <ProFormText.Password
            name="admin_password"
            label="管理密码"
            tooltip={"修改管理后台的登陆密码"}
            width={"md"}
            placeholder={""}
          />
        </ProForm.Group>
        <ProForm.Group title={"其他配置"}>
          <ProFormSwitch
            name="tor_enable"
            label="是否开启 Tor 网桥"
            tooltip={"开启 Tor 网桥后, 会尝试请求开启了 Tor 标识的服务节点，您的代理服务将可以访问暗网域名"}
            width={"xs"}
            fieldProps={
              {
                checkedChildren: "开启",
                unCheckedChildren: "关闭",
              }
            }
            style={{display: 'flex', alignItems: 'center'}}
          />
        </ProForm.Group>
        <ProForm.Item>
          <Button type="primary" htmlType="submit" style={{float: "right", marginRight: "4em"}}>
            保存
          </Button>
        </ProForm.Item>
      </ProForm>
    </ProCard>
  </PageContainer>
}

export default Setting