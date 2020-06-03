import {Tabs} from "../../types/Tabs";

const TYPE = 'changeTab';

const onChangeTab = (tab: Tabs) => ({
    type: TYPE,
    payload: {
        tab,
    },
});

onChangeTab.TYPE = TYPE;

export default onChangeTab;
