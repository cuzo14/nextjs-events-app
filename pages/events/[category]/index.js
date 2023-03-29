import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

function EventsPerCity({ data }) {
  const { category: city } = useRouter().query;

  return (
    <div>
      <h1>Events in {city}</h1>
      <div>
        {data.map(ev => {
          return (
            <Link href={`/events/${city}/${ev.id}`} key={ev.id}>
              <Image src={ev.image} alt={ev.title} width="200" height="160" />
              <h2>{ev.title}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { events_categories: data } = await import('@/data/data.json');
  const allPaths = data.map(category => ({
    params: {
      category: category.id
    }
  }));

  return {
    paths: allPaths,
    fallback: false
  };
}

export async function getStaticProps(context) {
  const cat = context?.params.category;
  const { allEvents: data } = await import('@/data/data.json');
  const cityEvents = data.filter(ev => ev.city === cat);

  return {
    props: { data: cityEvents }
  };
}

export default EventsPerCity;