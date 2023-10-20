import React, {useState} from 'react';
import BottomTabs from './components/BottomTabs';

export default function App(): JSX.Element {
  const [user, setUser] = useState(false);
  return (
    <BottomTabs user={user} />
  );
}
