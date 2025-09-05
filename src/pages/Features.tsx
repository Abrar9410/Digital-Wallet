import { Shield, Wallet, Send, LineChart, Smartphone, SunMoon } from "lucide-react"

const Features = () => {
    const features = [
        {
            title: "Secure Transactions",
            description: "Your money is protected with top-notch encryption and real-time monitoring.",
            icon: Shield,
        },
        {
            title: "Easy Wallet Management",
            description: "Add, withdraw, and manage funds seamlessly with just a few taps.",
            icon: Wallet,
        },
        {
            title: "Instant Transfers",
            description: "Send and receive money instantly, anytime, anywhere.",
            icon: Send,
        },
        {
            title: "Smart Insights",
            description: "Track your expenses with Transaction History. Analyze with instant sort and filter.",
            icon: LineChart,
        },
        {
            title: "Mobile Friendly",
            description: "Enjoy a smooth, responsive experience with whatever device you are comfortable with.",
            icon: Smartphone,
        },
        {
            title: "Light & Dark Mode",
            description: "Switch between themes to match your personal preference.",
            icon: SunMoon,
        },
    ]

    return (
        <div className="container mx-auto py-16">
            {/* Page Header */}
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-primary mb-4">
                    App Features
                </h1>
                <p className="text-lg text-muted-foreground">
                    Discover how our digital wallet makes money management faster,
                    smarter, and safer.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={idx}
                            className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-lg transition group"
                        >
                            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition">
                                <Icon size={28} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default Features;