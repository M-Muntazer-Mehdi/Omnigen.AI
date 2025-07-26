"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
  {
    name: "John Doe",
    avatar: "A",
    title: "Software Engineer",
    description: "This is the best application I've ever used!",
  },
  {
    name: "David Son",
    avatar: "B",
    title: "Architect",
    description: "This is the best application I've ever used!",
  },
  {
    name: "Muntazer Mehdi",
    avatar: "C",
    title: "Developer",
    description: "This is the best application I've ever used!",
  },
  {
    name: "Time ji",
    avatar: "D",
    title: "Software Engineer",
    description: "This is the best application I've ever used!",
  },
];

export const LandingContent = () => {
  return (
<div className="px-10 pb-20">
  <h2 className="text-center text-4xl text-white font-extrabold mb-0">Testimonials</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {testimonials.map((item) => (
      <Card
        key={item.description}
        className="bg-gradient-to-br from-black via-gray-900 to-gray-700 border-none text-white" // Gradient added here
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <div>
              <p className="text-lg ">{item.name}</p>
              <p className="text-zinc-300 text-sm">{item.title}</p> {/* Adjusted text color for better contrast */}
            </div>
          </CardTitle>
          <CardContent className="pt-4 px-0">{item.description}</CardContent>
        </CardHeader>
      </Card>
    ))}
  </div>
</div>
  );
};

export default LandingContent;
