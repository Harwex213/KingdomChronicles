const generateRandomString = (amount) => (Math.random() + 1).toString(36).substring(amount);

const generateRandomId = () => generateRandomString(7);

export { generateRandomId };
