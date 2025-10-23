import { motion } from "framer-motion";
import { Calendar, Sprout, Users, Award } from "lucide-react";

const timelineEvents = [
  {
    year: "2024",
    month: "January",
    title: "The Spark",
    description: "Pranay conceptualizes GREEN LEGACY during his birthday celebration, questioning how celebrations could create lasting environmental impact.",
    icon: Sprout,
  },
  {
    year: "2024",
    month: "March",
    title: "Foundation",
    description: "GREEN LEGACY officially founded with a clear mission: transform celebrations into tree plantation rituals.",
    icon: Calendar,
  },
  {
    year: "2024",
    month: "June",
    title: "Pilot Plantation",
    description: "First major plantation drive with 150 volunteers planting 500+ trees across 5 acres. The proof-of-concept that celebrations can drive real change.",
    icon: Users,
  },
  {
    year: "2025",
    month: "October",
    title: "Growing Impact",
    description: "Expanded operations with geo-tagging system, donor certificates, and transparent impact tracking. Building trust through technology.",
    icon: Award,
  },
];

export const AnimatedTimeline = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative"
    >
      {/* Vertical Line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary-light to-primary-dark" />

      <div className="space-y-12">
        {timelineEvents.map((event, index) => {
          const Icon = event.icon;
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative flex items-center ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              } flex-row`}
            >
              {/* Icon Circle */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                <div className="bg-primary p-4 rounded-full shadow-lg border-4 border-background">
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Content Card */}
              <div
                className={`ml-24 md:ml-0 md:w-5/12 ${
                  isEven ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-card p-6 rounded-xl shadow-lg border border-border hover:shadow-2xl transition-all"
                >
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-heading font-bold text-2xl text-primary">
                      {event.year}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {event.month}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-2">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
