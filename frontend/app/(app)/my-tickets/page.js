"use client"
import { useEffect, useState } from 'react';
import MyTicketsPage from '../../components/myTicket/myticket';
import api from '@/app/libs/axios';


const Page = () => {

  const [events, setEvents] = useState(null);
  const [dataFetch, setDataFetch] = useState(false)

  useEffect(() => {
    document.title = "My Tickets";
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      try {        
        const res = await api.get("/myticket");
        setEvents(res.data.data);
        setDataFetch(true);

      } catch (err) {
        console.log(err);
      }
    };
    fetchTickets();
  }, []);


  return (
    <div>
      {
        dataFetch && <MyTicketsPage tickets={events} />
      }

    </div>
  );
};

export default Page;