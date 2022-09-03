import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import MeetupDetail from '../../components/meetups/meetupDetail';

const MeetupDetails = props => {
  const { meetupData } = props;
  const { image, address, title, description, id } = meetupData || {};
  console.log('meetup detail', props.meetupData);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <MeetupDetail
        id={id}
        img={image}
        address={address}
        title={title}
        description={description}
      />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://110:110@cluster0.vkvphjv.mongodb.net/meetups?retryWrites=true&w=majority'
  ); // establish connection

  const db = client.db(); // to get hold of that database which we connect here.

  const meetupsCollection = db.collection('meetups'); // get access to the collection (meetups)

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); // find: first urgument => filter for certain  value, empty here means give me all the objects, no filter critiaria; second urgument => which filed shoule be extracted for every document. here _id: 1 => means only include ID, and no other field values. So here we only fetch the IDs.

  client.close();

  return {
    fallback: false,
    paths: meetups.map(meetup => ({
      params: { meetupId: meetup._id.toString() },
    })),

    // [
    //   {
    //     params: {
    //       meetupId: 'm1',
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: 'm2',
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: 'm3',
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    'mongodb+srv://110:110@cluster0.vkvphjv.mongodb.net/meetups?retryWrites=true&w=majority'
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId), // ObjectId is the one in Mongodb
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
