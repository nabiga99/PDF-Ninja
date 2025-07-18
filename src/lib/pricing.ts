// src/lib/pricing.ts

// Define the types for the data we expect from the APIs
interface GeolocationResponse {
  countryCode?: string;
}

interface CurrencyResponse {
  data: {
    GHS?: number;
  };
}

interface PriceResult {
  amount: number; // Amount in the lowest currency unit (pesewas)
  currency: 'GHS';
}

const GHANA_PRICE = 1500; // 15 GHS in pesewas
const USD_PRICE = 4; // $4

/**
 * Fetches the user's geographical location based on their IP address.
 * @returns {Promise<GeolocationResponse>} The user's location data.
 */
async function getUserLocation(): Promise<GeolocationResponse> {
  try {
    // Using ip-api.com as it supports CORS for free
    const response = await fetch('http://ip-api.com/json/?fields=status,message,countryCode');
    if (!response.ok) {
      throw new Error('Failed to fetch location');
    }
    const data = await response.json();
    if (data.status !== 'success') {
      throw new Error(`Failed to fetch location: ${data.message}`);
    }
    return data;
  } catch (error) {
    console.error('Error fetching user location:', error);
    return {};
  }
}

/**
 * Fetches the current USD to GHS exchange rate.
 * @returns {Promise<number | null>} The exchange rate, or null if an error occurs.
 */
async function getUsdToGhsRate(): Promise<number | null> {
  const apiKey = import.meta.env.VITE_FREECURRENCYAPI_KEY;
  if (!apiKey) {
    console.error('VITE_FREECURRENCYAPI_KEY is not set in .env file');
    return null;
  }

  try {
    const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=USD&currencies=GHS`);
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rate');
    }
    const data: CurrencyResponse = await response.json();
    return data.data.GHS ?? null;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return null;
  }
}

/**
 * Calculates the price based on the user's location.
 * @returns {Promise<PriceResult | null>} The calculated price and currency, or null on failure.
 */
export async function calculatePrice(): Promise<PriceResult | null> {
  const location = await getUserLocation();

  if (location.countryCode === 'GH') {
    return { amount: GHANA_PRICE, currency: 'GHS' };
  }

  const rate = await getUsdToGhsRate();
  if (rate) {
    const amountInGhs = USD_PRICE * rate;
    const amountInPesewas = Math.round(amountInGhs * 100);
    return { amount: amountInPesewas, currency: 'GHS' };
  }

  // Fallback price if API fails (e.g., equivalent of $4 at a default rate)
  // You can adjust this default rate as needed.
  const defaultRate = 14.5;
  const fallbackAmount = Math.round(USD_PRICE * defaultRate * 100);
  return { amount: fallbackAmount, currency: 'GHS' };
}
