export const generateRandomString = (amount) => (Math.random() + 1).toString(36).substring(amount);

export const generateRandomId = () => generateRandomString(7);
