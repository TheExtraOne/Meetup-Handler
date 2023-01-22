import MeetupDetail from "../../components/meetups/meetup-detail";
import MEETINGSAPI from "@/api/api";

const MeetupDetails = (props) => {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
};

export async function getStaticPaths() {
  const response = await fetch(`${MEETINGSAPI}/meetings.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return {
    fallback: "blocking",
    paths: transformedQuotes.map((meetup) => ({
      params: { meetupId: meetup.id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const response = await fetch(`${MEETINGSAPI}/meetings/${meetupId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quote.");
  }

  const loadedQuote = {
    id: meetupId,
    ...data,
  };

  return {
    props: {
      meetupData: {
        id: loadedQuote.toString(),
        title: loadedQuote.title,
        address: loadedQuote.address,
        image: loadedQuote.image,
        description: loadedQuote.description,
      },
    },
  };
}

export default MeetupDetails;
