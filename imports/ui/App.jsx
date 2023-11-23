import React from "react";
import { useFind } from "meteor/react-meteor-data";
import { ChatCollection } from "../api/Chat.js";

const ChatBox = () => {
  const [message, setMessage] = React.useState("");
  const [from, setFrom] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    ChatCollection.insert({
      message,
      from,
    });
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>From:</label>
      <br />
      <input
        type="text"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <br />
      <label>Message:</label>
      <br />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />

      <button type="submit">Send</button>
    </form>
  );
};

const MessageList = ({ messages }) => {
  if (messages.length === 0) {
    return <div>No messages yet!</div>;
  }

  return (
    <ul>
      {messages.map(({ from, message, _id }) => (
        <li key={_id}>
          <span>
            {from}: {""}
          </span>
          <span>{message}</span>
        </li>
      ))}
    </ul>
  );
};

const MessageBoard = () => {
  const messages = useFind(() =>
    ChatCollection.find({})
  );

  return (
    <div>
      <h1>Messages</h1>
      <MessageList messages={messages} />
    </div>
  );
};

export const App = () => (
  <div>
    <h1>Welcome to our Chat!</h1>
    <ChatBox />
    <MessageBoard />
  </div>
);
