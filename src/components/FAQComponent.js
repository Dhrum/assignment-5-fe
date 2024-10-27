import React from 'react';
import './FAQComponent.css';

const FAQComponent = () => {
    const faqs = [
        "How can I track my order?",
        "What is the return policy?",
        "How long does delivery take?",
        "Do you offer free shipping?",
        "How do I cancel my order?",
        "What payment methods do you accept?",
        "How do I change my shipping address?",
        "Are the products covered under warranty?",
        "What if I receive a damaged product?",
        "How do I contact customer service?",
    ];

    return (
        <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <ul className="faq-list">
                {faqs.map((faq, index) => (
                    <li key={index}>{faq}</li>
                ))}
            </ul>
        </section>
    );
};

export default FAQComponent;
