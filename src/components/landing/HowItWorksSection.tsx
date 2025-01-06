export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description: "Sign up in seconds and join the foodie community.",
    },
    {
      number: "02",
      title: "Explore & Connect",
      description: "Join food channels or find local vendors near you.",
    },
    {
      number: "03",
      title: "Share & Discover",
      description: "Share your experiences and discover new favorites.",
    },
  ];

  return (
    <section className="py-16">
      <div className="container px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}