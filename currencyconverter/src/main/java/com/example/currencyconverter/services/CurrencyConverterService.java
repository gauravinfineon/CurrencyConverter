package com.example.currencyconverter.services; 

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

@Service
public class CurrencyConverterService {

    @Value("${exchange.rate.api.url}")
    private String apiUrl;

    private final OkHttpClient httpClient;
    private final ObjectMapper objectMapper;

    public CurrencyConverterService() {
        this.httpClient = new OkHttpClient();
        this.objectMapper = new ObjectMapper();
    } 
    public Map<String, Double> getExchangeRates(String baseCurrency) throws IOException {
    String url = String.format("%s/%s", apiUrl, baseCurrency);

    Request request = new Request.Builder()
            .url(url)
            .build();

    try (Response response = httpClient.newCall(request).execute()) {
        if (!response.isSuccessful()) {
            throw new IOException("Unexpected code: " + response);
        }

        // Parse the JSON response
        String responseBody = response.body().string();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        Map<String, Object> rawRates = objectMapper.convertValue(jsonNode.get("conversion_rates"), Map.class);

        // Convert all values to Double
        Map<String, Double> conversionRates = new HashMap<>();
        for (Map.Entry<String, Object> entry : rawRates.entrySet()) {
            if (entry.getValue() instanceof Integer) {
                conversionRates.put(entry.getKey(), ((Integer) entry.getValue()).doubleValue());
            } else if (entry.getValue() instanceof Double) {
                conversionRates.put(entry.getKey(), (Double) entry.getValue());
            } else {
                throw new IllegalArgumentException("Unexpected value type: " + entry.getValue().getClass());
            }
        }
        return conversionRates;
    }
}


   public double convertCurrency(String fromCurrency, String toCurrency, double amount) throws IOException {
    System.out.println("Fetching exchange rates for base currency: " + fromCurrency);

    Map<String, Double> exchangeRates = getExchangeRates(fromCurrency);
    System.out.println("Exchange rates fetched: " + exchangeRates);

    if (!exchangeRates.containsKey(toCurrency)) {
        throw new IllegalArgumentException("Invalid target currency: " + toCurrency);
    }

    double rate = exchangeRates.get(toCurrency);
    System.out.println("Conversion rate from " + fromCurrency + " to " + toCurrency + ": " + rate);

    double result = amount * rate;
    System.out.println("Converted amount: " + result);

    return result;
}

}
