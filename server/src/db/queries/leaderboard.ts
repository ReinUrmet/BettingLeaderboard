import { db } from '../knex';

//Loon uue endpointi, kus töötlen andmeid
//See endpoint peaks joinima customer ja bet tabelid ning nende abil arvutama asju

export async function getLeaderboard(countryFilter : String) {
    const results = await db('customer')

    //Nüüd lisan kokku customer tabeli (customer.id) ja bet tabeli (bet.customer_id)
    .join('bet', 'customer.id', 'bet.customer_id')

    //Võtan nüüd ainult win ja lost väärtused, jättan välja pending: 
    .whereIn('bet.status', ['WON', 'LOST'])

    //Nüüd loon uue fieldi fullname kus panen ees ja perenime kokku
    .select(
        'customer.id as id',
        db.raw("CONCAT(customer.first_name, ' ', customer.last_name) as \"fullName\""),
        'customer.country'
    )

    // loen WIN ja LOSE bettid
    .count('bet.id as totalBets')

    // Kalkuleerin siin võiduprotsendi ja teisendan selle JavaScript numbriks
    .select(db.raw(
      "ROUND(SUM(CASE WHEN bet.status = 'WON' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2)::float as \"winPercentage\""
    ))

    // Kalkuleerin proffiti ja teisendan selle JavaScript numbriks
    .sum({
        profit: db.raw(`
          CASE 
            WHEN bet.status = 'WON' THEN bet.stake * (bet.odds - 1)
            WHEN bet.status = 'LOST' THEN -bet.stake
            ELSE 0
          END
        `)
      })

    .groupBy('customer.id')
    .modify(qb => {
      if (countryFilter && countryFilter.toLowerCase() !== 'all') {
        qb.where('customer.country', countryFilter);
      }
    })

    // Kui proffit on negatiivne siis filterin nad välja
    .havingRaw(`
        SUM(
          CASE 
            WHEN bet.status = 'WON' THEN bet.stake * (bet.odds - 1)
            WHEN bet.status = 'LOST' THEN -bet.stake
            ELSE 0
          END
        ) > 0
      `)
    //Siin järjestan tulemused proffiti järgi
      .orderBy('profit', 'desc')
      .limit(10);

    //Seejärel returnin tulemused, teisendan numbrid JavaScript number tüüpi
    //Seejärel returnin tulemused, teisendan numbrid JavaScript number tüüpi
    return results.map((row: any) => ({
      ...row,
      totalBets: Number(row.totalBets),
      winPercentage: Number(row.winPercentage),
      profit: Number(row.profit)
    }));

}
