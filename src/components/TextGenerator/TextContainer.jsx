import React, { useEffect, useState } from 'react'
import ContentPanel from '../ContentPanel'
import axios from 'axios';
import RecentQueries from './RecentQueries';
import Queries from './Queries';

export default function TextContainer() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const [generatedResponseStack, setgeneratedResponseStack] = useState([]);
    const [queryStack, setQueryStack] = useState([]);
    const [seeRecentQueries, setSeeRecentQueries] = useState(false);
    const [stackId, setStackId] = useState('');
    const [querySaved, setQuerySaved] = useState(true);
    const [model, setModel] = useState('sonar');
    const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;
        
    useEffect(() => {
        axios.get(`${serverEndpoint}/text-generator/get-recentqueries-stack`)
            .then((res) => {
                if (res.data.success) {
                    setQueryStack(res.data.items);
                }
                else {
                    console.log(res.data.message)
                }
            })
            .catch(err => console.log('error occured while fetching stack'))
    }, []);

    const continueQueryHandler = (stack) => {
        setgeneratedResponseStack(stack.queries);
        setSeeRecentQueries(false);
        setStackId(stack._id);
    }
    const navigatorHandler = (e) => {
        e.preventDefault();
        setSeeRecentQueries(false);
        setgeneratedResponseStack([]);
        setStackId('');
    }
    const formSubmitHandler = async (e, promptRef) => {
        e.preventDefault();
        const prompt = promptRef.current.value.trim();
        if (!prompt) {
            setError("Please enter a prompt.");
            return;
        }
        setLoading(true);
        promptRef.current.value = '';
        try {
            const response = await axios.post(`${serverEndpoint}/text-generator/gen-text`, { prompt, model, messages: generatedResponseStack });
            setgeneratedResponseStack([...generatedResponseStack, { 'question': prompt, 'answer': response.data.items.content }]);
            setQuerySaved(false);
        } catch (err) {
            setError(`Failed to generate response. Please try again, ${err}`);
        } finally {
            setLoading(false);
        }
    }
    return (
        !seeRecentQueries ?
            <ContentPanel formHandler={formSubmitHandler} height='100vh' width='50%' bottom='90%' placeholder='Type your query here...' loading={loading}>
                <Queries error={error} modelSetter={setModel} generatedResponseStack={generatedResponseStack} navigatorHandler={() => setSeeRecentQueries(true)} initialStackId={stackId} querySaved={querySaved} saveQuerySetter={setQuerySaved} queryStackSetter={setQueryStack} newQueryHandler={navigatorHandler}/>
            </ContentPanel>
            :
            <RecentQueries queryStack={queryStack} navigatorHandler={navigatorHandler} continueQueryHandler={continueQueryHandler} />
    )
}
