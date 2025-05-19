import React, { useState, useEffect } from "react";
import { X, Plus, Minus, Check, Trophy, Repeat, Trash2, AlertCircle } from "lucide-react";

interface PlayerPosition {
  top: string;
  left: string;
}

interface Player {
  id: number;
  number: number;
  name: string;
  position: PlayerPosition;
  goals: number;
  assists: number;
  shots: number;
  yellowCards: number;
  redCards: number;
  performanceHistory: {
    matchesPlayed: number;
    seasonGoals: number;
    seasonAssists: number;
    bettingHighlight: string;
  };
}

interface SubstitutePlayer {
  id: number;
  number: number;
  name: string;
  position: string; // GK, DEF, MID, FWD
  goals: number;
  assists: number;
  shots: number;
  yellowCards: number;
  redCards: number;
  performanceHistory: {
    matchesPlayed: number;
    seasonGoals: number;
    seasonAssists: number;
    bettingHighlight: string;
  };
}

interface Team {
  id: string;
  name: string;
  color: string;
  players: Player[];
  substitutes: SubstitutePlayer[];
}

type StatKey = "goals" | "assists" | "shots" | "yellowCards" | "redCards";

interface BetSelection {
  playerId: number;
  teamId: string;
  playerName: string;
  playerNumber: number;
  stat: StatKey;
  value: number;
  odds: string;
}

interface ModalOdds {
  goals?: number;
  assists?: number;
  shots?: number;
  yellowCards?: number;
  redCards?: number;
}

