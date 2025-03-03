import { db } from "@/utils/dbConnectionString";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CreateProfile() {
  const clerkUser = await currentUser();
  const emailJson = JSON.stringify(clerkUser.emailAddresses[0].emailAddress);
  const idJson = JSON.stringify(clerkUser.id);
  console.log("JSON data test:", emailJson, idJson);

  async function handleSubmit(formValues) {
    "use server";

    const formData = {
      clerk_id: idJson,
      username: formValues.get("username"),
      email: emailJson,
      profile_pic: formValues.get("profile_pic"),
      bio: formValues.get("bio"),
    };

    db.query(
      "INSERT INTO users (clerk_id, username, email, profile_pic, bio) VALUES ($1, $2, $3, $4, $5)",
      [
        formData.clerk_id,
        formData.username,
        formData.email,
        formData.profile_pic,
        formData.bio,
      ]
    );
    redirect("/");
  }

  return (
    <>
      <h1>Create Profile</h1>
      <form action={handleSubmit}>
        <label htmlFor="username">Choose a username:</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="profile_pic">Upload a profile picture:</label>
        <input type="text" name="profile_pic" id="profile_pic" />
        <label htmlFor="bio">Write a short bio:</label>
        <input type="text" name="bio" id="bio" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

//Need to add 'submitted' message
