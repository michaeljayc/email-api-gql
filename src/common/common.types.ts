export type TLogs = {
  timestamp: string;
  request: {
    function_name: string;
    params: any;
  };
  response: TResponseFormat;
};

export type TResponseFormat = {
  success: boolean;
  message: string;
  count: number;
  datas?: any;
};
