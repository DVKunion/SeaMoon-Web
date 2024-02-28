import {FormValueType} from "./components/CreateForm";
import {message} from "antd";
import {createServerlessTunnel, deleteServerlessTunnel} from "@/services/serverless/api";

export const handleCreateTunnel = async (fields: FormValueType) => {
  const hide = message.loading('创建中......', 30);
  try {
    const {success} = await createServerlessTunnel(fields);
    hide();
    if (success) {
      message.success('创建成功');
      return true;
    }
  } catch (error) {
    hide();
  }
  return false;
};

export const handleDeleteTunnel = async (fields: number | undefined) => {
  const hide = message.loading('删除中......');
  if (fields === undefined) {
    hide();
    message.error("数据错误:不存在的数据记录")
    return false;
  }
  try {
    const {success} = await deleteServerlessTunnel(fields);
    hide();
    if (success) {
      message.success('删除成功');
      return true;
    }
  } catch (error) {
    hide();
  }
  return false;
}
