import { useRouter } from 'next/router';
import Head from 'next/head';
import NewMeetupForm from '../components/meetups/NewMeetupForm';

// domain.com/new-meetup
function NewMeetupPage() {
  const router = useRouter();

  const addMeetupHandler = async enteredMeetupData => {
    console.log(enteredMeetupData);
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);

    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta name="description" content="Add your own meetup!" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}

export default NewMeetupPage;
