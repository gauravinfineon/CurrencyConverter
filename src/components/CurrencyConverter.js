import React, { useState } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]); // For dropdown options
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("INR");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Fetch exchange rates from the backend
  const fetchRates = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/currency/rates/${baseCurrency}`
      );
      setCurrencies(Object.keys(response.data)); // Set dropdown options
    } catch (err) {
      console.error(err);
      setError("Failed to fetch exchange rates. Please try again later.");
    }
  };
  const convertCurrency = async () => {
    if (!amount || isNaN(amount)) {
      setError("Please enter a valid amount.");
      return;
    }
     const cleanedAmount = amount.toString().replace(/,/g, '');
    const parsedAmount = parseFloat(cleanedAmount);
    if (isNaN(parsedAmount)) {
        setError("Please enter a valid amount.");
        return;
    }

    try {
      setError(""); 
      const response = await axios.get("http://localhost:8080/api/currency/convert", {
        params: {
          fromCurrency: baseCurrency,
          toCurrency: targetCurrency,
          amount: amount,
        },
      });

      setResult(response.data); // Set result to the conversion amount
    } catch (err) {
      console.error(err);
      setError("Failed to convert currency. Please try again later.");
    }
  };

  // Fetch currencies when the component loads
  React.useEffect(() => {
    fetchRates();
  }, [baseCurrency]);

  return (
    <div style={{ 
  textAlign: "center", 
  padding: "2rem",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "auto",
  maxWidth: "600px",
  backgroundColor: "#f8f9fa",
  borderRadius: "15px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  border: "none"
}}>
  <div style={{ 
    width: "100%", 
    maxWidth: "500px",
    background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    padding: "2rem",
    borderRadius: "12px",
    margin: "1rem 0",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
  }}>
    <h2 style={{ 
      color: "white",
      fontSize: "1.8rem",
      marginBottom: "2rem",
      fontWeight: "600"
    }}>
      Currency Converter
    </h2>

    <div style={{ 
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem"
    }}>
      <div>
        <label style={{ 
          display: "block",
          marginBottom: "0.5rem",
          color: "white",
          fontSize: "1rem"
        }}>
          Base Currency:
        </label>
        <select 
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          style={{
            width: "100%",
            padding: "0.8rem",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
        >
          {currencies.map((currency) => (
            <option 
              key={currency}
              value={currency}
              style={{
                backgroundColor: "#fff",
                color: "#000"
              }}
            >
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ 
          display: "block",
          marginBottom: "0.5rem",
          color: "white",
          fontSize: "1rem"
        }}>
          Target Currency:
        </label>
        <select 
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
          style={{
            width: "100%",
            padding: "0.8rem",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
        >
          {currencies.map((currency) => (
            <option 
              key={currency}
              value={currency}
              style={{
                backgroundColor: "#fff",
                color: "#000"
              }}
            >
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ 
          display: "block",
          marginBottom: "0.5rem",
          color: "white",
          fontSize: "1rem"
        }}>
          Amount:
        </label>
        <input 
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: "100%",
            padding: "0.8rem",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          placeholder="Enter amount"
        />
      </div>

      <button 
        onClick={convertCurrency}
        style={{
          width: "100%",
          padding: "1rem",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "white",
          color: "#6366f1",
          fontSize: "1rem",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.3s ease",
          marginTop: "1rem"
        }}
      >
        Convert Now
      </button>
    </div>
  </div>

  {error && (
    <p style={{ 
      color: "#dc2626",
      fontSize: "0.9rem",
      marginTop: "1rem"
    }}>
      {error}
    </p>
  )}

  {result !== null && (
    <div style={{
      marginTop: "2rem",
      padding: "1.5rem",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      textAlign: "center"
    }}>
      <h3 style={{ 
        fontSize: "1.4rem",
        color: "#1f2937",
        marginBottom: "0.5rem"
      }}>
         Result:
      
      <p style={{ 
        fontSize: "1.6rem",
        color: "#6366f1",
        fontWeight: "900"
      }}>
        {amount} {baseCurrency} = {result.toFixed(2)} {targetCurrency}
      </p></h3>
    </div>
  )}
</div>

  );
};

export default CurrencyConverter;
