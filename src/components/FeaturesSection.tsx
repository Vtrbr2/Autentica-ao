import { Code, Palette, Zap, Shield, Smartphone, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: Code,
    title: "Código Limpo",
    description: "Desenvolvimento com as melhores práticas e tecnologias modernas.",
  },
  {
    icon: Palette,
    title: "Design Premium",
    description: "Interfaces elegantes e intuitivas que encantam seus clientes.",
  },
  {
    icon: Zap,
    title: "Alta Performance",
    description: "Sites rápidos e otimizados para máxima velocidade de carregamento.",
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Proteção completa com certificados SSL e práticas de segurança.",
  },
  {
    icon: Smartphone,
    title: "100% Responsivo",
    description: "Perfeito em qualquer dispositivo: mobile, tablet e desktop.",
  },
  {
    icon: TrendingUp,
    title: "SEO Otimizado",
    description: "Preparado para ranquear no Google e atrair mais clientes.",
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={`group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl ${
        isVisible ? "animate-fade-in-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </div>
  );
};

export const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Por Que Escolher a <span className="text-gradient">Web Factory</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            Oferecemos soluções completas que transformam sua visão em realidade digital
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
