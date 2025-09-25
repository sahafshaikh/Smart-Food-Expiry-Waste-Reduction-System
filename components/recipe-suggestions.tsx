"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ChefHat, Clock, Users, Star, RefreshCw, Search, Utensils, Heart } from "lucide-react"
import type { FoodItem } from "@/lib/database"

interface Recipe {
  id: string
  title: string
  description: string
  cookTime: number
  servings: number
  difficulty: "Easy" | "Medium" | "Hard"
  rating: number
  ingredients: string[]
  instructions: string[]
  image: string
  tags: string[]
  usingIngredients: string[]
}

interface RecipeSuggestionsProps {
  expiringItems: FoodItem[]
}

export function RecipeSuggestions({ expiringItems }: RecipeSuggestionsProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<"all" | "quick" | "easy" | "popular">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState<string>("all")

  useEffect(() => {
    if (expiringItems.length > 0) {
      generateRecipes()
    }
  }, [expiringItems])

  const generateRecipes = async () => {
    setLoading(true)

    // Mock AI-powered recipe generation based on expiring items
    setTimeout(() => {
      const mockRecipes: Recipe[] = [
        {
          id: "1",
          title: "Creamy Spinach and Milk Smoothie",
          description: "A nutritious green smoothie perfect for using up fresh spinach and milk before they expire.",
          cookTime: 5,
          servings: 2,
          difficulty: "Easy",
          rating: 4.5,
          ingredients: ["Fresh Spinach (200g)", "Organic Milk (1 cup)", "Banana (1)", "Honey (1 tbsp)", "Ice cubes"],
          instructions: [
            "Wash the fresh spinach thoroughly",
            "Add spinach, milk, banana, and honey to blender",
            "Blend until smooth and creamy",
            "Add ice cubes and blend again",
            "Serve immediately",
          ],
          image: "/green-smoothie-spinach.jpg",
          tags: ["Healthy", "Quick", "Breakfast", "Vegetarian"],
          usingIngredients: ["Fresh Spinach", "Organic Milk"],
        },
        {
          id: "2",
          title: "Greek Yogurt Parfait",
          description: "Layer Greek yogurt with fresh fruits for a delicious and healthy treat.",
          cookTime: 10,
          servings: 1,
          difficulty: "Easy",
          rating: 4.8,
          ingredients: [
            "Greek Yogurt (1 cup)",
            "Bananas (2)",
            "Honey (2 tbsp)",
            "Granola (1/4 cup)",
            "Berries (optional)",
          ],
          instructions: [
            "Slice bananas into rounds",
            "Layer yogurt in a glass or bowl",
            "Add sliced bananas",
            "Drizzle with honey",
            "Top with granola and berries",
            "Serve immediately",
          ],
          image: "/yogurt-parfait-berries.jpg",
          tags: ["Healthy", "Breakfast", "No-Cook", "Protein"],
          usingIngredients: ["Greek Yogurt", "Bananas"],
        },
        {
          id: "3",
          title: "Quick Chicken and Vegetable Stir Fry",
          description: "Use up your chicken breast and fresh vegetables in this quick and tasty stir fry.",
          cookTime: 15,
          servings: 4,
          difficulty: "Medium",
          rating: 4.6,
          ingredients: [
            "Chicken Breast (500g)",
            "Fresh Spinach (100g)",
            "Tomatoes (2)",
            "Soy sauce",
            "Garlic",
            "Ginger",
            "Oil",
          ],
          instructions: [
            "Cut chicken breast into bite-sized pieces",
            "Heat oil in a large pan or wok",
            "Cook chicken until golden brown",
            "Add minced garlic and ginger",
            "Add chopped tomatoes and cook until soft",
            "Add spinach and stir until wilted",
            "Season with soy sauce and serve hot",
          ],
          image: "/chicken-stir-fry-vegetables.jpg",
          tags: ["Dinner", "High-Protein", "Asian", "Quick"],
          usingIngredients: ["Chicken Breast", "Fresh Spinach", "Tomatoes"],
        },
        {
          id: "4",
          title: "Tomato and Cheese Grilled Sandwich",
          description: "A classic comfort food using fresh tomatoes and cheese.",
          cookTime: 8,
          servings: 2,
          difficulty: "Easy",
          rating: 4.3,
          ingredients: [
            "Whole Wheat Bread (4 slices)",
            "Tomatoes (2)",
            "Cheddar Cheese (100g)",
            "Butter",
            "Salt",
            "Pepper",
          ],
          instructions: [
            "Slice tomatoes into thick rounds",
            "Butter one side of each bread slice",
            "Place cheese and tomato slices between bread",
            "Season with salt and pepper",
            "Grill in a pan until golden brown on both sides",
            "Serve hot and crispy",
          ],
          image: "/grilled-cheese-tomato-sandwich.jpg",
          tags: ["Lunch", "Comfort Food", "Quick", "Vegetarian"],
          usingIngredients: ["Tomatoes", "Cheddar Cheese"],
        },
      ]

      setRecipes(mockRecipes)
      setLoading(false)
    }, 2000)
  }

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFilter =
      filter === "all" ||
      (filter === "quick" && recipe.cookTime <= 15) ||
      (filter === "easy" && recipe.difficulty === "Easy") ||
      (filter === "popular" && recipe.rating >= 4.5)

    return matchesSearch && matchesFilter
  })

  const expiringIngredients = expiringItems.map((item) => item.name)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ChefHat className="h-6 w-6" />
            Recipe Suggestions
          </h2>
          <p className="text-muted-foreground">AI-powered recipes using your expiring ingredients</p>
        </div>
        <Button onClick={generateRecipes} disabled={loading} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Generating..." : "Refresh Recipes"}
        </Button>
      </div>

      {/* Expiring Ingredients Alert */}
      {expiringIngredients.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200">Use These Ingredients Soon</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {expiringIngredients.map((ingredient) => (
                    <Badge key={ingredient} variant="outline" className="text-yellow-700 border-yellow-300">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search recipes..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                All
              </Button>
              <Button variant={filter === "quick" ? "default" : "outline"} size="sm" onClick={() => setFilter("quick")}>
                Quick (≤15 min)
              </Button>
              <Button variant={filter === "easy" ? "default" : "outline"} size="sm" onClick={() => setFilter("easy")}>
                Easy
              </Button>
              <Button
                variant={filter === "popular" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("popular")}
              >
                Popular
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted rounded-t-lg"></div>
              <CardContent className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Recipe Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredRecipes.length === 0 && recipes.length > 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No recipes found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
          </CardContent>
        </Card>
      )}

      {/* No Expiring Items */}
      {!loading && expiringItems.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <ChefHat className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No expiring ingredients</h3>
            <p className="text-muted-foreground">Add some food items to get personalized recipe suggestions</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={recipe.image || "/placeholder.svg"} alt={recipe.title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/90 text-black">
            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
            {recipe.rating}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-balance">{recipe.title}</h3>
            <p className="text-sm text-muted-foreground text-pretty">{recipe.description}</p>
          </div>

          {/* Recipe Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {recipe.cookTime} min
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {recipe.servings} servings
            </div>
            <Badge variant="outline" className="text-xs">
              {recipe.difficulty}
            </Badge>
          </div>

          {/* Using Ingredients */}
          {recipe.usingIngredients.length > 0 && (
            <div>
              <p className="text-xs font-medium text-green-600 mb-1">Using your ingredients:</p>
              <div className="flex flex-wrap gap-1">
                {recipe.usingIngredients.map((ingredient) => (
                  <Badge key={ingredient} variant="secondary" className="text-xs bg-green-100 text-green-800">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1" onClick={() => setShowDetails(!showDetails)}>
              <Utensils className="h-4 w-4 mr-2" />
              {showDetails ? "Hide Recipe" : "View Recipe"}
            </Button>
            <Button size="sm" variant="outline">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Recipe Details */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t space-y-4">
            <div>
              <h4 className="font-medium mb-2">Ingredients:</h4>
              <ul className="text-sm space-y-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Instructions:</h4>
              <ol className="text-sm space-y-2">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
