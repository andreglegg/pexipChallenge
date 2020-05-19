const TYPE = 'changeTab';

const onChangeTab = (tab: '1' | '2') => ({
    type: TYPE,
    payload: {
        tab,
    },
});

onChangeTab.TYPE = TYPE;

export default onChangeTab;
