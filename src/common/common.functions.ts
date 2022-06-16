

const DATE = new Date();

export const setDateTime = () => {
    return DATE.toLocaleDateString()+' - '+DATE.toLocaleTimeString();
}

