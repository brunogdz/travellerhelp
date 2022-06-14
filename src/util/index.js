export default async function ValorEmReal({valor, cotacao}){
    return parseFloat(valor * cotacao)
}