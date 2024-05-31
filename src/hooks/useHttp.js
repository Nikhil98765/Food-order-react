
import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const responseData = response.json();

  if (!response.ok) {
    throw new Error(
      responseData.message || "Something went wrong, failed to send request"
    );
  }
  return responseData;
}


export const useHttp = (url, config, initialValue) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialValue);

  const sendRequest = useCallback(async function sendRequest(data) {
    setIsLoading(true);
    try {
      const resData = await sendHttpRequest(url, { ...config, body: data });
      setData(resData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [url, config]);

  function resetData() {
    setData(initialValue);
  }


  useEffect(() => {
    if (config && (config.method === 'GET' || !config) || !config.method) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    resetData,
  };
}