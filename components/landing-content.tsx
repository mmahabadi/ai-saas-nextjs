"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
  {
    name: "Antonio",
    title: "CEO",
    avatar: "A",
    description:
      "I have been using Robo AI for the past 6 months and it has been a game changer for my business. I have been able to generate content 10x faster than before.",
  },
  {
    name: "Maria",
    title: "Designer",
    avatar: "M",
    description:
      "Robo AI helped me to generate photos and videos for my clients. I Love it!",
  },
  {
    name: "John",
    title: "Developer",
    avatar: "J",
    description:
      "It has been a game changer for my business. I have been able to generate codes 10x faster than before.",
  },
  {
    name: "Sara",
    title: "Product Manager",
    avatar: "S",
    description: "The best AI tool for generating content.",
  },
];
export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
