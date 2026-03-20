import type { Post } from '@/types';

export const initialPosts: Post[] = [
  {
    id: '1',
    title: 'Community Leaders Gather for Annual Development Summit',
    excerpt: 'Key stakeholders discuss infrastructure projects and economic growth initiatives for Agbor region in a landmark meeting that sets the agenda for the coming year.',
    content: `Community leaders from across Agbor and surrounding regions converged at the Grand Conference Center for the Annual Development Summit, marking a pivotal moment in the area's growth trajectory.

The summit, attended by over 200 delegates including traditional rulers, government officials, business leaders, and community representatives, focused on addressing critical infrastructure needs and fostering economic development.

Key discussions centered on road rehabilitation projects, healthcare facility upgrades, educational initiatives, and youth empowerment programs. The three-day event featured panel discussions, breakout sessions, and networking opportunities.

"This summit represents our collective commitment to building a better Agbor," said Chief Emmanuel Okafor, Chairman of the Organizing Committee. "The ideas exchanged here will shape our development agenda for the next decade."

Highlights of the summit included:
- Presentation of the Agbor 2030 Development Blueprint
- Signing of MoUs with international development partners
- Launch of the Youth Entrepreneurship Fund
- Unveiling of the new Industrial Park project

The event concluded with a communiqué outlining specific action items and timelines for implementation.`,
    image: '/images/hero-featured.jpg',
    category: 'Politics',
    author: 'ANN Editorial Team',
    date: '2026-03-17',
    views: 1250,
    featured: true,
    breaking: true,
    tags: ['development', 'community', 'infrastructure']
  },
  {
    id: '2',
    title: 'Agbor United Secures Dramatic Victory in Championship Match',
    excerpt: 'Last-minute goal seals promotion hopes for local favorites in a thrilling encounter that kept fans on the edge of their seats.',
    content: `In a nail-biting finish that will be remembered for years to come, Agbor United Football Club secured a dramatic 2-1 victory over their rivals to keep their promotion hopes alive.

The match, played at the Agbor Township Stadium before a capacity crowd of 15,000 fans, saw both teams display exceptional skill and determination. The visitors took an early lead in the 23rd minute, putting pressure on the home side.

Agbor United responded with renewed vigor in the second half, with striker Michael Adebayo leveling the scores in the 67th minute. As the clock ticked down, it seemed the match would end in a draw until substitute Chinedu Okonkwo scored the winner in the 89th minute.

"This victory shows the character of our team," said Coach Ibrahim Musa in the post-match interview. "We never gave up, and the players showed tremendous fighting spirit."

The win moves Agbor United to third place in the league table, just two points behind the automatic promotion spots with five matches remaining in the season.

Fan celebrations continued long into the night, with supporters praising the team's resilience and determination.`,
    image: '/images/hero-sports.jpg',
    category: 'Sports',
    author: 'Sports Desk',
    date: '2026-03-16',
    views: 2100,
    featured: true,
    tags: ['football', 'championship', 'victory']
  },
  {
    id: '3',
    title: 'New Infrastructure Bill Promises Major Development for Agbor',
    excerpt: 'Multi-million naira investment targets roads, schools, and healthcare facilities in comprehensive development package.',
    content: `The State House of Assembly has passed a landmark infrastructure bill that promises to transform Agbor's landscape with significant investments in critical sectors.

The bill, which received bipartisan support, allocates over 5 billion naira for various development projects across the region. Key components include the rehabilitation of major roads, construction of new schools, and upgrading of healthcare facilities.

"This is a historic moment for Agbor," said Hon. Patricia Eze, the bill's sponsor. "For too long, our community has been overlooked when it comes to infrastructure development. This bill changes that narrative."

Major projects outlined in the bill include:
- Reconstruction of the Agbor-Asaba Expressway
- Building of 10 new primary healthcare centers
- Renovation of 25 existing schools
- Installation of street lighting in major towns
- Construction of a modern market complex

The bill also establishes a monitoring committee to ensure transparency and accountability in project implementation. Work is expected to commence within the next quarter.`,
    image: '/images/hero-politics.jpg',
    category: 'Politics',
    author: 'Political Correspondent',
    date: '2026-03-15',
    views: 1800,
    featured: true,
    tags: ['infrastructure', 'development', 'government']
  },
  {
    id: '4',
    title: 'Agbor Cultural Festival Draws Record Crowds',
    excerpt: 'Annual celebration of heritage and tradition attracts visitors from across Nigeria and beyond.',
    content: `The annual Agbor Cultural Festival concluded with resounding success, drawing record crowds and cementing its position as one of the region's premier cultural events.

The week-long celebration featured traditional dances, music performances, art exhibitions, and culinary showcases that highlighted the rich cultural heritage of the Agbor people. Visitors from across Nigeria and several international guests attended the event.

"This festival is not just about entertainment; it's about preserving our heritage for future generations," said Dr. Grace Iweala, Chairperson of the Festival Committee.

Highlights included:
- The Royal Dance Troupe performance
- Traditional wrestling competitions
- Arts and crafts exhibition
- Food festival featuring local delicacies
- Fashion show showcasing traditional attire

The festival also served as a platform for local artisans to showcase their products, with many reporting increased sales and new business connections.`,
    image: '/images/hero-tourism.jpg',
    category: 'Tourism',
    author: 'Culture Desk',
    date: '2026-03-14',
    views: 950,
    featured: true,
    tags: ['culture', 'festival', 'heritage']
  },
  {
    id: '5',
    title: 'Local Youth Initiative Transforms Community Park',
    excerpt: 'Young volunteers come together to renovate and beautify the central community park, creating a welcoming space for all.',
    content: `A group of dedicated young volunteers has successfully transformed the aging Central Community Park into a vibrant recreational space that has become the pride of the neighborhood.

The initiative, led by 25-year-old community organizer Adaobi Nwosu, brought together over 100 volunteers who spent three weekends cleaning, painting, planting, and repairing various park facilities.

"We wanted to create a space where families can come together, where children can play safely, and where the community can gather," said Nwosu. "Seeing the transformation has been incredibly rewarding."

The project included:
- Painting of park benches and fences
- Planting of 50 new trees and numerous flower beds
- Installation of new playground equipment
- Creation of a community garden
- Repair of walking paths and lighting

Local authorities have praised the initiative and pledged to support ongoing maintenance efforts. The park now hosts regular community events and has seen a significant increase in visitors.`,
    image: '/images/news-human-interest.jpg',
    category: 'Human Interest',
    author: 'Community Reporter',
    date: '2026-03-13',
    views: 750,
    featured: false,
    tags: ['youth', 'community', 'volunteer']
  },
  {
    id: '6',
    title: 'New Healthcare Center Opens in Agbor Central',
    excerpt: 'State-of-the-art medical facility promises improved healthcare access for residents of Agbor and surrounding communities.',
    content: `The new Agbor Central Healthcare Center officially opened its doors this week, bringing modern medical facilities and specialized services closer to the community.

The 50-bed facility features emergency services, maternity care, pediatric services, and specialized clinics for diabetes and hypertension management. It is equipped with modern diagnostic equipment including X-ray, ultrasound, and laboratory services.

"This facility represents a significant improvement in healthcare delivery for our people," said Dr. Samuel Ojo, the Medical Director. "We are committed to providing quality, affordable healthcare to all residents."

Key features of the new center include:
- 24-hour emergency services
- Modern maternity ward with delivery suites
- Pediatric unit with specialized care
- Diagnostic laboratory
- Pharmacy services
- Outpatient consultation rooms

The center will also serve as a training facility for medical students and resident doctors, contributing to the development of healthcare professionals in the region.`,
    image: '/images/news-health.jpg',
    category: 'Health',
    author: 'Health Correspondent',
    date: '2026-03-12',
    views: 1100,
    featured: false,
    tags: ['healthcare', 'medical', 'facility']
  },
  {
    id: '7',
    title: 'Sustainability Project Launches Citywide Recycling Program',
    excerpt: 'Environmental initiative aims to reduce waste and promote sustainable practices across Agbor municipality.',
    content: `A comprehensive recycling program has been launched across Agbor as part of the city's commitment to environmental sustainability and waste reduction.

The initiative, spearheaded by the Environmental Protection Agency in partnership with local community groups, aims to establish recycling collection points in all major neighborhoods and educate residents on proper waste segregation.

"Our goal is to reduce landfill waste by 40% within the next two years," said Mrs. Blessing Adeleke, Director of Environmental Services. "This program is a crucial step toward a cleaner, greener Agbor."

The program includes:
- Installation of color-coded recycling bins across the city
- Weekly collection schedules for recyclables
- Community education workshops
- Partnerships with local recycling facilities
- Incentive programs for participating households

Residents have expressed enthusiasm for the program, with many already reporting changes in their waste disposal habits.`,
    image: '/images/news-environment.jpg',
    category: 'Environment',
    author: 'Environment Desk',
    date: '2026-03-11',
    views: 620,
    featured: false,
    tags: ['environment', 'recycling', 'sustainability']
  },
  {
    id: '8',
    title: 'Annual Family Day Celebration Brings Community Together',
    excerpt: 'Families from across Agbor gather for a day of fun, food, and fellowship at the annual community event.',
    content: `The Annual Family Day Celebration brought together hundreds of families from across Agbor for a day of fun activities, delicious food, and community bonding.

Held at the Municipal Recreation Ground, the event featured games for all ages, live entertainment, food stalls offering local and international cuisine, and various competitions with prizes for winners.

"Events like this strengthen the bonds within our community," said Mr. James Okon, one of the event organizers. "It's wonderful to see families enjoying themselves together."

Activities included:
- Children's games and face painting
- Family relay races
- Cooking competitions
- Live music and dance performances
- Raffle draws with exciting prizes

The event also served as a fundraiser for the local orphanage, with proceeds from ticket sales and donations going toward supporting children in need.`,
    image: '/images/news-family.jpg',
    category: 'Family',
    author: 'Events Reporter',
    date: '2026-03-10',
    views: 580,
    featured: false,
    tags: ['family', 'community', 'event']
  },
  {
    id: '9',
    title: 'Youth Basketball League Finals This Weekend',
    excerpt: 'Top teams compete for championship title in highly anticipated season finale.',
    content: `The Agbor Youth Basketball League will crown its champion this weekend as the top two teams face off in what promises to be an exciting season finale.

The championship match between defending champions Agbor Tigers and challengers Delta Stars will take place at the Indoor Sports Complex on Saturday evening.

"Both teams have shown exceptional skill throughout the season," said League Coordinator Coach Tony Eze. "This final could go either way, and fans are in for a treat."

The league, now in its fifth year, has grown to include 12 teams and has become an important platform for nurturing young basketball talent in the region. Several former players have gone on to secure scholarships and professional contracts.

Admission is free for children under 12, and tickets are available at the venue for other spectators.`,
    image: '/images/sports-basketball.jpg',
    category: 'Sports',
    author: 'Sports Desk',
    date: '2026-03-09',
    views: 890,
    featured: false,
    tags: ['basketball', 'youth', 'sports']
  },
  {
    id: '10',
    title: 'Local Athletes Set New Regional Records',
    excerpt: 'Agbor athletes shine at regional athletics championship with record-breaking performances.',
    content: `Athletes from Agbor made their mark at the Regional Athletics Championship, setting new records and winning multiple medals across various events.

The team of 15 athletes returned home with 8 gold, 5 silver, and 3 bronze medals, placing Agbor second in the overall medal table.

Star performer Sarah Johnson broke the regional record in the 100m sprint with a time of 11.2 seconds, while long jumper Emmanuel Adeyemi set a new mark of 7.85 meters.

"Our athletes have shown what dedication and hard work can achieve," said Team Manager Coach Peter Obi. "These results are a testament to their commitment and the support they've received."

The impressive performances have caught the attention of national team selectors, with several athletes expected to receive invitations to national training camps.`,
    image: '/images/sports-athletics.jpg',
    category: 'Sports',
    author: 'Sports Desk',
    date: '2026-03-08',
    views: 720,
    featured: false,
    tags: ['athletics', 'sports', 'records']
  },
  {
    id: '11',
    title: 'Agbor Boxer Prepares for National Championship',
    excerpt: 'Local boxing sensation trains hard for upcoming national title fight.',
    content: `Rising boxing star David Okonkwo is leaving no stone unturned in his preparation for the upcoming National Boxing Championship, where he will compete for the welterweight title.

The 24-year-old, who has won all 12 of his professional fights, has intensified his training regimen at the Agbor Boxing Academy under the guidance of veteran coach Mike Thompson.

"This is the biggest fight of my career so far," said Okonkwo. "I've been dreaming of this moment since I first put on gloves as a child. I'm ready to make Agbor proud."

His opponent, current champion Tunde Bakare, is a seasoned fighter with 25 professional bouts under his belt. The matchup promises to be an exciting contest between youth and experience.

The championship bout is scheduled for next month at the National Stadium, and a large contingent of fans from Agbor is expected to travel to support their hometown hero.`,
    image: '/images/sports-boxing.jpg',
    category: 'Sports',
    author: 'Sports Desk',
    date: '2026-03-07',
    views: 650,
    featured: false,
    tags: ['boxing', 'sports', 'championship']
  },
  {
    id: '12',
    title: 'Tennis Tournament Draws International Players',
    excerpt: 'Annual Agbor Open attracts tennis talent from across Africa and beyond.',
    content: `The Agbor Open Tennis Tournament has attracted an impressive field of players from across Africa and Europe, raising the profile of the annual event.

The tournament, now in its eighth year, has grown from a local competition to an internationally recognized event on the regional tennis calendar. This year's field includes players from Nigeria, Ghana, Kenya, South Africa, and France.

"The quality of play has improved tremendously over the years," said Tournament Director Mrs. Linda Okpara. "We're proud to be contributing to the development of tennis in the region."

The week-long event features singles and doubles competitions across men's and women's categories, with total prize money of 2 million naira.

Matches are being played at the Agbor Tennis Club, and admission is free for spectators. The finals will be held on Sunday afternoon.`,
    image: '/images/sports-tennis.jpg',
    category: 'Sports',
    author: 'Sports Desk',
    date: '2026-03-06',
    views: 540,
    featured: false,
    tags: ['tennis', 'sports', 'tournament']
  },
  {
    id: '13',
    title: 'Voter Registration Drive Exceeds Targets',
    excerpt: 'Civic engagement campaign successfully registers thousands of new voters ahead of upcoming elections.',
    content: `The recently concluded voter registration drive has exceeded all expectations, with over 15,000 new voters registered across Agbor and surrounding areas.

The month-long campaign, organized by the Independent National Electoral Commission (INEC) in collaboration with civil society organizations, targeted first-time voters and those who had previously been unable to register.

"The response has been overwhelming," said INEC State Coordinator Mr. John Adeyemi. "It shows that citizens are eager to participate in the democratic process."

The registration drive employed innovative strategies including:
- Mobile registration units that visited rural communities
- Extended registration hours at fixed centers
- Online pre-registration to reduce waiting times
- Community outreach programs
- Partnerships with youth organizations

The newly registered voters will be eligible to participate in the upcoming local government elections scheduled for later this year.`,
    image: '/images/politics-election.jpg',
    category: 'Politics',
    author: 'Political Correspondent',
    date: '2026-03-05',
    views: 820,
    featured: false,
    tags: ['election', 'voting', 'civic']
  }
];
