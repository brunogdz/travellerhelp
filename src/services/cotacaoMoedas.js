import axios from "axios";

async function cotacaoCoin(coin ) {
  if (coin === "USD") {
    let response = await axios.get(
      "https://economia.awesomeapi.com.br/last/USD-BRL"
    );
    let data = response.data;
    return data?.USDBRL.bid;
  }
  if (coin === "EUR") {
    let response = await axios.get(
      "https://economia.awesomeapi.com.br/last/EUR-BRL"
    );
    let data = response.data;
    return data?.EURBRL.bid;
  }
  if (coin === "CAD") {
    let response = await axios.get(
      "https://economia.awesomeapi.com.br/last/CAD-BRL"
    );
    let data = response.data;
    return data?.CADBRL.bid;
  }
  if (coin === "MXN") {
    let response = await axios.get(
      "https://economia.awesomeapi.com.br/last/MXN-BRL"
    );
    let data = response.data;
    return data?.MXNBRL.bid;
  }
  if (coin === "GBP") {
    let response = await axios.get(
      "https://economia.awesomeapi.com.br/last/GBP-BRL"
    );
    let data = response.data;
    return data?.GBPBRL.bid;
  }
    // return coin
}

export default cotacaoCoin;