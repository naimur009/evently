"use client"
import EventDetailsPage from '@/app/components/dashboard/allEvents';
import api from '@/app/libs/axios';
import React, { useEffect, useState } from 'react';


const Page = ({ params }) => {

    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { eventID } = await params;
                const response = await api.get(`/sales-report/${eventID}`);
                setEvent(response.data.data);

            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData();
    }, [params]);
    if (event) {
        return (
            <div>
                <EventDetailsPage data={event} />
            </div>
        );
    }
    else {
        <div>Loading........</div>
    }
};

export default Page;