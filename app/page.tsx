'use client'
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

/* ─── SVG primitives ─── */
const StarPath = "M 0 26.501 C 8.518 26.501 25.554 26.501 25.554 0 C 25.554 25.554 42.674 26.499 51.192 26.499 C 42.674 26.499 25.554 26.499 25.554 53 C 25.554 27.446 8.518 26.501 0 26.501 Z"

const StarSm = ({ style }: { style?: React.CSSProperties }) => (
  <svg className="star-icon stroke-star" style={style} width="15.5" height="16.047" viewBox="0 0 51.192 53" fill="none">
    <path d={StarPath} stroke="#e0dfd5" strokeWidth="1.893" strokeLinecap="butt" strokeLinejoin="miter"/>
  </svg>
)

const StarLg = ({ style }: { style?: React.CSSProperties }) => (
  <svg className="star-icon filled-star" style={style} width="51.192" height="53" viewBox="0 0 51.192 53" fill="none">
    <path d={StarPath} fill="#e0dfd5" stroke="#e0dfd5" strokeWidth="1.893"/>
  </svg>
)

const ArrowR = ({ stroke = '#e0dfd5' }: { stroke?: string }) => (
  <svg width="20" height="16" viewBox="0 0 20.155 16" fill="none">
    <g transform="translate(20.155,16) rotate(180)">
      <path d="M 20.155 8.024 L 0 8.024 M 0 8.024 C 2.579 8.024 7.737 8.024 7.737 0 M 0 8.024 C 2.579 8.024 7.737 8.263 7.737 16"
        stroke={stroke} strokeWidth="0.573" strokeLinecap="butt" strokeLinejoin="miter"/>
    </g>
  </svg>
)

const ArrowL = ({ stroke = '#e0dfd5' }: { stroke?: string }) => (
  <svg width="20" height="16" viewBox="0 0 20.155 16" fill="none">
    <path d="M 20.155 8.024 L 0 8.024 M 0 8.024 C 2.579 8.024 7.737 8.024 7.737 0 M 0 8.024 C 2.579 8.024 7.737 8.263 7.737 16"
      stroke={stroke} strokeWidth="0.573" strokeLinecap="butt" strokeLinejoin="miter"/>
  </svg>
)

