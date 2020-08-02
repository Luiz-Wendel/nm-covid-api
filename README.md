# nm-covid-api

- **Expor uma API que recebe um intervalo de datas (leva-se em conta a data de início e de fim) e um estado**

Ex: http://localhost/?state=PR&dateStart=2020-05-10&dateEnd=2020-05-18

- **Consumir as informações do WebService sobre casos de Covid19 disponível no endereço**

https://brasil.io/api/dataset/covid19/caso/data/?state=PR&date=2020-05-10

- **Calcular as top 10 cidades com maior aumento percentual de casos em relação a população total da cidade no período**

> Exemplos:

> Curitiba - 1000 habitantes
> 01/01 -> 10 casos

> 31/01 -> 15 casos

> Representa um aumento de 5 casos para 1000 habitantes (0.5% de aumento)

> São Paulo - 10000 habitantes
> 01/01 -> 10 casos

> 31/01 -> 30 casos

> Representa um aumento de 20 casos para 10000 habitantes (0.2% de aumento)

- **Após filtrar as informações desejadas, fazer um POST para cada posição no seguinte formato:**

> Method

> POST

> Header

> MeuNome: Nome //Alterar para seu nome

> Body

> {

> id: [0-9], // conforme a posição, sendo 0 o maior número de casos

> nomeCidade: nomeCidade,

> percentualDeCasos: x

> }
