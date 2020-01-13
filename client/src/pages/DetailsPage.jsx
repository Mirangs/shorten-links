import React, { useCallback, useContext, useEffect } from 'react';
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import LinkCard from '../components/LinkCard';

const DetailsPage = () => {
  const {token} = useContext(AuthContext);
  const [link, setLink] = useState(null);
  const linkId = useParams().id;
  const { request, loading } = useHttp();
  

  const getLink = useCallback(async () => {
    

    try {
      const fetched = await request(`/api/link/details/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      setLink(fetched);
    } catch(e) {
      console.log(e)
    }
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />
  }

  return(
    <>
      { !loading && link && <LinkCard link={link} /> }
    </>
  );
};

export default DetailsPage;