const SearchIcon = ({ stroke = '#e0dfd5' }: { stroke?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="8" cy="8" r="7" stroke={stroke} strokeWidth="0.573" />
    <path d="M 12.95 12.95 C 16 16 19.5 16 19.5 20 M 12.95 12.95 C 16 16 16 19.5 20 19.5" stroke={stroke} strokeWidth="0.573" strokeLinecap="butt" strokeLinejoin="miter"/>
  </svg>
)

const BlobPath = "M 0 147.018 C 47.256 147.018 141.767 147.018 141.767 0 C 141.767 141.768 236.744 147.010 284 147.010 C 236.744 147.010 141.767 147.010 141.767 294.028 C 141.767 152.261 47.256 147.018 0 147.018 Z"

/* ─── Hero locations ─── */
const HERO_LOCATIONS = [
  { name: 'Orchard', img: '/hero_orchard.png' },
  { name: 'Tiong Bahru', img: '/hero_tiongbahru.png' },
  { name: 'Bukit Timah', img: '/hero_bukittimah.png' },
]

/* ─── Dish data ─── */
const DISHES = [
  {
    name: 'Prime Sirloin Steak',
    desc: 'Tender sirloin steak, expertly grilled to perfection, served with a medley of seasonal vegetables and accompanied by a rich red wine reduction sauce.',
    bg: 'linear-gradient(170deg,#c8a87a 0%,#9a6b3a 30%,#3a2a1a 70%,#2a3a28 100%)',
    img: '/steak.png',
  },
  {
    name: 'Crispy Shrimp Spring Rolls',
    desc: 'Delicate shrimp spring rolls filled with fresh vegetables and herbs, perfectly fried to a golden crisp. Served with a zesty dipping sauce for a delightful appetizer.',
    bg: 'linear-gradient(170deg,#d4c4a0 0%,#8a9a70 25%,#2a3c28 65%,#3c2a1a 100%)',
    img: '/chicken.png',
  },
  {
    name: 'Savory Chinese Porridge',
    desc: 'A comforting bowl of traditional Chinese porridge simmered to perfection, enriched with tender meats or seafood, and garnished with fragrant herbs.',
    bg: 'linear-gradient(170deg,#e8d8b0 0%,#b09060 25%,#3c2a20 65%,#2a3c30 100%)',
  },
  {
    name: 'Teriyaki Glazed Beef',
    desc: 'Juicy beef marinated in a flavorful teriyaki sauce, grilled to perfection and served with steamed rice and seasonal greens.',
    bg: 'linear-gradient(170deg,#d0a060 0%,#8a6030 25%,#302818 65%,#283830 100%)',
    img: '/steak.png',
  },
]

const MENU_DATA: Record<string, Record<string, { col1: any[], col2: any[] }>> = {
  'Orchard': {
    'Main Dishes': {
      col1: [
        { name: 'USDA Prime Tenderloin', price: '68', desc: 'Prime tenderloin grilled to order, served with seasonal vegetables and your choice of sauce.', bg: 'linear-gradient(145deg,#2e3f2a 0%,#3c2a18 100%)', img: '/steak.png' },
        { name: 'Italian Braciola', price: '60', desc: 'Tender beef rolls filled with cheese, herbs and prosciutto, slow-cooked in rich tomato sauce.', bg: 'linear-gradient(145deg,#40301c 0%,#2c3e2c 100%)', img: '/italian_braciola.png' },
        { name: 'Herb-Roasted Chicken', price: '52', desc: 'Free-range chicken marinated in fresh herbs, oven-roasted to golden perfection with garlic potatoes.', bg: 'linear-gradient(145deg,#3a2c1c 0%,#304030 100%)', img: '/garlic_chicken.png' },
        { name: 'Rack of Lamb', price: '72', desc: 'Herb-crusted lamb rack with mint jus, roasted root vegetables and creamy mashed potato.', bg: 'linear-gradient(145deg,#352820 0%,#384535 100%)' },
      ],
      col2: [
        { name: 'Teriyaki Glazed Beef', price: '60', desc: 'Beef marinated in teriyaki sauce, grilled to perfection and served with steamed rice and greens.', bg: 'linear-gradient(145deg,#3c2a18 0%,#2e3e2e 100%)', img: '/steak.png' },
        { name: 'Pan-Seared Sea Bass', price: '58', desc: 'Delicate sea bass fillet with crispy skin, lemon beurre blanc and asparagus.', bg: 'linear-gradient(145deg,#382618 0%,#304030 100%)' },
        { name: 'Duck Confit', price: '64', desc: 'Slow-cooked duck leg with crispy skin, cherry reduction and roasted fingerling potatoes.', bg: 'linear-gradient(145deg,#2e3828 0%,#42301e 100%)' },
        { name: 'Seafood Linguine', price: '55', desc: 'Al dente linguine with fresh prawns, scallops and clams in a white wine and garlic sauce.', bg: 'linear-gradient(145deg,#402818 0%,#384535 100%)' },
      ]
    },
    'Breakfast Set': {
      col1: [
        { name: 'Eggs Benedict', price: '22', desc: 'Poached eggs on toasted English muffins with Canadian bacon and silky hollandaise sauce.', bg: 'linear-gradient(145deg,#2e3f2a 0%,#42301e 100%)' },
        { name: 'French Toast', price: '18', desc: 'Thick-cut brioche soaked in vanilla custard, golden-fried with fresh berries and maple syrup.', bg: 'linear-gradient(145deg,#40301c 0%,#304030 100%)', img: '/dessert.png' },
        { name: 'Granola Bowl', price: '16', desc: 'House granola with Greek yogurt, seasonal fruits, honey and a sprinkle of toasted seeds.', bg: 'linear-gradient(145deg,#3a2c1c 0%,#2c3e2c 100%)' },
        { name: 'Smoked Salmon Bagel', price: '24', desc: 'Toasted bagel with cream cheese, smoked Norwegian salmon, capers, red onion and dill.', bg: 'linear-gradient(145deg,#352820 0%,#2e3e2e 100%)' },
      ],
      col2: [
        { name: 'Avocado Toast', price: '20', desc: 'Sourdough toast with smashed avocado, cherry tomatoes, poached egg and chilli flakes.', bg: 'linear-gradient(145deg,#3c2a18 0%,#384535 100%)' },
        { name: 'Full English Breakfast', price: '28', desc: 'Bacon, sausages, eggs your way, grilled tomato, mushrooms, baked beans and buttered toast.', bg: 'linear-gradient(145deg,#382618 0%,#3c2a18 100%)', img: '/chicken.png' },
        { name: 'Acai Bowl', price: '18', desc: 'Blended acai with banana and almond milk, topped with granola, coconut flakes and seasonal fruits.', bg: 'linear-gradient(145deg,#2e3828 0%,#2a3c28 100%)' },
        { name: 'Croissant & Jam', price: '14', desc: 'Buttery all-butter croissant served warm with house-made seasonal jam and Normandy butter.', bg: 'linear-gradient(145deg,#402818 0%,#304030 100%)' },
      ]
    },
    'Brunch': {
      col1: [
        { name: 'Truffle Scrambled Eggs', price: '32', desc: 'Slow-cooked silky scrambled eggs finished with black truffle shavings on sourdough toast.', bg: 'linear-gradient(145deg,#2e3f2a 0%,#3c2a18 100%)' },
        { name: 'Shakshuka', price: '26', desc: 'Eggs poached in spiced tomato and pepper sauce with feta, olives and warm pita bread.', bg: 'linear-gradient(145deg,#40301c 0%,#42301e 100%)' },
        { name: 'Buttermilk Pancakes', price: '22', desc: 'Fluffy stack of buttermilk pancakes with whipped butter, blueberries and warm maple syrup.', bg: 'linear-gradient(145deg,#3a2c1c 0%,#2e3e2e 100%)', img: '/dessert.png' },
        { name: 'Croque Madame', price: '28', desc: 'Toasted ham and Gruyère sandwich topped with béchamel and a sunny-side-up egg.', bg: 'linear-gradient(145deg,#352820 0%,#304030 100%)' },
      ],
      col2: [
        { name: 'Belgian Waffles', price: '24', desc: 'Crispy golden waffles with whipped cream, fresh strawberries and house-made berry compote.', bg: 'linear-gradient(145deg,#3c2a18 0%,#384535 100%)', img: '/dessert.png' },
        { name: 'Eggs Royale', price: '34', desc: 'Poached eggs and smoked salmon on toasted muffins with hollandaise and dill oil.', bg: 'linear-gradient(145deg,#382618 0%,#2c3e2c 100%)' },
        { name: 'Quiche Lorraine', price: '26', desc: 'Classic quiche with smoked bacon and Gruyère in a buttery shortcrust pastry, served with salad.', bg: 'linear-gradient(145deg,#2e3828 0%,#304030 100%)' },
        { name: 'Wild Mushroom Toast', price: '22', desc: 'Wild mushrooms sautéed in garlic butter on sourdough with truffle oil and micro herbs.', bg: 'linear-gradient(145deg,#402818 0%,#3c2a18 100%)' },
      ]
    },
    'Lunch Set': {
      col1: [
        { name: 'Caesar Salad', price: '26', desc: 'Crisp romaine with house Caesar dressing, parmesan shavings, croutons and anchovies.', bg: 'linear-gradient(145deg,#2e3f2a 0%,#42301e 100%)' },
        { name: 'Club Sandwich', price: '28', desc: 'Triple-decker with chicken, bacon, egg, lettuce and tomato on toasted bread with fries.', bg: 'linear-gradient(145deg,#40301c 0%,#2e3e2e 100%)', img: '/chicken.png' },
        { name: 'French Onion Soup', price: '22', desc: 'Rich caramelised onion soup topped with a gruyère crouton, simmered in beef broth.', bg: 'linear-gradient(145deg,#3a2c1c 0%,#304030 100%)' },
        { name: 'Pasta Primavera', price: '32', desc: 'Penne with seasonal vegetables and cherry tomatoes in a light olive oil and garlic sauce.', bg: 'linear-gradient(145deg,#352820 0%,#384535 100%)' },
      ],
      col2: [
        { name: 'Grilled Chicken Set', price: '34', desc: 'Herb-marinated chicken breast with roasted potatoes, seasonal greens and pan jus.', bg: 'linear-gradient(145deg,#3c2a18 0%,#2c3e2c 100%)', img: '/garlic_chicken.png' },
        { name: 'Fish & Chips', price: '30', desc: 'Beer-battered cod with thick-cut chips, mushy peas and house tartar sauce.', bg: 'linear-gradient(145deg,#382618 0%,#384535 100%)' },
        { name: 'Wagyu Beef Burger', price: '42', desc: 'Wagyu patty with caramelised onions, truffle mayo and aged cheddar in a brioche bun.', bg: 'linear-gradient(145deg,#2e3828 0%,#3c2a18 100%)', img: '/steak.png' },
        { name: 'Wild Mushroom Risotto', price: '36', desc: 'Creamy arborio rice with wild mushrooms, white truffle oil and aged parmesan.', bg: 'linear-gradient(145deg,#402818 0%,#304030 100%)', img: '/risotto.png' },
      ]
    },
    'Pizza': {
      col1: [
        { name: 'Margherita', price: '22', desc: 'Classic Neapolitan pizza with San Marzano tomatoes, buffalo mozzarella and fresh basil.', bg: 'linear-gradient(145deg,#2e3f2a 0%,#3c2a18 100%)' },
        { name: 'Truffle Mushroom', price: '32', desc: 'Wild mushrooms, taleggio, truffle oil and rosemary on a crispy thin-crust base.', bg: 'linear-gradient(145deg,#40301c 0%,#2a3c28 100%)', img: '/risotto.png' },
        { name: 'Quattro Formaggi', price: '28', desc: 'Four-cheese blend of mozzarella, gorgonzola, parmesan and taleggio with walnut and honey.', bg: 'linear-gradient(145deg,#3a2c1c 0%,#2e3e2e 100%)' },
        { name: 'Prosciutto & Rocket', price: '30', desc: 'San Daniele prosciutto, fior di latte and rocket with parmesan shavings and balsamic glaze.', bg: 'linear-gradient(145deg,#352820 0%,#304030 100%)' },
      ],
      col2: [
        { name: 'Diavola', price: '26', desc: 'Spicy Calabrian salami, mozzarella, chilli oil and fresh basil on a tomato base.', bg: 'linear-gradient(145deg,#3c2a18 0%,#384535 100%)' },
        { name: 'Capricciosa', price: '28', desc: 'Ham, mushrooms, artichoke hearts and olives with mozzarella and tomato sauce.', bg: 'linear-gradient(145deg,#382618 0%,#42301e 100%)' },
        { name: 'Seafood Pizza', price: '34', desc: 'Prawns, scallops and calamari with mozzarella, cherry tomatoes and herb oil.', bg: 'linear-gradient(145deg,#2e3828 0%,#2c3e2c 100%)' },
        { name: 'Wild Mushroom & Egg', price: '26', desc: 'Forest mushrooms, truffle cream, mozzarella and a cracked egg finished with chives.', bg: 'linear-gradient(145deg,#402818 0%,#304030 100%)' },
      ]
    },
    'Drinks & Vines': {
      col1: [
        { name: 'Barolo 2019', price: '28', desc: 'Full-bodied Italian red from Piedmont with notes of cherry, tar and dried roses.', bg: 'linear-gradient(145deg,#2e3f2a 0%,#42301e 100%)' },
        { name: 'Sauvignon Blanc', price: '18', desc: 'Crisp New Zealand white with vibrant citrus and tropical fruit notes, perfect with seafood.', bg: 'linear-gradient(145deg,#40301c 0%,#2e3e2e 100%)' },
        { name: 'Champagne Brut', price: '24', desc: 'Elegant French champagne with fine bubbles, notes of green apple, brioche and toasted almond.', bg: 'linear-gradient(145deg,#3a2c1c 0%,#384535 100%)' },
        { name: 'Aperol Spritz', price: '16', desc: 'Refreshing blend of Aperol, Prosecco and soda with a slice of orange.', bg: 'linear-gradient(145deg,#352820 0%,#304030 100%)' },
      ],
      col2: [
        { name: 'Negroni', price: '18', desc: 'Classic Italian cocktail of equal parts gin, Campari and sweet vermouth with an orange twist.', bg: 'linear-gradient(145deg,#3c2a18 0%,#2c3e2c 100%)' },
        { name: 'Old Fashioned', price: '20', desc: 'Bourbon stirred with sugar, aromatic bitters and a touch of orange peel.', bg: 'linear-gradient(145deg,#382618 0%,#3c2a18 100%)' },
        { name: 'Craft Beer', price: '14', desc: 'Rotating selection of local and international craft beers on tap. Ask your server.', bg: 'linear-gradient(145deg,#2e3828 0%,#384535 100%)' },
        { name: 'Signature Mocktail', price: '12', desc: 'House blend of seasonal fruits, herbs and sparkling water — ask your server for today\'s creation.', bg: 'linear-gradient(145deg,#402818 0%,#2a3c28 100%)' },
      ]
    },
  },
  'Tiong Bahru': {
    'Main Dishes': {
      col1: [
        { name: 'Hainanese Chicken Rice', price: '18', desc: 'Fragrant rice cooked in rich chicken broth, served with tender poached chicken and chilli sauce.', bg: 'linear-gradient(145deg,#40301c 0%,#2a3c28 100%)', img: '/chicken.png' },
        { name: 'Satay Skewers', price: '20', desc: 'Grilled marinated chicken and beef skewers with peanut sauce, compressed rice and cucumber.', bg: 'linear-gradient(145deg,#352820 0%,#304030 100%)', img: '/satay.png' },
        { name: 'Chilli Crab Bao', price: '24', desc: 'Sweet and spicy crab meat served in deep-fried mantou buns with cucumber and coriander.', bg: 'linear-gradient(145deg,#2e3f2a 0%,#384535 100%)', img: '/crab_bao.png' },
        { name: 'Laksa Local', price: '16', desc: 'Rich and spicy coconut noodle soup with fresh prawns, fish cake and cockles.', bg: 'linear-gradient(145deg,#402818 0%,#2c3e2c 100%)', img: '/laksa.png' },
      ],
      col2: [
        { name: 'Char Kway Teow', price: '15', desc: 'Wok-fried flat noodles with cockles, Chinese sausage, dark soy and a touch of chilli.', bg: 'linear-gradient(145deg,#382618 0%,#304030 100%)' },
        { name: 'Nasi Lemak', price: '14', desc: 'Coconut rice with crispy ikan bilis, roasted peanuts, boiled egg, cucumber and sambal chilli.', bg: 'linear-gradient(145deg,#2e3828 0%,#42301e 100%)' },
        { name: 'Bak Kut Teh', price: '18', desc: 'Tender pork ribs simmered in a fragrant herbal broth, served with you tiao and steamed rice.', bg: 'linear-gradient(145deg,#3c2a18 0%,#384535 100%)' },
        { name: 'Hokkien Mee', price: '16', desc: 'Wok-fried egg and rice noodles with prawns, squid and pork belly in a prawn bisque broth.', bg: 'linear-gradient(145deg,#3a2c1c 0%,#3c2a18 100%)' },
      ]
    },
    'Breakfast Set': {
      col1: [
        { name: 'Kaya Toast Set', price: '8', desc: 'Toasted bread with house kaya and cold butter, paired with soft-boiled eggs and kopi or teh.', bg: 'linear-gradient(145deg,#2e3f2a 0%,#3c2a18 100%)', img: '/kaya_toast.png' },
        { name: 'Soft Boiled Eggs', price: '4', desc: 'Two perfectly soft-boiled eggs with white pepper and light soya sauce, served with toast.', bg: 'linear-gradient(145deg,#40301c 0%,#2a3c28 100%)' },
        { name: 'Milo Dinosaur', price: '6', desc: 'Iced Milo topped generously with extra Milo powder for the full dinosaur experience.', bg: 'linear-gradient(145deg,#3a2c1c 0%,#304030 100%)' },
        { name: 'Teh Tarik', price: '4', desc: 'Classic pulled milk tea brewed strong with evaporated milk and expertly "pulled" for a frothy top.', bg: 'linear-gradient(145deg,#352820 0%,#384535 100%)' },
      ],
      col2: [
        { name: 'Roti Prata Set', price: '10', desc: 'Crispy pan-fried flatbread served with fish curry dhal and your choice of teh or kopi.', bg: 'linear-gradient(145deg,#3c2a18 0%,#2c3e2c 100%)' },
        { name: 'Pandan Waffles', price: '8', desc: 'Crispy aromatic pandan waffles with kaya spread and a drizzle of coconut cream.', bg: 'linear-gradient(145deg,#382618 0%,#2e3e2e 100%)' },
        { name: 'Kueh Set', price: '10', desc: 'Assorted bite-sized traditional kueh including ang ku, kueh dadar and onde onde.', bg: 'linear-gradient(145deg,#2e3828 0%,#304030 100%)', img: '/kueh.png' },
        { name: 'Putu Piring', price: '6', desc: 'Steamed rice flour cakes filled with gula melaka, served fresh with grated coconut.', bg: 'linear-gradient(145deg,#402818 0%,#42301e 100%)' },
      ]
    },
    'Brunch': {
      col1: [
        { name: 'Nasi Lemak Brunch', price: '18', desc: 'Elevated nasi lemak with crispy otah, rendang chicken, half-boiled egg and house sambal.', bg: 'linear-gradient(145deg,#2e3f2a 0%,#42301e 100%)' },
        { name: 'Dim Sum Platter', price: '22', desc: 'Selection of har gow, siu mai, char siu bao and cheung fun with a trio of dipping sauces.', bg: 'linear-gradient(145deg,#40301c 0%,#2e3e2e 100%)' },
        { name: 'Chwee Kueh', price: '10', desc: 'Steamed rice cakes topped with chai poh and sambal — a timeless Tiong Bahru staple.', bg: 'linear-gradient(145deg,#3a2c1c 0%,#304030 100%)' },
        { name: 'Yong Tau Foo', price: '16', desc: 'Your choice of tofu and vegetables stuffed with fish paste in a clear or laksa broth.', bg: 'linear-gradient(145deg,#352820 0%,#384535 100%)' },
      ],
      col2: [
        { name: 'Prawn Noodle Brunch', price: '18', desc: 'Hokkien-style prawn noodles in a rich prawn bisque with fresh prawns, pork ribs and sambal.', bg: 'linear-gradient(145deg,#3c2a18 0%,#2c3e2c 100%)', img: '/laksa.png' },
        { name: 'Lor Mee', price: '14', desc: 'Thick noodles in a savoury braised sauce with pork, hard-boiled egg and fried fish.', bg: 'linear-gradient(145deg,#382618 0%,#384535 100%)' },
        { name: 'Bak Chor Mee', price: '14', desc: 'Minced pork noodles tossed dry with vinegar, chilli and mushrooms, topped with fried shallots.', bg: 'linear-gradient(145deg,#2e3828 0%,#304030 100%)' },
        { name: 'Nyonya Laksa', price: '18', desc: 'Peranakan-style laksa with handmade rice noodles, tofu puffs and a rich coconut curry broth.', bg: 'linear-gradient(145deg,#402818 0%,#2a3c28 100%)', img: '/laksa.png' },
      ]
    },
    'Lunch Set': {
      col1: [
        { name: 'Economy Rice Set', price: '10', desc: 'Steamed white rice with your choice of two dishes from our daily rotating hawker selection.', bg: 'linear-gradient(145deg,#2e3f2a 0%,#3c2a18 100%)' },
        { name: 'Duck Rice', price: '16', desc: 'Braised duck with fragrant five-spice rice, tau kwa and house braising sauce.', bg: 'linear-gradient(145deg,#40301c 0%,#42301e 100%)' },
        { name: 'Mee Pok Dry', price: '12', desc: 'Flat egg noodles tossed with minced pork, fishcake and wonton in savoury chilli sauce.', bg: 'linear-gradient(145deg,#3a2c1c 0%,#2e3e2e 100%)' },
        { name: 'Fried Carrot Cake', price: '10', desc: 'Black version — radish cake wok-fried with egg, chai poh and dark sweet sauce.', bg: 'linear-gradient(145deg,#352820 0%,#304030 100%)' },
      ],
      col2: [
        { name: 'Fish Ball Noodle', price: '10', desc: 'Springy handmade fish balls in a clear teochew broth with mee kia or bee hoon.', bg: 'linear-gradient(145deg,#3c2a18 0%,#384535 100%)' },
        { name: 'Beef Noodle', price: '16', desc: 'Slow-braised beef brisket and tendon in flat rice noodles with a rich anise-spiced broth.', bg: 'linear-gradient(145deg,#382618 0%,#2c3e2c 100%)' },
        { name: 'Oyster Omelette', price: '14', desc: 'Fresh oysters with egg and tapioca starch batter, wok-fried with a tart chilli sauce.', bg: 'linear-gradient(145deg,#2e3828 0%,#3c2a18 100%)' },
        { name: 'Char Siew Rice', price: '14', desc: 'Honey-glazed roast pork over steamed rice with blanched kailan and ginger-scallion oil.', bg: 'linear-gradient(145deg,#402818 0%,#384535 100%)' },
      ]
    },
    'Pizza': {
      col1: [
        { name: 'Sambal Prawn Pizza', price: '24', desc: 'Thin-crust pizza with house sambal, fresh tiger prawns, mozzarella and coriander.', bg: 'linear-gradient(145deg,#2e3f2a 0%,#42301e 100%)' },
        { name: 'Satay Chicken Pizza', price: '22', desc: 'Peanut satay sauce base with grilled chicken, red onion, mozzarella and spring onion.', bg: 'linear-gradient(145deg,#40301c 0%,#2e3e2e 100%)' },
        { name: 'Rendang Beef Pizza', price: '26', desc: 'Slow-cooked rendang beef, caramelised onions and mozzarella on a spiced tomato base.', bg: 'linear-gradient(145deg,#3a2c1c 0%,#304030 100%)' },
        { name: 'Salted Egg Pizza', price: '24', desc: 'Creamy salted egg yolk sauce with mozzarella, butter chicken and crispy curry leaves.', bg: 'linear-gradient(145deg,#352820 0%,#384535 100%)' },
      ],
      col2: [
        { name: 'Chilli Crab Pizza', price: '28', desc: 'Signature chilli crab sauce with blue swimmer crab, mozzarella and fried mantou croutons.', bg: 'linear-gradient(145deg,#3c2a18 0%,#2c3e2c 100%)' },
        { name: 'Pandan Cream Pizza', price: '20', desc: 'Sweet pandan custard base with coconut cream, palm sugar crumble and toasted coconut.', bg: 'linear-gradient(145deg,#382618 0%,#384535 100%)', img: '/dessert.png' },
        { name: 'Char Siew BBQ Pizza', price: '24', desc: 'Honey-glazed char siew, hoisin sauce, caramelised onions and sesame seeds.', bg: 'linear-gradient(145deg,#2e3828 0%,#304030 100%)' },
        { name: 'Laksa Seafood Pizza', price: '26', desc: 'Laksa cream sauce with prawns, squid, cockles and mozzarella finished with laksa leaves.', bg: 'linear-gradient(145deg,#402818 0%,#3c2a18 100%)', img: '/laksa.png' },
      ]
    },
    'Drinks & Vines': {
      col1: [
        { name: 'Teh Tarik', price: '4', desc: 'Classic pulled milk tea brewed strong with evaporated milk and expertly pulled for a frothy top.', bg: 'linear-gradient(145deg,#2e3f2a 0%,#42301e 100%)' },
        { name: 'Kopi O', price: '3', desc: 'Traditional Singaporean black coffee brewed with Robusta beans and a touch of sugar syrup.', bg: 'linear-gradient(145deg,#40301c 0%,#2e3e2e 100%)' },
        { name: 'Bandung Rose', price: '5', desc: 'Chilled rose syrup blended with evaporated milk for a sweet, floral pink refresher.', bg: 'linear-gradient(145deg,#3a2c1c 0%,#384535 100%)' },
        { name: 'Soya Bean Milk', price: '4', desc: 'Freshly made warm or iced soya bean milk, lightly sweetened the traditional way.', bg: 'linear-gradient(145deg,#352820 0%,#304030 100%)' },
      ],
      col2: [
        { name: 'Barley Water', price: '4', desc: 'Refreshing chilled pearl barley water, subtly sweet with a clean, light flavour.', bg: 'linear-gradient(145deg,#3c2a18 0%,#2c3e2c 100%)' },
        { name: 'Lime Juice', price: '5', desc: 'Fresh-squeezed lime juice with a touch of salt and sugar — the perfect tropical cooler.', bg: 'linear-gradient(145deg,#382618 0%,#42301e 100%)' },
        { name: 'Grass Jelly Drink', price: '4', desc: 'Chilled grass jelly cubes in a subtly sweet and herbal black jelly drink.', bg: 'linear-gradient(145deg,#2e3828 0%,#304030 100%)' },
        { name: 'Fresh Sugarcane', price: '5', desc: 'Freshly pressed sugarcane juice with lemon slices, served ice-cold.', bg: 'linear-gradient(145deg,#402818 0%,#2a3c28 100%)' },
      ]
    },
  },
  'Bukit Timah': {
    'Main Dishes': {
      col1: [
        { name: 'Truffle Mushroom Risotto', price: '32', desc: 'Creamy Arborio rice with wild mushrooms and a drizzle of white truffle oil.', bg: 'linear-gradient(145deg,#2e3f2a 0%,#304030 100%)', img: '/risotto.png' },
        { name: 'Pan-Seared Salmon', price: '42', desc: 'Fresh Atlantic salmon with crispy skin, served with asparagus and lemon butter sauce.', bg: 'linear-gradient(145deg,#40301c 0%,#42301e 100%)' },
        { name: 'Burrata Salad', price: '26', desc: 'Fresh burrata with heirloom tomatoes, basil pesto and aged balsamic.', bg: 'linear-gradient(145deg,#3a2c1c 0%,#2a3c28 100%)' },
        { name: 'Lobster Bisque', price: '28', desc: 'Rich and creamy soup made with fresh Maine lobster and a touch of brandy.', bg: 'linear-gradient(145deg,#352820 0%,#2e3e2e 100%)' },
      ],
      col2: [
        { name: 'Wagyu Beef Burger', price: '36', desc: 'Premium Wagyu patty with caramelised onions, truffle mayo and aged cheddar.', bg: 'linear-gradient(145deg,#402818 0%,#2c3e2c 100%)', img: '/steak.png' },
        { name: 'Roasted Rack of Lamb', price: '58', desc: 'Herb-crusted lamb rack served with mint sauce and roasted root vegetables.', bg: 'linear-gradient(145deg,#3c2a18 0%,#384535 100%)' },
        { name: 'Duck Confit', price: '48', desc: 'Slow-cooked duck leg with crispy skin, cherry jus and roasted fingerling potatoes.', bg: 'linear-gradient(145deg,#382618 0%,#304030 100%)' },
        { name: 'Beef Wellington', price: '68', desc: 'Tenderloin wrapped in mushroom duxelles and golden puff pastry, served with red wine jus.', bg: 'linear-gradient(145deg,#2e3828 0%,#42301e 100%)', img: '/steak.png' },
      ]
    },
    'Breakfast Set': {
      col1: [
        { name: 'Avocado Toast', price: '22', desc: 'Sourdough with smashed avocado, poached egg, feta, microgreens and chilli oil.', bg: 'linear-gradient(145deg,#2e3f2a 0%,#3c2a18 100%)' },
        { name: 'Eggs Benedict Royale', price: '28', desc: 'Poached eggs and smoked salmon on toasted muffins with saffron hollandaise.', bg: 'linear-gradient(145deg,#40301c 0%,#2e3e2e 100%)' },
        { name: 'Acai Bowl', price: '20', desc: 'Organic acai blended with banana and almond milk, topped with premium granola and fresh fruits.', bg: 'linear-gradient(145deg,#3a2c1c 0%,#384535 100%)' },
        { name: 'Chia Seed Pudding', price: '18', desc: 'Overnight chia pudding with coconut milk, mango coulis and toasted macadamia nuts.', bg: 'linear-gradient(145deg,#352820 0%,#304030 100%)' },
      ],
      col2: [
        { name: 'Granola Parfait', price: '18', desc: 'Layers of house granola, Greek yogurt, seasonal berries and wildflower honey.', bg: 'linear-gradient(145deg,#3c2a18 0%,#2c3e2c 100%)' },
        { name: 'Smoked Salmon Bagel', price: '26', desc: 'Toasted sesame bagel with cream cheese, smoked salmon, capers and pickled red onion.', bg: 'linear-gradient(145deg,#382618 0%,#384535 100%)' },
        { name: 'Brioche French Toast', price: '24', desc: 'Thick-cut brioche with salted caramel, fresh berries and double cream.', bg: 'linear-gradient(145deg,#2e3828 0%,#3c2a18 100%)', img: '/dessert.png' },
        { name: 'Overnight Oats', price: '16', desc: 'Oats soaked in oat milk with chia seeds, topped with fresh fruit, nuts and honey.', bg: 'linear-gradient(145deg,#402818 0%,#304030 100%)' },
      ]
    },
    'Brunch': {
      col1: [
        { name: 'Truffle Scrambled Eggs', price: '38', desc: 'Ultra-slow scrambled eggs with black truffle shavings on toasted brioche with caviar.', bg: 'linear-gradient(145deg,#2e3f2a 0%,#42301e 100%)' },
        { name: 'Shakshuka Deluxe', price: '32', desc: 'Eggs poached in spiced tomato sauce with feta, sumac labneh and sourdough.', bg: 'linear-gradient(145deg,#40301c 0%,#304030 100%)' },
        { name: 'Avocado Pancakes', price: '28', desc: 'Fluffy avocado pancakes with whipped mascarpone, berry compote and honey.', bg: 'linear-gradient(145deg,#3a2c1c 0%,#2c3e2c 100%)', img: '/dessert.png' },
        { name: 'Lobster Roll', price: '45', desc: 'Cold Maine lobster salad with tarragon mayo in a toasted butter roll with frisée.', bg: 'linear-gradient(145deg,#352820 0%,#2e3e2e 100%)' },
      ],
      col2: [
        { name: 'Burrata Toast', price: '28', desc: 'Fresh burrata on toasted sourdough with heirloom tomatoes, basil and aged balsamic.', bg: 'linear-gradient(145deg,#3c2a18 0%,#384535 100%)' },
        { name: 'Croque Madame', price: '30', desc: 'Black forest ham and Comté cheese sandwich with béchamel and a perfectly fried egg.', bg: 'linear-gradient(145deg,#382618 0%,#42301e 100%)' },
        { name: 'Belgian Waffles', price: '26', desc: 'Light crispy waffles with Chantilly cream, fresh strawberries and warm berry coulis.', bg: 'linear-gradient(145deg,#2e3828 0%,#304030 100%)', img: '/dessert.png' },
        { name: 'Eggs en Cocotte', price: '32', desc: 'Baked eggs with smoked salmon, crème fraîche and herbs in a warm ramekin with soldiers.', bg: 'linear-gradient(145deg,#402818 0%,#2a3c28 100%)' },
      ]
    },
    'Lunch Set': {
      col1: [
        { name: 'Wagyu Beef Burger', price: '42', desc: 'Wagyu patty, caramelised onion, truffle aioli and aged cheddar in a brioche bun with fries.', bg: 'linear-gradient(145deg,#2e3f2a 0%,#42301e 100%)', img: '/steak.png' },
        { name: 'Grilled Atlantic Salmon', price: '45', desc: 'Herb-marinated salmon with asparagus, baby potatoes and a dill lemon butter sauce.', bg: 'linear-gradient(145deg,#40301c 0%,#2e3e2e 100%)' },
        { name: 'Caesar Salad', price: '28', desc: 'Romaine lettuce, house Caesar dressing, parmesan crisp, anchovy and sourdough croutons.', bg: 'linear-gradient(145deg,#3a2c1c 0%,#304030 100%)' },
        { name: 'Truffle Pasta', price: '38', desc: 'Fresh pappardelle with black truffle, porcini mushrooms and aged parmesan.', bg: 'linear-gradient(145deg,#352820 0%,#384535 100%)', img: '/risotto.png' },
      ],
      col2: [
        { name: 'Burrata & Heirloom Tomato', price: '30', desc: 'Fresh burrata with vine-ripened heirloom tomatoes, basil oil and Maldon salt.', bg: 'linear-gradient(145deg,#3c2a18 0%,#2c3e2c 100%)' },
        { name: 'Club Sandwich', price: '32', desc: 'Triple-decker with roasted chicken, streaky bacon, avocado, egg and brioche toast.', bg: 'linear-gradient(145deg,#382618 0%,#42301e 100%)', img: '/chicken.png' },
        { name: 'Nicoise Salad', price: '34', desc: 'Seared tuna, green beans, olives, cherry tomatoes, quail egg and anchovy vinaigrette.', bg: 'linear-gradient(145deg,#2e3828 0%,#304030 100%)' },
        { name: 'Fish Tacos', price: '28', desc: 'Crispy sea bass in corn tortillas with mango salsa, chipotle slaw and lime crema.', bg: 'linear-gradient(145deg,#402818 0%,#384535 100%)' },
      ]
    },
    'Pizza': {
      col1: [
        { name: 'Wagyu Truffle', price: '42', desc: 'Wagyu beef, black truffle cream, caramelised shallots and mozzarella on thin crust.', bg: 'linear-gradient(145deg,#2e3f2a 0%,#3c2a18 100%)', img: '/steak.png' },
        { name: 'Burrata & Prosciutto', price: '36', desc: 'Fresh burrata, San Daniele prosciutto, rocket and honey on a light tomato base.', bg: 'linear-gradient(145deg,#40301c 0%,#2a3c28 100%)' },
        { name: 'Smoked Salmon', price: '34', desc: 'Crème fraîche, smoked salmon, capers, red onion and dill on a crispy base.', bg: 'linear-gradient(145deg,#3a2c1c 0%,#2e3e2e 100%)' },
        { name: 'Wild Mushroom', price: '30', desc: 'Forest mushrooms, taleggio, truffle oil and fresh thyme on a garlic cream base.', bg: 'linear-gradient(145deg,#352820 0%,#304030 100%)', img: '/risotto.png' },
      ],
      col2: [
        { name: 'Nduja & Honey', price: '32', desc: 'Spicy Calabrian nduja, mozzarella, fresh chilli and a drizzle of wildflower honey.', bg: 'linear-gradient(145deg,#3c2a18 0%,#384535 100%)' },
        { name: 'Fig & Gorgonzola', price: '30', desc: 'Fresh figs, gorgonzola, caramelised walnuts and rocket with balsamic glaze.', bg: 'linear-gradient(145deg,#382618 0%,#2c3e2c 100%)', img: '/dessert.png' },
        { name: 'Quattro Formaggi', price: '28', desc: 'Mozzarella, gorgonzola, taleggio and parmesan with truffle honey and rosemary.', bg: 'linear-gradient(145deg,#2e3828 0%,#42301e 100%)' },
        { name: 'Roasted Vegetable', price: '26', desc: 'Seasonal roasted vegetables, burrata, pesto and pine nuts on a sourdough base.', bg: 'linear-gradient(145deg,#402818 0%,#304030 100%)' },
      ]
    },
    'Drinks & Vines': {
      col1: [
        { name: 'Barolo 2019', price: '35', desc: 'Full-bodied Piedmontese red with notes of dried cherry, tar and dried roses. Best with red meat.', bg: 'linear-gradient(145deg,#2e3f2a 0%,#42301e 100%)' },
        { name: 'Burgundy Pinot Noir', price: '32', desc: 'Elegant French red with silky tannins and red fruit notes of cherry and raspberry.', bg: 'linear-gradient(145deg,#40301c 0%,#2e3e2e 100%)' },
        { name: 'Sauvignon Blanc', price: '22', desc: 'Marlborough Sauvignon with vibrant citrus, gooseberry and herbaceous notes.', bg: 'linear-gradient(145deg,#3a2c1c 0%,#384535 100%)' },
        { name: 'Prosecco di Valdobbiadene', price: '24', desc: 'Fine persistent bubbles with green apple, white peach and floral notes.', bg: 'linear-gradient(145deg,#352820 0%,#304030 100%)' },
      ],
      col2: [
        { name: 'Negroni', price: '22', desc: 'Gin, Campari and sweet vermouth in equal parts with a flamed orange peel.', bg: 'linear-gradient(145deg,#3c2a18 0%,#2c3e2c 100%)' },
        { name: 'Whisky Sour', price: '24', desc: 'Single malt Scotch, fresh lemon juice, simple syrup and egg white, shaken and strained.', bg: 'linear-gradient(145deg,#382618 0%,#3c2a18 100%)' },
        { name: 'Craft IPA', price: '16', desc: 'Rotating artisanal IPAs from around the region. Ask your server for today\'s pour.', bg: 'linear-gradient(145deg,#2e3828 0%,#384535 100%)' },
        { name: 'Garden Mocktail', price: '14', desc: 'Cucumber, elderflower, mint and tonic with a garnish of fresh herbs and edible flowers.', bg: 'linear-gradient(145deg,#402818 0%,#2a3c28 100%)' },
      ]
    },
  }
}
const LOCATIONS = ['Tiong Bahru', 'Orchard', 'Bukit Timah']

function getAvailableLocations(dishName: string): string[] {
  const locs: string[] = []
  Object.entries(MENU_DATA).forEach(([loc, categoriesData]) => {
    let isHere = false;
    Object.values(categoriesData).forEach((data: any) => {
      if (data.col1?.some((d: any) => d.name === dishName) || data.col2?.some((d: any) => d.name === dishName)) {
        isHere = true;
      }
    });
    if (isHere) locs.push(loc)
  })
  return locs.length > 0 ? locs : LOCATIONS
}

/* ─── FoodItem ─── */
function FoodItem({ name, price, desc, bg, img, onClick, delay }: { name: string; price?: string; desc: string; bg: string; img?: string; onClick?: () => void; delay?: number }) {
  return (
    <div className="food-item fade-up" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default', transitionDelay: delay ? `${delay}s` : undefined }}>
      <div className="food-img-wrap" style={{ background: bg }}>
        {img && <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        <svg className="food-blob-tl" viewBox="0 0 284 294.028" fill="none">
          <path d={BlobPath} fill="#e0dfd5" stroke="#1D3029" strokeWidth="10.5"/>
        </svg>
        <svg className="food-blob-br" viewBox="0 0 284 294.028" fill="none">
          <path d={BlobPath} fill="#e0dfd5" stroke="#1D3029" strokeWidth="10.5"/>
        </svg>
      </div>
      <div className="food-desc">
        <div className="food-info-row">
          <span className="food-name">{name}</span>
          <span className="food-price">{price}</span>
        </div>
        <p className="food-body">{desc}</p>
      </div>
      <div className="food-divider">
        <div className="food-divider-line" />
        <StarSm />
      </div>
    </div>
  )
}

/* ─── Main Page ─── */
export default function Home() {
  const [splashDone, setSplashDone] = useState(false)
  const [heroIndex, setHeroIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState('Main Dishes')
  const [activeLocation, setActiveLocation] = useState('Orchard')
  const [selectedDish, setSelectedDish] = useState<{ name: string; price?: string; desc: string; bg: string; img?: string } | null>(null)
  const [showFloatingNav, setShowFloatingNav] = useState(false)
  const [showArrow, setShowArrow] = useState<'left' | 'right' | null>(null)
  const [floatingDropdown, setFloatingDropdown] = useState<'location' | 'category' | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showLeftHover, setShowLeftHover] = useState(false)
  const [showRightHover, setShowRightHover] = useState(false)
  
  const [isDrawerClosing, setIsDrawerClosing] = useState(false)
  const [isSearchClosing, setIsSearchClosing] = useState(false)
  
  function closeDrawer() {
    setIsDrawerClosing(true)
    setTimeout(() => {
      setSelectedDish(null)
      setIsDrawerClosing(false)
    }, 400)
  }

  function closeSearch() {
    setIsSearchClosing(true)
    setTimeout(() => {
      setSearchOpen(false)
      setIsSearchClosing(false)
    }, 400)
  }
  
  const trackRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLDivElement>(null)
  const menuSectionRef = useRef<HTMLElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const CARD_WIDTH = 400
  const CHUNK_WIDTH = DISHES.length * CARD_WIDTH

  // Boot infinite scroll tunnel to middle chunk
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.scrollLeft = CHUNK_WIDTH;
    }
  }, [CHUNK_WIDTH])

  function handleTrackScroll() {
    if (!trackRef.current) return;
    const { scrollLeft } = trackRef.current;
    if (scrollLeft <= 5) {
      trackRef.current.scrollLeft += CHUNK_WIDTH;
    } else if (scrollLeft >= CHUNK_WIDTH * 2) {
      trackRef.current.scrollLeft -= CHUNK_WIDTH;
    }
  }

  function prev() { trackRef.current?.scrollBy({ left: -CARD_WIDTH, behavior: 'smooth' }) }
  function next() { trackRef.current?.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' }) }

  // Splash timer
  useEffect(() => {
    const t = setTimeout(() => setSplashDone(true), 3000)
    return () => clearTimeout(t)
  }, [])

  // Dish carousel auto-play natively
  const carouselAutoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  useEffect(() => {
    carouselAutoRef.current = setInterval(() => {
      // Loop is completely seamless now and handles its own rewinds
      trackRef.current?.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' });
    }, 6000)
    return () => { if (carouselAutoRef.current) clearInterval(carouselAutoRef.current) }
  }, [CARD_WIDTH])

  // Hero auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(i => (i + 1) % HERO_LOCATIONS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])



  // Scroll reveal — starts only after splash is gone
  useEffect(() => {
    if (!splashDone) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-scale').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [splashDone])

  // Floating bottom nav — show only while inside menu section AND search bar is hidden
  useEffect(() => {
    let menuInView = false
    let searchBarInView = true
    const update = () => setShowFloatingNav(menuInView && !searchBarInView)

    const menuObs = new IntersectionObserver(([e]) => { menuInView = e.isIntersecting; update() }, { threshold: 0 })
    const searchObs = new IntersectionObserver(([e]) => { searchBarInView = e.isIntersecting; update() }, { threshold: 0 })

    if (menuSectionRef.current) menuObs.observe(menuSectionRef.current)
    if (searchBarRef.current) searchObs.observe(searchBarRef.current)
    return () => { menuObs.disconnect(); searchObs.disconnect() }
  }, [])

  // Search modal autofocus + ESC close
  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus()
  }, [searchOpen])

  useEffect(() => {
    if (!searchOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery('') } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen])

  // Navbar scroll shadow
  useEffect(() => {
    const nav = document.querySelector('.navbar') as HTMLElement | null
    const onScroll = () => {
      if (nav) nav.style.boxShadow = window.scrollY > 20 ? '0 8px 32px rgba(0,0,0,.35)' : 'none'
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lenis anchor link smoother intercept
  useEffect(() => {
    const handleAnchor = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      
      if (href && href.startsWith('#')) {
        e.preventDefault()
        if (href === '#') {
          // @ts-ignore
          if (window.lenis) window.lenis.scrollTo(0, { duration: 1.2 })
        } else {
          const target = document.querySelector(href)
          // @ts-ignore
          if (target && window.lenis) {
            // @ts-ignore
            window.lenis.scrollTo(target, { offset: -100, duration: 1.2 })
          }
        }
      }
    }
    document.addEventListener('click', handleAnchor)
    return () => document.removeEventListener('click', handleAnchor)
  }, [])

  const categories = ['Main Dishes', 'Breakfast Set', 'Brunch', 'Lunch Set', 'Pizza', 'Drinks & Vines']

  const searchResults = searchQuery.trim()
    ? Object.entries(MENU_DATA[activeLocation] ?? {}).flatMap(([category, { col1, col2 }]) =>
        [...col1, ...col2]
          .filter((item: any) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.desc.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((item: any) => ({ category, item }))
      )
    : []

  return (
    <>
      <Script src="https://unpkg.com/lenis@1.1.14/dist/lenis.min.js" strategy="lazyOnload" onLoad={() => {
        // @ts-ignore
        if (window.Lenis && !window.lenis) {
          // @ts-ignore
          const lenis = new window.Lenis()
          // @ts-ignore
          window.lenis = lenis
          const raf = (time: number) => {
            lenis.raf(time)
            requestAnimationFrame(raf)
          }
          requestAnimationFrame(raf)
        }
      }} />
      {/* ══════════════ SPLASH ══════════════ */}
      {!splashDone && (
        <div className="splash">
          <span className="splash-logo">Timberwood</span>
        </div>
      )}

      {/* ══════════════ NAVBAR ══════════════ */}
      <nav className="navbar">
        <div className="nav-inner">
          <svg className="nav-inner-trace" xmlns="http://www.w3.org/2000/svg">
            <rect pathLength="100" />
          </svg>
          <div className="nav-pill">
            <svg className="nav-trace" xmlns="http://www.w3.org/2000/svg">
              <rect pathLength="100" />
            </svg>
            <div className="nav-pill-inner">
              <StarSm style={{ flexShrink: 0, isolation: 'isolate', mixBlendMode: 'normal' }} />
              <div className="nav-page-links">
                <a href="#">ABOUT US</a>
                <a href="#">REVIEWS</a>
              </div>
              <div className="nav-logo">Timberwood</div>
              <div className="nav-main-links">
                <a href="#menu" className="nav-menu-link">MENU</a>
                <a href="#" className="btn-book">
                  <span className="btn-label">BOOK A TABLE</span>
                  <ArrowR />
                </a>
              </div>
              <StarSm style={{ flexShrink: 0, isolation: 'isolate', mixBlendMode: 'normal' }} />
            </div>
          </div>
        </div>
      </nav>

      {/* ══════════════ PAGE ══════════════ */}
      <div className="page">
        <div className="sidebar-border">
          <svg className="sidebar-trace" xmlns="http://www.w3.org/2000/svg">
            <rect pathLength="100" />
          </svg>

          {/* ─── HERO ─── */}
          <section className="hero">
            <div className="hero-left fade-left">
              <div className="hero-heading">
                <div className="hero-eyebrow">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: 148, flexShrink: 0 }}>
                    <StarSm style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1, height: 1, background: 'rgba(224,223,213,0.5)' }} />
                  </div>
                  <span className="hero-script">Elevate your</span>
                </div>
                <h1 className="hero-title">Dining Experience</h1>
              </div>
              <p className="hero-body">Savor every moment from sunrise to sunset at The Thirty Six. Indulge in exquisite breakfasts, delightful lunches, and unforgettable dinners crafted with passion and precision.</p>
              <a href="#menu" className="btn-discover">
                <span className="btn-label">DISCOVER OUR MENU</span>
                <ArrowR />
              </a>
            </div>

            <div className="hero-image-wrap fade-right" style={{ transitionDelay: '.15s' }}>
              <div className="hero-img-inner">
                {HERO_LOCATIONS.map((loc, i) => (
                  <div
                    key={loc.name}
                    className="hero-slide"
                    style={{
                      opacity: i === heroIndex ? 1 : 0,
                      backgroundImage: `url('${loc.img}')`,
                    }}
                  />
                ))}
              </div>
              <div className="hero-star-br"><StarLg /></div>
              <div className="hero-label-container">
                <div className="hero-label-bg" />
                <span key={heroIndex} className="hero-label-text">
                  {HERO_LOCATIONS[heroIndex].name}
                </span>
              </div>
            </div>
          </section>

          {/* ─── TESTIMONIALS ─── */}
          <section className="testimonials">
            <div className="quote-container fade-scale">
              <div className="quote-bg" />
              <p className="quote-text">
                &ldquo;Good food is all the sweeter when shared with <em>Good Friends</em>.&rdquo;
              </p>
            </div>

            {/* Dishes carousel */}
            <div className="dishes-container">
              {/* Vertical tag */}
              <div className="dishes-tag-col">
                <div style={{ width: 58, height: 314, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                  <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: 48, color: 'rgba(224,223,213,0.3)', whiteSpace: 'nowrap', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                    Our Favorite Dish
                  </span>
                </div>
                <div style={{ width: 58, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                    <div style={{ flex: 1, width: 0.5, background: 'rgba(224,223,213,0.4)' }} />
                    <StarSm />
                  </div>
                </div>
              </div>

              {/* Carousel viewport */}
              <div className="dish-carousel-viewport">
                {/* Edge Hover Triggers */}
                <div className="edge-hover-zone edge-hover-left" onMouseEnter={() => setShowLeftHover(true)} onMouseLeave={() => setShowLeftHover(false)} />
                <div className="edge-hover-zone edge-hover-right" onMouseEnter={() => setShowRightHover(true)} onMouseLeave={() => setShowRightHover(false)} />
                
                <div className="dish-cards" ref={trackRef} onScroll={handleTrackScroll}>
                  {[...DISHES, ...DISHES, ...DISHES].map((dish, i) => (
                    <div className="dish-card fade-up" key={i} onClick={() => setSelectedDish(dish as any)} style={{ cursor: 'pointer', transitionDelay: `${(i % DISHES.length) * 0.12}s` }}>
                      <div className="dish-img-container">
                        <div className="dish-img-inner" style={{ background: dish.bg }}>
                          {dish.img && <img src={dish.img} alt={dish.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                        </div>
                      </div>
                      <div className="dish-desc">
                        <p className="dish-name">{dish.name}</p>
                        <p className="dish-body">{dish.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Prev */}
                <button
                  className="carousel-btn prev"
                  onClick={prev}
                  aria-label="Previous dish"
                  style={{ left: 0, top: 160, transform: 'translateY(-50%)', opacity: showLeftHover ? 1 : 0, pointerEvents: showLeftHover ? 'auto' : 'none', transition: 'opacity 0.3s' }}
                  onMouseEnter={() => setShowLeftHover(true)}
                  onMouseLeave={() => setShowLeftHover(false)}
                >
                  <ArrowL stroke="#1a2e26" />
                </button>

                {/* Next */}
                <button
                  className="carousel-btn next"
                  onClick={next}
                  aria-label="Next dish"
                  style={{ right: 0, top: 160, transform: 'translateY(-50%)', opacity: showRightHover ? 1 : 0, pointerEvents: showRightHover ? 'auto' : 'none', transition: 'opacity 0.3s' }}
                  onMouseEnter={() => setShowRightHover(true)}
                  onMouseLeave={() => setShowRightHover(false)}
                >
                  <ArrowR stroke="#1a2e26" />
                </button>
              </div>
            </div>
          </section>

          {/* ─── MENU ─── */}
          <section className="menu-section" id="menu" ref={menuSectionRef}>
            {/* Header */}
            <div className="section-header">
              <span className="section-title-script">Our menu</span>
              <div style={{ flex: 1, height: 0.5, background: 'var(--cream-30)' }} />
              <StarSm />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center', width: '100%' }}>
              {/* Overview */}
              <div className="menu-overview">
                <div className="menu-title fade-left">Have a look inside of our<br/>Delicious Menu</div>
                <div className="menu-links-col fade-right">
                  {LOCATIONS.map((loc) => {
                    const isActive = activeLocation === loc
                    return (
                      <button 
                        key={loc}
                        className={`loc-btn ${isActive ? 'active' : ''}`}
                        onClick={() => setActiveLocation(loc)}
                      >
                        <span className="loc-text">{loc}</span>
                        <div className="loc-line-wrap">
                          <div className="loc-line" />
                          <div className="loc-star"><StarSm /></div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Search + categories */}
              <div className="search-bar-row fade-up" ref={searchBarRef}>
                <button className="btn-search" onClick={() => setSearchOpen(true)}>
                  <span className="btn-label">SEARCH YOUR MENU</span>
                  <SearchIcon />
                </button>
                <div className="categories">
                  {categories.map(cat => (
                    <span
                      key={cat}
                      className={`category${activeCategory === cat ? ' active' : ''}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Food grid */}
              {(() => {
                const menu = MENU_DATA[activeLocation]?.[activeCategory] ?? { col1: [], col2: [] }
                return (
                  <div className="food-grid">
                    <div className="food-col">
                      {menu.col1.map((f: any, i: number) => <FoodItem key={i} {...f} delay={i * 0.15} onClick={() => setSelectedDish(f)} />)}
                    </div>
                    <div className="food-col food-col-offset">
                      {menu.col2.map((f: any, i: number) => <FoodItem key={i} {...f} delay={i * 0.15 + 0.08} onClick={() => setSelectedDish(f)} />)}
                    </div>
                  </div>
                )
              })()}
            </div>
          </section>

          {/* ─── FOOTER ─── */}
          <footer className="footer">
            <div className="footer-inner">
              {/* Top deco */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
                <div style={{ flex: 1, height: 0.5, background: 'rgba(224,223,213,0.3)' }} />
                <StarLg />
                <div style={{ flex: 1, height: 0.5, background: 'rgba(224,223,213,0.3)' }} />
              </div>

              <div className="footer-logo fade-scale">Timberwood</div>

              {/* Our Locations */}
              <div className="footer-section-label fade-up">
                <div style={{ flex: 1, height: 0.5, background: 'rgba(224,223,213,0.3)' }} />
                <StarSm />
                <span className="footer-section-text" style={{ margin: '0 10px' }}>Our Locations</span>
                <StarSm />
                <div style={{ flex: 1, height: 0.5, background: 'rgba(224,223,213,0.3)' }} />
              </div>

              <div className="footer-locations">
                {['Tiong Bahru', 'Orchard', 'Bukit Timah'].map((loc, i) => (
                  <div className="footer-location fade-up" key={loc} style={{ transitionDelay: `${i * 0.12}s` }}>
                    <span className="footer-loc-name">{loc}</span>
                    <p className="footer-loc-addr">57 Eng Hoon Street Tiong Bahru Estate #01-88 Block 57, Singapore 160057 Singapore</p>
                  </div>
                ))}
              </div>

              {/* Contact Us */}
              <div className="footer-section-label fade-up">
                <div style={{ flex: 1, height: 0.5, background: 'rgba(224,223,213,0.3)' }} />
                <StarSm />
                <span className="footer-section-text" style={{ margin: '0 10px' }}>Contact Us</span>
                <StarSm />
                <div style={{ flex: 1, height: 0.5, background: 'rgba(224,223,213,0.3)' }} />
              </div>

              <div className="footer-contacts fade-up" style={{ transitionDelay: '0.1s' }}>
                <div className="footer-contact">
                  <span className="footer-contact-label">Whatsapp</span>
                  <a href="https://wa.me/6585361590313" target="_blank" rel="noopener noreferrer" className="footer-contact-link">
                    +65 853 6159 0313
                  </a>
                </div>
                <div className="footer-contact">
                  <span className="footer-contact-label">Email</span>
                  <a href="mailto:info@timberwood.com.sg" className="footer-contact-link">
                    info@timberwood.com.sg
                  </a>
                </div>
              </div>
            </div>
          </footer>

        </div>
      </div>

      {/* ══════════════ FLOATING BOTTOM NAV ══════════════ */}
      {floatingDropdown && (
        <div className="floating-dropdown-overlay" onClick={() => setFloatingDropdown(null)} />
      )}
      <div className={`floating-nav${showFloatingNav && !selectedDish ? ' visible' : ''}`}>
        {floatingDropdown && (
          <div className="floating-dropdown">
            {floatingDropdown === 'location'
              ? LOCATIONS.map(loc => (
                  <button key={loc}
                    className={`floating-dropdown-item${activeLocation === loc ? ' active' : ''}`}
                    onClick={() => { setActiveLocation(loc); setFloatingDropdown(null) }}>
                    {loc}
                  </button>
                ))
              : categories.map(cat => (
                  <button key={cat}
                    className={`floating-dropdown-item${activeCategory === cat ? ' active' : ''}`}
                    onClick={() => { setActiveCategory(cat); setFloatingDropdown(null) }}>
                    {cat}
                  </button>
                ))
            }
          </div>
        )}
        <div className="floating-nav-inner">
          {/* Desktop: full nav */}
          <div className="floating-nav-full">
            <div className="floating-nav-locations">
              {LOCATIONS.map(loc => (
                <button key={loc}
                  className={`floating-loc-btn${activeLocation === loc ? ' active' : ''}`}
                  onClick={() => setActiveLocation(loc)}>
                  {loc}
                </button>
              ))}
            </div>
            <div className="floating-nav-sep"><StarSm /></div>
            <div className="floating-nav-cats">
              {categories.map(cat => (
                <button key={cat}
                  className={`floating-cat-btn${activeCategory === cat ? ' active' : ''}`}
                  onClick={() => setActiveCategory(cat)}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="floating-nav-sep" style={{ opacity: 0.3 }}><StarSm /></div>
            <button className="floating-search-btn" onClick={() => setSearchOpen(true)}>
              <SearchIcon stroke="rgba(224,223,213,0.7)" />
            </button>
          </div>

          {/* Mobile: compact nav */}
          <div className="floating-nav-compact">
            <button
              className={`floating-compact-btn${floatingDropdown === 'location' ? ' open' : ''}`}
              onClick={() => setFloatingDropdown(d => d === 'location' ? null : 'location')}
            >
              <span>LOCATION</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="compact-chevron">
                <path d="M1 5L5 1L9 5" stroke="rgba(224,223,213,0.7)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="floating-nav-sep"><StarSm /></div>
            <button
              className={`floating-compact-btn${floatingDropdown === 'category' ? ' open' : ''}`}
              onClick={() => setFloatingDropdown(d => d === 'category' ? null : 'category')}
            >
              <span>CATEGORY</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="compact-chevron">
                <path d="M1 5L5 1L9 5" stroke="rgba(224,223,213,0.7)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="floating-nav-sep" style={{ opacity: 0.3 }}><StarSm /></div>
            <button className="floating-search-btn" onClick={() => setSearchOpen(true)}>
              <SearchIcon stroke="rgba(224,223,213,0.7)" />
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════ SEARCH MODAL ══════════════ */}
      {searchOpen && (
        <div className={`search-overlay${isSearchClosing ? ' closing' : ''}`} onClick={closeSearch}>
          <div className={`search-panel${isSearchClosing ? ' closing' : ''}`} onClick={e => e.stopPropagation()}>
            <div className="search-header">
              <div className="search-location-tag">
                <StarSm />
                <span>{activeLocation}</span>
              </div>
              <button className="btn-drawer-close" onClick={closeSearch}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e0dfd5" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="search-input-wrap">
              <SearchIcon stroke="rgba(224,223,213,0.4)" />
              <input
                ref={searchInputRef}
                className="search-input"
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery('')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(224,223,213,0.5)" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
            <div className="search-results">
              {!searchQuery.trim() && (
                <div className="search-empty">
                  <span>Start typing to search the {activeLocation} menu</span>
                </div>
              )}
              {searchQuery.trim() && searchResults.length === 0 && (
                <div className="search-empty">
                  <span>No items found for &ldquo;{searchQuery}&rdquo;</span>
                </div>
              )}
              {searchResults.map(({ category, item }, i) => (
                <div
                  key={i}
                  className="search-result-item"
                  onClick={() => { setSelectedDish(item); closeSearch() }}
                >
                  <div className="search-result-thumb" style={{ background: item.bg }}>
                    {item.img && <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div className="search-result-info">
                    <span className="search-result-name">{item.name}</span>
                    <span className="search-result-cat">{category}</span>
                  </div>
                  {item.price && <span className="search-result-price">${item.price}</span>}
                  <ArrowR stroke="rgba(224,223,213,0.4)" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ DRAWER ══════════════ */}
      {selectedDish && (
        <div className={`drawer-overlay${isDrawerClosing ? ' closing' : ''}`} onClick={closeDrawer}>
          <div className={`drawer-panel${isDrawerClosing ? ' closing' : ''}`} onClick={e => e.stopPropagation()}>
            <button className="btn-drawer-close" onClick={closeDrawer}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e0dfd5" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="drawer-img-wrap" style={{ background: selectedDish.bg }}>
              {selectedDish.img && <img src={selectedDish.img} alt={selectedDish.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              <div className="drawer-fade-bottom"></div>
            </div>
            
            <div className="drawer-content">
              <div className="drawer-header">
                <h3 className="drawer-title">{selectedDish.name}</h3>
                <span className="drawer-price">${selectedDish.price || '60'}</span>
              </div>
              <p className="drawer-desc">{selectedDish.desc}</p>
              
              <div className="drawer-locations">
                <span className="drawer-loc-label">Available at:</span>
                <div className="drawer-loc-tags">
                  {getAvailableLocations(selectedDish.name).map(loc => (
                    <span key={loc} className="drawer-loc-tag">{loc}</span>
                  ))}
                </div>
              </div>
              
              <div className="drawer-divider">
                <div style={{ flex: 1, height: 0.5, background: 'rgba(224,223,213,0.2)' }} />
                <StarSm />
                <div style={{ flex: 1, height: 0.5, background: 'rgba(224,223,213,0.2)' }} />
              </div>

              <div className="drawer-actions">
                <button className="btn-drawer-primary">
                  <span>ADD TO ORDER</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
