import MeetupDetail from '../../components/meetups/meetupDetail';

const MeetupDetails = props => {
  const { meetupData } = props;
  const { image, address, title, description, id } = meetupData || {};
  console.log('meetup detail', props.meetupData);
  return (
    <MeetupDetail
      id={id}
      img={image}
      address={address}
      title={title}
      description={description}
    />
  );
};

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: 'm1',
        },
      },
      {
        params: {
          meetupId: 'm2',
        },
      },
      {
        params: {
          meetupId: 'm3',
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;
  console.log(meetupId);

  return {
    props: {
      meetupData: {
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
        id: meetupId,
        title: 'A First Meetup',
        address: 'Some address Sydney',
        description: 'This is the First Meetup',
      },
    },
  };
}

export default MeetupDetails;
