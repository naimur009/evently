"use client";
import React, { useState } from "react";
import { Download, MapPin, CalendarDays, Ticket } from "lucide-react";

const MyTicketsPage = ({ tickets }) => {


  const [downloadingTicketId, setDownloadingTicketId] = useState(null);


  // Handles the download action for a specific ticket
  const handleDownloadTicket = (ticketId) => {
    setDownloadingTicketId(ticketId);
    console.log(`Downloading ticket ${ticketId}...`);
    setTimeout(() => {
      setDownloadingTicketId(null);
      // In a real application, you would trigger the file download here
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 mt-10 px-4 sm:px-6 lg:px-12 font-['Inter']">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
            🎟️ My Tickets
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
            All your purchased tickets in one place.
          </p>
        </header>

        {/* Tickets List */}
        <div className="space-y-6">
          {tickets.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No tickets found.
            </p>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-md border border-gray-200 p-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
              >
                {/* Image */}
                <img
                  src={ticket.eventDetails.image}
                  alt={ticket.eventDetails.event_title}
                  className="w-full h-48 sm:w-24 sm:h-24 object-cover rounded-lg mr-0 sm:mr-6 mb-4 sm:mb-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-gray-900 truncate">{ticket.eventDetails.event_title}</h3>
                  <div className="text-gray-600 text-sm mt-2 space-y-1">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <CalendarDays className="w-4 h-4 text-blue-500" />
                      <span>
                        {new Date(ticket.eventDetails.event_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>

                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span>{ticket.eventDetails.venue}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <Ticket className="w-4 h-4 text-blue-500" />
                      <span>{ticket.ticket_id}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Download Button */}
                <div className="mt-4 sm:mt-0 ml-0 sm:ml-4 flex flex-col items-center sm:items-end flex-shrink-0 text-center sm:text-right w-full sm:w-auto">
                  <button
                    onClick={() => handleDownloadTicket(ticket._id)}
                    disabled={downloadingTicketId === ticket._id}
                    className="mt-4 w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 justify-center hover:bg-blue-700 transition-colors duration-300"
                  >
                    <Download className="w-4 h-4" />
                    {downloadingTicketId === ticket._id ? "Downloading..." : "Download"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default MyTicketsPage;
