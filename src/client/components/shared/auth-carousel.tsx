"use client";

import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";

import { Card, CardContent, CardFooter } from "@/client/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/client/components/ui/carousel";
import { cn } from "@/client/lib/utils";

const carouselData = [
    {
        author: "Rita Domnic",
        content: "Prompt: “A 70-guest coastal wedding in Tofino with sunset views, fresh seafood stations, and a neutral color palette of ivory, beige, and sage",
        profession: "Business Owner",
        image: "/assets/images/sign-up/testimonial-1.png",
    },
    {
        author: "Sophia Hart",
        content: "Prompt: “A romantic rooftop engagement dinner for 20 guests with skyline views, live violinist, red roses, and champagne toasts.”",
        profession: "Corporate Manager",
        image: "/assets/images/sign-up/testimonial-2.png",
    },
    {
        author: "Marcus Steele",
        content: "Prompt: “A modern corporate networking mixer for 100 professionals at a downtown rooftop venue, branded cocktails, standing tables, and ambient lighting",
        profession: "Corporate Manager",
        image: "/assets/images/sign-up/testimonial-3.png",
    },
];

export const AuthCarousel: React.FC = () => {
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        if (!carouselApi) return;

        const updateCarouselState = () => {
            setCurrentIndex(carouselApi.selectedScrollSnap());
            setTotalItems(carouselApi.scrollSnapList().length);
        };

        updateCarouselState();

        carouselApi.on("select", updateCarouselState);

        return () => {
            carouselApi.off("select", updateCarouselState); // Clean up on unmount
        };
    }, [carouselApi]);

    const scrollToIndex = (index: number) => {
        carouselApi?.scrollTo(index);
    };

    return (
        <div className="relative hidden h-full max-h-full min-h-[calc(100vh-1.75rem)] flex-[0.38] self-stretch overflow-hidden rounded-2xl md:block">
            <Carousel setApi={setCarouselApi} opts={{ loop: true }}>
                <CarouselContent>
                    {carouselData.map((item, index) => (
                        <CarouselItem key={index} className="relative">
                            <div className="relative h-full max-h-full min-h-[calc(100vh-1.75rem)] flex-[0.38] self-stretch overflow-hidden rounded-2xl">
                                <Image src={`/assets/images/sign-up/sign-up-${index + 1}.png`} objectFit="cover" alt="Sign Up" fill />
                            </div>
                            <div className="-translate-x-1/2 absolute bottom-20 left-1/2 flex w-8/10 max-w-md flex-col gap-5">
                                <Card className="gap-7 rounded-lg border-none bg-black px-4 py-6 opacity-80">
                                    <CardContent className="flex items-center justify-center p-0 text-white">{item.content}</CardContent>
                                    <CardFooter className="flex gap-2.5 p-0 text-white">
                                        <Image src={item.image} width={30} height={30} alt="Testimonial" className="rounded-sm" />
                                        <div>
                                            <p className="font-medium text-white leading-5">{item.author}</p>
                                            <p className="-mt-1 font-medium text-neutral-400 text-xs leading-5">{item.profession}</p>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="absolute bottom-14 flex w-full justify-center gap-1">
                {Array.from({ length: totalItems }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToIndex(index)}
                        className={cn("h-1.5 w-1.5 rounded-full bg-neutral-300/70", {
                            "bg-white": currentIndex === index,
                        })}
                        type="button"
                    />
                ))}
            </div>
        </div>
    );
};
