import {Space} from "antd";
import IconFont from "@/components/IconFont";

export const CloudProvideTypeIcon = [
  <></>,
  <IconFont type={"icon-aliyun"}/>,
  <IconFont type={"icon-tengxunyun1"}/>,
  <IconFont type={"icon-huaweiyun1"}/>,
  <IconFont type={"icon-baiduyun"}/>,
  <IconFont type={"icon-sealos"}/>
]

export const CloudProvideTypeValueEnum = {
  1: <Space><IconFont type={"icon-aliyun"}/>阿里云</Space>,
  2: <Space><IconFont type={"icon-tengxunyun1"}/>腾讯云</Space>,
  3: <Space><IconFont type={"icon-huaweiyun1"}/>华为云</Space>,
  4: <Space><IconFont type={"icon-baiduyun"}/>百度云</Space>,
  5: <Space><IconFont type={"icon-sealos"}/>Sealos</Space>,
}


export const CloudProvideTypeEnum = {
  1: {
    text: <Space><IconFont type={"icon-aliyun"}/>阿里云</Space>,
  },
  2: {
    text: <Space><IconFont type={"icon-tengxunyun1"}/>腾讯云</Space>,
  },
  3: {
    text: <Space><IconFont type={"icon-huaweiyun1"}/>华为云</Space>,
  },
  4: {
    text: <Space><IconFont type={"icon-baiduyun"}/>百度云</Space>,
  },
  5: {
    text: <Space><IconFont type={"icon-sealos"}/>Sealos</Space>,
  },
}

export const CloudProviderStatusEnum = {
  1: {
    text: '初始化',
    status: 'processing',
  },
  2: {
    text: '正常',
    status: 'success',
  },
  3: {
    text: '已停用',
    status: 'default',
  },
  4: {
    text: '已禁用',
    status: 'warning',
  },
  5: {
    text: '认证失败',
    status: 'error',
  },
  6: {
    text: '同步失败',
    status: 'error',
  }
}

export const SealosRegionEnum = {

  // for sealos
  "internal": "国内区",
  "external": "国外区"
}

export const ALiYunRegionEnum = {
  // 阿里云
  "cn-hangzhou": "华东1(杭州)",
  "cn-shanghai": "华东2(上海)",
  "cn-qingdao": "华北1(青岛)",
  "cn-beijing": "华北2(北京)",
  "cn-zhangjiakou": "华北3(张家口)",
  "cn-huhehaote": "华北5(呼和浩特)",
  "cn-shenzhen": "华南1(深圳)",
  "cn-chengdu": "西南1(成都)",
  "cn-hongkong": "中国香港",
  "ap-northeast-1": "日本(东京)",
  "ap-northeast-2": "韩国(首尔)",
  "ap-southeast-1": "新加坡(新加坡)",
  "ap-southeast-2": "澳大利亚(悉尼)",
  "ap-southeast-3": "马来西亚(吉隆坡)",
  "ap-southeast-5": "印尼(雅加达)",
  "ap-southeast-7": "泰国(曼谷)",
  "ap-south-1": "印度(孟买)",
  "eu-central-1": "德国(法兰克福)",
  "eu-west-1": "英国(伦敦)",
  "us-west-1": "美国(硅谷)",
  "us-east-1": "美国(弗吉尼亚)",
}

export const RegionEnum = {
  ...SealosRegionEnum,
  ...ALiYunRegionEnum,
}