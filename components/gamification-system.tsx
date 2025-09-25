"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Target, Flame, Award, TrendingUp, Zap, Crown, Medal, Gift } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: "streak" | "milestone" | "environmental" | "social"
  points: number
  unlocked: boolean
  unlockedDate?: string
  progress?: number
  maxProgress?: number
}

interface UserStats {
  level: number
  totalPoints: number
  pointsToNextLevel: number
  currentStreak: number
  longestStreak: number
  totalItemsSaved: number
  co2Saved: number
  moneySaved: number
}

interface Challenge {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "monthly"
  target: number
  progress: number
  points: number
  deadline: string
  completed: boolean
}

export function GamificationSystem() {
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGamificationData()
  }, [])

  const loadGamificationData = async () => {
    setLoading(true)

    // Mock gamification data
    const mockUserStats: UserStats = {
      level: 7,
      totalPoints: 2450,
      pointsToNextLevel: 550,
      currentStreak: 12,
      longestStreak: 18,
      totalItemsSaved: 45,
      co2Saved: 12.5,
      moneySaved: 85.5,
    }

    const mockAchievements: Achievement[] = [
      {
        id: "1",
        title: "First Steps",
        description: "Add your first food item",
        icon: <Star className="h-5 w-5" />,
        category: "milestone",
        points: 50,
        unlocked: true,
        unlockedDate: "2024-01-15",
      },
      {
        id: "2",
        title: "Zero Waste Week",
        description: "Complete a week without wasting any food",
        icon: <Trophy className="h-5 w-5" />,
        category: "streak",
        points: 200,
        unlocked: true,
        unlockedDate: "2024-01-22",
      },
      {
        id: "3",
        title: "Recipe Master",
        description: "Use 10 recipe suggestions",
        icon: <Award className="h-5 w-5" />,
        category: "milestone",
        points: 150,
        unlocked: false,
        progress: 6,
        maxProgress: 10,
      },
      {
        id: "4",
        title: "Eco Warrior",
        description: "Save 10kg of CO₂ emissions",
        icon: <Target className="h-5 w-5" />,
        category: "environmental",
        points: 300,
        unlocked: true,
        unlockedDate: "2024-01-28",
      },
      {
        id: "5",
        title: "Streak Champion",
        description: "Maintain a 30-day zero waste streak",
        icon: <Flame className="h-5 w-5" />,
        category: "streak",
        points: 500,
        unlocked: false,
        progress: 12,
        maxProgress: 30,
      },
      {
        id: "6",
        title: "Community Helper",
        description: "Share 5 items with neighbors",
        icon: <Gift className="h-5 w-5" />,
        category: "social",
        points: 250,
        unlocked: false,
        progress: 2,
        maxProgress: 5,
      },
    ]

    const mockChallenges: Challenge[] = [
      {
        id: "1",
        title: "Daily Scanner",
        description: "Scan at least 1 item today",
        type: "daily",
        target: 1,
        progress: 1,
        points: 25,
        deadline: "2024-01-31T23:59:59Z",
        completed: true,
      },
      {
        id: "2",
        title: "Weekly Waste Warrior",
        description: "Keep waste under 10% this week",
        type: "weekly",
        target: 10,
        progress: 8.5,
        points: 100,
        deadline: "2024-02-04T23:59:59Z",
        completed: false,
      },
      {
        id: "3",
        title: "Recipe Explorer",
        description: "Try 3 new recipes this week",
        type: "weekly",
        target: 3,
        progress: 1,
        points: 75,
        deadline: "2024-02-04T23:59:59Z",
        completed: false,
      },
      {
        id: "4",
        title: "Monthly Saver",
        description: "Save $50 this month by reducing waste",
        type: "monthly",
        target: 50,
        progress: 32.5,
        points: 200,
        deadline: "2024-01-31T23:59:59Z",
        completed: false,
      },
    ]

    setUserStats(mockUserStats)
    setAchievements(mockAchievements)
    setChallenges(mockChallenges)
    setLoading(false)
  }

  const getLevelProgress = () => {
    if (!userStats) return 0
    const currentLevelPoints = userStats.totalPoints % 1000
    return (currentLevelPoints / 1000) * 100
  }

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "text-purple-600"
    if (streak >= 14) return "text-blue-600"
    if (streak >= 7) return "text-green-600"
    return "text-yellow-600"
  }

  const getChallengeProgress = (challenge: Challenge) => {
    return (challenge.progress / challenge.target) * 100
  }

  const getChallengeTimeLeft = (deadline: string) => {
    const now = new Date()
    const end = new Date(deadline)
    const diff = end.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d left`
    if (hours > 0) return `${hours}h left`
    return "Ending soon"
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
              <div className="h-20 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!userStats) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            Achievements & Challenges
          </h2>
          <p className="text-muted-foreground">Track your progress and earn rewards for sustainable habits</p>
        </div>
      </div>

      {/* User Level & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-600" />
              Level {userStats.level} - Sustainability Champion
            </CardTitle>
            <CardDescription>{userStats.pointsToNextLevel} points to next level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Level {userStats.level + 1}</span>
                <span>
                  {userStats.totalPoints} / {userStats.totalPoints + userStats.pointsToNextLevel} XP
                </span>
              </div>
              <Progress value={getLevelProgress()} className="h-3" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{userStats.totalPoints}</div>
                <p className="text-xs text-muted-foreground">Total Points</p>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getStreakColor(userStats.currentStreak)}`}>
                  {userStats.currentStreak}
                </div>
                <p className="text-xs text-muted-foreground">Current Streak</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userStats.totalItemsSaved}</div>
                <p className="text-xs text-muted-foreground">Items Saved</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">${userStats.moneySaved}</div>
                <p className="text-xs text-muted-foreground">Money Saved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-600" />
              Streak Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getStreakColor(userStats.currentStreak)}`}>
                {userStats.currentStreak}
              </div>
              <p className="text-sm text-muted-foreground">Days without waste</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Personal Best</span>
                <span>{userStats.longestStreak} days</span>
              </div>
              <Progress value={(userStats.currentStreak / userStats.longestStreak) * 100} className="h-2" />
            </div>

            <div className="text-center pt-2">
              <Badge variant={userStats.currentStreak >= 7 ? "default" : "secondary"}>
                {userStats.currentStreak >= 30
                  ? "Legendary"
                  : userStats.currentStreak >= 14
                    ? "Expert"
                    : userStats.currentStreak >= 7
                      ? "Champion"
                      : "Getting Started"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Achievements and Challenges */}
      <Tabs defaultValue="achievements">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`transition-all ${
                  achievement.unlocked
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                    : "border-muted"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        achievement.unlocked
                          ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {achievement.unlocked ? achievement.icon : <Star className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-balance">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground text-pretty">{achievement.description}</p>

                      <div className="flex items-center justify-between mt-3">
                        <Badge variant={achievement.unlocked ? "default" : "secondary"}>{achievement.points} XP</Badge>
                        {achievement.unlocked ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <Trophy className="h-3 w-3 mr-1" />
                            Unlocked
                          </Badge>
                        ) : achievement.progress !== undefined ? (
                          <div className="text-xs text-muted-foreground">
                            {achievement.progress}/{achievement.maxProgress}
                          </div>
                        ) : (
                          <Badge variant="outline">Locked</Badge>
                        )}
                      </div>

                      {!achievement.unlocked && achievement.progress !== undefined && (
                        <div className="mt-2">
                          <Progress
                            value={(achievement.progress / (achievement.maxProgress || 1)) * 100}
                            className="h-1"
                          />
                        </div>
                      )}

                      {achievement.unlocked && achievement.unlockedDate && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map((challenge) => (
              <Card
                key={challenge.id}
                className={`transition-all ${
                  challenge.completed
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                    : "border-muted"
                }`}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-balance">{challenge.title}</h3>
                        <p className="text-sm text-muted-foreground text-pretty">{challenge.description}</p>
                      </div>
                      <Badge
                        variant={
                          challenge.type === "daily" ? "default" : challenge.type === "weekly" ? "secondary" : "outline"
                        }
                      >
                        {challenge.type}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {challenge.progress}
                          {challenge.type === "weekly" && challenge.title.includes("waste") ? "%" : ""}
                          {challenge.type === "monthly" && challenge.title.includes("Save") ? "$" : ""}
                          {" / "}
                          {challenge.target}
                          {challenge.type === "weekly" && challenge.title.includes("waste") ? "%" : ""}
                          {challenge.type === "monthly" && challenge.title.includes("Save") ? "$" : ""}
                        </span>
                      </div>
                      <Progress value={getChallengeProgress(challenge)} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          <Zap className="h-3 w-3 mr-1" />
                          {challenge.points} XP
                        </Badge>
                        {challenge.completed && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <Medal className="h-3 w-3 mr-1" />
                            Complete
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{getChallengeTimeLeft(challenge.deadline)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Leaderboard Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Community Leaderboard
          </CardTitle>
          <CardDescription>See how you rank among other sustainability champions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { rank: 1, name: "EcoMaster2024", points: 3250, streak: 45 },
              { rank: 2, name: "GreenGuru", points: 2890, streak: 32 },
              { rank: 3, name: "You", points: userStats.totalPoints, streak: userStats.currentStreak },
              { rank: 4, name: "WasteWarrior", points: 2200, streak: 28 },
              { rank: 5, name: "SustainableSam", points: 2100, streak: 15 },
            ].map((user) => (
              <div
                key={user.rank}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  user.name === "You" ? "bg-primary/10 border border-primary/20" : "bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      user.rank === 1
                        ? "bg-yellow-100 text-yellow-800"
                        : user.rank === 2
                          ? "bg-gray-100 text-gray-800"
                          : user.rank === 3
                            ? "bg-orange-100 text-orange-800"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {user.rank}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.streak} day streak</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{user.points} XP</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
