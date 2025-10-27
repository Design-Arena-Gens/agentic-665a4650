import { NextRequest, NextResponse } from 'next/server'

const contentTemplates: Record<string, (persona: string, vibe: string, topic: string) => string> = {
  'Instagram Caption': (persona, vibe, topic) => {
    const captions = [
      `${topic}? Honey, I don't chase, I attract. What belongs to me will simply find me. 💫✨\n\n#BaddieEnergy #${topic.replace(/\s+/g, '')} #MainCharacter #ThatGirl`,
      `Not to be that girl, but ${topic.toLowerCase()} and I'm living my best life. Sorry not sorry. 👑💅\n\n#Unbothered #${topic.replace(/\s+/g, '')} #BossUp`,
      `They said ${topic.toLowerCase()} couldn't be done in heels. Watch me. 💎✨\n\n#ProveThemWrong #${topic.replace(/\s+/g, '')} #Unstoppable`,
      `POV: You finally understood that ${topic.toLowerCase()} is your birthright, not a privilege. Welcome to the club. 🔥\n\n#Manifestation #${topic.replace(/\s+/g, '')} #BaddieVibes`
    ]
    return captions[Math.floor(Math.random() * captions.length)]
  },

  'Tweet/Thread': (persona, vibe, topic) => {
    const tweets = [
      `hot take: ${topic} is not a flex, it's the bare minimum. if you're still celebrating basic standards, we need to talk. 🧵`,
      `y'all really out here still stressing about ${topic.toLowerCase()} when you could be living your truth unbothered? couldn't be me. ☕️`,
      `the way people overcomplicate ${topic.toLowerCase()} when it's literally just *that*. say it with me: we don't do drama in 2024, we do RESULTS. 💪`,
      `me when someone tries to lecture me about ${topic.toLowerCase()}: "that's cute, but I wrote the book on this bestie" 😌✨`
    ]
    return tweets[Math.floor(Math.random() * tweets.length)]
  },

  'TikTok Script': (persona, vibe, topic) => {
    const scripts = [
      `[Hook: 0-3s]\n*Record scratch* Yup, that's me. You're probably wondering how I mastered ${topic.toLowerCase()}...\n\n[Main: 3-15s]\nIt's simple bestie:\n1. Stop caring what they think ✅\n2. Do it scared anyway 💪\n3. Watch them copy your energy 👀\n\n[CTA: 15-20s]\nLike if you're done playing small. Follow for more unbothered energy. 💫`,

      `[POV Format]\nPOV: Someone tries to gatekeep ${topic.toLowerCase()} from you\n\n*Lip sync to boss music*\n\nMe: "Cute. Watch this."\n*Proceeds to absolutely slay*\n\n[Text overlay: "They hate to see a baddie winning"]`,

      `[Trending Sound]\n*Doing makeup/getting ready*\n\nText: "Things I stopped caring about after I figured out ${topic}:"\n\n- What they think ❌\n- Being humble ❌  \n- Playing small ❌\n\nStarted caring about:\n- My peace ✨\n- My bag 💰\n- My crown 👑`
    ]
    return scripts[Math.floor(Math.random() * scripts.length)]
  },

  'YouTube Short Idea': (persona, vibe, topic) => {
    const ideas = [
      `Title: "${topic}: Why You're Doing It Wrong (& How I Fixed It)"\n\nOpening Hook: "If you're still struggling with ${topic.toLowerCase()}, this is your sign to stop right now..."\n\nKey Points:\n- The mistake everyone makes\n- The mindset shift that changed everything\n- My exact 3-step framework\n- Results in 30 days\n\nCTA: "Comment 'READY' if you want the full guide"`,

      `Title: "Exposing the Truth About ${topic} Nobody Talks About 🚨"\n\nScript:\n"Real talk - everyone's teaching you ${topic.toLowerCase()} wrong. Here's what actually works:\n\n[Insert controversial but true take]\n\nYeah, I said it. Anyway, follow for more honest content your feed needs."`,

      `Title: "Watch Me [Action] Using Only ${topic} 👀"\n\nFormat: Fast-paced transformation/process video\n\nVoiceover: "They said ${topic.toLowerCase()} wouldn't work. So I proved them wrong. Here's the full breakdown..."\n\n[Show results]\n\nEnd: "Still think it's impossible? 🤨"`
    ]
    return ideas[Math.floor(Math.random() * ideas.length)]
  },

  'Quote': (persona, vibe, topic) => {
    const quotes = [
      `"${topic} isn't about being perfect. It's about being so authentically YOU that perfect becomes irrelevant." 💎`,
      `"She believed ${topic.toLowerCase()} was her destiny, so she became inevitable." ✨`,
      `"I don't compete. I dominate. There's a difference, and ${topic.toLowerCase()} taught me that." 👑`,
      `"The moment I stopped explaining myself is the moment ${topic.toLowerCase()} started making sense." 💫`,
      `"${topic}: Not a goal. Not a dream. A non-negotiable standard." 🔥`
    ]
    return quotes[Math.floor(Math.random() * quotes.length)]
  },

  'Roast': (persona, vibe, topic) => {
    const roasts = [
      `You're out here still figuring out ${topic.toLowerCase()} while I already wrote the manual, published it, and sold the movie rights. But go off, I guess. 💅`,
      `Babe, if ${topic.toLowerCase()} was a test, you'd be asking for extra credit on the syllabus. Meanwhile, I'm teaching the class. Know your place. 😌`,
      `The fact that you think you know about ${topic.toLowerCase()} is cute. Like a participation trophy. Adorable, but not winning anything. ☕️`,
      `You: struggling with ${topic.toLowerCase()}\nMe: mastered it, monetized it, moved on\n\nWe are not the same. 💎`
    ]
    return roasts[Math.floor(Math.random() * roasts.length)]
  },

  'Motivational Post': (persona, vibe, topic) => {
    const posts = [
      `Listen up, because I'm only saying this once:\n\n${topic} is YOURS. Not because you earned it, not because you deserve it, but because you DECIDED it was yours.\n\nStop waiting for permission. Stop waiting for the perfect moment. Stop waiting for validation.\n\nThe version of you that has mastered ${topic.toLowerCase()}? She's been waiting for you to catch up.\n\nToday is the day. Let's go. 🔥💪`,

      `Real talk about ${topic}:\n\nYou're not behind. You're not late. You're not "not ready yet."\n\nYou're exactly where you need to be, learning exactly what you need to learn.\n\nBut here's the tea: staying comfortable in that space? That's where you lose.\n\n${topic} isn't about being fearless. It's about being scared and doing it anyway.\n\nSo what's it gonna be? Safe and small, or scared and successful?\n\nYour move. 👑`,

      `Plot twist: ${topic.toLowerCase()} was never the hard part.\n\nBelieving you were worthy of it was.\n\nRead that again. Then go be great. ✨`
    ]
    return posts[Math.floor(Math.random() * posts.length)]
  },

  'Comeback': (persona, vibe, topic) => {
    const comebacks = [
      `Them: "You can't just [action related to ${topic.toLowerCase()}]..."\nMe: "Watch me."\n*Proceeds to absolutely demolish their expectations* 💅`,

      `If I had a dollar for every time someone doubted my ${topic.toLowerCase()}, I'd be rich.\n\nOh wait... I am. \n\nCatch up, babe. 💰`,

      `Person: *tries to dim my light regarding ${topic.toLowerCase()}*\nMe: "That's cute. Anyway—"\n*Continues to shine brighter* ✨`,

      `"You're too much with this ${topic.toLowerCase()} thing."\n\nBestie, too much is my brand. Try again. 👑`
    ]
    return comebacks[Math.floor(Math.random() * comebacks.length)]
  },
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { contentType, persona, vibe, topic } = body

    if (!contentType || !persona || !topic) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const generator = contentTemplates[contentType]
    if (!generator) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400 }
      )
    }

    const content = generator(persona, vibe, topic)

    return NextResponse.json({ content })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}
