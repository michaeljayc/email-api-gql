import { MessageResponseFormat } from "./message.pagination";

export const RECIPIENT_MENU = ["inbox","starred","important"];
export const SENDER_MENU = ["sent","draft"]
export const MESSAGE_MENUS = RECIPIENT_MENU.concat(SENDER_MENU);


export const formatMessageResponse = async (message?: string, data?: any, success?: boolean) 
    : Promise<MessageResponseFormat | any> => {

        let datas = data ?? [];

        return {
            datas,
            success: success ?? false,
            message: message ?? "Failed"
        }
}