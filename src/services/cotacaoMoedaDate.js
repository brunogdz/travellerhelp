import axios from "axios";

export default async function cotacaoCoinData(coin ){
    if (coin === "USD") {
        let response = await axios.get(
          "https://economia.awesomeapi.com.br/last/USD-BRL"
        );
        let data = response.data;
        return data?.USDBRL.create_date;
      }
      if (coin === "EUR") {
        let response = await axios.get(
          "https://economia.awesomeapi.com.br/last/EUR-BRL"
        );
        let data = response.data;
        return data?.EURBRL.create_date;
      }
      if (coin === "CAD") {
        let response = await axios.get(
          "https://economia.awesomeapi.com.br/last/CAD-BRL"
        );
        let data = response.data;
        return data?.CADBRL.create_date;
      }
      if (coin === "MXN") {
        let response = await axios.get(
          "https://economia.awesomeapi.com.br/last/MXN-BRL"
        );
        let data = response.data;
        return data?.MXNBRL.create_date;
      }
      if (coin === "GBP") {
        let response = await axios.get(
          "https://economia.awesomeapi.com.br/last/GBP-BRL"
        );
        let data = response.data;
        return data?.GBPBRL.create_date;
      }
}
