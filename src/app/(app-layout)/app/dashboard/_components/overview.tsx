import { Calendar, Clock4, MapPin, UserRound } from "lucide-react";

export const Overview = () => {
    return (
        <section className="flex gap-20 bg-white py-5">
            <div className="flex-1">
                <h2 className="mb-4 font-medium text-lg">Description</h2>
                <p className="mb-9 text-neutral-500">
                    The “Coastal Elegance Wedding” is a breezy, ocean-inspired celebration crafted for couples who value intimacy, natural beauty, and refined simplicity. With soft hues, driftwood textures, and seafood-forward catering,
                    this plan offers an effortlessly graceful atmosphere. Set along the Pacific coast, the event blends minimal decor with curated vendor services, letting the stunning oceanfront backdrop speak for itself. From a live
                    acoustic set during the ceremony to a fresh buffet under the stars, every element is designed to evoke calm, connection, and class.
                </p>
                <h2 className="mb-4 font-medium text-lg">Event Highlights</h2>
                <ol className="list-disc space-y-1.5 px-4 text-neutral-500">
                    <li>Intimate beachfront ceremony at sunset</li>
                    <li>Light seafood buffet with vegan options</li>
                    <li>Acoustic live duo & slow dancing</li>
                    <li>Organic, neutral-toned floral arrangements</li>
                    <li>Bonfire and marshmallow send-off</li>
                </ol>
            </div>
            <div className="h-fit w-[400px] rounded-[10px] border border-primary/5 bg-neutral-100/50 px-4 py-6">
                <h2 className="mb-4 font-medium">Quick Details</h2>
                <ul className="flex flex-col gap-5">
                    <li className="flex items-center gap-2.5">
                        <Calendar className="text-primary" />
                        <div className="flex flex-col gap-1">
                            <p className="font-medium text-sm">August 28th, 2024</p>
                            <p className="text-neutral-500 text-xs">Saturday</p>
                        </div>
                    </li>
                    <li className="flex items-center gap-2.5">
                        <Clock4 className="text-primary" />
                        <div className="flex flex-col gap-1">
                            <p className="font-medium text-sm">4:00PM - 9:00PM</p>
                            <p className="text-neutral-500 text-xs">5 hours</p>
                        </div>
                    </li>
                    <li className="flex items-center gap-2.5">
                        <MapPin className="text-primary" />
                        <div className="flex flex-col gap-1">
                            <p className="font-medium text-sm">Spanish Banks Beach</p>
                            <p className="text-neutral-500 text-xs">Downtown, Vancouver</p>
                        </div>
                    </li>
                    <li className="flex items-center gap-2.5">
                        <UserRound className="text-primary" />
                        <div className="flex flex-col gap-1">
                            <p className="font-medium text-sm">80 Guests</p>
                            <p className="text-neutral-500 text-xs">5 hours</p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
};
