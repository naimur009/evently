import { allEventsServices, categoryServices, singleEventsServices } from "../services/eventsServices.js"

// to get all events data
export const allEvents = async(req, res) =>{
    const result = await allEventsServices();
    return res.status(200).json(result);
}

// to get a single event data
export const singleEvents = async(req, res) =>{
    const result = await singleEventsServices(req);
    return res.status(200).json(result);
}

export const categoryController = async(req, res) =>{
    const result = await categoryServices(req);
    return res.status(200).json(result);
}

