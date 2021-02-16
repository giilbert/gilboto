import Axios from 'axios';
import { useEffect, useState } from 'react';

const endpoint = 'http://localhost:3000/api/messages';
const updateInterval = 5e3;

interface ApiResponseData {
  messages: number;
}

export default function Home() {
  const [data, setData] = useState<ApiResponseData>();
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    updateData(setData, setLastUpdated);

    const handle = setInterval(() => {
      updateData(setData, setLastUpdated);
    }, updateInterval);

    return () => clearInterval(handle);
  }, []);

  return (
    <main>
      <h1>Gilboto Stats</h1>
      <p>
        Last updated{' '}
        {lastUpdated.toLocaleTimeString('en-us', {
          hour12: true,
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        })}
      </p>
      <article>
        <p>
          <strong>{data?.messages || '--'}</strong> messages sent
        </p>
      </article>
    </main>
  );
}

const updateData = (setData, setLastUpdated) => {
  Axios.get(endpoint).then((v) => {
    setData(v.data);
    setLastUpdated(new Date());
  });
};
