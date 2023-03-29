import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

function Event({ data }) {
  const inputRef = useRef();
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const emailValue = inputRef.current.value;
    const eventId = router?.query.id;

    try {
      const response = await fetch('/api/email-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailValue,
          eventId: eventId
        }),
      });

      if (response.ok) {
        inputRef.current.value = '';
      }

      const data = await response.json();
      setMessage(data?.message);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{data.title} at {data.city}</h2>
      <Image src={data.image} alt={data.title} width="200" height="160" />
      <p>{data.description}</p>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} type="email" placeholder="Enter your email"></input>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export async function getStaticPaths() {
  const { allEvents: data } = await import('@/data/data.json');
  const allPaths = data.map(event => ({
    params: {
      category: event.city,
      id: event.id
    }
  }));

  return {
    paths: allPaths,
    fallback: false
  };
}

export async function getStaticProps(context) {
  const eventId = context?.params.id;
  const { allEvents: data } = await import('@/data/data.json');
  const event = data.find(ev => ev.id === eventId);

  return {
    props: { data: event }
  };
}

export default Event;