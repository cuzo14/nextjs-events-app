import Image from 'next/image';
import Link from 'next/link';

function Events({ data }) {
  return (
    <div>
      <h1>Events page</h1>
      <div>
        {data.map(ev => {
          return (
            <Link href={`/events/${ev.id}`} key={ev.id}>
              <Image src={ev.image} alt={ev.title} width="200" height="160" />
              <h2>{ev.title}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await import('@/data/data.json');
  return {
    props: { data: data.events_categories }
  };
}

export default Events;