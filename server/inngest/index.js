// import { Inngest } from "inngest";
// import User from "../models/User.js";
// import connectDB from "../configs/db.js";

// export const inngest = new Inngest({ id: "proconnect-app" });

// /* ---------------- USER CREATED ---------------- */
// const syncUserCreation = inngest.createFunction(
//   { id: "sync-user-from-clerk" },
//   { event: "clerk/user.created" },
//   async ({ event }) => {
//     await connectDB();

//     const {
//       id,
//       first_name,
//       last_name,
//       email_addresses,
//       primary_email_address_id,
//       image_url,
//     } = event.data;

//     // ✅ SAFELY GET PRIMARY EMAIL
//     const primaryEmail = email_addresses?.find(
//       (email) => email.id === primary_email_address_id
//     );

//     if (!primaryEmail) {
//       console.error("❌ No primary email for user:", id);
//       return;
//     }

//     const email = primaryEmail.email_address;

//     let username = email.split("@")[0].toLowerCase();

//     const exists = await User.findOne({ username });
//     if (exists) {
//       username = `${username}${Math.floor(Math.random() * 10000)}`;
//     }

//     await User.create({
//       _id: id,
//       email,
//       full_name: `${first_name || ""} ${last_name || ""}`.trim(),
//       profile_picture: image_url || "",
//       username,
//     });

//     console.log("✅ User inserted into MongoDB:", id);
//   }
// );

// /* ---------------- USER UPDATED ---------------- */
// const syncUserUpdation = inngest.createFunction(
//   { id: "update-user-from-clerk" },
//   { event: "clerk/user.updated" },
//   async ({ event }) => {
//     await connectDB();

//     const {
//       id,
//       first_name,
//       last_name,
//       email_addresses,
//       primary_email_address_id,
//       image_url,
//     } = event.data;

//     const primaryEmail = email_addresses?.find(
//       (email) => email.id === primary_email_address_id
//     );

//     await User.findByIdAndUpdate(id, {
//       email: primaryEmail?.email_address,
//       full_name: `${first_name || ""} ${last_name || ""}`.trim(),
//       profile_picture: image_url || "",
//     });

//     console.log("🔁 User updated:", id);
//   }
// );

// /* ---------------- USER DELETED ---------------- */
// const syncUserDeletion = inngest.createFunction(
//   { id: "delete-user-from-clerk" },
//   { event: "clerk/user.deleted" },
//   async ({ event }) => {
//     await connectDB();
//     await User.findByIdAndDelete(event.data.id);
//     console.log("🗑 User deleted:", event.data.id);
//   }
// );

// export const functions = [
//   syncUserCreation,
//   syncUserUpdation,
//   syncUserDeletion,
// ];
