const getAccessToken = () => localStorage.getItem('accessToken') || '';
const setAccessToken = (accessToken: string) => localStorage.setItem('accessToken', accessToken);

export { getAccessToken, setAccessToken };
