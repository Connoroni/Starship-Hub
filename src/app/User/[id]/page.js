"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnectionString";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function UserPage({ params }) {
  const { userId } = await auth();
  if (!userId) {
    return notFound();
  }

  const slug = await params;
  console.log(slug);
  const userData = await db.query(`SELECT * FROM users WHERE id=$1`, [slug.id]);

  const wrangledUser = userData.rows;
  console.log(wrangledUser);

  if (wrangledUser.length === 0) {
    notFound();
  }

  return (
    <>
      <h1>User Profile {slug.id}</h1>
      {wrangledUser.map((oneUser) => (
        <div key={oneUser.id}>
          <h2>Username: {oneUser.username}</h2>
          <h2>Email: {oneUser.email}</h2>
          <Image
            src={oneUser.profile_pic}
            alt="Users profile picture"
            width="200"
            height="200"
          />
          <h2>Bio: {oneUser.bio}</h2>
        </div>
      ))}
    </>
  );
}
