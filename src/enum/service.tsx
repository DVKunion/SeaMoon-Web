import {Tag, Space} from "antd";
import {
  SyncOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import IconFont from "@/components/IconFont";
import React from "react";

export type DynamicProps = {
  status: number
  spin: boolean
}

export const ProxyDynamicTagList: React.FC<DynamicProps> = (props) => {
  switch (props.status) {
    case 1:
      return <Tag icon={<ClockCircleOutlined spin={props.spin}/>} color={"processing"}>初始化</Tag>
    case 2:
      return <Tag icon={<SyncOutlined spin={props.spin}/>} color="cyan">运行中</Tag>
    case 3:
      return <Tag icon={<MinusCircleOutlined/>} color="geekblue">已停止</Tag>
    case 4:
      return <Tag icon={<CloseCircleOutlined/>} color="red">服务错误</Tag>
    case 5:
      return <Tag icon={<ExclamationCircleOutlined/>} color="gold">服务异常</Tag>
  }
  return <></>
}

export const ProxyTypeTagColor = {
  "default": "#666666",
  "auto": "#61C8C6",
  "socks5": "#E2003B",
  "http": "#1296DB",
}

export const ProxyTypeIcon = {
  "": <IconFont type={"icon-proxy-default"}/>,
  "auto": <IconFont type={"icon-proxy-auto"}/>,
  "socks5": <IconFont type={"icon-proxy-socks5"}/>,
  "http": <IconFont type={"icon-proxy-http"}/>,
}


export const ProxyTypeValueEnum = {
  "auto": <Space><IconFont type={"icon-proxy-auto"}/>auto</Space>,
  "socks5": <Space><IconFont type={"icon-proxy-socks5"}/>socks5</Space>,
  "http": <Space><IconFont type={"icon-proxy-http"}/>http</Space>,
}
