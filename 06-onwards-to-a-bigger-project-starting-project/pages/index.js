// domain.com/
// import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: ' 5, 1234 Street, City',
    description: 'The First Meetup!',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: ' 6, 2222 Street, Sydney',
    description: 'The Second Meetup!',
  },
  {
    id: 'm3',
    title: 'A Third Meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: ' 7, 3333 Street, Mel',
    description: 'The Third Meetup!',
  },
];

function HomePage(props) {
  // No longer need useState and useEffect, using getStaticProps to get data.
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   // send Http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []); // only run when the component first rended, and never after.

  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  // fetch data from API
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}

export default HomePage;
