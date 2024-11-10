// components/Title.tsx
import React from "react";

interface TitleProps {
  text: string;
}

const Title = ({children}:{children:string}) => {
  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-teal-600  mb-6">
      {children}
    </h1>
  );
};

export default Title;
