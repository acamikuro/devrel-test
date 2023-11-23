import { Meteor } from "meteor/meteor";
import { ChatCollection } from "/imports/api/Chat";

Meteor.startup(() => {
  ChatCollection.remove({}) // clean up the database every time the server starts.
});
