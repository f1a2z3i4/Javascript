var readline=require('readline');
var fs=require('fs');
var lineReader=readline.createInterface({input:fs.createReadStream('G20.csv')});

var country;
var population_13,population_10;
var gdp_13,gdp_10;
var purchasing_13,purchasing_10;
var country_index;
var population13_index,population10_index,population_index;
var gdp_index,gdp10_index;
var purchase13_index,purchase10_index;
var population_limit,gdp_limit;
var i=0;
var population_array=[];
var gdp_array=[];
var purchase_array=[];
var growth_array=[];
var aggregate_array=[];
var populationgrowth,purchasinggrowth;

var asiaContinent = ['India', 'China', 'Japan', 'Indonesia'];
var europeContinent = ['France', 'Russia', 'UK', 'Italy'];
var northAmericaContinent = ['Japan', 'Mexico', 'canada', 'USA'];
var southAmericaContinent = ['Saudi Arabia', 'Republic of Korea', 'Turkey'];
var australiaContinent = ['United Kingdom', 'Australia','Germany'];
var africaContinent = ['South Africa', 'Argentina', 'Brazil'];
var continents_array = ["asiaContinent","europeContinent","northAmericaContinent","southAmericaContinent","australiaContinent","africaContinent"];
var continent_population=[0,0,0,0,0,0];
var continent_gdp=[0,0,0,0,0,0];


function population_sort(country, population_13)
{
  this.country=country;
  this.population_13=population_13;
}

function gdp_sort(country, gdp_13)
{
  this.country=country;
  this.gdp_13=gdp_13;
}

function purchase_sort(country, purchasing_13)
{
  this.country=country;
  this.purchasing_13=purchasing_13;
}
function growth_sort(country, populationgrowth, purchasinggrowth)
{
    this.country = country;
    this.populationgrowth = populationgrowth;
    this.purchasinggrowth = purchasinggrowth;
}
function aggregate_sort(continents_array,continent_population,continent_gdp)
{
    this.continents=continents_array;
    this.continent_population=continent_population;
    this.continent_gdp=continent_gdp;
}
lineReader.on('line',function(line)
{
  var record=line.trim().split(',');

  if(i<1)
  {
    country_index=record.indexOf('Country Name');
    console.log(country_index);
    population10_index = record.indexOf('Population (Millions) 2010');
    population13_index=record.indexOf('Population (Millions) 2013');
    gdp10_index=record.indexOf('GDP Billions (USD) 2010');
    gdp_index=record.indexOf('GDP Billions (USD) 2013');
    purchase10_index = record.indexOf('Gross domestic product based on Purchasing-Power-Parity (PPP) valuation of Country GDP in Billions (Current International Dollar) 2010');
    purchase13_index=record.indexOf('Gross domestic product based on Purchasing-Power-Parity (PPP) valuation of Country GDP in Billions (Current International Dollar) 2013');
    i++;
  }
  else
    {
      country=record[country_index];
      population_10 = record[population10_index];
      population_13=record[population13_index];
      gdp_10=record[gdp10_index];
      gdp_13=record[gdp_index];
      purchasing_10 = record[purchase10_index];
      purchasing_13=record[purchase13_index];
      populationgrowth = (parseFloat(population_13)*1000) - (parseFloat(population_10)*1000);
      purchasinggrowth = parseFloat(purchasing_13) - parseFloat(purchasing_10);

      population_array.push(new population_sort(country,population_13));
      population_array.sort(function(a,b)
      {
        return parseFloat(b.population_13)-parseFloat(a.population_13);
      });

      gdp_array.push(new gdp_sort(country,gdp_13));
      gdp_array.sort(function(a,b)
      {
        return parseFloat(b.gdp_13)-parseFloat(a.gdp_13);
      });

      purchase_array.push(new purchase_sort(country,purchasing_13));
      purchase_array.sort(function(a,b)
      {
        return parseFloat(b.purchasing_13)-parseFloat(a.purchasing_13);
      });
      growth_array.push(new growth_sort(country, populationgrowth, purchasinggrowth));


population_index=parseInt(population10_index);
gdp_index=parseInt(gdp10_index);
population_limit=population10_index+parseInt(6);
gdp_limit=gdp10_index+parseInt(6);
for(index=population_index;index<population_limit;index++)
{
if (africaContinent.includes(country)) {

                    continent_population[0] =parseFloat(continent_population[0] + parseFloat(record[population_index]));


               } else if (europeContinent.includes(country)) {
                     continent_population[1]= parseFloat(continent_population[1] + parseFloat(record[population_index]));
                  } else if (northAmericaContinent.includes(country)) {
                      continent_population[2] =parseFloat(continent_population[2] + parseFloat(record[population_index]));

                  } else if (southAmericaContinent.includes(country)) {
                      continent_population[3] = parseFloat(continent_population[3] + parseFloat(record[population_index]));

                  } else if (australiaContinent.includes(country)) {
                      continent_population[4] =parseFloat(continent_population[4] + parseFloat(record[population_index]));
                  } else if (asiaContinent.includes(country)) {
                      continent_population[5] =parseFloat(continent_population[5] + parseFloat(record[population_index]));

                 }
            }
            for (index = gdp_index; index < gdp_limit; index++)
            {
                if (africaContinent.indexOf(country) > -1)
                {
                    continents = continents_array[0];
                    continent_gdp[0] = parseFloat(continent_gdp[0]) + parseFloat(record[gdp_index]);
                }
                 else if (europeContinent.indexOf(country) > -1)
                 {
                     continents= continents_array[1];
                     continent_gdp[1] = parseFloat(continent_gdp[1]) + parseFloat(record[gdp_index]);
                 }
                 else if (northAmericaContinent.indexOf(country) > -1)
                 {
                     continents = continents_array[2];
                     continent_gdp[2] = parseFloat(continent_gdp[2]) + parseFloat(record[gdp_index]);
                 }
               else if (southAmericaContinent.indexOf(country) > -1)
                 {
                     continents = continents_array[3];
                     continent_gdp[3] = parseFloat(continent_gdp[3]) + parseFloat(record[gdp_index]);
                 }
                 else if (australiaContinent.indexOf(country) > -1)
                 {
                     continents = continents_array[4];
                     continent_gdp[4] = parseFloat(continent_gdp[4]) + parseFloat(record[gdp_index]);
               }
                 else if (asiaContinent.indexOf(country) > -1)
                 {
                     continents = continents_array[5];
                     continent_gdp[5] = parseFloat(continent_gdp[5]) + parseFloat(record[gdp_index]);
                 }
               }
            }
          });
              lineReader.on("close",function()
              {
                for (var it = 0; it < 6; it++)
                {
                  aggregate_array.push(new aggregate_sort(continents_array[it],continent_population[it],continent_gdp[it]));

                }



    fs.writeFileSync("population.json",JSON.stringify(population_array),encoding="UTF8");
    fs.writeFileSync("gdp.json",JSON.stringify(gdp_array),encoding="UTF8");
    fs.writeFileSync("purchase-pow.json",JSON.stringify(purchase_array),encoding="UTF8");
    fs.writeFileSync("growth.json",JSON.stringify(growth_array),encoding="UTF8");
fs.writeFileSync("aggregate.json", JSON.stringify(aggregate_array), encoding = "utf8");
  });
