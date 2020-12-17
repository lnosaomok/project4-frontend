import React from "react";
import AllMessagesItem from "./AllMessagesItem";
const AllMessages = () => {
  const arr = ["1", "2", "3"];
  return (
    <div class='container messages-all'>
      <div className='messages-container' id='messages-all'>
        {" "}
        {arr.map((each) => {
          return <AllMessagesItem />;
        })}
      </div>
    </div>
  );
};

export default AllMessages;