const FootballPitch = () => {
  // Basic team data
  const [teams, setTeams] = useState<Team[]>([
    {
      id: "home",
      name: "Team A",
      color: "#ff0000",
      players: [
        {
          id: 1,
          number: 1,
          name: "GK",
          position: { top: "85%", left: "50%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 120, seasonGoals: 0, seasonAssists: 2, bettingHighlight: "Penalty Save Expert" },
        },
        {
          id: 2,
          number: 2,
          name: "RB",
          position: { top: "70%", left: "80%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 150, seasonGoals: 2, seasonAssists: 5, bettingHighlight: "Crossing Specialist" },
        },
        {
          id: 3,
          number: 5,
          name: "CB",
          position: { top: "70%", left: "65%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 180, seasonGoals: 3, seasonAssists: 1, bettingHighlight: "Aerial Threat on Set Pieces" },
        },
        {
          id: 4,
          number: 6,
          name: "CB",
          position: { top: "70%", left: "35%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 170, seasonGoals: 2, seasonAssists: 0, bettingHighlight: "Solid Tackler" },
        },
        {
          id: 5,
          number: 3,
          name: "LB",
          position: { top: "70%", left: "20%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 160, seasonGoals: 1, seasonAssists: 6, bettingHighlight: "Overlapping Runs" },
        },
        {
          id: 6,
          number: 4,
          name: "CM",
          position: { top: "55%", left: "50%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 200, seasonGoals: 5, seasonAssists: 10, bettingHighlight: "Midfield Engine" },
        },
        {
          id: 7,
          number: 8,
          name: "RM",
          position: { top: "40%", left: "80%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 130, seasonGoals: 8, seasonAssists: 7, bettingHighlight: "Pacey Winger" },
        },
        {
          id: 8,
          number: 10,
          name: "CAM",
          position: { top: "40%", left: "50%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 220, seasonGoals: 12, seasonAssists: 15, bettingHighlight: "Creative Playmaker" },
        },
        {
          id: 9,
          number: 7,
          name: "LM",
          position: { top: "40%", left: "20%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 140, seasonGoals: 7, seasonAssists: 9, bettingHighlight: "Dribbling Ace" },
        },
        {
          id: 10,
          number: 9,
          name: "ST",
          position: { top: "20%", left: "35%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 190, seasonGoals: 20, seasonAssists: 5, bettingHighlight: "Clinical Finisher" },
        },
        {
          id: 11,
          number: 11,
          name: "ST",
          position: { top: "20%", left: "65%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 185, seasonGoals: 18, seasonAssists: 6, bettingHighlight: "Poacher" },
        },
      ],
      substitutes: [
        {
          id: 12,
          number: 12,
          name: "SUB GK",
          position: "GK",
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 30, seasonGoals: 0, seasonAssists: 0, bettingHighlight: "Good Shot Stopper" },
        },
        {
          id: 13,
          number: 13,
          name: "SUB DEF",
          position: "DEF",
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 40, seasonGoals: 1, seasonAssists: 1, bettingHighlight: "Versatile Defender" },
        },
        {
          id: 14,
          number: 14,
          name: "SUB MID",
          position: "MID",
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 50, seasonGoals: 2, seasonAssists: 3, bettingHighlight: "Impact Sub" },
        },
      ],
    },
    {
      id: "away",
      name: "Team B",
      color: "#0000ff",
      players: [
        {
          id: 1,
          number: 1,
          name: "GK",
          position: { top: "15%", left: "50%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 110, seasonGoals: 0, seasonAssists: 1, bettingHighlight: "Commanding Presence" },
        },
        {
          id: 2,
          number: 2,
          name: "RB",
          position: { top: "30%", left: "20%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 140, seasonGoals: 1, seasonAssists: 4, bettingHighlight: "Tenacious Defender" },
        },
        {
          id: 3,
          number: 5,
          name: "CB",
          position: { top: "30%", left: "35%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 175, seasonGoals: 2, seasonAssists: 0, bettingHighlight: "Strong in the Air" },
        },
        {
          id: 4,
          number: 6,
          name: "CB",
          position: { top: "30%", left: "65%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 165, seasonGoals: 1, seasonAssists: 1, bettingHighlight: "Good Reading of Game" },
        },
        {
          id: 5,
          number: 3,
          name: "LB",
          position: { top: "30%", left: "80%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 155, seasonGoals: 0, seasonAssists: 5, bettingHighlight: "Attacking Fullback" },
        },
        {
          id: 6,
          number: 4,
          name: "CM",
          position: { top: "45%", left: "50%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 190, seasonGoals: 4, seasonAssists: 8, bettingHighlight: "Box-to-Box Midfielder" },
        },
        {
          id: 7,
          number: 8,
          name: "RM",
          position: { top: "60%", left: "20%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 125, seasonGoals: 6, seasonAssists: 6, bettingHighlight: "Tricky Winger" },
        },
        {
          id: 8,
          number: 10,
          name: "CAM",
          position: { top: "60%", left: "50%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 210, seasonGoals: 10, seasonAssists: 12, bettingHighlight: "Visionary Passer" },
        },
        {
          id: 9,
          number: 7,
          name: "LM",
          position: { top: "60%", left: "80%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 135, seasonGoals: 5, seasonAssists: 7, bettingHighlight: "Known for Long Shots" },
        },
        {
          id: 10,
          number: 9,
          name: "ST",
          position: { top: "80%", left: "35%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 180, seasonGoals: 22, seasonAssists: 4, bettingHighlight: "Goal Machine" },
        },
        {
          id: 11,
          number: 11,
          name: "ST",
          position: { top: "80%", left: "65%" },
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 175, seasonGoals: 19, seasonAssists: 7, bettingHighlight: "Consistent Scorer" },
        },
      ],
      substitutes: [
        {
          id: 12,
          number: 12,
          name: "SUB GK",
          position: "GK",
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 25, seasonGoals: 0, seasonAssists: 0, bettingHighlight: "Reliable Backup" },
        },
        {
          id: 13,
          number: 13,
          name: "SUB DEF",
          position: "DEF",
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 35, seasonGoals: 0, seasonAssists: 1, bettingHighlight: "Solid Defensive Option" },
        },
        {
          id: 14,
          number: 14,
          name: "SUB MID",
          position: "MID",
          goals: 0,
          assists: 0,
          shots: 0,
          yellowCards: 0,
          redCards: 0,
          performanceHistory: { matchesPlayed: 45, seasonGoals: 1, seasonAssists: 2, bettingHighlight: "Energetic Midfielder" },
        },
      ],
    },
  ]);

  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | SubstitutePlayer | null>(null);
  const [betSelections, setBetSelections] = useState<BetSelection[]>([]);
  const [stakeAmount, setStakeAmount] = useState("");
  const [modalOdds, setModalOdds] = useState<ModalOdds>({});
  const [totalModalOdds, setTotalModalOdds] = useState<number>(1);

  const activeTeam = teams[activeTeamIndex];

  // Update player stats and add to bet
  const updatePlayerStats = (playerId: number, stat: StatKey, value: number) => {
    // Find if player belongs to main squad or substitutes
    let player: Player | SubstitutePlayer | undefined;
    let isSubstitute = false;

    let playerIndex = activeTeam.players.findIndex((p) => p.id === playerId);
    if (playerIndex !== -1) {
      player = activeTeam.players[playerIndex];
    } else {
      playerIndex = activeTeam.substitutes.findIndex((p) => p.id === playerId);
      if (playerIndex !== -1) {
        player = activeTeam.substitutes[playerIndex];
        isSubstitute = true;
      }
    }

    if (!player) return;

    // Update the team state
    const newTeams = [...teams];
    const teamToUpdate = newTeams[activeTeamIndex];
    
    if (isSubstitute) {
      const sub = teamToUpdate.substitutes[playerIndex] as SubstitutePlayer;
      sub[stat] = value;
    } else {
      const mainPlayer = teamToUpdate.players[playerIndex] as Player;
      mainPlayer[stat] = value;
    }
    setTeams(newTeams);

    // Update modal odds
    const oddValue = getRandomOdds(stat, value);
    setModalOdds((prev) => ({
      ...prev,
      [stat]: value > 0 ? parseFloat(oddValue) : 0,
    }));

    // Add to bet selections if value > 0
    if (value > 0) {
      // Check if bet already exists
      const existingBetIndex = betSelections.findIndex(
        (bet) =>
          bet.playerId === playerId &&
          bet.teamId === activeTeam.id &&
          bet.stat === stat
      );

      if (existingBetIndex !== -1) {
        // Update existing bet
        const newBets = [...betSelections];
        newBets[existingBetIndex].value = value;
        newBets[existingBetIndex].odds = oddValue.toString();
        setBetSelections(newBets);
      } else {
        // Add new bet
        setBetSelections([
          ...betSelections,
          {
            playerId,
            teamId: activeTeam.id,
            playerName: player.name,
            playerNumber: player.number,
            stat,
            value,
            odds: oddValue.toString(),
          },
        ]);
      }
    } else {
      // Remove bet if value is 0
      setBetSelections(
        betSelections.filter(
          (bet) =>
            !(
              bet.playerId === playerId &&
              bet.teamId === activeTeam.id &&
              bet.stat === stat
            )
        )
      );
    }
  };

  // Generate random odds based on stat and value
  const getRandomOdds = (stat: StatKey, value: number): string => {
    if (value === 0) return "0";

    const baseOdds: Record<StatKey, number> = {
      goals: 3.5,
      assists: 4.2,
      shots: 1.8,
      yellowCards: 3.0,
      redCards: 12.0,
    };

    // Odds increase with higher values
    return (baseOdds[stat] * (value * 0.5 + 1)).toFixed(2);
  };

  // Calculate total odds
  const calculateTotalOdds = (): string => {
    if (betSelections.length === 0) return "0.00";
    return betSelections
      .reduce((acc, bet) => acc * parseFloat(bet.odds), 1)
      .toFixed(2);
  };

  // Calculate potential returns
  const calculateReturns = (): string => {
    if (!stakeAmount) return "0.00";
    const totalOdds = parseFloat(calculateTotalOdds());
    if (isNaN(totalOdds)) return "0.00";
    return (parseFloat(stakeAmount) * totalOdds).toFixed(2);
  };

  // Switch active team
  const switchTeam = () => {
    setActiveTeamIndex(activeTeamIndex === 0 ? 1 : 0);
    setSelectedPlayer(null);
  };

  // Format stat name for display
  const formatStatName = (stat: StatKey): string => {
    switch (stat) {
      case "goals":
        return "Goals";
      case "assists":
        return "Assists";
      case "shots":
        return "Shots";
      case "yellowCards":
        return "Yellow Cards";
      case "redCards":
        return "Red Cards";
      default:
        return stat;
    }
  };

  // Set up modal odds when a player is selected
  useEffect(() => {
    if (selectedPlayer) {
      const odds: ModalOdds = {
        goals:
          selectedPlayer.goals > 0
            ? parseFloat(getRandomOdds("goals", selectedPlayer.goals))
            : 0,
        assists:
          selectedPlayer.assists > 0
            ? parseFloat(getRandomOdds("assists", selectedPlayer.assists))
            : 0,
        shots:
          selectedPlayer.shots > 0
            ? parseFloat(getRandomOdds("shots", selectedPlayer.shots))
            : 0,
        yellowCards:
          selectedPlayer.yellowCards > 0
            ? parseFloat(
                getRandomOdds("yellowCards", selectedPlayer.yellowCards)
              )
            : 0,
        redCards:
          selectedPlayer.redCards > 0
            ? parseFloat(getRandomOdds("redCards", selectedPlayer.redCards))
            : 0,
      };

      setModalOdds(odds);

      // Calculate total modal odds
      let total = 1;
      Object.values(odds).forEach((oddValue) => {
        if (oddValue && oddValue > 0) total *= oddValue;
      });

      setTotalModalOdds(total > 1 ? parseFloat(total.toFixed(2)) : 1);
    }
  }, [selectedPlayer]);

  // Update total modal odds when individual odds change
  useEffect(() => {
    if (Object.keys(modalOdds).length > 0) {
      let total = 1;
      Object.values(modalOdds).forEach((oddValue) => {
        if (oddValue && oddValue > 0) total *= oddValue;
      });

      setTotalModalOdds(total > 1 ? parseFloat(total.toFixed(2)) : 1);
    }
  }, [modalOdds]);

  // Remove bet from bet slip
  const removeBet = (index: number) => {
    const betToRemove = betSelections[index];
    
    // Find the player in teams array
    const playerTeamIndex = teams.findIndex(team => team.id === betToRemove.teamId);
    if (playerTeamIndex === -1) return;
    
    // Find if player is in main squad or substitutes
    let player: Player | SubstitutePlayer | undefined;
    let isSubstitute = false;
    let playerIdx = -1; // Renamed from playerIndex to avoid conflict
    
    const teamToUpdate = teams[playerTeamIndex];

    playerIdx = teamToUpdate.players.findIndex(
      (p) => p.id === betToRemove.playerId
    );
    
    if (playerIdx !== -1) {
      player = teamToUpdate.players[playerIdx];
    } else {
      playerIdx = teamToUpdate.substitutes.findIndex(
        (p) => p.id === betToRemove.playerId
      );
      if (playerIdx !== -1) {
        player = teamToUpdate.substitutes[playerIdx];
        isSubstitute = true;
      }
    }
    
    if (!player) return;

    // Update the team state - set the stat to 0
    const newTeams = [...teams];
    const targetTeam = newTeams[playerTeamIndex];
    if (isSubstitute) {
      const sub = targetTeam.substitutes[playerIdx] as SubstitutePlayer;
      sub[betToRemove.stat] = 0;
    } else {
      const mainPlayer = targetTeam.players[playerIdx] as Player;
      mainPlayer[betToRemove.stat] = 0;
    }
    setTeams(newTeams);
    
    // If this player is currently selected in the modal, update the modal odds
    if (selectedPlayer && selectedPlayer.id === betToRemove.playerId) {
      setModalOdds((prev) => ({
        ...prev,
        [betToRemove.stat]: 0,
      }));
    }
    
    // Remove from bet selections
    const newBetSelections = [...betSelections];
    newBetSelections.splice(index, 1);
    setBetSelections(newBetSelections);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Trophy size={24} className="mr-2 text-yellow-400 animate-pulse" />
            Football Bet Builder
          </h1>
          <button
            onClick={switchTeam}
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-full flex items-center transition-all shadow-md hover:scale-105"
          >
            <span className="font-medium">{activeTeam.name}</span>
            <Repeat size={16} className="ml-2" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto mt-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pitch */}
          <div className="lg:col-span-2">
            <div
              className="relative w-full bg-gradient-to-b from-green-800 to-green-700 border-2 border-white rounded-xl overflow-hidden shadow-xl"
              style={{ height: "60vh" }}
            >
              {/* Pitch Markings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-2 border-white rounded-full opacity-80"></div>
              </div>
              <div className="absolute top-0 left-0 w-full h-1/5 border-b-2 border-white opacity-80"></div>
              <div className="absolute bottom-0 left-0 w-full h-1/5 border-t-2 border-white opacity-80"></div>
              <div className="absolute top-0 left-0 w-full flex justify-center">
                <div className="w-1/3 h-12 border-b-2 border-l-2 border-r-2 border-white opacity-80"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-full flex justify-center">
                <div className="w-1/3 h-12 border-t-2 border-l-2 border-r-2 border-white opacity-80"></div>
              </div>
              <div className="absolute left-1/2 top-0 bottom-0 w-0 border-l border-dashed border-white opacity-80"></div>

              {/* Players on Pitch */}
              {activeTeam.players.map((player) => (
                <div
                  key={player.id}
                  className="absolute cursor-pointer transition-transform hover:scale-110"
                  style={{
                    top: player.position.top,
                    left: player.position.left,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => setSelectedPlayer(player)}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold ring-2 ring-white shadow-lg transition-all hover:ring-3 hover:ring-yellow-300"
                    style={{ 
                      backgroundColor: activeTeam.color,
                      boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)"
                    }}
                  >
                    {player.number}
                    {player.goals > 0 && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs text-black font-bold shadow-md border border-white animate-bounce">
                        {player.goals}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-center bg-black bg-opacity-70 text-white rounded-full mt-1 px-2 py-0.5 font-medium">
                    {player.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Substitutes */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-5 mt-5 rounded-xl shadow-md">
              <h2 className="font-bold text-lg mb-3 flex items-center">
                <span className="mr-2">Substitutes</span>
                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                  {activeTeam.substitutes.length}
                </span>
              </h2>
              <div className="flex space-x-5 overflow-x-auto py-2 px-1">
                {activeTeam.substitutes.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
                    onClick={() => setSelectedPlayer(sub)}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all hover:ring-2 hover:ring-yellow-300"
                      style={{ 
                        backgroundColor: activeTeam.color,
                        boxShadow: "0 0 8px rgba(255, 255, 255, 0.2)"
                      }}
                    >
                      {sub.number}
                    </div>
                    <div className="text-xs text-center mt-2 font-medium">{sub.name}</div>
                    <div className="text-xs text-center text-gray-400">{sub.position}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bet Slip Panel */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-700 rounded-xl p-5 shadow-xl">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-600 flex items-center">
              <span className="bg-green-600 p-1.5 rounded-md mr-2">
                <Check size={18} />
              </span>
              Bet Slip
              {betSelections.length > 0 && (
                <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  {betSelections.length}
                </span>
              )}
            </h2>

            {betSelections.length === 0 ? (
              <div className="text-center text-gray-400 py-8 border-2 border-dashed border-gray-600 rounded-lg">
                <AlertCircle size={32} className="mx-auto mb-2 opacity-50" />
                <p className="font-medium">No selections added</p>
                <p className="text-sm mt-2 max-w-xs mx-auto">
                  Click on players to add bets to your slip
                </p>
              </div>
            ) : (
              <div className="max-h-[28rem] overflow-y-auto mb-4 space-y-3 pr-1">
                {betSelections.map((bet, index) => (
                  <div 
                    key={index} 
                    className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-3 shadow-md transition-all hover:shadow-lg hover:from-gray-600 hover:to-gray-500 animate-fadeIn"
                  >
                    <div className="flex justify-between mb-2">
                      <div className="font-semibold flex items-center">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2 border border-white"
                          style={{ backgroundColor: teams.find(t => t.id === bet.teamId)?.color }}
                        >
                          {bet.playerNumber}
                        </div>
                        {bet.playerName}
                      </div>
                      <div className="flex items-center">
                        <div className="text-green-400 font-bold text-lg mr-2">{bet.odds}</div>
                        <button 
                          onClick={() => removeBet(index)}
                          className="text-gray-400 hover:text-red-400 transition-colors p-1 rounded-full hover:bg-gray-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-300 flex justify-between">
                      <span>{formatStatName(bet.stat)}: {bet.value}</span>
                      <span className="text-yellow-400">
                        {bet.teamId === "home" ? "Team A" : "Team B"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 bg-gray-900 p-4 rounded-lg shadow-inner">
              <div className="flex justify-between mb-3 text-sm">
                <span>Total Odds:</span>
                <span className="font-bold text-green-400 text-lg">
                  {calculateTotalOdds()}
                </span>
              </div>

              <div className="mb-2 text-sm font-medium">Your Stake</div>
              <div className="relative mb-4">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">£</span>
                <input
                  type="number"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="0.00"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                />
              </div>

              <div className="flex justify-between mb-4 bg-gray-800 p-3 rounded-lg">
                <span className="text-sm">Potential Returns:</span>
                <span className="font-bold text-green-400 text-lg">
                  £{calculateReturns()}
                </span>
              </div>

              <button
                className={`w-full font-bold p-4 rounded-lg transition-all ${
                  betSelections.length === 0
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 shadow-lg hover:shadow-xl hover:scale-105 transform active:scale-95"
                }`}
                disabled={betSelections.length === 0}
              >
                Place Bet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Player Bet Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-20 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-gradient-to-b from-gray-800 to-gray-700 rounded-xl w-full max-w-md shadow-2xl transform transition-all animate-slideUp"
          >
            <div className="flex justify-between items-center p-5 border-b border-gray-600">
              <h2 className="font-bold text-xl flex items-center">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 border border-white"
                  style={{ backgroundColor: activeTeam.color }}
                >
                  {selectedPlayer.number}
                </div>
                {selectedPlayer.name}
              </h2>
              <button 
                onClick={() => setSelectedPlayer(null)}
                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-5">
              {/* Combined Odds Display */}
              <div className="bg-gradient-to-r from-gray-700 to-gray-600 p-4 rounded-xl mb-5 shadow-inner">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Combined Odds:</span>
                  <span className="text-green-400 font-bold text-2xl">
                    {totalModalOdds}
                  </span>
                </div>
              </div>

              {/* Player Performance History */}
              {selectedPlayer.performanceHistory && (
                <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg mb-5 shadow-inner">
                  <h3 className="text-md font-semibold mb-3 text-yellow-400 text-center">Player Insights</h3>
                  <div className="text-center mb-3">
                    <p className="text-lg font-semibold text-white">{selectedPlayer.performanceHistory.bettingHighlight}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm border-t border-gray-600 pt-3">
                    <div className="text-center">
                      <div className="font-bold text-lg">{selectedPlayer.performanceHistory.matchesPlayed}</div>
                      <div className="text-gray-400">Matches</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{selectedPlayer.performanceHistory.seasonGoals}</div>
                      <div className="text-gray-400">Season Goals</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{selectedPlayer.performanceHistory.seasonAssists}</div>
                      <div className="text-gray-400">Season Assists</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Stats Controls */}
              <div className="space-y-5">
                {/* Goals */}
                <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg transition-all hover:bg-opacity-70">
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium">Goals</label>
                    <span
                      className={`text-sm ${
                        modalOdds.goals
                          ? "text-green-400 font-bold"
                          : "text-gray-400"
                      }`}
                    >
                      {modalOdds.goals ? `Odds: ${modalOdds.goals}` : "No bet"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-gray-600 hover:bg-gray-500 p-2.5 rounded-l-lg transition-colors active:bg-gray-700"
                      onClick={() =>
                        updatePlayerStats(
                          selectedPlayer.id,
                          "goals",
                          Math.max(0, selectedPlayer.goals - 1)
                        )
                      }
                    >
                      <Minus size={16} />
                    </button>
                    <div className="flex-grow text-center bg-gray-800 py-2.5 font-bold">
                      {selectedPlayer.goals}
                    </div>
                    <button
                      className="bg-gray-600 hover:bg-gray-500 p-2.5 rounded-r-lg transition-colors active:bg-gray-700"
                      onClick={() =>
                        updatePlayerStats(
                          selectedPlayer.id,
                          "goals",
                          selectedPlayer.goals + 1
                        )
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Assists */}
                <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg transition-all hover:bg-opacity-70">
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium">Assists</label>
                    <span
                      className={`text-sm ${
                        modalOdds.assists
                          ? "text-green-400 font-bold"
                          : "text-gray-400"
                      }`}
                    >
                      {modalOdds.assists
                        ? `Odds: ${modalOdds.assists}`
                        : "No bet"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-gray-600 hover:bg-gray-500 p-2.5 rounded-l-lg transition-colors active:bg-gray-700"
                      onClick={() =>
                        updatePlayerStats(
                          selectedPlayer.id,
                          "assists",
                          Math.max(0, selectedPlayer.assists - 1)
                        )
                      }
                    >
                      <Minus size={16} />
                    </button>
                    <div className="flex-grow text-center bg-gray-800 py-2.5 font-bold">
                      {selectedPlayer.assists}
                    </div>
                    <button
                      className="bg-gray-600 hover:bg-gray-500 p-2.5 rounded-r-lg transition-colors active:bg-gray-700"
                      onClick={() =>
                        updatePlayerStats(
                          selectedPlayer.id,
                          "assists",
                          selectedPlayer.assists + 1
                        )
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Shots */}
                <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg transition-all hover:bg-opacity-70">
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium">Shots</label>
                    <span
                      className={`text-sm ${
                        modalOdds.shots
                          ? "text-green-400 font-bold"
                          : "text-gray-400"
                      }`}
                    >
                      {modalOdds.shots ? `Odds: ${modalOdds.shots}` : "No bet"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-gray-600 hover:bg-gray-500 p-2.5 rounded-l-lg transition-colors active:bg-gray-700"
                      onClick={() =>
                        updatePlayerStats(
                          selectedPlayer.id,
                          "shots",
                          Math.max(0, selectedPlayer.shots - 1)
                        )
                      }
                    >
                      <Minus size={16} />
                    </button>
                    <div className="flex-grow text-center bg-gray-800 py-2.5 font-bold">
                      {selectedPlayer.shots}
                    </div>
                    <button
                      className="bg-gray-600 hover:bg-gray-500 p-2.5 rounded-r-lg transition-colors active:bg-gray-700"
                      onClick={() =>
                        updatePlayerStats(
                          selectedPlayer.id,
                          "shots",
                          selectedPlayer.shots + 1
                        )
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Yellow Cards */}
                <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg transition-all hover:bg-opacity-70">
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium">
                      Yellow Cards
                    </label>
                    <span
                      className={`text-sm ${
                        modalOdds.yellowCards
                          ? "text-green-400 font-bold"
                          : "text-gray-400"
                      }`}
                    >
                      {modalOdds.yellowCards
                        ? `Odds: ${modalOdds.yellowCards}`
                        : "No bet"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-gray-600 hover:bg-gray-500 p-2.5 rounded-l-lg transition-colors active:bg-gray-700"
                      onClick={() =>
                        updatePlayerStats(
                          selectedPlayer.id,
                          "yellowCards",
                          Math.max(0, selectedPlayer.yellowCards - 1)
                        )
                      }
                    >
                      <Minus size={16} />
                    </button>
                    <div className="flex-grow text-center bg-gray-800 py-2.5 font-bold">
                      {selectedPlayer.yellowCards}
                    </div>
                    <button
                      className="bg-gray-600 hover:bg-gray-500 p-2.5 rounded-r-lg transition-colors active:bg-gray-700"
                      onClick={() =>
                        updatePlayerStats(
                          selectedPlayer.id,
                          "yellowCards",
                          selectedPlayer.yellowCards + 1
                        )
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Red Cards */}
                <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg transition-all hover:bg-opacity-70">
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium">Red Cards</label>
                    <span
                      className={`text-sm ${
                        modalOdds.redCards
                          ? "text-green-400 font-bold"
                          : "text-gray-400"
                      }`}
                    >
                      {modalOdds.redCards
                        ? `Odds: ${modalOdds.redCards}`
                        : "No bet"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-gray-600 hover:bg-gray-500 p-2.5 rounded-l-lg transition-colors active:bg-gray-700"
                      onClick={() =>
                        updatePlayerStats(
                          selectedPlayer.id,
                          "redCards",
                          Math.max(0, selectedPlayer.redCards - 1)
                        )
                      }
                    >
                      <Minus size={16} />
                    </button>
                    <div className="flex-grow text-center bg-gray-800 py-2.5 font-bold">
                      {selectedPlayer.redCards}
                    </div>
                    <button
                      className="bg-gray-600 hover:bg-gray-500 p-2.5 rounded-r-lg transition-colors active:bg-gray-700"
                      onClick={() =>
                        updatePlayerStats(
                          selectedPlayer.id,
                          "redCards",
                          selectedPlayer.redCards + 1
                        )
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedPlayer(null)}
                className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 font-bold py-3 px-4 rounded-lg mt-5 flex items-center justify-center transition-all shadow-lg transform hover:scale-105 active:scale-95"
              >
                <Check size={18} className="mr-2" />
                Add to Bet Slip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add these animation keyframes to your CSS/Tailwind setup */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FootballPitch;
