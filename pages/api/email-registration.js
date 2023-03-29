import path from 'path';
import fs from 'fs';

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    const filePath = path.join(process.cwd(), 'data', 'data.json');
    const { events_categories, allEvents } = extractData(filePath);
    const { email, eventId } = req.body;
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(validRegex)) {
      res.status(422).json({ message: 'Please insert a valid email' });
    }

    if (!allEvents) {
      return res.status(404).json({ message: 'Events data no found' });
    }

    const newAllEvents = allEvents.map(event => {
      if (event.id === eventId) {
        if (event.emails_registered.includes(email)) {
          res.status(409).json({ message: 'This email has already been registered' });
        }

        return {
          ...event, emails_registered: [...event.emails_registered, email]
        };
      }

      return event;
    });

    fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: newAllEvents }));
    res.status(200).json({ message: `You have been registered successfuly with the email: ${email}` });
  }
}
