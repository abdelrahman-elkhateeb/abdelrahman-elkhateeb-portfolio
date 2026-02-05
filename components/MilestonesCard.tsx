'use client'

import { counterItems } from "@/lib";
import CountUp from "react-countup";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function MilestonesCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {counterItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <Card key={index} className="group transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
            <CardHeader>
              <CardTitle>{item.label}</CardTitle>
              <CardAction>
                {<Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />}
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold sm:text-5xl text-primary">
                <CountUp
                  end={item.value}
                  suffix={item.suffix}
                  enableScrollSpy
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
