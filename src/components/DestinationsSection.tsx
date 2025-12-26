const DestinationsSection = () => {
  const destinations = [
    { name: "USA", flag: "🇺🇸" },
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "France", flag: "🇫🇷" },
    { name: "UAE", flag: "🇦🇪" },
    { name: "Singapore", flag: "🇸🇬" },
  ];

  return (
    <section id="destinations" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary-foreground/70 uppercase tracking-wider">
            Destinations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mt-2 mb-4">
            Countries We Cover
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            We process visas for over 100+ countries. Here are some of our most popular destinations.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {destinations.map((dest) => (
            <div
              key={dest.name}
              className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 p-6 text-center hover:bg-primary-foreground/20 transition-colors cursor-pointer"
            >
              <span className="text-4xl mb-3 block">{dest.flag}</span>
              <span className="text-primary-foreground font-medium">{dest.name}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-primary-foreground/70 mt-8">
          + Schengen Countries, Asia, Middle East & More
        </p>
      </div>
    </section>
  );
};

export default DestinationsSection;
