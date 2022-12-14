// domain.com/
// import { useEffect, useState } from 'react';
import { MongoClient } from 'mongodb';
import Head from 'next/head'; // the Head component allow you to add Head section to your page

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  // No longer need useState and useEffect, using getStaticProps to get data.
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   // send Http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []); // only run when the component first rended, and never after.

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a list of active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  console.log(123, '----------------getStaticProps');
  // fetch data from API
  const client = await MongoClient.connect(
    'mongodb+srv://110:110@cluster0.vkvphjv.mongodb.net/meetups?retryWrites=true&w=majority'
  ); // establish connection

  const db = client.db(); // to get hold of that database which we connect here.

  const meetupsCollection = db.collection('meetups'); // get access to the collection (meetups)

  const meetups = await meetupsCollection.find().toArray(); // will default find all documents in the meetupsCollection
  console.log(meetups);

  client.close();
  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, // seconds the server will wait for every generate.
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req; // get the request object
//   const res = context.res; //  the response object will be send back
//   // fetch data from API
//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// } // all code in getServerSideProps will run on the server, not on client side.

export default HomePage;
