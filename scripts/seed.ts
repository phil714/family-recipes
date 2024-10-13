import { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'

export default async () => {
  try {
    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:

    const users = [
      {
        id: '1',
        name: 'Philippe Deschesnes',
        email: 'philippe.deschesnes@hotmail.com',
        password: 'AAAaaa111',
      },
      {
        id: '2',
        name: 'Laurence Amyotte',
        email: 'philippe.deschesnes+1@hotmail.com',
        password: 'AAAaaa111',
      },
    ]

    for (const user of users) {
      const [hashedPassword, salt] = hashPassword(user.password)
      await db.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          hashedPassword,
          salt,
        },
      })
    }

    const families: Prisma.FamilyCreateManyInput[] = [
      {
        id: '1',
        name: 'Deschesnes',
      },
      {
        id: '2',
        name: 'Amyotte',
      },
      {
        id: '3',
        name: 'Roy',
      },
    ]

    await db.family.createMany({ data: families })

    const familyMembers: Prisma.FamilyMemberCreateManyInput[] = [
      {
        id: '1',
        userId: '1',
        familyId: '1',
        accessRole: 'ADMIN',
      },
      {
        id: '2',
        userId: '1',
        familyId: '2',
        accessRole: 'USER',
      },
      {
        id: '3',
        userId: '1',
        familyId: '3',
        accessRole: 'ADMIN',
      },
      {
        id: '4',
        userId: '2',
        familyId: '2',
        accessRole: 'ADMIN',
      },
    ]

    await db.familyMember.createMany({ data: familyMembers })

    const tags: Prisma.TagCreateManyInput[] = [
      {
        id: '1',
        name: 'Chinese',
        color: '#FF4500'
      },
      {
        id: '2',
        name: 'French',
        color: '#4682B4'
      },
      {
        id: '3',
        name: 'Canadian',
        color: '#8FBC8F'
      },
      {
        id: '4',
        name: 'Mexican',
        color: '#FFD700'
      },
      {
        id: '5',
        name: 'Italian',
        color: '#FF6347'
      },
      {
        id: '6',
        name: 'Japanese',
        color: '#FF69B4'
      },
      {
        id: '7',
        name: 'Indian',
        color: '#FF8C00'
      },
      {
        id: '8',
        name: 'Thai',
        color: '#32CD32'
      },
      {
        id: '9',
        name: 'Greek',
        color: '#4682B4'
      },
      {
        id: '10',
        name: 'Spanish',
        color: '#DC143C'
      }
    ]


    await db.tag.createMany({ data: tags })

    const ingredients: Prisma.IngredientCreateManyInput[] = [
      { id: "1", name: "Tomato", description: "Juicy, tangy fruit, great for cooking and sauces.", color: "#FF6347" },
      { id: "2", name: "Egg", description: "Versatile protein, ideal for scrambling or frying.", color: "#FFFACD" },
      { id: "3", name: "Oil", description: "Used for frying and adding richness to dishes.", color: "#FFD700" },
      { id: "4", name: "Salt", description: "Enhances flavor in all types of dishes.", color: "#FFFFFF" },
      { id: "5", name: "Sugar", description: "Adds a hint of sweetness to balance acidity.", color: "#FFFAFA" },
      { id: "6", name: "Green Onion", description: "Mild onion flavor, perfect for garnishing dishes.", color: "#7CFC00" },
      { id: "7", name: "Whole Chicken", description: "A whole bird, commonly used for roasting or grilling.", color: "#F5DEB3" },
      { id: "8", name: "Olive Oil", description: "Rich, healthy oil made from pressed olives.", color: "#BDB76B" },
      { id: "9", name: "Black Pepper", description: "A pungent spice made from dried peppercorns.", color: "#000000" },
      { id: "10", name: "Garlic Powder", description: "Ground garlic in powdered form for easy seasoning.", color: "#F8F8FF" },
      { id: "11", name: "Paprika", description: "A red spice made from ground sweet peppers.", color: "#FF4500" },
      { id: "12", name: "Lemon", description: "Bright yellow citrus, tart and juicy, commonly used for flavor.", color: "#FFF44F" }
    ];


    await db.ingredient.createMany({ data: ingredients })

    await db.recipe.create(
      {
        data: {
          id: "1",
          name: "Tomato and Egg Stir-Fry",
          description: "A quick and simple stir-fry combining fresh tomatoes and scrambled eggs. This classic dish is packed with flavor and comes together in just a few minutes. It's perfect for a light meal or as a side to rice.",
          cookingTimeMinutes: 5,
          preparationTimeMinutes: 5,
          familyId: '1',
          familyMemberId: '1',
          status: 'PUBLIC',
          instructions: `
        **Ingredients:**
        - 2 medium tomatoes, chopped
        - 3 large eggs
        - 1 tablespoon oil (vegetable or olive oil)
        - 1/2 teaspoon salt (adjust to taste)
        - 1/4 teaspoon sugar (optional)
        - Green onions, chopped (optional, for garnish)

        **Instructions:**

        1. **Prepare the eggs**: Crack the eggs into a bowl, add a pinch of salt, and beat well until smooth.
        2. **Cook the eggs**: Heat a tablespoon of oil in a pan over medium heat. Pour in the beaten eggs and scramble gently. Once the eggs are just set but still soft, remove them from the pan and set aside.
        3. **Cook the tomatoes**: In the same pan, add a little more oil if needed. Add the chopped tomatoes, sprinkle with a bit of salt and sugar, and stir-fry until they soften and release their juices (about 2-3 minutes).
        4. **Combine**: Add the scrambled eggs back into the pan and stir gently to combine with the tomatoes. Let them cook together for another 1-2 minutes, until the flavors meld.
        5. **Serve**: Garnish with chopped green onions if desired, and serve hot with rice or on its own.
        `,
          tags: {
            connect: [{ id: '1' }]
          },
          ingredients: {
            connect: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }]
          }
        }
      })
    await db.recipe.create({
      data: {
        id: "2",
        name: "Simple Roast Chicken",
        description: "A classic and easy roast chicken recipe that delivers tender, juicy meat with crispy skin. This no-fuss dish uses simple seasonings and can be customized with your favorite herbs. Perfect for a comforting dinner or meal prep for the week.",
        cookingTimeMinutes: 60,
        preparationTimeMinutes: 10,
        familyId: '2',
        familyMemberId: '4',
        status: 'PRIVATE',
        instructions: `
        **Ingredients:**
        - 1 whole chicken (about 4-5 lbs)
        - 2 tablespoons olive oil
        - 1 teaspoon salt
        - 1/2 teaspoon black pepper
        - 1 teaspoon garlic powder (optional)
        - 1 teaspoon paprika (optional)
        - Lemon (optional, for added flavor)

        **Instructions:**

        1. **Preheat oven**: Set your oven to 425°F (220°C).
        2. **Prepare the chicken**: Pat the chicken dry with paper towels. Rub olive oil all over the chicken, and season generously with salt, pepper, garlic powder, and paprika. Optionally, stuff the cavity with lemon slices or fresh herbs for extra flavor.
        3. **Roast**: Place the chicken breast-side up in a roasting pan or on a baking sheet. Roast for 1 hour to 1 hour and 15 minutes, or until the internal temperature reaches 165°F (75°C).
        4. **Rest and serve**: Let the chicken rest for 10-15 minutes before carving. Serve with your favorite sides.`,
        tags: {
          connect: [{ id: '2' }]
        },
        ingredients: {
          connect: [{ id: '4' }, { id: '7' }, { id: '8' }, { id: '9' }, { id: '10' }, { id: '11' }, { id: '12' }]
        }
      }
    })



  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
