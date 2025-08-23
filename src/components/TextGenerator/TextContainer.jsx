import React, { useState } from 'react'
import ContentPanel from '../ContentPanel'
import axios from 'axios';

export default function TextContainer() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const [generatedResponseStack, setgeneratedResponseStack] = useState([]);
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
        promptRef.current.value = '';
        try {
            const response = await axios.post(`${serverEndpoint}/text-generator/gen-text`, { prompt, model });
            setgeneratedResponseStack([...generatedResponseStack, { 'question': prompt, 'answer': response.data.items.content }]);
        } catch (err) {
            setError(`Failed to generate response. Please try again, ${err}`);
        } finally {
            setLoading(false);
        }
    }
    return (
        <ContentPanel formHandler={formSubmitHandler} height='100vh' width='50%' bottom='90%' placeholder='Type your query here...' loading={loading}>
            <div className='generated-text' style={{}}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {generatedResponseStack.length ?
                    generatedResponseStack.map(ele => <div className='response-section'>
                        <p style={{ fontWeight: '500', color: 'white' }}>{ele.question}</p>
                        <p style={{ color: 'white' }}>{ele.answer}</p>
                    </div>
                    )
                    :
                    (!error && <span className='fallback-text'>Response will be generated here !!</span>)
                }

            </div>
        </ContentPanel>
    )
}
