// pages/[meetupId]/index.js
import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

export default function MeetupDetailsPage({
  meetupData: { title, image, address, description },
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <MeetupDetail
        image={image}
        title={title}
        address={address}
        description={description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://UsmanNadiry:nadiry2025@cluster0.wtqyrj6.mongodb.net/meetups"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: true, // fallback: false =>  Show 404 if user visits a page not listed in paths ( like m3 or m7 etc)
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })), // generate array of paths dynamically
  };
}
export async function getStaticProps(context) {
  // fetch data for single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://UsmanNadiry:nadiry2025@cluster0.wtqyrj6.mongodb.net/meetups"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();
  return {
    props: {
      meetupData: {
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        id: selectedMeetup._id.toString(),
        description: selectedMeetup.description,
      },
    },
  };
}
