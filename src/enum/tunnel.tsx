import {Space} from "antd";
import IconFont from "@/components/IconFont";
import {Tag} from "antd";
import {
  ClockCircleOutlined,
  CloseCircleOutlined, ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined
} from "@ant-design/icons";

export const TunnelTypeValueEnum = {
  "websocket": <Space><IconFont type={"icon-web-socket"}/>WebSockets</Space>,
  "grpc": <Space><IconFont type={"icon-gRPC-red-copy"}/>GRPC</Space>,
}

export const TunnelTypeIcon = {
  "unknown": <IconFont type={"icon-svc_node"}/>,
  "websocket": <IconFont type={"icon-web-socket"}/>,
  "grpc": <IconFont type={"icon-gRPC-red-copy"}/>
}

export const TunnelStatusEnum = {
  1: {
    text: '创建中',
    status: 'processing',
  },
  2: {
    text: '正常运行',
    status: 'success',
  },
  3: {
    text: '已停用',
    status: 'default',
  },
  4: {
    text: '错误',
    status: 'error',
  },
  5: {
    text: '异常',
    status: 'warning',
  },
}


export const TunnelStatusTag = [
  <></>,
  <Tag icon={<ClockCircleOutlined spin/>} color={"processing"}>创建中</Tag>,
  <Tag icon={<SyncOutlined spin/>} color="cyan">正常运行</Tag>,
  <Tag icon={<MinusCircleOutlined/>} color="geekblue">停用</Tag>,
  <Tag icon={<CloseCircleOutlined/>} color="red">错误</Tag>,
  <Tag icon={<ExclamationCircleOutlined/>} color="gold">异常</Tag>,
]

export const TunnelAuthFCTypeEnum  = {
  1: '无认证',
  5: '签名认证',
  6: 'jwt'
}
