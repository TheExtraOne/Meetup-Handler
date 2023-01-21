import NewMeetupForm from "../../components/meetups/new-meetup-form";
import { useRouter } from "next/router";

const NewMeetupPage = () => {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch(
      "https://meetings-handler-default-rtdb.europe-west1.firebasedatabase.app/meetings.json",
      {
        method: "POST",
        body: JSON.stringify(enteredMeetupData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    router.push("/");
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetupPage;
