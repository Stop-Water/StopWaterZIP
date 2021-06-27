import { useEffect, useState } from 'react';
import { w3cwebsocket } from 'websocket';

const useWsData = () => {
  const [wsData, setWsdata] = useState();

  useEffect(() => {
    const client = new w3cwebsocket('ws://192.168.0.114:8098');

    client.onopen = () => {
      console.log('webSocket Client Connected');
    };

    client.onmessage = (message) => {
      setWsdata(JSON.parse(message.data));
    };

    return () => {
      console.log('webSocket Client Closed');
      client.close();
    };
  }, []);

  return wsData;
};

export default useWsData;
