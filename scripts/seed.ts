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
        name: 'Philippe Deschesnes Admin',
        email: 'philippe.deschesnes+admin@hotmail.com',
        password: 'AAAaaa111',
      },
      {
        id: '3',
        name: 'Philippe Deschesnes User',
        email: 'philippe.deschesnes+user@hotmail.com',
        password: 'AAAaaa111',
      },
      {
        id: '4',
        name: 'Philippe Deschesnes Viewer',
        email: 'philippe.deschesnes+viewer@hotmail.com',
        password: 'AAAaaa111',
      },
      {
        id: '5',
        name: 'Laurence Amyotte',
        email: 'philippe.deschesnes+laurence@hotmail.com',
        password: 'AAAaaa111',
      },
      {
        id: '6',
        name: 'Philippe Deschesnes User',
        email: 'philippe.deschesnes+user2@hotmail.com',
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
        userId: '2',
        familyId: '1',
        accessRole: 'ADMIN',
      },
      {
        id: '3',
        userId: '3',
        familyId: '1',
        accessRole: 'USER',
      },
      {
        id: '4',
        userId: '4',
        familyId: '1',
        accessRole: 'VIEWER',
      },

      {
        id: '5',
        userId: '2',
        familyId: '2',
        accessRole: 'VIEWER',
      },
      {
        id: '6',
        userId: '5',
        familyId: '2',
        accessRole: 'ADMIN',
      },
      {
        id: '7',
        userId: '1',
        familyId: '3',
        accessRole: 'ADMIN',
      },
      {
        id: '8',
        userId: '6',
        familyId: '1',
        accessRole: 'USER',
      },
    ]

    await db.familyMember.createMany({ data: familyMembers })

    const tags: Prisma.TagCreateManyInput[] = [
      {
        id: '1',
        name: 'Chinese',
        color: '#FF4500',
        description:
          'A culinary tradition rich in history, known for bold flavors and a balance of sweet, sour, salty, and umami, with popular dishes like stir-fries, dumplings, and noodles.',
      },
      {
        id: '2',
        name: 'French',
        color: '#4682B4',
        description:
          'Renowned for its attention to detail and sophisticated techniques, this cuisine emphasizes sauces, pastries, and dishes like coq au vin and croissants.',
      },
      {
        id: '3',
        name: 'Canadian',
        color: '#8FBC8F',
        description:
          'A diverse and hearty cuisine influenced by various cultures, featuring iconic dishes like poutine, butter tarts, and a strong focus on maple syrup.',
      },
      {
        id: '4',
        name: 'Mexican',
        color: '#FFD700',
        description:
          'Bursting with vibrant flavors, it often includes a combination of chiles, beans, corn, and meats in dishes such as tacos, enchiladas, and mole.',
      },
      {
        id: '5',
        name: 'Italian',
        color: '#FF6347',
        description:
          'Famous for its use of fresh ingredients and simple, yet flavorful combinations, with beloved staples like pasta, pizza, and rich regional specialties.',
      },
      {
        id: '6',
        name: 'Japanese',
        color: '#FF69B4',
        description:
          'Focused on seasonal ingredients and delicate presentation, offering dishes like sushi, ramen, and tempura, with an emphasis on balance and freshness.',
      },
      {
        id: '7',
        name: 'Indian',
        color: '#FF8C00',
        description:
          'Known for its rich use of spices and complex flavors, this cuisine offers a variety of dishes like curries, biryani, and vegetarian options.',
      },
      {
        id: '8',
        name: 'Thai',
        color: '#32CD32',
        description:
          'A flavorful cuisine balancing sweet, sour, salty, and spicy, with dishes like pad Thai, curries, and salads that make use of fresh herbs and bold spices.',
      },
      {
        id: '9',
        name: 'Greek',
        color: '#4682B4',
        description:
          'Rooted in Mediterranean traditions, it features fresh ingredients like olive oil, feta, and herbs, with well-known dishes like souvlaki, moussaka, and tzatziki.',
      },
      {
        id: '10',
        name: 'Spanish',
        color: '#DC143C',
        description:
          'Known for its variety of small plates (tapas), vibrant spices, and seafood-heavy dishes like paella, with a focus on olive oil and fresh vegetables.',
      },
    ]

    await db.tag.createMany({ data: tags })

    const ingredients: Prisma.IngredientCreateManyInput[] = [
      {
        id: '1',
        name: 'Tomato',
        description: 'Juicy, tangy fruit, great for cooking and sauces.',
        color: '#FF6347',
      },
      {
        id: '2',
        name: 'Egg',
        description: 'Versatile protein, ideal for scrambling or frying.',
        color: '#FFFACD',
      },
      {
        id: '3',
        name: 'Oil',
        description: 'Used for frying and adding richness to dishes.',
        color: '#FFD700',
      },
      {
        id: '4',
        name: 'Salt',
        description: 'Enhances flavor in all types of dishes.',
        color: '#FFFFFF',
      },
      {
        id: '5',
        name: 'Sugar',
        description: 'Adds a hint of sweetness to balance acidity.',
        color: '#FFFAFA',
      },
      {
        id: '6',
        name: 'Green Onion',
        description: 'Mild onion flavor, perfect for garnishing dishes.',
        color: '#7CFC00',
      },
      {
        id: '7',
        name: 'Whole Chicken',
        description: 'A whole bird, commonly used for roasting or grilling.',
        color: '#F5DEB3',
      },
      {
        id: '8',
        name: 'Olive Oil',
        description: 'Rich, healthy oil made from pressed olives.',
        color: '#BDB76B',
      },
      {
        id: '9',
        name: 'Black Pepper',
        description: 'A pungent spice made from dried peppercorns.',
        color: '#000000',
      },
      {
        id: '10',
        name: 'Garlic Powder',
        description: 'Ground garlic in powdered form for easy seasoning.',
        color: '#F8F8FF',
      },
      {
        id: '11',
        name: 'Paprika',
        description: 'A red spice made from ground sweet peppers.',
        color: '#FF4500',
      },
      {
        id: '12',
        name: 'Lemon',
        description:
          'Bright yellow citrus, tart and juicy, commonly used for flavor.',
        color: '#FFF44F',
      },
    ]

    await db.ingredient.createMany({ data: ingredients })

    await db.recipe.create({
      data: {
        id: '1',
        name: 'Tomato and Egg Stir-Fry',
        mainImageUrl:
          'https://christieathome.com/blog/chinese-tomato-egg-stir-fry/',
        description:
          "A quick and simple stir-fry combining fresh tomatoes and scrambled eggs. This classic dish is packed with flavor and comes together in just a few minutes. It's perfect for a light meal or as a side to rice.",
        cookingTimeMinutes: 5,
        preparationTimeMinutes: 5,
        familyId: '1',
        familyMemberId: '1',
        status: 'PUBLIC',
        instructions: `
          <p><strong>Ingredients:</strong></p>
          <ul>
            <li>2 medium tomatoes, chopped</li>
            <li>3 large eggs</li>
            <li>1 tablespoon oil (vegetable or olive oil)</li>
            <li>1/2 teaspoon salt (adjust to taste)</li>
            <li>1/4 teaspoon sugar (optional)</li>
            <li>Green onions, chopped (optional, for garnish)</li>
          </ul>

          <p><strong>Instructions:</strong></p>
          <ol>
            <li><strong>Prepare the eggs</strong>: Crack the eggs into a bowl, add a pinch of salt, and beat well until smooth.</li>
            <li><strong>Cook the eggs</strong>: Heat a tablespoon of oil in a pan over medium heat. Pour in the beaten eggs and scramble gently. Once the eggs are just set but still soft, remove them from the pan and set aside.</li>
            <li><strong>Cook the tomatoes</strong>: In the same pan, add a little more oil if needed. Add the chopped tomatoes, sprinkle with a bit of salt and sugar, and stir-fry until they soften and release their juices (about 2-3 minutes).</li>
            <li><strong>Combine</strong>: Add the scrambled eggs back into the pan and stir gently to combine with the tomatoes. Let them cook together for another 1-2 minutes, until the flavors meld.</li>
            <li><strong>Serve</strong>: Garnish with chopped green onions if desired, and serve hot with rice or on its own.</li>
          </ol>
        `,
        tags: {
          connect: [{ id: '1' }],
        },
        ingredients: {
          connect: [
            { id: '1' },
            { id: '2' },
            { id: '3' },
            { id: '4' },
            { id: '5' },
            { id: '6' },
          ],
        },
      },
    })
    await db.recipe.create({
      data: {
        id: '2',
        name: 'Simple Roast Chicken',
        mainImageUrl:
          'https://christieathome.com/blog/chinese-tomato-egg-stir-fry/',
        description:
          'A classic and easy roast chicken recipe that delivers tender, juicy meat with crispy skin. This no-fuss dish uses simple seasonings and can be customized with your favorite herbs. Perfect for a comforting dinner or meal prep for the week.',
        cookingTimeMinutes: 60,
        preparationTimeMinutes: 10,
        familyId: '2',
        familyMemberId: '4',
        status: 'PRIVATE',
        instructions: `
        <p><strong>Ingredients:</strong></p>
        <ul>
          <li>1 whole chicken (about 4-5 lbs)</li>
          <li>2 tablespoons olive oil</li>
          <li>1 teaspoon salt</li>
          <li>1/2 teaspoon black pepper</li>
          <li>1 teaspoon garlic powder (optional)</li>
          <li>1 teaspoon paprika (optional)</li>
          <li>Lemon (optional, for added flavor)</li>
        </ul>

        <p><strong>Instructions:</strong></p>
        <ol>
          <li><strong>Preheat oven</strong>: Set your oven to 425°F (220°C).</li>
          <li><strong>Prepare the chicken</strong>: Pat the chicken dry with paper towels. Rub olive oil all over the chicken, and season generously with salt, pepper, garlic powder, and paprika. Optionally, stuff the cavity with lemon slices or fresh herbs for extra flavor.</li>
          <li><strong>Roast</strong>: Place the chicken breast-side up in a roasting pan or on a baking sheet. Roast for 1 hour to 1 hour and 15 minutes, or until the internal temperature reaches 165°F (75°C).</li>
          <li><strong>Rest and serve</strong>: Let the chicken rest for 10-15 minutes before carving. Serve with your favorite sides.</li>
        </ol>
`,
        tags: {
          connect: [{ id: '2' }],
        },
        ingredients: {
          connect: [
            { id: '4' },
            { id: '7' },
            { id: '8' },
            { id: '9' },
            { id: '10' },
            { id: '11' },
            { id: '12' },
          ],
        },
      },
    })
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
