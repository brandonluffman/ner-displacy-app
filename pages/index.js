import Head from 'next/head'
import { useState } from 'react';
import axios from 'axios';

async function postData(text) {
  const apiUrl = 'https://ner-model.herokuapp.com/model';
  // const apiUrl = 'http://127.0.0.1:8000/model';

  const requestBody = { text };
  
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(apiUrl, requestBody, { headers });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    return null;
  }
}

function generateHighlightedText(entities, sentence) {
  let result = [];
  let currentIndex = 0;

  entities && entities.forEach((entity) => {
    const { start, end, label } = entity;
    const prefix = sentence.substring(currentIndex, start);
    const highlighted = sentence.substring(start, end + 1 );

    result.push(<span>{prefix}</span>);
    result.push(
      <div  className={label === 'BRAND' ? 'brand-highlight' : label === 'ENTITY' ? 'entity-highlight' :  label === 'ORG' ? 'org-highlight' : label === 'GPE' ? 'gpe-highlight' : label === 'PERSON' ? 'person-highlight' : label === 'NORP' ? 'norp-highlight' : label === 'TIME' ? 'time-highlight' : label === 'DATE' ? 'date-highlight' :   'product-highlight'}>
      <span className='entity-text'>
      {highlighted}
      </span>
      <p className='label'>{label}</p>
      </div>
    );

    currentIndex = end + 1;
  });

  if (currentIndex < sentence.length) {
    result.push(<span>{sentence.substring(currentIndex)}</span>);
  }

  return result;
}

export default function Home(data) {
  const [inputText, setInputText] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await postData(inputText);
    setResponseData(data);
  };

  return (
    <div className='home-container'>
      <form className='home-form' onSubmit={handleSubmit}>
        <div className='what'>
        <div>
        <textarea
          type="text"
          value={inputText}
          className='text-input'
          onChange={(e) => setInputText(e.target.value)}
        />
        </div>
        <div>
        <button className='home-submit-btn' type="submit">Analyze Text</button>
        </div>
        </div>
      </form>
        {/* <fieldset>
        <legend>Please select one of the following</legend>
        <input type="radio" name="action" id="track" value="track" /><label for="track">ENTITY</label><br />
        <input type="radio" name="action" id="event" value="event"  /><label for="event">PRODUCT</label><br />
        <input type="radio" name="action" id="message" value="message" /><label for="message">BRAND</label><br />
      </fieldset> */}
      {responseData && responseData.length > 0 && (
        <div className='response-container' key={responseData[0]}>
          <p className='response-sentence'>
            {generateHighlightedText(responseData[0], responseData[1])}
          </p>
        </div>
      )}
    </div>
  );
}
