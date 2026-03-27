// ============================================================
// CONFIGURATION
// ============================================================
var PILLARS = ['p1', 'p2', 'p3'];
var PILLAR_NAMES = { p1: 'Career', p2: 'Health', p3: 'Entrepreneurial' };
var PILLAR_COUNT = 3;

var PORTFOLIO_ITEMS = [
  { id: 'resume', name: 'Resume v1 (single narrative)', defaultStatus: 'not-started' },
  { id: 'linkedin', name: 'LinkedIn rewrite', defaultStatus: 'not-started' },
  { id: 'dashboard', name: 'Daily OS tool (this dashboard)', defaultStatus: 'in-progress' },
  { id: 'cybera', name: 'CYBERA case study / proof point', defaultStatus: 'not-started' },
  { id: 'intros', name: 'Warm intros activated (Brett + 2)', defaultStatus: 'not-started' },
  { id: 'portfolio-project', name: 'Portfolio project v1', defaultStatus: 'not-started' },
];

// ============================================================
// MILESTONES
// ============================================================
var MILESTONES = [
  { date: '2026-03-28', text: 'Target company list + role titles locked', phase: 1 },
  { date: '2026-03-30', text: '5 target companies + 3 specific roles saved', phase: 1 },
  { date: '2026-03-31', text: 'Ask Brett 1 specific question about T&S hiring', phase: 1 },
  { date: '2026-04-02', text: 'Resume v1 complete + 7-day activity streak', phase: 1 },
  { date: '2026-04-04', text: 'LinkedIn headline and About section rewritten', phase: 1 },
  { date: '2026-04-06', text: '1 CYBERA prospect outreach sent', phase: 1 },
  { date: '2026-04-08', text: 'Resume shared with Brett for feedback', phase: 1 },
  { date: '2026-04-09', text: '14-day physical activity streak', phase: 1 },
  { date: '2026-04-11', text: '2 LinkedIn CRs sent to T&S people at target companies', phase: 1 },
  { date: '2026-04-13', text: 'Resume v2 incorporating Brett feedback', phase: 1 },
  { date: '2026-04-14', text: 'CYBERA prospect #2 outreach sent', phase: 1 },
  { date: '2026-04-15', text: 'Brett Farmer: Anthropic intro conversation', phase: 1 },
  { date: '2026-04-18', text: 'Portfolio project idea selected + 1-page outline', phase: 1 },
  { date: '2026-04-20', text: 'Consistent bedtime established (7 days)', phase: 1 },
  { date: '2026-04-23', text: '30-day activity streak + portfolio live + linkable', phase: 1 },
  { date: '2026-04-30', text: 'Month 1 review: Arsenal check', phase: 1 },
  { date: '2026-05-01', text: 'Series A checkpoint: activate job search?', phase: 2 },
  { date: '2026-05-07', text: '3+ informational interviews booked', phase: 2 },
  { date: '2026-05-09', text: '5 warm connections at target AI companies', phase: 2 },
  { date: '2026-05-15', text: '1st warm referral submitted', phase: 2 },
  { date: '2026-05-23', text: 'CYBERA: 1 signed customer or active pilot', phase: 2 },
  { date: '2026-05-31', text: '60-day activity streak + 3x/week strength routine', phase: 2 },
  { date: '2026-06-01', text: 'Active applications with warm referrals', phase: 3 },
  { date: '2026-06-06', text: 'Portfolio project v1 complete and shareable', phase: 3 },
  { date: '2026-06-13', text: '10+ warm connections + career narrative polished', phase: 3 },
  { date: '2026-06-15', text: '3+ applications in with referrals', phase: 3 },
  { date: '2026-06-20', text: 'Interview-ready: resume, narrative, portfolio, network', phase: 3 },
  { date: '2026-06-25', text: '90-day review: invest / pause / kill each pillar', phase: 3 },
];

