import {Tag, Space} from "antd";
import {
  SyncOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import IconFont from "@/components/IconFont";

export const ProxyTagList = [
  <Tag icon={<ClockCircleOutlined spin/>} color={"processing"}>初始化</Tag>,
  <Tag icon={<SyncOutlined spin/>} color="cyan">运行中</Tag>,
  <Tag icon={<MinusCircleOutlined/>} color="geekblue">已停止</Tag>,
  <Tag icon={<CloseCircleOutlined/>} color="red">服务错误</Tag>,
  <Tag icon={<ExclamationCircleOutlined/>} color="gold">服务异常</Tag>,
]

export const ProxyTypeTagColor = {
  "default":"#666666",
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
