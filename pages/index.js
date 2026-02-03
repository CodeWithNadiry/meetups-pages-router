import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { Fragment } from "react";


function HomePage(props) {
  return <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
}

// export async function getServerSideProps(context) {
//   const request = context.req;
//   const response = context.res;

//   // fetch data from an api
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from an api

  const client = await MongoClient.connect('mongodb+srv://UsmanNadiry:nadiry2025@cluster0.wtqyrj6.mongodb.net/meetups');

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map(({ title, address, image, _id}) => ({
        title,
        address,
        image,
        id: _id.toString(),

      }) ),
    },
    revalidate: 1,
  };
}
export default HomePage;
