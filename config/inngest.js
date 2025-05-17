import { Inngest } from "inngest";
import { connect } from "mongoose";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart" });

// inngest function to create and save the data to database

export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk-to-db",
  },
  {
    event: "clerk/user.created",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      name: first_name + " " + last_name,
      imageUrl: image_url,
      email: email_addresses[0].email_address,
    };
    await connect();
    await User.create(userData);
  }
);

export const syncUserUpdation = inngest.createFunction(
  {
    id: "sync-user-updation-from-clerk-to-db",
  },
  {
    event: "clerk/user.updated",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      name: first_name + " " + last_name,
      imageUrl: image_url,
      email: email_addresses[0].email_address,
    };
    await connect();
    await User.findByIdAndUpdate({ _id: id }, userData);
  }
);

export const syncUserDeletion = inngest.createFunction(
  {
    id: "sync-user-deletion-from-clerk-to-db",
  },
  {
    event: "clerk/user.deleted",
  },
  async ({ event }) => {
    const { id } = event.data;
    await connect();
    await User.findByIdAndDelete({ _id: id });
  }
);
