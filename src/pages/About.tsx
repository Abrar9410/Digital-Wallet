import ca from "../assets/images/CA.png";
import ceo from "../assets/images/CEO.png";
import coo from "../assets/images/COO.png";


const leaders = [
    {
        name: "Abraham Smith",
        position: "Chief Administrator",
        img: ca
    },
    {
        name: "Leonardo Cruise",
        position: "Chief Executive Officer",
        img: ceo
    },
    {
        name: "Julie Green",
        position: "Chief of Operations",
        img: coo
    }
];

const About = () => {
    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="bg-primary/10 dark:bg-primary/20 py-16 px-6 md:px-12">
                <div className="container mx-auto text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-primary mb-4">
                        About Our Digital Wallet
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Empowering people with secure, fast, and reliable financial
                        solutions — anytime, anywhere.
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="px-6 md:px-12">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">Our Story</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Founded with the vision to revolutionize digital finance, our wallet
                        has grown to become a trusted partner for millions. From seamless
                        transactions to innovative services, we are committed to making money
                        management simple and accessible.<br/><br/>
                        What started as a bold idea to eliminate the barriers of traditional banking has transformed into
                        a platform that empowers people every day. We believe that financial freedom should not be limited
                        by geography, complexity, or outdated systems. That’s why we created a digital wallet that combines
                        security, speed, and simplicity — so you can focus on what matters most.<br/><br/>
                        Over the years, we’ve introduced features that go beyond basic transfers:<br/><br/>
                        <ul className="list-disc list-inside">
                            <li><strong>Smart insights</strong> that help you track and control your spending.</li>
                            <li><strong>Instant payments</strong> that make money move as fast as your life.</li>
                            <li><strong>Seamless integrations</strong> with services you already use and trust.</li>
                        </ul>
                        <br/>
                        At the heart of our journey is a promise — to stay user-first, transparent, and innovative.
                        Whether it’s a student paying for essentials, a small business handling daily transactions,
                        or a family managing their household finances, our wallet is here to make money management
                        effortless.<br/><br/>
                        As we look ahead, our story continues with you. Together, we’re building a future where
                        digital finance is not just a convenience, but a way of life.
                    </p>
                </div>
            </section>

            {/* Our Mission Section */}
            <section className="px-6 md:px-12">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">Our Mission</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        We started our journey to close the gap between people and
                        technology in financial services. Our mission is to deliver a
                        cashless, cardless, and hassle-free experience that brings financial
                        inclusion to everyone.<br/><br/>
                        We believe that access to modern financial tools should not be limited by geography, background,
                        or economic status. By empowering users with a secure and easy-to-use digital wallet, we aim to
                        break barriers and create opportunities for individuals and businesses alike.<br/><br/>
                        Our commitment is simple yet powerful:<br/><br/>
                        <ul className="list-disc list-inside">
                            <li>
                                <strong>Accessibility for all</strong> – Ensuring financial services are within
                                everyone’s reach, anytime, anywhere.
                            </li>
                            <li>
                                <strong>Security you can trust</strong> – Protecting your money and your data with
                                cutting-edge technology.
                            </li>
                            <li>
                                <strong>Innovation that matters</strong> – Continuously improving our features to adapt
                                to your evolving needs.
                            </li>
                            <li>
                                <strong>Empowerment through simplicity</strong> – Making complex financial processes
                                intuitive and stress-free.
                            </li>
                        </ul>
                        <br/>
                        Every step we take is guided by this mission—to not only change how people transact, but to
                        <strong> redefine the future of financial freedom.</strong>
                    </p>
                </div>
            </section>

            {/* Partners & Leadership Section */}
            <section className="mb-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6">Team Leaders</h2>
                    <div className="flex justify-center items-center gap-6 flex-wrap">
                        {/* Placeholder leadership cards */}
                        {leaders.map((leader) => (
                            <div
                                key={leader.position}
                                className="flex-1 bg-card p-6 rounded-2xl shadow-md"
                            >
                                <div className="w-max mx-auto bg-muted rounded-full mb-4">
                                    <img src={leader.img} alt={leader.img} className="w-40 h-40 rounded-full"/>
                                </div>
                                <h3 className="text-lg font-semibold">{leader.name}</h3>
                                <p className="text-sm text-muted-foreground">{leader.position}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;