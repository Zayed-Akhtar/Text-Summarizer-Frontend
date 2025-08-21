import React, { useState } from 'react'
import ContentPanel from '../ContentPanel'
import axios from 'axios';

export default function TextContainer() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const [generatedResponse, setgeneratedResponse] = useState('');
    const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;


    const formSubmitHandler = async (e, promptRef, model = 'sonar') => {
        console.log('reached form handler!');

        e.preventDefault();
        const prompt = promptRef.current.value.trim();
        if (!prompt) {
            setError("Please enter a prompt.");
            return;
        }
        setLoading(true);

        try {
            const response = await axios.post(`${serverEndpoint}/text-generator/gen-text`, { prompt, model });
            setgeneratedResponse(response.data.items.content);
        } catch (err) {
            setError(`Failed to generate response. Please try again, ${err}`);
        } finally {
            setLoading(false);
        }
    }
    return (
        <ContentPanel formHandler={formSubmitHandler} height='68%' width='50%' bottom='85%' placeholder='Type your query here...' loading={loading}>
            <div className='generated-text' style={{ overflowY: "scroll", height: '100%', margin: '2%' }}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {generatedResponse.length ? <p style={{ color: 'white' }}>{generatedResponse}</p> : <span className='fallback-text'>Response will be generated here !!</span>}
            </div>
        </ContentPanel>
    )
}
