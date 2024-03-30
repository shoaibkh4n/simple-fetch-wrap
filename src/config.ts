type Config = {
  token: string;
  baseurl: string;
  globalHeaders?: HeadersInit;
};

let config: Config = {
  token: "",
  baseurl: "",
  globalHeaders: {},
};

const setConfig = ({ token, baseurl, globalHeaders }: Config): void => {
  config.token = token;
  config.baseurl = baseurl;
  config.globalHeaders = globalHeaders;
};

const getToken = (): string => config.token;

const getBaseUrl = (): string => config.baseurl;

const getGlobalHeaders = (): HeadersInit => config.globalHeaders || {};

export { setConfig, getToken, getBaseUrl, getGlobalHeaders };
