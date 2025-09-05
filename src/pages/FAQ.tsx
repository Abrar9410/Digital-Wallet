import FAQAccordion from "@/components/FAQAccordion";


const FAQ = () => {
    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-center text-primary text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold my-16">
                Frequently Asked Questions
            </h2>
            <FAQAccordion />
        </div>
    );
};

export default FAQ;