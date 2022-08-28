import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

    useEffect(() => {
        const fetchData = () => {
          navigate('mainPage/getAllPlayers');
        }
        fetchData();
      }, [navigate])
  return (
    <div className='border border-blue-500'></div>
  )
}

export default HomePage;