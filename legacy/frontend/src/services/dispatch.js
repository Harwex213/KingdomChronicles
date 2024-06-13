export const dispatch = (service) => {
    return async (actionName, ...payload) => {
        const action = service.transitions[service.state.current][actionName];

        if (action) {
            return await action(...payload);
        }
    };
};
