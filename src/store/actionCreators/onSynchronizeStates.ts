const TYPE = 'onSynchronizeStates';

const onSynchronizeStates = (data: any) => ({
    type: TYPE,
    payload: {
        data,
    },
});

onSynchronizeStates.TYPE = TYPE;

export default onSynchronizeStates;
