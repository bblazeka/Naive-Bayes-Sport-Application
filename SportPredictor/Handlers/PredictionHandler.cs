﻿using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace SportPredictor.Handlers
{
    public class PredictionHandler
    {
        private PredictionTypes _predictionType;

        public PredictionHandler(PredictionTypes type)
        {
            _predictionType = type;
        }

        public IEnumerable<GameData> GetGames(string start, string end)
        {
            string answer = ApiHandler.SendRequest(RequestBuilder(start, end));
            return ParseAnswer(answer, _predictionType);
        }

        public static string RequestBuilder(string start, string end)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore&startDate={0}&endDate={1}", start, end);
        }

        public static string RequestBuilder(string team, string start, string end)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore&teamId={0}&startDate={1}&endDate={2}", team, start, end);
        }

        public static List<GameData> ParseAnswer(string answer, PredictionTypes type)
        {
            List<GameData> games = new List<GameData>();
            var jsonObject = JObject.Parse(answer);
            foreach (var date in jsonObject["dates"])
            {
                foreach (var game in date["games"])
                {
                    var gamePeriod = game["linescore"]["currentPeriod"].ToObject<int>();
                    var homeScore = game["teams"]["home"]["score"].ToObject<int>();
                    var awayScore = game["teams"]["away"]["score"].ToObject<int>();
                    string resultLabel = (homeScore > awayScore) ? "H" : "A";
                    if (type == PredictionTypes.Multiclass)
                    {
                        if (gamePeriod > 3)
                        {
                            resultLabel += "OT";
                        }
                        else
                        {
                            resultLabel += "W";
                        }
                    }

                    if (game["gameType"].ToObject<string>() == "R")
                    {
                        games.Add(new GameData
                        {
                            Home = game["teams"]["home"]["team"]["id"].ToObject<string>(),
                            Away = game["teams"]["away"]["team"]["id"].ToObject<string>(),
                            Label = resultLabel,
                            HomeWins = game["teams"]["home"]["leagueRecord"]["wins"].ToObject<int>(),
                            HomeLosses = game["teams"]["home"]["leagueRecord"]["losses"].ToObject<int>(),
                            HomeOT = game["teams"]["home"]["leagueRecord"]["ot"].ToObject<int>(),
                            AwayWins = game["teams"]["away"]["leagueRecord"]["wins"].ToObject<int>(),
                            AwayLosses = game["teams"]["away"]["leagueRecord"]["losses"].ToObject<int>(),
                            AwayOT = game["teams"]["away"]["leagueRecord"]["ot"].ToObject<int>()
                        });
                    }
                }
            }
            return games;
        }
    }
}
