import AMapLoader from "@amap/amap-jsapi-loader";

export type AMapNamespace = typeof window.AMap;

declare global {
  interface Window {
    AMap: any;
    _AMapSecurityConfig?: {
      securityJsCode?: string;
    };
  }
}

export const getAmapConfig = () => {
  const key = import.meta.env.VITE_AMAP_JS_KEY as string | undefined;
  const securityCode = import.meta.env.VITE_AMAP_SECURITY_CODE as string | undefined;
  return {
    key: key?.trim() ?? "",
    securityCode: securityCode?.trim() ?? "",
    ready: Boolean(key?.trim() && securityCode?.trim())
  };
};

export const loadAmap = async () => {
  const config = getAmapConfig();
  if (!config.ready) {
    throw new Error("高德地图 Key 或安全密钥未配置");
  }

  window._AMapSecurityConfig = {
    securityJsCode: config.securityCode
  };

  return AMapLoader.load({
    key: config.key,
    version: "2.0",
    plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.Walking", "AMap.Transfer", "AMap.Driving", "AMap.Geocoder"]
  });
};
