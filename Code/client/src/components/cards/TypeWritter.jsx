import React from "react";
import Typewriter from 'typewriter-effect';

const TypeWritter = ({ text }) => {
  return (
    <div>
      <Typewriter
        options={{
          strings: text,
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
};

export default TypeWritter;
