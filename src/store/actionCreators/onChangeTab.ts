const TYPE = 'changeTab';

const onChangeTab = (tab: string) => ({
    type: TYPE,
    payload: {
        tab,
    },
});

onChangeTab.TYPE = TYPE;

export default onChangeTab;
