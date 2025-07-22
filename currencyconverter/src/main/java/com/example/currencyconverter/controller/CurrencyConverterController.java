package com.example.currencyconverter.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.currencyconverter.services.CurrencyConverterService;

@RestController
@RequestMapping("/api/currency")
public class CurrencyConverterController {

    @Autowired
    private CurrencyConverterService currencyConverterService;

    @GetMapping("/rates/{baseCurrency}")
    public Map<String, Double> getExchangeRates(@PathVariable String baseCurrency) throws IOException {
        return currencyConverterService.getExchangeRates(baseCurrency);
    }

    @GetMapping("/convert")
    public double convertCurrency(
            @RequestParam String fromCurrency,
            @RequestParam String toCurrency,
            @RequestParam double amount
    ) throws IOException {
        return currencyConverterService.convertCurrency(fromCurrency, toCurrency, amount);
    }
}
