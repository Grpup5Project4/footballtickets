import React from 'react';

const logoUrls = [
    "https://www.svgrepo.com/show/303141/spotify-1-logo.svg",
    "https://www.svgrepo.com/show/303248/mastercard-2-logo.svg",
    "https://www.svgrepo.com/show/303214/nike-4-logo.svg",
    "https://www.svgrepo.com/show/303227/redbull-logo.svg",
    "https://www.svgrepo.com/show/303169/apple-music-logo.svg", // Repeat or add more logos if needed

    "https://www.svgrepo.com/show/303257/paypal-logo.svg", // Repeat or add more logos if needed
    "https://www.svgrepo.com/show/303272/sony-2-logo.svg", // Repeat or add more logos if needed
    "https://www.svgrepo.com/show/303358/pepsi-logo.svg", // Repeat or add more logos if needed
    "https://www.svgrepo.com/show/303367/uber-logo.svg", // Repeat or add more logos if needed
    "https://www.svgrepo.com/show/303506/total-3-logo.svg", // Repeat or add more logos if needed
    "https://www.svgrepo.com/show/303533/uefa-champions-league-1-logo.svg", // Repeat or add more logos if needed
];

const Sponsors = () => {
    return (
        <section style={{ padding: '3rem 0', backgroundColor: 'white', overflow: 'hidden', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold', color:'black' }}>Our Partners</h2>
            <div style={{ position: 'relative', width: '100%', height: '7rem' }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    gap: '2rem',
                    animation: 'scroll 20s linear infinite',
                }}>
                    {logoUrls.concat(logoUrls).map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Sponsor logo ${index + 1}`}
                            style={{
                                height: '8rem',
                                flexShrink: 0,
                                marginRight: '2rem',
                            }}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </section>
    );
};

export default Sponsors;
