"use client"
import { useEffect, useState } from 'react';
import MyTicketsPage from '../../components/myTicket/myticket';
import api from '@/app/libs/axios';


const page = () => {

  const [events, setEvents] = useState(null);
  const [dataFetch, setDataFetch] = useState(false)

  document.title = `My Tickets`;

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

export default page;