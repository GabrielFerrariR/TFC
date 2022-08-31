const homeLeaderBoard = `SELECT  th.team_name AS name, 
(SUM(m.home_team_goals > m.away_team_goals)*3 
  + SUM(m.home_team_goals = m.away_team_goals)) AS totalPoints,
COUNT(m.home_team) AS totalGames,
SUM(m.home_team_goals > m.away_team_goals) AS totalVictories,
SUM(m.home_team_goals = m.away_team_goals) AS totalDraws,
SUM(m.home_team_goals < m.away_team_goals) AS totalLosses,
SUM(m.home_team_goals) as goalsFavor,
SUM(m.away_team_goals) as goalsOwn,
(SUM(m.home_team_goals) - SUM(m.away_team_goals)) as goalsBalance,
FORMAT(
  ((SUM(m.home_team_goals > m.away_team_goals) * 3 + SUM(m.home_team_goals = m.away_team_goals))
    / (COUNT(m.home_team) * 3 )) * 100, 2) as efficiency
FROM matches AS m 
LEFT JOIN  teams AS th 
ON m.home_team = th.id
WHERE m.in_progress = 0
GROUP BY th.id
ORDER BY totalPoints DESC,
totalVictories DESC,
goalsBalance DESC,
goalsFavor DESC,
goalsOwn ASC;`;

export default homeLeaderBoard;

export const awayLeaderBoard = `SELECT  ta.team_name AS name, 
(SUM(m.home_team_goals < m.away_team_goals)*3 
+ SUM(m.home_team_goals = m.away_team_goals)) AS totalPoints,
COUNT(m.away_team) AS totalGames,
SUM(m.home_team_goals < m.away_team_goals) AS totalVictories,
SUM(m.home_team_goals = m.away_team_goals) AS totalDraws,
SUM(m.home_team_goals > m.away_team_goals) AS totalLosses,
SUM(m.away_team_goals) as goalsFavor,
SUM(m.home_team_goals) as goalsOwn,
(SUM(m.away_team_goals) - SUM(m.home_team_goals)) as goalsBalance,
FORMAT(
  ((SUM(m.home_team_goals < m.away_team_goals) * 3 + SUM(m.home_team_goals = m.away_team_goals))
    / (COUNT(m.away_team) * 3 )) * 100, 2) as efficiency
FROM matches AS m 
LEFT JOIN  teams AS ta 
ON m.away_team = ta.id
WHERE m.in_progress = 0
GROUP BY ta.id
ORDER BY totalPoints DESC,
totalVictories DESC,
goalsBalance DESC,
goalsFavor DESC,
goalsOwn ASC;
`;

// nao usei essa query mas ela é funcional
export const allLeaderBoard = `SELECT  mas.name,
SUM(mas.totalPoints) as totalPoints,
SUM(mas.totalGames) as totalGames,
SUM(mas.totalVictories) AS totalVictories,
SUM(mas.totalDraws) AS totalDraws,
SUM(mas.totalLosses) AS totalLosses,
SUM(mas.goalsFavor) as goalsFavor,
SUM(mas.goalsOwn) as goalsOwn,
sum(mas.goalsFavor - mas.goalsOwn) as goalsBalance,
format((SUM(mas.totalPoints)/(SUM(mas.totalGames) * 3)) * 100 , 2) as efficiency
FROM(
SELECT  th.team_name AS name, 
(SUM(m.home_team_goals > m.away_team_goals)*3 
  + SUM(m.home_team_goals = m.away_team_goals)) AS totalPoints,
COUNT(m.home_team) AS totalGames,
SUM(m.home_team_goals > m.away_team_goals) AS totalVictories,
SUM(m.home_team_goals = m.away_team_goals) AS totalDraws,
SUM(m.home_team_goals < m.away_team_goals) AS totalLosses,
SUM(m.home_team_goals) as goalsFavor,
SUM(m.away_team_goals) as goalsOwn,
(SUM(m.home_team_goals) - SUM(m.away_team_goals)) as goalsBalance
FROM matches AS m 
LEFT JOIN  teams AS th 
ON m.home_team = th.id
WHERE m.in_progress = 0
GROUP BY th.id
UNION
SELECT  ta.team_name AS name, 
(SUM(m.home_team_goals < m.away_team_goals)*3 
+ SUM(m.home_team_goals = m.away_team_goals)) AS totalPoints,
COUNT(m.away_team) AS totalGames,
SUM(m.home_team_goals < m.away_team_goals) AS totalVictories,
SUM(m.home_team_goals = m.away_team_goals) AS totalDraws,
SUM(m.home_team_goals > m.away_team_goals) AS totalLosses,
SUM(m.away_team_goals) as goalsFavor,
SUM(m.home_team_goals) as goalsOwn,
(SUM(m.away_team_goals) - SUM(m.home_team_goals)) as goalsBalance
FROM matches AS m 
LEFT JOIN  teams AS ta 
ON m.away_team = ta.id
WHERE m.in_progress = 0
GROUP BY ta.id
) as mas
group by mas.name
ORDER BY totalPoints DESC,
totalVictories DESC,
goalsBalance DESC,
goalsFavor DESC,
goalsOwn ASC;`;
