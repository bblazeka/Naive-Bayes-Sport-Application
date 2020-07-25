﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Models
{
    public class Team
    {
        public int TeamId { get; set; }
        public string TeamName { get; set; }
        public byte[] TeamLogo { get; set; }
        public string Country { get; set; }
        public byte[] Flag { get; set; }
        public List<Player> Players { get; set; }

        public override string ToString()
        {
            return TeamName;
        }
    }
}
