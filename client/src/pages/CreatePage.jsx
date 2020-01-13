import React from 'react';
import { useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const {request} = useHttp();
  const [link, setLink] = useState('');

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async evt => {
    if (evt.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        });
        history.push(`/details/${data.link._id}`);
      } catch(e) {}
    }
  }

  return(
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input 
            placeholder="Enter link" 
            id="link" 
            type="text"
            name="link"
            onChange={evt => setLink(evt.target.value)}
            onKeyPress={pressHandler}
            value={link}
          />
          <label htmlFor="link">Link</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;