// ============================================================
// WEEKS DATA — 13 weeks, Mar 27 to Jun 25
// Week starts Friday per the operating rhythm
// ============================================================
var WEEKS = {

// ---- MONTH 1: BUILD THE ARSENAL ----

"2026-W13": {
  label: "W13: Mar 27 - Apr 2 (Launch Week)",
  phase: 1,
  days: {
    "Fri": {
      date: "Mar 27", isoDate: "2026-03-27",
      tasks: {
        p1: { text: "Write down your 5 target AI companies and 3 role types you'd pursue at each. Save the list.", context: "Anthropic, OpenAI, Scale, Coinbase ML, and your 5th pick. Roles: T&S, GTM/Partnerships, CX Strategy. Be specific." },
        p2: { text: "20-minute walk. No phone. Just walk.", context: "Day 1. The bar is intentionally low. Show up." },
        p3: { text: "Start a 'Problems Worth Solving' note. Write 3 problems you've experienced this month.", context: "Train the observation muscle. Friction = opportunity." },
      }
    },
    "Sat": {
      date: "Mar 28", isoDate: "2026-03-28",
      tasks: {
        p1: { text: "Search your Gmail for old resumes and cover letters. Pull the strongest sections into one doc.", context: "You've got great raw material. Cheetah founding story, Coinbase T&S build, CYBERA narrative. Collect it all." },
        p2: { text: "20-minute walk + 5 minutes stretching before bed.", context: "Same as yesterday, plus stretching. Stack slowly." },
        p3: { text: "Add 2 more problems to your journal. These can be things you notice around you.", context: "Quantity over quality at this stage." },
      }
    },
    "Sun": {
      date: "Mar 29", isoDate: "2026-03-29",
      tasks: {
        p1: { text: "Draft a 1-paragraph career narrative: why your path from Cheetah to Coinbase to CYBERA makes you uniquely valuable to AI companies.", context: "Messy first draft is fine. You'll refine this over weeks. Just get something on paper." },
        p2: { text: "20-minute walk. Set a consistent bedtime for the week ahead. Write it down.", context: "Sleep consistency is the highest-ROI health habit, especially post-weed. Pick a time, commit." },
        p3: { text: "Listen to 1 podcast episode about someone who built a business. Add any ideas to your journal.", context: "How I Built This, My First Million, whatever. Input mode." },
      }
    },
    "Mon": {
      date: "Mar 30", isoDate: "2026-03-30",
      tasks: {
        p1: { text: "Open Cowork. Run discovery prep on your #1 CYBERA prospect. Build the full briefing doc.", context: "Company intel, buyer map, dataset hooks, discovery questions. You've done this before. Focus on 1 target." },
        p2: { text: "20-minute walk + 10 bodyweight squats + 10 pushups (modify if needed).", context: "First strength work. Embarrassingly easy on purpose. Consistency beats intensity." },
        p3: { text: "Add 2 problems to your journal. Star any that excite you.", context: "Pattern recognition starts here. Which problems pull you back?" },
      }
    },
    "Tue": {
      date: "Mar 31", isoDate: "2026-03-31",
      tasks: {
        p1: { text: "Draft outreach to your #1 prospect's decision maker. Run it through the outreach critic. Don't send yet.", context: "Write, refine, get it right. Send tomorrow." },
        p2: { text: "Walk + 10 squats, 10 pushups, 30-second plank. Hit your bedtime.", context: "Adding a plank. Building the habit loop." },
        p3: { text: "Pick 1 starred problem. Write a 3-sentence 'what if' for it.", context: "What if someone built X to solve Y? Keep it short. Creative muscle." },
      }
    },
    "Wed": {
      date: "Apr 1", isoDate: "2026-04-01",
      tasks: {
        p1: { text: "Send the outreach. Log it. Start resume v1 draft: combine best old sections + CYBERA narrative.", context: "Send, log, move. Don't stare at your inbox. Then pivot to resume work." },
        p2: { text: "Full mini-routine: 10 squats, 10 pushups, 30-sec plank, 10 lunges. 20-min walk.", context: "Week 1 complete routine. This becomes your daily minimum." },
        p3: { text: "Spend 15 min exploring 1 AI tool you haven't used before (Cursor, v0, Replit Agent, etc.).", context: "Build familiarity with the toolset. You're building AI fluency." },
      }
    },
    "Thu": {
      date: "Apr 2", isoDate: "2026-04-02",
      tasks: {
        p1: { text: "Finish resume v1. Prep talking points to share with Brett at next Tuesday catchup.", context: "Milestone: resume v1 done. Not perfect, done. Brett's feedback will sharpen it." },
        p2: { text: "Full mini-routine. Rate your sleep quality for the week (1-10). Adjust bedtime if needed.", context: "Week 1 done. How did you sleep? This feedback loop matters." },
        p3: { text: "Weekly review: look at your problem journal. Any themes? Write a 1-paragraph reflection.", context: "You've been collecting problems for a week. What patterns do you see?" },
      }
    }
  }
},

"2026-W14": {
  label: "W14: Apr 3 - Apr 9 (Portfolio Sprint)",
  phase: 1,
  days: {
    "Fri": {
      date: "Apr 3", isoDate: "2026-04-03",
      tasks: {
        p1: { text: "Discovery prep for CYBERA prospect #2. Rewrite your LinkedIn headline + summary for AI company targeting.", context: "LinkedIn is your storefront. Headline: who you are for AI companies, not just CYBERA." },
        p2: { text: "Full routine + 5 minutes of box breathing before bed (4 in, 4 hold, 4 out, 4 hold).", context: "Breathwork helps sleep quality, especially post-weed." },
        p3: { text: "Research who's already solving your most-starred problem. Write what you'd do differently.", context: "Competitive awareness. Someone probably is. That's fine. Learn from them." },
      }
    },
    "Sat": {
      date: "Apr 4", isoDate: "2026-04-04",
      tasks: {
        p1: { text: "Document this operating system as a portfolio piece. Write the 'what I built and why' narrative.", context: "This dashboard = proof you can spec a problem, use AI tools to ship a solution, and execute on it." },
        p2: { text: "30-minute walk + stretching. Weekend means more time.", context: "Longer session. Enjoy it." },
        p3: { text: "Add 2 problems. Read 1 article about a startup in a space that interests you.", context: "Keep feeding the brain." },
      }
    },
    "Sun": {
      date: "Apr 5", isoDate: "2026-04-05",
      tasks: {
        p1: { text: "Refine your career narrative paragraph. Read it out loud. If it sounds stiff, rewrite.", context: "This becomes your intro in every informational interview. Practice it." },
        p2: { text: "Full routine + set your Week 2 bedtime commitment.", context: "Did you stick to it last week? Adjust if not." },
        p3: { text: "Founder podcast + journal entry.", context: "Input mode. Stay curious." },
      }
    },
    "Mon": {
      date: "Apr 6", isoDate: "2026-04-06",
      tasks: {
        p1: { text: "Send outreach to CYBERA prospect #2. Log it. Send 2 LinkedIn CRs to people at target AI companies with personal notes.", context: "Quality over quantity on the CRs. Research them first, reference something specific." },
        p2: { text: "Full routine, 2 sets of each exercise. Progressive overload starts here.", context: "Same exercises, slightly more volume. You're building the engine." },
        p3: { text: "20 min prototyping something small with an AI tool. Ship anything.", context: "A script, a mockup, a workflow. It doesn't have to be good. It has to exist." },
      }
    },
    "Tue": {
      date: "Apr 7", isoDate: "2026-04-07",
      tasks: {
        p1: { text: "Brett Farmer Tuesday catchup. Discuss: path to Anthropic intro. Share resume v1 for feedback.", context: "Brett is your #1 strategic network asset. Be direct: 'I'm positioning for AI companies. Can you intro me at Anthropic?'" },
        p2: { text: "Full routine (2 sets). Track energy level 1-10 after workout.", context: "Connect exercise to how you feel. This builds intrinsic motivation." },
        p3: { text: "Write a deeper 'what if' for your top problem. Who's the buyer? What's the MVP?", context: "Go one level deeper. Not building yet, just thinking sharper." },
      }
    },
    "Wed": {
      date: "Apr 8", isoDate: "2026-04-08",
      tasks: {
        p1: { text: "Engage with 2 posts from people at target AI companies. Thoughtful comments, not 'great post.'", context: "Be visible. Add value. This is networking that doesn't feel forced." },
        p2: { text: "Full routine (2 sets) + breathing before bed.", context: "Stacking habits. You've got this." },
        p3: { text: "30 min building something fun with AI. No pressure, just play.", context: "Creative exploration. Let yourself be curious." },
      }
    },
    "Thu": {
      date: "Apr 9", isoDate: "2026-04-09",
      tasks: {
        p1: { text: "Weekly review: pipeline status + career progress. Connections made, resume feedback incorporated, portfolio started?", context: "Milestone check: portfolio project v0.1 should be started. Are you on track?" },
        p2: { text: "Full routine + rate sleep/energy for the week. What worked? What didn't?", context: "Week 2 done. Celebrate showing up." },
        p3: { text: "Problem journal review. Update starred list. Any themes across 2 weeks?", context: "2 weeks of problems collected. Patterns should be emerging." },
      }
    }
  }
},

"2026-W15": {
  label: "W15: Apr 10 - Apr 16 (Network Activation)",
  phase: 1,
  days: {
    "Fri": {
      date: "Apr 10", isoDate: "2026-04-10",
      tasks: {
        p1: { text: "CYBERA prospect #3 discovery prep. Identify 2 more people at target AI companies to connect with.", context: "Pipeline always needs feeding. Both CYBERA and your AI career track." },
        p2: { text: "Full routine (2 sets). Add 10-minute jog or bike if your hip feels good.", context: "Week 3: time to test cardio. Go easy, listen to your body." },
        p3: { text: "Research 1 AI tool or framework you could build a micro-experiment with.", context: "Start identifying what you'll actually build." },
      }
    },
    "Sat": {
      date: "Apr 11", isoDate: "2026-04-11",
      tasks: {
        p1: { text: "Work on portfolio project: get it to something you could show someone in 60 seconds.", context: "The 60-second demo test. If you can't show it quickly, simplify." },
        p2: { text: "30-minute walk or longer outdoor activity.", context: "Weekend. Get outside. Move." },
        p3: { text: "Add problems. Read about how 1 successful AI company got its first customers.", context: "Study the playbook." },
      }
    },
    "Sun": {
      date: "Apr 12", isoDate: "2026-04-12",
      tasks: {
        p1: { text: "Polish career narrative based on Brett's feedback. Draft a short LinkedIn post showing AI thinking (not CYBERA sales).", context: "Public presence building. Share an insight, not a pitch." },
        p2: { text: "Full routine + bedtime commitment.", context: "Consistency is the goal." },
        p3: { text: "Founder podcast + journal.", context: "Input mode." },
      }
    },
    "Mon": {
      date: "Apr 13", isoDate: "2026-04-13",
      tasks: {
        p1: { text: "Send outreach to prospect #3. Identify 1 person at Anthropic to request an informational interview with.", context: "Not applying yet. Asking to learn. 'I'm exploring how [role] works at Anthropic, would love 15 min.'" },
        p2: { text: "Full routine (2 sets) + cardio. Track energy 1-10.", context: "Building the engine." },
        p3: { text: "Start micro-experiment #1. 30 minutes. Just get the skeleton up.", context: "Don't aim for perfect. Aim for started." },
      }
    },
    "Tue": {
      date: "Apr 14", isoDate: "2026-04-14",
      tasks: {
        p1: { text: "Brett Tuesday: follow up on Anthropic intro. Share portfolio progress. Ask for honest feedback on positioning.", context: "Brett knows these companies. His feedback is gold." },
        p2: { text: "Full routine (2 sets) + cardio.", context: "Consistency." },
        p3: { text: "Continue micro-experiment. Push visible progress.", context: "The goal is a thing that exists." },
      }
    },
    "Wed": {
      date: "Apr 15", isoDate: "2026-04-15",
      tasks: {
        p1: { text: "Follow up with CYBERA prospects #1 and #2 if no response. Draft informational interview request for Anthropic contact.", context: "Milestone: Brett Anthropic intro conversation should be happening around now." },
        p2: { text: "Full routine + breathing. Try increasing to 3 sets if 2 feels easy.", context: "Progressive overload. Listen to your body." },
        p3: { text: "Engage with 2 AI community posts. Add value with comments.", context: "Building visibility in the space." },
      }
    },
    "Thu": {
      date: "Apr 16", isoDate: "2026-04-16",
      tasks: {
        p1: { text: "Weekly review: CYBERA pipeline + AI career progress. Connections, informational interviews, portfolio status.", context: "3 weeks in. Are you closer to being interview-ready than last week?" },
        p2: { text: "Full routine + rate sleep/energy. Are you seeing improvement?", context: "3 weeks of exercise. Check in with yourself." },
        p3: { text: "Problem journal review. Pick your top 2 problems. Could either become a real project?", context: "Start narrowing from many to few." },
      }
    }
  }
},

"2026-W16": {
  label: "W16: Apr 17 - Apr 23 (Portfolio Polish)",
  phase: 1,
  days: {
    "Fri": {
      date: "Apr 17", isoDate: "2026-04-17",
      tasks: {
        p1: { text: "Resume v2: incorporate all feedback. Make it tight. CYBERA prospect #4 research.", context: "Resume should be approaching 'send it' quality. Ask: would I be proud to share this?" },
        p2: { text: "Full routine (3 sets). Consider finding a gym or class to try next week.", context: "Week 4: time to think about what sustainable exercise looks like beyond bodyweight." },
        p3: { text: "Build session: 30 min on micro-experiment. Get it demo-ready.", context: "You want to be able to show this by end of month." },
      }
    },
    "Sat": {
      date: "Apr 18", isoDate: "2026-04-18",
      tasks: {
        p1: { text: "Portfolio project: make it linkable. Put it somewhere someone can see it (GitHub, personal site, etc.).", context: "Milestone approaching: portfolio piece live + linkable by Apr 23." },
        p2: { text: "Longer session: 30+ min walk or try a new physical activity.", context: "Explore. Find what you enjoy." },
        p3: { text: "Add problems. Write about what you've learned from 4 weeks of observation.", context: "Reflection time." },
      }
    },
    "Sun": {
      date: "Apr 19", isoDate: "2026-04-19",
      tasks: {
        p1: { text: "Draft LinkedIn post #2: share something you've built or learned. Not CYBERA sales.", context: "Public proof of work. Show, don't tell." },
        p2: { text: "Full routine + bedtime commitment.", context: "Almost 1 month. How do you feel compared to day 1?" },
        p3: { text: "Podcast + journal. Focus on stories of people who pivoted careers successfully.", context: "You're about to enter the pivot phase. Study the pattern." },
      }
    },
    "Mon": {
      date: "Apr 20", isoDate: "2026-04-20",
      tasks: {
        p1: { text: "Send CYBERA outreach to prospect #4. Send 2 more LinkedIn CRs to AI company contacts.", context: "Keep both pipelines moving. Consistent outreach beats bursts." },
        p2: { text: "Full routine (3 sets) + cardio. Track energy.", context: "Month 1 fitness level. You should feel a difference." },
        p3: { text: "Micro-experiment polish session. 30 min. Get it shareable.", context: "Almost there." },
      }
    },
    "Tue": {
      date: "Apr 21", isoDate: "2026-04-21",
      tasks: {
        p1: { text: "Brett Tuesday: share portfolio, get Anthropic intro status, discuss informational interview strategy.", context: "You should have a real portfolio to show by now. Brett's reaction is a signal." },
        p2: { text: "Full routine (3 sets) + cardio.", context: "Almost 1 month strong." },
        p3: { text: "Explore 1 new AI tool. Can it help with your top problem?", context: "Keep the toolkit growing." },
      }
    },
    "Wed": {
      date: "Apr 22", isoDate: "2026-04-22",
      tasks: {
        p1: { text: "Follow up with all CYBERA prospects. Prep Month 1 review doc for yourself.", context: "What worked? What didn't? What changes for Month 2?" },
        p2: { text: "Full routine + breathing. How's sleep quality this month vs. last?", context: "Track the trend, not just the day." },
        p3: { text: "Engage with 2 AI community posts. Build your presence.", context: "You're becoming a known entity in this space." },
      }
    },
    "Thu": {
      date: "Apr 23", isoDate: "2026-04-23",
      tasks: {
        p1: { text: "Month 1 checkpoint. Portfolio live? LinkedIn sharp? Resume ready? 5+ warm connections? If yes: Month 2 = deploy the network.", context: "Milestone: portfolio piece live + linkable. If you hit this, you're on track." },
        p2: { text: "Full routine + month review: weight, energy, sleep, consistency. Set Month 2 fitness goal.", context: "1 month done. You built a habit from nothing. Respect that." },
        p3: { text: "Month 1 reflection: best problems, most interesting 'what ifs,' next experiment ideas.", context: "Entrepreneurial pillar stays on autopilot, but the inputs are stacking." },
      }
    }
  }
},

// ---- MONTH 2: DEPLOY THE NETWORK ----

"2026-W17": {
  label: "W17: Apr 24 - Apr 30 (Month 2 Transition)",
  phase: 2,
  days: {
    "Fri": {
      date: "Apr 24", isoDate: "2026-04-24",
      tasks: {
        p1: { text: "Month 2 kickoff: review Month 1 wins. Update target list based on what you learned. Identify 3 new contacts at AI companies.", context: "Month 1 built the arsenal. Month 2 deploys it. Shift from building materials to using them." },
        p2: { text: "Full routine (3 sets) + cardio. Try a gym session or fitness class if you haven't yet.", context: "Month 2: upgrade from bodyweight-only. Find a gym or studio you like." },
        p3: { text: "Review problem journal. Select your #1 problem. Write a 1-page concept brief.", context: "Time to go deeper on one idea. Not building — just thinking with more structure." },
      }
    },
    "Sat": {
      date: "Apr 25", isoDate: "2026-04-25",
      tasks: {
        p1: { text: "Portfolio project polish: write the README, clean the code, make it presentation-ready.", context: "You'll be sharing this in interviews. First impressions matter." },
        p2: { text: "30+ min outdoor activity. Take the family if possible.", context: "Weekend. Move. Enjoy it." },
        p3: { text: "Add 2 problems. Read 1 article about AI safety or trust & safety.", context: "Overlap your reading with your career target. Two birds." },
      }
    },
    "Sun": {
      date: "Apr 26", isoDate: "2026-04-26",
      tasks: {
        p1: { text: "Draft a LinkedIn post about something you built or learned in Month 1. Schedule it for Monday.", context: "Show your work publicly. This is how opportunities find you." },
        p2: { text: "Full routine + bedtime reset for the new month.", context: "Fresh start. Recommit to sleep consistency." },
        p3: { text: "Podcast + journal. Focus on AI safety or regulation content this time.", context: "Fuel your career positioning with domain knowledge." },
      }
    },
    "Mon": {
      date: "Apr 27", isoDate: "2026-04-27",
      tasks: {
        p1: { text: "CYBERA: prospect #5 discovery prep + outreach. Career: send 2 LinkedIn CRs to new AI company contacts.", context: "Keep both pipelines moving. Month 2 is about volume + quality." },
        p2: { text: "Gym or structured workout. 3 sets strength + 15 min cardio.", context: "This is your new baseline. Show up even when you don't feel like it." },
        p3: { text: "30 min on micro-experiment #2 or deepening #1.", context: "Keep building. Small bets." },
      }
    },
    "Tue": {
      date: "Apr 28", isoDate: "2026-04-28",
      tasks: {
        p1: { text: "Brett Tuesday: Month 1 recap, Anthropic intro status, plan informational interviews for May.", context: "Come with a specific ask: 'Can you introduce me to [name] at [company]?'" },
        p2: { text: "Full routine (3 sets) + cardio. Track energy.", context: "Consistency compounds." },
        p3: { text: "Write a Twitter/X thread or blog post about your top problem. Don't publish — just draft.", context: "Articulating ideas publicly sharpens your thinking." },
      }
    },
    "Wed": {
      date: "Apr 29", isoDate: "2026-04-29",
      tasks: {
        p1: { text: "Send 2 informational interview requests. Follow up on any outstanding CYBERA prospects.", context: "Month 2 goal: get conversations happening. Don't let requests sit unsent." },
        p2: { text: "Full routine + breathing. Rate sleep quality this week.", context: "Are you sleeping better than Month 1?" },
        p3: { text: "Engage with 2 AI community posts. Thoughtful comments only.", context: "Build visibility. You're becoming a known entity." },
      }
    },
    "Thu": {
      date: "Apr 30", isoDate: "2026-04-30",
      tasks: {
        p1: { text: "Month 1 review doc: what worked, what didn't, what changes. CYBERA pipeline status. Career positioning score (1-10).", context: "Milestone: Month 1 Arsenal Check. Be honest with yourself. What needs to change?" },
        p2: { text: "Full routine + month-end body/energy check. Set Month 2 fitness targets.", context: "You've been at this for 5 weeks. Track the trend." },
        p3: { text: "Monthly entrepreneurial review: best problems, concept brief quality, experiment progress.", context: "Autopilot check-in. Is this pillar generating real insights?" },
      }
    }
  }
},

"2026-W18": {
  label: "W18: May 1 - May 7 (Series A Checkpoint)",
  phase: 2,
  days: {
    "Fri": {
      date: "May 1", isoDate: "2026-05-01",
      tasks: {
        p1: { text: "Series A checkpoint. Has it closed? If not: activate full job search mode immediately. Update resume, increase outreach cadence.", context: "This is the inflection point. If Series A hasn't closed, your career track becomes P0. No more waiting." },
        p2: { text: "Gym session: 3 sets strength + 20 min cardio. This is stress management now.", context: "High-stress moment. Exercise is your pressure valve. Don't skip today." },
        p3: { text: "Write down 3 things you're grateful for this week. Seriously.", context: "Gratitude practice during high-pressure moments. It works." },
      }
    },
    "Sat": {
      date: "May 2", isoDate: "2026-05-02",
      tasks: {
        p1: { text: "Based on Series A outcome: either celebrate or activate Plan B. Update all career materials accordingly.", context: "If Plan B: list the 5 most promising opportunities. Rank by likelihood + excitement." },
        p2: { text: "30+ min outdoor activity. Clear your head.", context: "Big decisions deserve fresh air." },
        p3: { text: "Add problems. Read about how other people navigated career transitions.", context: "You're not the first. Learn from those who did it well." },
      }
    },
    "Sun": {
      date: "May 3", isoDate: "2026-05-03",
      tasks: {
        p1: { text: "Prep informational interview questions. Research the person. Know their work.", context: "Every interview is a chance to learn AND impress. Preparation is respect." },
        p2: { text: "Full routine + bedtime commitment.", context: "Protect your sleep, especially during stressful weeks." },
        p3: { text: "Podcast + journal. Listen to something inspiring, not tactical.", context: "Feed your soul. The tactics will follow." },
      }
    },
    "Mon": {
      date: "May 4", isoDate: "2026-05-04",
      tasks: {
        p1: { text: "Send 3 outreach messages: 1 CYBERA prospect + 2 career networking. Quality matters more than volume.", context: "Month 2 cadence: 3 outreaches per week minimum. Track them all." },
        p2: { text: "Gym: 3 sets strength + cardio. Try a new exercise.", context: "Variety prevents plateaus and boredom." },
        p3: { text: "30 min building. Ship something small.", context: "Keep the creative muscle active." },
      }
    },
    "Tue": {
      date: "May 5", isoDate: "2026-05-05",
      tasks: {
        p1: { text: "Brett Tuesday: Series A debrief. If Plan B: get Brett's top 3 introductions. If Plan A: discuss acceleration.", context: "Brett is your most valuable network node. Use this conversation wisely." },
        p2: { text: "Full routine (3 sets) + cardio.", context: "Consistency." },
        p3: { text: "Research 1 company in your problem space. What's their funding? Revenue? Team size?", context: "Understanding the market around your best idea." },
      }
    },
    "Wed": {
      date: "May 6", isoDate: "2026-05-06",
      tasks: {
        p1: { text: "Follow up on all pending informational interview requests. Send at least 1 new one.", context: "The pipeline needs constant feeding. Every unanswered request gets a follow-up." },
        p2: { text: "Full routine + breathing. How are stress levels this week?", context: "Check in with yourself honestly. Adjust workout intensity if needed." },
        p3: { text: "Engage with 2 posts in AI safety/T&S community. Be visible.", context: "Your career target community. Show up consistently." },
      }
    },
    "Thu": {
      date: "May 7", isoDate: "2026-05-07",
      tasks: {
        p1: { text: "Weekly review: how many informational interviews booked? Pipeline status. Outreach tracking.", context: "Milestone: 3+ informational interviews should be booked by now." },
        p2: { text: "Full routine + weekly energy/sleep review.", context: "6 weeks of data. What's the trend?" },
        p3: { text: "Problem journal review. Is your #1 idea getting stronger or weaker?", context: "Ideas that survive 6 weeks of scrutiny are worth more attention." },
      }
    }
  }
},

"2026-W19": {
  label: "W19: May 8 - May 14 (Interview Circuit)",
  phase: 2,
  days: {
    "Fri": {
      date: "May 8", isoDate: "2026-05-08",
      tasks: {
        p1: { text: "Prep for your first informational interview. Research the person deeply. Prepare 5 thoughtful questions.", context: "First impressions in informational interviews = your reputation in that network. Come prepared." },
        p2: { text: "Gym session. Pre-interview stress management.", context: "Burn off the nerves. You've got this." },
        p3: { text: "Concept brief update: refine based on 6 weeks of observation.", context: "Your entrepreneurial thinking should be sharper now." },
      }
    },
    "Sat": {
      date: "May 9", isoDate: "2026-05-09",
      tasks: {
        p1: { text: "Conduct or prep for informational interview #1. Send a thank-you note within 24 hours.", context: "Milestone: 5 warm connections at target AI companies. Count them." },
        p2: { text: "30+ min outdoor activity. Active recovery.", context: "Weekend movement. Enjoy the sunshine." },
        p3: { text: "Add problems. Think about problems in AI safety/T&S specifically.", context: "Overlap your observation with your career target." },
      }
    },
    "Sun": {
      date: "May 10", isoDate: "2026-05-10",
      tasks: {
        p1: { text: "Write up interview notes. What did you learn? Any new leads? Update your target list.", context: "Every conversation is data. Capture it systematically." },
        p2: { text: "Full routine + bedtime commitment.", context: "Protect the habits." },
        p3: { text: "Podcast + journal. Happy Mother's Day — light day.", context: "Be present with family. Low pressure." },
      }
    },
    "Mon": {
      date: "May 11", isoDate: "2026-05-11",
      tasks: {
        p1: { text: "Send 3 outreach messages. CYBERA pipeline check: any deals progressing? Any going cold?", context: "Both pipelines need attention. Don't let CYBERA slip while chasing career goals." },
        p2: { text: "Gym: 3 sets strength + cardio. Push the weight up slightly.", context: "Progressive overload. You're stronger than week 1." },
        p3: { text: "30 min building or exploring. Follow your curiosity.", context: "No pressure. Just create." },
      }
    },
    "Tue": {
      date: "May 12", isoDate: "2026-05-12",
      tasks: {
        p1: { text: "Brett Tuesday: informational interview debrief. Warm referral strategy. Who introduces you next?", context: "Ask Brett: 'Who else should I be talking to? Can you make 2 intros this week?'" },
        p2: { text: "Full routine (3 sets) + cardio.", context: "Consistency." },
        p3: { text: "Draft a short write-up about your concept. Could be a blog post, a memo, a pitch.", context: "Practice articulating your entrepreneurial idea clearly." },
      }
    },
    "Wed": {
      date: "May 13", isoDate: "2026-05-13",
      tasks: {
        p1: { text: "Informational interview #2 (or prep). Follow up on all outstanding requests. LinkedIn engagement.", context: "The cadence matters more than any single conversation." },
        p2: { text: "Full routine + breathing. Mid-week energy check.", context: "How are you feeling? Adjust if needed." },
        p3: { text: "AI community engagement: 2 thoughtful comments or posts.", context: "Be visible in the spaces where your target companies recruit." },
      }
    },
    "Thu": {
      date: "May 14", isoDate: "2026-05-14",
      tasks: {
        p1: { text: "Weekly review: informational interviews done, warm connections count, CYBERA pipeline status. Are you on track for May 15 referral milestone?", context: "Milestone approaching: 1st warm referral submitted by May 15." },
        p2: { text: "Full routine + weekly review. 7 weeks in — how do you feel vs. day 1?", context: "You've been exercising for almost 2 months. That's significant." },
        p3: { text: "Problem journal review. Any new problems from your informational interviews?", context: "Conversations with smart people surface new problems. Capture them." },
      }
    }
  }
},

"2026-W20": {
  label: "W20: May 15 - May 21 (First Referral)",
  phase: 2,
  days: {
    "Fri": {
      date: "May 15", isoDate: "2026-05-15",
      tasks: {
        p1: { text: "Submit your first warm referral to a target company. If not ready: identify the blocker and fix it today.", context: "Milestone: 1st warm referral submitted. This is the moment the job search becomes real." },
        p2: { text: "Gym session. Celebrate with a hard workout.", context: "Big milestone day. Channel the energy." },
        p3: { text: "Reflect: what would you build if money weren't an issue? Write 1 page.", context: "Dreams journal entry. Let yourself think big for a day." },
      }
    },
    "Sat": {
      date: "May 16", isoDate: "2026-05-16",
      tasks: {
        p1: { text: "Portfolio project final polish. Make sure everything is live, linked, documented.", context: "Your portfolio is part of every application. Make it shine." },
        p2: { text: "30+ min outdoor activity. Family time.", context: "Balance. You're doing a lot. Take a beat." },
        p3: { text: "Add problems. Read about someone who pivoted from fintech to AI.", context: "You're doing this pivot. Learn from others." },
      }
    },
    "Sun": {
      date: "May 17", isoDate: "2026-05-17",
      tasks: {
        p1: { text: "Update all career materials based on informational interview feedback. Tighten the narrative.", context: "Every conversation teaches you what resonates. Adapt." },
        p2: { text: "Full routine + bedtime commitment.", context: "Protect the habits." },
        p3: { text: "Podcast + journal.", context: "Input mode." },
      }
    },
    "Mon": {
      date: "May 18", isoDate: "2026-05-18",
      tasks: {
        p1: { text: "Send 3 outreach messages. CYBERA customer close push: what needs to happen to sign someone?", context: "CYBERA milestone approaching: 1 signed customer by May 23. What's the path?" },
        p2: { text: "Gym: 3 sets strength + cardio. Try to increase either weight or reps.", context: "Progressive overload. You're 2 months in." },
        p3: { text: "30 min building. Ship something visible.", context: "Keep the streak alive." },
      }
    },
    "Tue": {
      date: "May 19", isoDate: "2026-05-19",
      tasks: {
        p1: { text: "Brett Tuesday: referral status update. Who else can intro you? CYBERA customer strategy.", context: "Make this a strategy session. What's working? What's not? Where to double down?" },
        p2: { text: "Full routine (3 sets) + cardio.", context: "Consistency." },
        p3: { text: "Research the market for your #1 problem. TAM, competitors, gaps.", context: "Start thinking like a founder, even if you're not building yet." },
      }
    },
    "Wed": {
      date: "May 20", isoDate: "2026-05-20",
      tasks: {
        p1: { text: "Informational interview #3 (or follow-up). Push for 2nd referral submission this week.", context: "Momentum matters. One referral is good. Two is a pattern." },
        p2: { text: "Full routine + breathing. Stress check.", context: "How's the mental game? Be honest." },
        p3: { text: "AI community engagement. 2 thoughtful posts or comments.", context: "Build the brand." },
      }
    },
    "Thu": {
      date: "May 21", isoDate: "2026-05-21",
      tasks: {
        p1: { text: "Weekly review: referrals submitted, interviews done, CYBERA close probability. Score yourself 1-10 on Month 2 goals.", context: "2 weeks left in Month 2. Are you where you need to be?" },
        p2: { text: "Full routine + weekly review. 8 weeks in.", context: "You've been doing this for 2 months. That's habit territory." },
        p3: { text: "Problem journal review. Top 3 ideas ranked by excitement and feasibility.", context: "Narrowing. Which idea keeps pulling you back?" },
      }
    }
  }
},

"2026-W21": {
  label: "W21: May 22 - May 28 (CYBERA Customer Push)",
  phase: 2,
  days: {
    "Fri": {
      date: "May 22", isoDate: "2026-05-22",
      tasks: {
        p1: { text: "CYBERA: final push for customer #1. What needs to happen today to close? Remove every blocker.", context: "Milestone tomorrow: 1 signed customer or active pilot. Make it happen." },
        p2: { text: "Gym session. Channel the urgency into the workout.", context: "Stress = fuel. Use it productively." },
        p3: { text: "Write a 'lessons learned' doc from 2 months of problem journaling.", context: "What have you learned about yourself as an observer? What surprises you?" },
      }
    },
    "Sat": {
      date: "May 23", isoDate: "2026-05-23",
      tasks: {
        p1: { text: "CYBERA milestone check: signed customer? Active pilot? If not: honest assessment of what went wrong and what to change.", context: "Milestone: 1 signed customer or active pilot. If missed: what's the realistic timeline?" },
        p2: { text: "30+ min outdoor activity. Decompress.", context: "Regardless of CYBERA outcome, move your body." },
        p3: { text: "Add problems. Look for problems in the sales/customer process you just went through.", context: "Meta-observation: the sales process itself might contain your best startup idea." },
      }
    },
    "Sun": {
      date: "May 24", isoDate: "2026-05-24",
      tasks: {
        p1: { text: "Based on CYBERA outcome: adjust Month 3 career strategy. Update priorities.", context: "If customer signed: great story for interviews. If not: pivot the narrative to lessons learned." },
        p2: { text: "Full routine + bedtime commitment.", context: "Protect the habits." },
        p3: { text: "Podcast + journal. Something about resilience or pivoting.", context: "This week's theme is adaptation." },
      }
    },
    "Mon": {
      date: "May 25", isoDate: "2026-05-25",
      tasks: {
        p1: { text: "Memorial Day. Light career work: update LinkedIn with recent wins. Prep for Month 3 push.", context: "Holiday. But 30 minutes of positioning work keeps momentum." },
        p2: { text: "Outdoor workout or hike. Memorial Day activity.", context: "Holiday fitness. Make it fun." },
        p3: { text: "Holiday brainstorm: what would your ideal work day look like in 2 years?", context: "Vision casting. Where are you going?" },
      }
    },
    "Tue": {
      date: "May 26", isoDate: "2026-05-26",
      tasks: {
        p1: { text: "Brett Tuesday: CYBERA update, Month 3 strategy, push for 2 more warm intros.", context: "Month 3 starts soon. Brett's network is your accelerator." },
        p2: { text: "Full routine (3 sets) + cardio.", context: "Back to normal schedule." },
        p3: { text: "Work on your concept brief. Could this be a side project? A portfolio piece? A startup?", context: "Start thinking about what form this idea could take." },
      }
    },
    "Wed": {
      date: "May 27", isoDate: "2026-05-27",
      tasks: {
        p1: { text: "Send 3 outreaches. Follow up on all pending referrals. Any interview invites yet?", context: "The pipeline should be generating responses by now. If not: diagnose why." },
        p2: { text: "Full routine + breathing. 2 months of exercise. How's the body?", context: "Progress check. Joints, energy, sleep quality." },
        p3: { text: "AI community engagement. Share something you've learned.", context: "Give back to the community." },
      }
    },
    "Thu": {
      date: "May 28", isoDate: "2026-05-28",
      tasks: {
        p1: { text: "Weekly review: Month 2 almost done. Referrals submitted, interviews done, CYBERA status. Prep Month 3 plan.", context: "Month 2 wrap-up approaching. What's your honest assessment?" },
        p2: { text: "Full routine + weekly review. Fitness goal check for Month 2.", context: "9 weeks of exercise. The habit is locked. Now optimize." },
        p3: { text: "Problem journal review. Final Month 2 entrepreneurial assessment.", context: "Is the entrepreneurial pillar generating value? Adjust if needed." },
      }
    }
  }
},

// ---- MONTH 3: APPLY WITH ADVANTAGE ----

"2026-W22": {
  label: "W22: May 29 - Jun 4 (Month 3 Launch)",
  phase: 3,
  days: {
    "Fri": {
      date: "May 29", isoDate: "2026-05-29",
      tasks: {
        p1: { text: "Month 3 kickoff: applications go live. Submit your top 2 applications with warm referrals attached.", context: "Month 3 = Apply with Advantage. Every application has a referral. No cold applications." },
        p2: { text: "Gym session. 3 sets + 20 min cardio. This is your standard now.", context: "Routine is locked. Focus on progressive overload." },
        p3: { text: "Entrepreneurial Month 3 plan: what's the one thing you want to build or learn?", context: "Keep it focused. One thing, not five." },
      }
    },
    "Sat": {
      date: "May 30", isoDate: "2026-05-30",
      tasks: {
        p1: { text: "Application materials review: resume, cover letter templates, portfolio links all working.", context: "QA your application package. Every link works. Every claim is backed." },
        p2: { text: "30+ min outdoor activity.", context: "Weekend. Move." },
        p3: { text: "Add problems. Focus on problems you'd want to solve full-time.", context: "Getting serious about the entrepreneurial thinking." },
      }
    },
    "Sun": {
      date: "May 31", isoDate: "2026-05-31",
      tasks: {
        p1: { text: "Prep interview stories: STAR format for top 5 accomplishments. Practice out loud.", context: "You need stories ready: Cheetah scaling, Coinbase T&S, CYBERA building, problem-solving examples." },
        p2: { text: "Full routine. Milestone: 60-day activity streak. You did it.", context: "60 days of showing up every single day. That's character evidence for any interview." },
        p3: { text: "Podcast + journal.", context: "Input mode." },
      }
    },
    "Mon": {
      date: "Jun 1", isoDate: "2026-06-01",
      tasks: {
        p1: { text: "Submit application #3. Follow up on #1 and #2. Push for interview scheduling.", context: "Milestone: active applications with warm referrals. The pipeline is live." },
        p2: { text: "Gym: strength + cardio. Consistent schedule.", context: "The habit runs itself now." },
        p3: { text: "30 min on your one entrepreneurial thing.", context: "Keep building." },
      }
    },
    "Tue": {
      date: "Jun 2", isoDate: "2026-06-02",
      tasks: {
        p1: { text: "Brett Tuesday: application status, interview prep, practice your narrative with him.", context: "Brett can mock-interview you. Ask him to be tough." },
        p2: { text: "Full routine (3 sets) + cardio.", context: "Consistency." },
        p3: { text: "Research: what does the startup landscape look like for your problem? Any funding?", context: "Casual due diligence." },
      }
    },
    "Wed": {
      date: "Jun 3", isoDate: "2026-06-03",
      tasks: {
        p1: { text: "LinkedIn engagement: share something valuable. Comment on 2 posts from target company people.", context: "Stay visible. Even during active applications." },
        p2: { text: "Full routine + breathing.", context: "Stress management during the application cycle." },
        p3: { text: "AI community engagement. 2 thoughtful contributions.", context: "Your online presence is part of your application." },
      }
    },
    "Thu": {
      date: "Jun 4", isoDate: "2026-06-04",
      tasks: {
        p1: { text: "Weekly review: applications submitted, responses received, interviews scheduled. Adjust strategy.", context: "Month 3 Week 1 done. What's the hit rate? What needs to change?" },
        p2: { text: "Full routine + weekly review.", context: "10 weeks. Double digits." },
        p3: { text: "Problem journal review. Cross-reference your ideas with interview conversations.", context: "Are the problems you're seeing aligning with industry needs?" },
      }
    }
  }
},

"2026-W23": {
  label: "W23: Jun 5 - Jun 11 (Portfolio Complete)",
  phase: 3,
  days: {
    "Fri": {
      date: "Jun 5", isoDate: "2026-06-05",
      tasks: {
        p1: { text: "Portfolio project v1: final review. Is it complete and shareable? If not, finish it today.", context: "Milestone tomorrow: portfolio project v1 complete. Last chance to polish." },
        p2: { text: "Gym session. Strong workout to start the weekend.", context: "Routine." },
        p3: { text: "Concept brief final version. Could you pitch this in 2 minutes?", context: "Elevator pitch practice for your entrepreneurial idea." },
      }
    },
    "Sat": {
      date: "Jun 6", isoDate: "2026-06-06",
      tasks: {
        p1: { text: "Portfolio v1 milestone. Share it with 3 people and ask for feedback.", context: "Milestone: portfolio project v1 complete and shareable. Get external validation." },
        p2: { text: "30+ min outdoor activity.", context: "Celebrate finishing the portfolio with movement." },
        p3: { text: "Add problems. What new problems have you discovered through the interview process?", context: "Interviews are a goldmine for problem discovery." },
      }
    },
    "Sun": {
      date: "Jun 7", isoDate: "2026-06-07",
      tasks: {
        p1: { text: "Interview prep: technical questions for T&S roles. How do you handle content moderation at scale? Safety systems design?", context: "Study the domain. Read Anthropic's responsible scaling policy. Read OpenAI's safety blog." },
        p2: { text: "Full routine + bedtime commitment.", context: "Protect the habits." },
        p3: { text: "Podcast + journal.", context: "Input mode." },
      }
    },
    "Mon": {
      date: "Jun 8", isoDate: "2026-06-08",
      tasks: {
        p1: { text: "Submit 2 more applications. Follow up on all pending. Push for interview dates.", context: "Volume matters now. Every day without a submission is a missed opportunity." },
        p2: { text: "Gym: strength + cardio.", context: "Standard routine." },
        p3: { text: "30 min on your entrepreneurial project.", context: "Keep it alive." },
      }
    },
    "Tue": {
      date: "Jun 9", isoDate: "2026-06-09",
      tasks: {
        p1: { text: "Brett Tuesday: interview prep, mock questions, strategy for final push.", context: "The finish line is in sight. Make every conversation count." },
        p2: { text: "Full routine (3 sets) + cardio.", context: "Consistency." },
        p3: { text: "Talk to 1 person about your entrepreneurial idea. Get their reaction.", context: "External validation. Does this resonate?" },
      }
    },
    "Wed": {
      date: "Jun 10", isoDate: "2026-06-10",
      tasks: {
        p1: { text: "Interview prep: behavioral questions. Use STAR format. Practice 5 stories out loud.", context: "The interview is a performance. Rehearse." },
        p2: { text: "Full routine + breathing.", context: "Pre-interview calm." },
        p3: { text: "AI community engagement. 2 contributions.", context: "Stay visible." },
      }
    },
    "Thu": {
      date: "Jun 11", isoDate: "2026-06-11",
      tasks: {
        p1: { text: "Weekly review: applications in, interviews scheduled, portfolio feedback incorporated. Are you interview-ready?", context: "11 weeks in. The system has been building toward this moment." },
        p2: { text: "Full routine + weekly review.", context: "11 weeks of exercise. You're a different person." },
        p3: { text: "Problem journal review. Your best 3 ideas, ranked.", context: "Almost time to decide what to do with the entrepreneurial pillar." },
      }
    }
  }
},

"2026-W24": {
  label: "W24: Jun 12 - Jun 18 (Final Push)",
  phase: 3,
  days: {
    "Fri": {
      date: "Jun 12", isoDate: "2026-06-12",
      tasks: {
        p1: { text: "Push for 10+ warm connections at target companies. Send any remaining referral requests.", context: "Milestone tomorrow: 10+ warm connections + career narrative polished." },
        p2: { text: "Gym session. Channel any anxiety into the workout.", context: "Physical outlet for mental pressure." },
        p3: { text: "Write: 'What I'd build if I left tech for a year.' 1 page, stream of consciousness.", context: "Let yourself dream. No constraints." },
      }
    },
    "Sat": {
      date: "Jun 13", isoDate: "2026-06-13",
      tasks: {
        p1: { text: "Milestone check: 10+ warm connections? Career narrative polished? If not, what's missing?", context: "Milestone: 10+ warm connections and polished narrative. The network effect should be working." },
        p2: { text: "30+ min outdoor activity.", context: "Weekend. Move." },
        p3: { text: "Add problems. Last 2 weeks of the plan. Make every observation count.", context: "The journal is almost complete. Quality entries." },
      }
    },
    "Sun": {
      date: "Jun 14", isoDate: "2026-06-14",
      tasks: {
        p1: { text: "Final career narrative polish. Read it to Katie. Does it sound authentic?", context: "If your wife rolls her eyes, rewrite. If she says 'that sounds like you,' it's ready." },
        p2: { text: "Full routine + bedtime commitment.", context: "Protect the habits through the finish." },
        p3: { text: "Podcast + journal. Last 2 weeks.", context: "Input mode." },
      }
    },
    "Mon": {
      date: "Jun 15", isoDate: "2026-06-15",
      tasks: {
        p1: { text: "3+ applications with referrals should be in. Follow up on everything. Push for interview scheduling.", context: "Milestone: 3+ applications in with referrals. If not: emergency outreach session." },
        p2: { text: "Gym: strength + cardio.", context: "Standard routine." },
        p3: { text: "30 min on your entrepreneurial project.", context: "Final stretch." },
      }
    },
    "Tue": {
      date: "Jun 16", isoDate: "2026-06-16",
      tasks: {
        p1: { text: "Brett Tuesday: final strategy session before 90-day review. What worked? What didn't? Next steps.", context: "Debrief the whole journey with your most trusted advisor." },
        p2: { text: "Full routine (3 sets) + cardio.", context: "Consistency to the end." },
        p3: { text: "Entrepreneurial pillar self-assessment: what did you learn about yourself?", context: "The pillar was about discovery. What did you discover?" },
      }
    },
    "Wed": {
      date: "Jun 17", isoDate: "2026-06-17",
      tasks: {
        p1: { text: "LinkedIn: publish a post about what you've learned in 90 days. Authentic, not polished.", context: "The best career content is honest reflection. Share your journey." },
        p2: { text: "Full routine + breathing.", context: "Almost there." },
        p3: { text: "Final AI community engagement push. Leave a lasting impression.", context: "Be memorable in the spaces that matter." },
      }
    },
    "Thu": {
      date: "Jun 18", isoDate: "2026-06-18",
      tasks: {
        p1: { text: "Weekly review: final pipeline check. Interviews scheduled? Offers pending? Next moves clear?", context: "Penultimate week. The 90-day review is next Thursday." },
        p2: { text: "Full routine + weekly review. 12 weeks.", context: "12 weeks of daily exercise. That's a lifestyle change." },
        p3: { text: "Problem journal review. Your entrepreneurial thesis in 1 paragraph.", context: "Distill everything into a clear statement." },
      }
    }
  }
},

"2026-W25": {
  label: "W25: Jun 19 - Jun 25 (90-Day Review)",
  phase: 3,
  days: {
    "Fri": {
      date: "Jun 19", isoDate: "2026-06-19",
      tasks: {
        p1: { text: "Final prep for 90-day review. Compile: applications, interviews, offers, CYBERA results, portfolio, network.", context: "Build your evidence file. What did 90 days produce?" },
        p2: { text: "Gym session. One of the last workouts of the plan.", context: "The plan ends, the habit doesn't." },
        p3: { text: "Write your entrepreneurial decision: invest, pause, or kill? And why.", context: "Honest assessment. Is this pillar worth continuing?" },
      }
    },
    "Sat": {
      date: "Jun 20", isoDate: "2026-06-20",
      tasks: {
        p1: { text: "Interview-ready checkpoint: resume, narrative, portfolio, network all warm? If yes, you did it.", context: "Milestone: interview-ready. All the pieces in place." },
        p2: { text: "30+ min outdoor activity. Celebrate 90 days of movement.", context: "You moved your body every single day for 90 days. That's incredible." },
        p3: { text: "Final problem journal entry. Look back at entry #1. How far have you come?", context: "The journal tells a story of growth." },
      }
    },
    "Sun": {
      date: "Jun 21", isoDate: "2026-06-21",
      tasks: {
        p1: { text: "Draft your 90-day review document. Honest. Thorough. What worked, what didn't, what's next.", context: "This is for you. Be brutal. Be fair." },
        p2: { text: "Full routine + set your post-90-day fitness plan.", context: "The plan ends. The habit continues. What does Month 4 look like?" },
        p3: { text: "Podcast + final journal entry.", context: "Reflection day." },
      }
    },
    "Mon": {
      date: "Jun 22", isoDate: "2026-06-22",
      tasks: {
        p1: { text: "Any last outreach or follow-ups before the review. Clean up loose ends.", context: "Tie up loose threads. Don't let anything hang." },
        p2: { text: "Gym: strength + cardio. Standard.", context: "The habit is the goal now." },
        p3: { text: "Entrepreneurial: if you're investing, outline next 30 days. If pausing, archive cleanly.", context: "Clean decision. No ambiguity." },
      }
    },
    "Tue": {
      date: "Jun 23", isoDate: "2026-06-23",
      tasks: {
        p1: { text: "Brett Tuesday: 90-day journey debrief. Thank him. Plan the next phase together.", context: "Brett has been your anchor. Acknowledge it. And plan what's next." },
        p2: { text: "Full routine (3 sets) + cardio.", context: "Consistency to the end." },
        p3: { text: "Write: 'What I know now that I didn't know 90 days ago.' 1 page.", context: "Capture the growth before it fades." },
      }
    },
    "Wed": {
      date: "Jun 24", isoDate: "2026-06-24",
      tasks: {
        p1: { text: "Final review prep. Score yourself on every milestone. Green/yellow/red.", context: "Honest scoring. No inflation. The data is what it is." },
        p2: { text: "Full routine + breathing. Last full day before the review.", context: "Deep breath. You showed up for 90 days." },
        p3: { text: "AI community: post your 90-day reflection. Be real about the journey.", context: "Authenticity wins. Share what you learned." },
      }
    },
    "Thu": {
      date: "Jun 25", isoDate: "2026-06-25",
      tasks: {
        p1: { text: "90-DAY REVIEW. Invest / Pause / Kill on each pillar. Set the next 90-day direction. You showed up.", context: "This is the day. Review everything. Decide what's next. You built something real in 90 days." },
        p2: { text: "Final routine. 90-day streak complete. You did it. Set your next fitness chapter.", context: "90 days weed-free. 90 days of daily movement. 4 months clean. You're a different person." },
        p3: { text: "Final entrepreneurial review. Invest / Pause / Kill. Document the decision and rationale.", context: "The 90-day experiment is complete. What did you learn? What's worth keeping?" },
      }
    }
  }
}

};
