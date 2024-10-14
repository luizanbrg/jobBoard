export const fetchProtectedData = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${process.env.REACT_APP_API_TOKEN}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Unauthorized');
    }

    const data = await response.json();
    console.log('Protected Data:', data);
    return data;
  } catch (error) {
    console.error('Fetch protected data error:', error);
    throw error;
  }
};
