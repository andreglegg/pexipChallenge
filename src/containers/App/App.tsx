import React from 'react';

import RenderTabs from "../Tabs";
import useWebsocket from '../../hooks/useWebsocket';
import config from '../../config';

const App = () => {
    const { send, readyState, message } = useWebsocket(config.wsUrl);
    return <RenderTabs send={send} readyState={readyState} message={message} />
}

export default App;
