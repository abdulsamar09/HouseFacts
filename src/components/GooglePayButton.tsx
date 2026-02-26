import React from 'react';

interface GooglePayButtonProps {
    upiId: string;
    name: string;
    amount: string;
    note?: string;
}

const GooglePayButton: React.FC<GooglePayButtonProps> = ({ upiId, name, amount, note = "Payment for HouseFacts" }) => {
    const handlePayment = () => {
        // UPI Deep Link
        // Format: upi://pay?pa=<UPI_ID>&pn=<NAME>&am=<AMOUNT>&cu=INR&tn=<NOTE>
        const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

        // Check if user is on mobile
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            // Launch the UPI app (Google Pay, PhonePe, etc.)
            window.location.href = upiLink;
        } else {
            // For desktop, usually we show a QR code or inform the user
            alert("Please open this page on your mobile device to pay with Google Pay.");
        }
    };

    return (
        <button
            onClick={handlePayment}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                background: "#ffffff",
                color: "#1a1a1a",
                padding: "14px 28px",
                borderRadius: "12px",
                border: "2px solid #c8962e",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 12px rgba(200,160,40,0.2)",
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fffcf0";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(200,160,40,0.3), 0 0 10px rgba(200,160,40,0.2)";
                e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(200,160,40,0.2)";
                e.currentTarget.style.transform = "translateY(0)";
            }}
        >
            <img
                src="https://www.gstatic.com/images/branding/product/2x/google_pay_48dp.png"
                alt="GPay"
                style={{ width: "24px", height: "24px" }}
            />
            Pay with Google Pay
        </button>
    );
};

export default GooglePayButton;
