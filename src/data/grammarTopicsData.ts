import { LessonContent } from '../types';

/**
 * Comprehensive, deeply enriched pedagogical lessons for core English grammar topics
 * (non-tense topics such as Parts of Speech, Pronouns, Articles, Modals, Passive Voice, etc.).
 * Each topic features an in-depth conceptual breakdown, natural explanations of rules and nuances,
 * practical everyday examples, and full Khmer translations.
 */
export const COMPREHENSIVE_GRAMMAR_TOPICS: Record<string, LessonContent> = {
  // ==========================================
  // 1. PARTS OF SPEECH: NOUN
  // ==========================================
  'Noun': {
    title: 'Noun (Nouns)',
    explanation: `WHAT IS A NOUN?
A noun is the fundamental naming word in human language. Every person you meet, every place you visit, every physical object you touch, every material substance you use, and every abstract concept you contemplate is identified through a noun. Nouns serve as the primary syntactic anchors of language—without them, a sentence has no subject to initiate action, no object to receive action, and no referent to be described.

THE 12 COMPLETE TYPES OF NOUNS:

1. Common Nouns (នាមទូទៅ):
   • Denote general, non-specific categories or classes of people, places, animals, or things.
   • They remain lowercase unless they begin a sentence.
   • Examples: architect, city, river, hospital, technology, engineer, smartphone.

2. Proper Nouns (នាមអជាក់លាក់ / នាមផ្ទាល់):
   • Name unique, individualized, specific people, places, institutions, geographical landmarks, days, months, or organizations.
   • They MUST always be capitalized in English, regardless of where they appear in a clause.
   • Examples: Albert Einstein, Phnom Penh, Angkor Wat, the Mekong River, Google, Monday, October.

3. Concrete Nouns (នាមរូបី):
   • Name physical, tangible entities that can be perceived directly by at least one of the five human senses (sight, touch, hearing, taste, smell).
   • Examples: granite, violin, espresso, rain, flower, perfume, silk, diamond.

4. Abstract Nouns (នាមអរូបី):
   • Name non-physical concepts, ideas, emotions, qualities, philosophical values, conditions, or states of being that cannot be physically touched or seen.
   • Examples: courage, integrity, freedom, wisdom, happiness, patience, justice, childhood.
   • Key Rule: Most abstract nouns are uncountable in English (e.g., knowledge, peace, advice).

5. Countable (Count) Nouns (នាមរាប់បាន):
   • Refer to individual entities that can be counted directly with numbers (one, two, three).
   • Have both distinct singular and plural forms (one chair -> three chairs; one scientist -> ten scientists).
   • Can take the indefinite articles 'a' or 'an' in the singular form (a book, an architect).

6. Uncountable (Non-Count / Mass) Nouns (នាមរាប់មិនបាន):
   • Refer to undifferentiated masses, bulk substances, liquids, gases, granular materials, abstract concepts, or collective categories that cannot be divided into individual separate items.
   • Examples: water, oxygen, sand, rice, information, furniture, equipment, baggage, traffic, luggage.
   • Key Rules: They never take plural -s (NEVER write 'furnitures' or 'informations'), never take 'a' or 'an' directly, and always take singular verbs ("The equipment is ready").

7. Collective Nouns (នាមសមាហរណ៍):
   • Words that refer to an entire collection or group of individuals, animals, or objects viewed as a unified single body.
   • Examples: team, committee, flock, herd, jury, government, orchestra, faculty.
   • Agreement Nuance: In American English, collective nouns almost always take singular verbs when operating as a single unit ("The committee has reached its decision"). In British English, they take plural verbs when individual members are emphasized ("The committee have disagreed on the proposal").

8. Compound Nouns (នាមផ្សំ):
   • Formed by combining two or more distinct words together to yield a brand new semantic concept.
   • They exist in three structural forms:
     - Closed Compounds (written as a single word): toothpaste, whiteboard, rainfall, bedroom.
     - Hyphenated Compounds (connected by hyphens): mother-in-law, passer-by, runner-up, self-esteem.
     - Open Compounds (written as two separate spaced words): post office, credit card, swimming pool, ice cream.
   • Pluralization Rule: Pluralize the principal/primary noun element, not the modifier (e.g., mothers-in-law, passers-by, runners-up).

9. Possessive Nouns (នាមកម្មសិទ្ធិ):
   • Nouns modified to show ownership, relationship, or origin using apostrophes:
     - Singular nouns: add 's (the teacher's lesson, Charles's car).
     - Regular plural nouns ending in -s: add only an apostrophe (the teachers' lounge, the students' dormitory).
     - Irregular plural nouns not ending in -s: add 's (children's playground, women's rights).
     - Joint vs. Separate Possession: "Dara and Sophea's car" (they share one car); "Dara's and Sophea's cars" (they each own separate cars).

10. Material Nouns (នាមវត្ថុធាតុដើម):
    • Nouns referring to raw substances, minerals, agricultural commodities, or basic physical elements extracted from nature or used in manufacturing.
    • Examples: gold, silver, iron, cotton, silk, timber, wheat, coal, clay.
    • Key Rule: Material nouns are fundamentally uncountable; do not say "a gold" or "two silvers".

11. Verbal Nouns / Gerunds (នាមកិរិយា):
    • Verb base forms ending in -ing that function grammatically as nouns, serving as subjects, objects, or complements.
    • Examples: Swimming is excellent exercise; He enjoys reading; Thank you for coming.
    • Key Rule: A verbal noun behaves syntactically as a noun and can be modified by possessive determiners ("I appreciate your coming promptly").

12. Singular and Plural Nouns (នាមឯកវចនៈ និងពហុវចនៈ):
    • Grammatical number classification indicating exactly one (singular: cat, woman, crisis) versus two or more (plural: cats, women, crises).
    • Regular plurals add -s or -es; irregular plurals undergo vowel mutation (foot -> feet), consonant shifts (leaf -> leaves), or preserve classical foreign roots (phenomenon -> phenomena).

GRAMMATICAL ROLES OF NOUNS IN SENTENCES:
A noun does not merely exist in a vacuum; it acts in 7 structural positions:
1. Subject: Initiates the action ("The engineer solved the structural issue").
2. Direct Object: Receives the action directly ("She presented her findings").
3. Indirect Object: Receives the direct object ("He gave the student a scholarship").
4. Subject Complement (Predicate Noun): Re-identifies the subject after a linking verb ("Dr. Lisa is an oncologist").
5. Object Complement: Further describes or re-identifies the direct object ("The committee elected him president").
6. Object of a Preposition: Follows and completes a preposition ("They walked across the ancient bridge").
7. Appositive: Stands adjacent to another noun to explain or rename it ("Angkor Wat, a UNESCO world heritage temple, attracts millions of visitors").

NOUN GENDER IN ENGLISH:
English grammatical gender is natural rather than grammatical:
• Masculine (male beings: father, king, bull, rooster).
• Feminine (female beings: mother, queen, cow, hen).
• Common / Dual (applicable to either sex: student, doctor, friend, parent, teacher).
• Neuter (inanimate objects, places, and abstract concepts: table, city, peace, water).`,
    explanationKhmer: `តួនាទី និងអត្ថន័យនៃនាម (Noun) ក្នុងភាសាអង់គ្លេស៖
នាម គឺជាពាក្យដែលត្រូវបានប្រើសម្រាប់ហៅឈ្មោះ មនុស្ស ទីកន្លែង វត្ថុ សត្វ គំនិត វត្ថុធាតុដើម ឬអារម្មណ៍។ នាមដើរតួជាសសរទ្រូងដ៏សំខាន់បំផុតក្នុងប្រយោគ ព្រោះបើគ្មាននាមទេ នឹងមិនមានប្រធាន (Subject) ដើម្បីធ្វើសកម្មភាព ឬកម្មបទ (Object) ដើម្បីទទួលរងសកម្មភាពឡើយ។

ប្រភេទទាំង ១២ នៃនាមក្នុងភាសាអង់គ្លេស៖

១. នាមទូទៅ (Common Nouns)៖ សំដៅលើឈ្មោះទូទៅនៃមនុស្ស ទីកន្លែង ឬរបស់របរ (doctor, city, river, hospital) ដោយសរសេរអក្សរតូចធម្មតា។
២. នាមអជាក់លាក់/នាមផ្ទាល់ (Proper Nouns)៖ សំដៅលើឈ្មោះជាក់លាក់តែមួយគត់ (Phnom Penh, Angkor Wat, Albert Einstein, Google) ដែលត្រូវតែសរសេរផ្ដើមដោយអក្សរធំជានិច្ច ទោះនៅដើមកណ្តាល ឬចុងប្រយោគក៏ដោយ។
៣. នាមរូបី (Concrete Nouns)៖ ជារបស់ដែលអាចប៉ះពាល់ មើលឃើញ ភ្លក្ស ធុំក្លិន ឬស្តាប់ឮបានតាមវិញ្ញាណទាំង ៥ (coffee, granite, perfume, rain, diamond)។
៤. នាមអរូបី (Abstract Nouns)៖ ជាគំនិត អារម្មណ៍ គុណធម៌ ឬស្ថានភាពដែលមើលមិនឃើញនិងប៉ះមិនបាន (courage, honesty, freedom, patience, wisdom)។ ភាគច្រើនជានាមរាប់មិនបាន។
៥. នាមរាប់បាន (Countable Nouns)៖ ជារបស់ដែលអាចរាប់ជាចំនួន ១, ២, ៣... បានដោយផ្ទាល់ មានទាំងទម្រង់ឯកវចនៈ និងពហុវចនៈ (a chair -> three chairs)។
៦. នាមរាប់មិនបាន (Uncountable / Mass Nouns)៖ ជារបស់រាវ ឧស្ម័ន ម្សៅ គំនិត ឬប្រភេទប្រមូលផ្តុំដែលមិនអាចរាប់ជាដុំៗបាន (water, sand, information, advice, equipment, furniture)។ ហាមបន្ថែម -s ពីក្រោយ និងហាមប្រើជាមួយ a/an ដោយផ្ទាល់។
៧. នាមសមាហរណ៍ (Collective Nouns)៖ ហៅឈ្មោះក្រុមមនុស្ស សត្វ ឬវត្ថុដែលប្រមូលផ្តុំជាធ្លុងមួយ (team, committee, family, jury, flock)។
៨. នាមផ្សំ (Compound Nouns)៖ កើតចេញពីពាក្យពីរ ឬច្រើនផ្សំគ្នា៖
   - សរសេរជាប់គ្នា (Closed): whiteboard, bedroom, toothpaste
   - ភ្ជាប់ដោយសហសញ្ញា (Hyphenated): mother-in-law, passer-by
   - សរសេរដាច់ពីគ្នា (Open): post office, swimming pool, credit card
   (ពេលធ្វើជាពហុវចនៈ ត្រូវថែម 's' លើពាក្យគោលចម្បង៖ mothers-in-law, passers-by)។
៩. នាមកម្មសិទ្ធិ (Possessive Nouns)៖ នាមដែលបញ្ជាក់ភាពជាម្ចាស់ ដោយប្រើសញ្ញា Apostrophe ('s ឬ s') ដូចជា "the student's book", "the students' dormitory"។
១០. នាមវត្ថុធាតុដើម (Material Nouns)៖ វត្ថុធាតុដើមដែលយកមកពីធម្មជាតិ ឬប្រើសម្រាប់កែច្នៃ (gold, iron, cotton, silk, timber, wheat)។
១១. នាមកិរិយា (Verbal Nouns / Gerunds)៖ កិរិយាសព្ទថែម -ing ដែលដើរតួជាពាក្យនាមក្នុងប្រយោគ (Swimming is healthy; He enjoys reading)។
១២. នាមឯកវចនៈ និងពហុវចនៈ (Singular and Plural Nouns)៖ នាមបញ្ជាក់ចំនួនមួយ (singular: box, man) និងចំនួនចាប់ពីពីរឡើងទៅ (plural: boxes, men)។

តួនាទីទាំង ៧ របស់នាមក្នុងល្បះ៖
• ធ្វើជាប្រធាន (Subject): The architect designed the house.
• ធ្វើជាកម្មបទផ្ទាល់ (Direct Object): She presented her research.
• ធ្វើជាកម្មបទប្រយោល (Indirect Object): He gave the student an award.
• ធ្វើជាកិរិយាសព្ទបំពេញប្រធាន (Subject Complement): Dr. Lisa is an oncologist.
• ធ្វើជាកិរិយាសព្ទបំពេញកម្មបទ (Object Complement): They elected him president.
• ធ្វើជាកម្មបទនៃធ្នាក់ (Object of Preposition): They walked through the ancient forest.
• ធ្វើជានាមពន្យល់នាមមួយទៀត (Appositive): Angkor Wat, a UNESCO temple, is stunning.`,
    examples: [
      'The dedicated **architect** drafted the blueprint for the community center.',
      '**Phnom Penh** is the vibrant capital city of Cambodia.',
      'True **courage** is taking action despite the presence of fear.',
      'The international research **team** announced a breakthrough in solar energy.',
      'She bought a high-resolution **computer** for her digital art projects.',
      'We left our heavy **luggage** at the hotel front desk.',
      'His deep **knowledge** of economics impressed everyone in the room.',
      'A gentle **breeze** rustled through the dense pine **forest**.',
      'Please hand this important **document** to your **manager**.',
      'The **passers-by** stopped to admire the street musician\'s performance.',
      '**Honesty** and **integrity** are vital qualities in modern leadership.'
    ]
  },

  // ==========================================
  // 2. PARTS OF SPEECH: PRONOUN
  // ==========================================
  'Pronoun': {
    title: 'Pronoun (Pronouns)',
    explanation: `WHAT IS A PRONOUN?
A pronoun is a specialized word that substitutes for a noun or a noun phrase. Imagine how cumbersome communication would be without pronouns: "David informed David's manager that David had completed David's assignment on David's laptop." Pronouns make language concise and fluid: "David informed his manager that he had completed his assignment on his laptop."

THE PRINCIPLE OF THE ANTECEDENT:
The noun that a pronoun replaces or refers back to is called its "antecedent." A pronoun must match its antecedent in person (1st, 2nd, 3rd), number (singular, plural), and gender (masculine, feminine, neuter).

THE 11 COMPLETE TYPES OF PRONOUNS:

1. Personal Pronouns (បុរិសសព្វនាម):
   • Subject Pronouns (I, you, he, she, it, we, they): Function as the subject/agent of the verb ("She analyzed the statistical data").
   • Object Pronouns (me, you, him, her, it, us, them): Function as direct objects, indirect objects, or objects of prepositions ("The director commended her"; "Speak with us").

2. Possessive Pronouns (សព្វនាមកម្មសិទ្ធិ):
   • Words that replace a possessive noun phrase and stand entirely alone without a following noun: mine, yours, his, hers, ours, theirs.
   • Contrast: Possessive Determiners (my, your, his, her, its, our, their) require a noun ("This is my desk"), whereas Possessive Pronouns stand alone ("This desk is mine").
   • Golden Rule: Possessive pronouns NEVER contain apostrophes (write 'hers', 'ours', 'theirs', never 'her\'s' or 'their\'s').

3. Reflexive Pronouns (សព្វនាមឆ្លុះបញ្ចាំង):
   • End in -self (singular: myself, yourself, himself, herself, itself) or -selves (plural: ourselves, yourselves, themselves).
   • Essential Function: Used when the subject and the direct or indirect object of the verb are the exact same entity ("He taught himself computer programming"; "She looked at herself in the mirror").

4. Intensive / Emphatic Pronouns (សព្វនាមបញ្ជាក់ន័យធ្ងន់):
   • Identical in form to reflexive pronouns (-self / -selves), but used strictly for dramatic rhetorical emphasis.
   • Test: An intensive pronoun can be removed without altering the core sentence grammar or meaning ("The CEO herself delivered the presentation" -> "The CEO delivered the presentation").

5. Demonstrative Pronouns (សព្វនាមចង្អុលបង្ហាញ):
   • Point to specific entities based on distance (near vs. far) and quantity (singular vs. plural):
     - THIS: Singular, physically or temporally near ("This is fascinating").
     - THAT: Singular, physically or temporally distant ("That was an inspiring lecture").
     - THESE: Plural, near ("These are the requested invoices").
     - THOSE: Plural, distant ("Those are the mountains we will climb").

6. Relative Pronouns (សព្វនាមឈ្នាប់):
   • Introduce relative (adjective) clauses that modify a preceding noun or pronoun:
     - WHO: Refers to people as subjects ("The doctor who treated me was brilliant").
     - WHOM: Formal; refers to people as objects ("The candidate whom the board selected").
     - WHOSE: Shows possession for people, animals, or entities ("The author whose book won the prize").
     - WHICH: Refers to animals and inanimate objects in non-restrictive or restrictive clauses ("The report, which arrived today, is promising").
     - THAT: Refers to people, animals, or things in essential restrictive clauses ("The proposal that saved the project").

7. Interrogative Pronouns (សព្វនាមសួរ):
   • Used specifically to formulate direct and indirect questions:
     - WHO (subject person: "Who called you?"),
     - WHOM (object person: "Whom did you consult?"),
     - WHOSE (possession: "Whose is this jacket?"),
     - WHAT (inanimate entity or general inquiry: "What happened?"),
     - WHICH (selection from a limited set of options: "Which of these candidates do you recommend?").

8. Indefinite Pronouns (សព្វនាមអជាក់លាក់):
   • Refer to non-specific people, places, or things without naming who or what they are:
     - Always Singular: someone, somebody, something, anyone, anybody, anything, everyone, everybody, everything, no one, nobody, nothing, each, either, neither, one, another ("Everyone is welcome").
     - Always Plural: both, few, fewer, many, others, several ("Several were delayed").
     - Variable (The SANAM rule: Some, Any, None, All, More/Most): Singular or plural depending on whether the following noun is countable or uncountable ("All of the water is gone" vs "All of the students are ready").

9. Reciprocal Pronouns (សព្វនាមទៅវិញទៅមក):
   • Express a mutual two-way relationship or action between two or more participants:
     - EACH OTHER: Traditionally used for two entities ("The two business partners respect each other").
     - ONE ANOTHER: Traditionally used for three or more entities ("Team members must support one another").

10. Distributive Pronouns (សព្វនាមបែងចែក):
    • Consider members of a group individually one by one rather than collectively:
      - EACH: Refers to every single individual separately ("Each of the participants was given a certificate").
      - EITHER: One or the other of two ("Either of the two solutions is acceptable").
      - NEITHER: Not the one nor the other of two ("Neither of the allegations was proven").
      - Rule: Distributive pronouns take singular verbs!

11. Dummy / Expletive Pronouns (សព្វនាមបំពេញលក្ខខណ្ឌ):
    • Pronouns that carry no intrinsic semantic meaning of their own, but fill the mandatory grammatical subject slot in English syntax:
      - Empty 'IT' (weather, time, temperature, distance): "It is raining"; "It is 4:00 PM"; "It is twelve miles away".
      - Existential 'THERE': "There is an urgent matter to address."

ESSENTIAL RULES & COMMON TRAPS:
• Subject vs. Object in Compound Phrases: Never say "Me and him went to town." Test each pronoun individually: "I went" and "He went," so write: "He and I went to town."
• Pronoun-Antecedent Agreement: Always align pronouns with their antecedent in number and gender ("Every student must submit their [or his or her] paper").`,
    explanationKhmer: `តួនាទី និងអត្ថន័យនៃសព្វនាម (Pronoun) ក្នុងភាសាអង់គ្លេស៖
សព្វនាម គឺជាពាក្យដែលប្រើសម្រាប់ជំនួសឱ្យនាម ដើម្បីបញ្ចៀសការហៅឈ្មោះដដែលៗដែលធ្វើឱ្យការនិយាយ ឬការសរសេរមានសភាពរដិបរដុប។

ប្រភេទទាំង ១១ នៃសព្វនាមក្នុងភាសាអង់គ្លេស៖

១. បុរិសសព្វនាម (Personal Pronouns)៖
   • សព្វនាមជាប្រធាន (Subject Pronouns)៖ I, you, he, she, it, we, they (ធ្វើជាអ្នកបង្កើតសកម្មភាព)។
   • សព្វនាមជាកម្មបទ (Object Pronouns)៖ me, you, him, her, it, us, them (ទទួលរងសកម្មភាព ឬឈរក្រោយធ្នាក់)។
២. សព្វនាមកម្មសិទ្ធិ (Possessive Pronouns)៖
   • mine, yours, his, hers, ours, theirs (ប្រើតែឯងជំនួសនាមកម្មសិទ្ធិទាំងមូល ដូចជា "This laptop is mine" ដោយគ្មានសញ្ញា apostrophe ឡើយ)។
៣. សព្វនាមឆ្លុះបញ្ចាំង (Reflexive Pronouns)៖
   • myself, yourself, himself, herself, itself, ourselves, yourselves, themselves (ប្រើនៅពេលដែលប្រធាន និងកម្មបទជាមនុស្សតែមួយ៖ "He taught himself English")។
៤. សព្វនាមបញ្ជាក់ន័យធ្ងន់ (Intensive / Emphatic Pronouns)៖
   • ទម្រង់ដូច Reflexive (-self) តែប្រើដើម្បីសង្កត់ន័យបន្ថែម បើដកចេញប្រយោគនៅតែត្រឹមត្រូវ ("The President himself signed the bill")។
៥. សព្វនាមចង្អុលបង្ហាញ (Demonstrative Pronouns)៖
   • This (នេះ - ឯកវចនៈជិត), That (នោះ - ឯកវចនៈឆ្ងាយ), These (ទាំងនេះ - ពហុវចនៈជិត), Those (ទាំងនោះ - ពហុវចនៈឆ្ងាយ)។
៦. សព្វនាមឈ្នាប់ (Relative Pronouns)៖
   • who (មនុស្ស-ប្រធាន), whom (មនុស្ស-កម្មបទ), whose (កម្មសិទ្ធិ), which (សត្វ/វត្ថុ), that (មនុស្ស/សត្វ/វត្ថុក្នុងឃ្លាកំណត់)។
៧. សព្វនាមសួរ (Interrogative Pronouns)៖
   • Who, Whom, Whose, What, Which ប្រើសម្រាប់បង្កើតសំណួរ ("Who called you?", "Which of these do you want?")។
៨. សព្វនាមអជាក់លាក់ (Indefinite Pronouns)៖
   • សំដៅលើមនុស្ស ឬរបស់មិនជាក់លាក់៖
     - ឯកវចនៈជានិច្ច (កិរិយាសព្ទឯកវចនៈ): everyone, someone, nobody, anyone, everything, each, either, neither ("Everyone is ready")។
     - ពហុវចនៈជានិច្ច: both, few, many, several ("Few were present")។
     - បត់បែនតាមនាម (SANAM: Some, Any, None, All, Most)។
៩. សព្វនាមទៅវិញទៅមក (Reciprocal Pronouns)៖
   • each other (រវាងមនុស្សពីរនាក់), one another (រវាងមនុស្សចាប់ពីបីនាក់ឡើងទៅ)។
១០. សព្វនាមបែងចែក (Distributive Pronouns)៖
    • each, either, neither (សំដៅលើសមាជិកម្តងមួយៗ និងប្រើជាមួយកិរិយាសព្ទឯកវចនៈជានិច្ច)។
១១. សព្វនាមបំពេញលក្ខខណ្ឌ (Dummy / Expletive Pronouns)៖
    • "It" និង "There" ដែលគ្មានអត្ថន័យផ្ទាល់ខ្លួន តែបំពេញតំណែងជាប្រធានក្នុងប្រយោគ ("It is raining", "There is a solution")។`,
    examples: [
      '**She** presented the proposal with outstanding confidence.',
      'The supervisor congratulated **them** on meeting the tight deadline.',
      'That sleek red bicycle parked near the entrance is **mine**.',
      'He taught **himself** how to code complex algorithms over the summer.',
      '**Everyone** in the auditorium **was** listening intently to the keynote speaker.',
      'The artist **who** designed this breathtaking mural is internationally acclaimed.',
      '**These** are the research papers we reviewed during yesterday\'s seminar.',
      'Neither of the candidates **has** submitted the required documentation yet.',
      'My sister and **I** volunteer at the animal shelter every Saturday.',
      'The cat cleaned **its** paws thoroughly after enjoying its meal.',
      'If **anyone** calls while I am away, please ask **them** to leave a message.'
    ]
  },

  // ==========================================
  // 3. PARTS OF SPEECH: VERB
  // ==========================================
  'Verb': {
    title: 'Verb (Verbs)',
    explanation: `WHAT IS A VERB?
A verb is the dynamic engine of human speech and the indispensable core of every grammatical sentence. Without a verb, an utterance cannot express a complete thought. Verbs do far more than depict physical movements; they declare existence, express mental states, establish conditions, connect subjects to qualitative descriptions, and modulate time through tense and aspect.

THE 12 COMPLETE TYPES OF VERBS:

1. Action (Dynamic) Verbs (កិរិយាសព្ទសកម្មភាព):
   • Describe physical or mental actions initiated by the subject (e.g., sprint, construct, analyze, calculate, articulate).
   • Can freely occur in continuous (-ing) tenses because they possess an observable beginning and ending ("She is conducting an experiment").

2. Stative Verbs (កិរិយាសព្ទស្ថានភាព):
   • Express permanent or semi-permanent states, beliefs, emotions, possessions, and sensory states rather than dynamic actions:
     - Thoughts & Cognition: know, believe, realize, understand, doubt, remember.
     - Emotions & Feelings: love, hate, admire, prefer, appreciate.
     - Possession: have, own, possess, belong, contain.
     - Senses & Perceptions: look, sound, smell, taste, feel.
   • CRITICAL RULE: Stative verbs are virtually never used in continuous (-ing) forms. Say "I understand the concept," NEVER "I am understanding the concept."

3. Linking (Copular) Verbs (កិរិយាសព្ទភ្ជាប់):
   • Do not depict action; instead, they serve as an equal sign connecting the subject to a subject complement (noun or adjective) that renames or describes it.
   • The core linking verb is 'to be' (am, is, are, was, were). Other sensory and condition linking verbs include: become, seem, appear, look, smell, taste, sound, feel, remain ("The soup tastes delicious"; "He became a surgeon").

4. Transitive Verbs (កិរិយាសព្ទសកម្មមានកម្មបទ):
   • Require one or more direct objects to complete their grammatical meaning:
     - Monotransitive (one direct object): "She published a research paper."
     - Ditransitive (both direct and indirect objects): "The professor awarded the student a scholarship."
     - Complex-Transitive (object + object complement): "The board appointed Sophia chairperson."

5. Intransitive Verbs (កិរិយាសព្ទសកម្មគ្មានកម្មបទ):
   • Complete their action without needing a direct object (e.g., arrive, sleep, sneeze, hesitate, laugh, vanish).
   • Example: "The guests arrived punctually." (Note: Intransitive verbs can never be converted into the passive voice).

6. Ergative / Ambitransitive Verbs (កិរិយាសព្ទបត់បែន):
   • Verbs that can function transitively (with an object) or intransitively (without an object) where the object of the transitive becomes the subject of the intransitive:
     - Transitive: "The chef boiled the water."
     - Intransitive: "The water boiled vigorously."
     - Common examples: open, close, break, melt, freeze, start, stop, boil.

7. Primary Auxiliary Verbs (កិរិយាសព្ទជំនួយចម្បង):
   • The three structural pillars: BE, DO, and HAVE.
   • BE creates continuous tenses (is writing) and passive voice (was designed).
   • DO creates negatives (did not attend), questions (do you understand?), and emphatic assertions (I do want to learn).
   • HAVE creates perfect aspects (has completed, had arrived).

8. Modal Auxiliary Verbs & Semi-Modals (កិរិយាសព្ទជំនួយ Modal):
   • Core Modals: can, could, may, might, must, shall, should, will, would.
   • Semi-Modals: ought to, have to, used to, need, dare.
   • Universal Modal Rules: Never add -s, never conjugate for tense directly, and always take the bare infinitive (without 'to'). They express ability, permission, obligation, advice, probability, and conditionality.

9. Regular vs. Irregular Verbs (កិរិយាសព្ទទៀងទាត់ និងមិនទៀងទាត់):
   • Regular Verbs form both Past Simple (V2) and Past Participle (V3) by adding -ed (work -> worked -> worked).
   • Irregular Verbs follow historical vowel mutation patterns across three paradigms:
     - All 3 distinct: speak -> spoke -> spoken; write -> wrote -> written.
     - V2 and V3 identical: buy -> bought -> bought; lead -> led -> led.
     - All 3 identical: cut -> cut -> cut; cost -> cost -> cost; put -> put -> put.

10. Finite vs. Non-Finite Verbs (កិរិយាសព្ទកំណត់ និងមិនកំណត់):
    • Finite Verbs change their form according to tense, number, and person ("She writes daily"; "They write daily").
    • Non-Finite Verbs do NOT show tense and cannot stand alone as the main verb of a clause:
      - Infinitives: to learn, to innovate.
      - Gerunds: learning, innovating (behaving as nouns).
      - Participles: learned, learning (used in compound tenses and as adjectives).

11. Phrasal Verbs (កិរិយាសព្ទផ្សំ):
    • Combinations of a verb + preposition/particle that generate completely new idiomatic meanings (e.g., look after = care for; give up = surrender; break down = fail mechanically).
    • Can be Separable ("Turn the lights off" / "Turn off the lights") or Inseparable ("I ran into an old classmate").

12. Causative Verbs (កិរិយាសព្ទបង្កហេតុ):
    • Used when the subject causes another person or entity to perform an action:
      - MAKE (force/compulsion): "The manager made them revise the draft." (bare infinitive)
      - HAVE (authorization/assignment): "I will have my assistant send the file." (bare infinitive)
      - LET (permission): "They let us examine the rare manuscript." (bare infinitive)
      - GET (persuasion): "She got the team to agree." (requires 'to + infinitive')
      - HELP (assistance): "This guide helps learners (to) understand syntax."`,
    explanationKhmer: `តួនាទី និងអត្ថន័យនៃកិរិយាសព្ទ (Verb) ក្នុងភាសាអង់គ្លេស៖
កិរិយាសព្ទ គឺជាបេះដូង និងកម្លាំងចលករនៃប្រយោគនីមួយៗ។ គ្រប់ប្រយោគទាំងអស់ត្រូវតែមានកិរិយាសព្ទជាចាំបាច់ ដើម្បីបង្ហាញពីសកម្មភាព ស្ថានភាព អត្ថិភាព ឬលក្ខខណ្ឌ។

ប្រភេទទាំង ១២ នៃកិរិយាសព្ទក្នុងភាសាអង់គ្លេស៖

១. កិរិយាសព្ទសកម្មភាព (Action / Dynamic Verbs)៖ បង្ហាញពីសកម្មភាពជាក់ស្តែង (run, build, analyze) ហើយអាចប្រើក្នុងទម្រង់ Continuous (-ing) បាន ("She is writing")។
២. កិរិយាសព្ទស្ថានភាព (Stative Verbs)៖ បង្ហាញពីគំនិត អារម្មណ៍ ភាពជាម្ចាស់ ឬការយល់ដឹង (know, believe, love, own, belong)។ ហាមប្រើក្នុងទម្រង់ -ing ជាដាច់ខាត (ត្រូវនិយាយ "I understand" មិនមែន "I am understanding" ទេ)។
៣. កិរិយាសព្ទភ្ជាប់ (Linking / Copular Verbs)៖ ភ្ជាប់ប្រធានទៅកាន់គុណនាម ឬនាមបំពេញន័យ ដូចជា be, seem, look, smell, taste, become, feel ("The soup smells good", "He became a doctor")។
៤. កិរិយាសព្ទសកម្មមានកម្មបទ (Transitive Verbs)៖ ត្រូវការកម្មបទផ្ទាល់ដើម្បីបំពេញន័យ (She solved the puzzle; The teacher gave us homework)។
៥. កិរិយាសព្ទសកម្មគ្មានកម្មបទ (Intransitive Verbs)៖ បញ្ចប់ន័យបានដោយខ្លួនឯង មិនត្រូវការកម្មបទទេ (The sun rose; They slept peacefully)។ មិនអាចបំប្លែងជា Passive Voice បានឡើយ។
៦. កិរិយាសព្ទបត់បែន (Ergative Verbs)៖ អាចធ្វើជា Transitive ក៏បាន Intransitive ក៏បាន (The chef boiled the water / The water boiled)។
៧. កិរិយាសព្ទជំនួយចម្បង (Primary Auxiliary Verbs)៖ BE (បង្កើត continuous និង passive), DO (បង្កើតបដិសេធ សំណួរ និងសង្កត់ន័យ), HAVE (បង្កើត perfect tenses)។
៨. កិរិយាសព្ទជំនួយ Modal (Modal Auxiliaries)៖ can, could, may, might, must, should, will, would (មិនដែលថែម -s, មិនប្តូរកាលដោយផ្ទាល់ និងបន្តដោយកិរិយាសព្ទដើម V1 គ្មាន to)។
៩. កិរិយាសព្ទទៀងទាត់ និងមិនទៀងទាត់ (Regular vs Irregular Verbs)៖ Regular ថែម -ed (work -> worked -> worked); Irregular ប្តូរស្រៈតាមក្បួនបុរាណ (write -> wrote -> written; cut -> cut -> cut)។
១០. កិរិយាសព្ទកំណត់ និងមិនកំណត់ (Finite vs Non-Finite Verbs)៖ Finite ប្រែប្រួលតាមកាលនិងប្រធាន (He writes); Non-Finite មិនប្រែប្រួលតាមកាល (Infinitives: to go; Gerunds: going; Participles: gone)។
១១. កិរិយាសព្ទផ្សំ (Phrasal Verbs)៖ Verb + Preposition/Adverb ដែលផ្តល់ន័យថ្មីទាំងស្រុង (give up = បោះបង់; look after = ថែទាំ; break down = ខូច)។
១២. កិរិយាសព្ទបង្កហេតុ (Causative Verbs)៖ ប្រើពេលប្រធានបង្ក ឬពឹងពាក់អ្នកដទៃឱ្យធ្វើអ្វីមួយ (make, have, let, get, help)។ ឧទាហរណ៍៖ "She had the plumber fix the pipe"។`,
    examples: [
      'The engineer **designed** an energy-efficient cooling system.',
      'I **understand** the fundamental principles behind this theorem.',
      'The fresh bread from the bakery **smells** absolutely heavenly.',
      'Our team **has accomplished** every single goal set for this quarter.',
      'You **should consult** a physician before starting that rigorous fitness program.',
      'The temperatures **rise** dramatically during the peak dry season.',
      'Please **lay** the reference manuals gently on the conference table.',
      'She **appears** calm and collected despite the demanding interview questions.',
      'Birds **migrate** southwards when the autumn temperatures begin to drop.',
      'He **does not agree** with the proposed changes to the curriculum.',
      'They **were discussing** the strategic partnership throughout the afternoon.'
    ]
  },

  // ==========================================
  // 4. PARTS OF SPEECH: ADJECTIVE
  // ==========================================
  'Adjective': {
    title: 'Adjective (Adjectives)',
    explanation: `WHAT IS AN ADJECTIVE?
An adjective is a qualifying and modifying word that attributes qualities, limits, or properties to nouns and pronouns. Adjectives provide sensory texture, emotional nuance, numerical precision, and dimensional scale to communication. Without adjectives, description is stark and monolithic ("a building in a city"); with adjectives, the description becomes sharp and luminous ("a towering, energy-efficient skyscraper in a bustling metropolis").

THE 12 COMPLETE TYPES OF ADJECTIVES:

1. Descriptive / Qualitative Adjectives (គុណនាមពិពណ៌នា):
   • Portray the inherent physical, mental, or qualitative attributes of an entity: color, texture, temperament, beauty, intelligence (e.g., brilliant, fragile, crimson, durable, courageous).

2. Quantitative Adjectives (គុណនាមបរិមាណ):
   • Express an approximate measure or quantity without giving an exact count: some, much, little, enough, all, any, half, whole, plenty of ("She has much experience"; "We made little progress").

3. Numeral Adjectives (គុណនាមចំនួនលេខ):
   • Cardinal Numerals (exact quantity): one, two, twenty, one hundred ("Ten participants registered").
   • Ordinal Numerals (sequence/rank): first, second, third, final ("The first chapter was captivating").
   • Multiplicative Numerals (multiplication): single, double, triple, twofold.

4. Demonstrative Adjectives (គុណនាមចង្អុលបង្ហាញ):
   • Stand directly before a noun to point out specific people or objects based on distance and quantity: THIS (singular near), THAT (singular far), THESE (plural near), THOSE (plural far).
   • Distinction: "This book is inspiring" (Demonstrative Adjective modifying 'book') vs. "This is inspiring" (Demonstrative Pronoun).

5. Possessive Adjectives / Determiners (គុណនាមកម្មសិទ្ធិ):
   • Modifiers positioned immediately in front of a noun to indicate ownership: my, your, his, her, its, our, their ("Our laboratory developed a new synthesis").

6. Interrogative Adjectives (គុណនាមសួរ):
   • Used alongside nouns to formulate inquiries: WHICH, WHAT, WHOSE ("Which route shall we take?", "Whose passport is this?").

7. Distributive Adjectives (គុណនាមបែងចែក):
   • Refer to individuals of a group considered separately, always accompanied by a singular noun: EACH, EVERY, EITHER, NEITHER ("Each applicant was interviewed"; "Every voter matters").

8. Proper Adjectives (គុណនាមឈ្មោះផ្ទាល់):
   • Derived directly from Proper Nouns and therefore ALWAYS capitalized: Cambodian silk, Shakespearean sonnet, Parisian architecture, Buddhist traditions.

9. Compound Adjectives (គុណនាមផ្សំ):
   • Formed by hyphenating two or more words acting as a single unit when placed before a noun: a world-famous scientist, a high-risk venture, a well-known author, an up-to-date analysis. (Note: When placed after the verb, the hyphen is typically omitted: "The venture was high risk").

10. Participial Adjectives (-ED vs. -ING) (គុណនាមកិរិយាសព្ទ):
    • -ED Adjectives describe how an observer or person FEELS internally ("The audience was fascinated").
    • -ING Adjectives describe the innate characteristic of the person or thing creating that feeling ("The presentation was fascinating").
    • Trap: Never say "I am boring" when you mean "I feel bored"!

11. Predicative-Only & Attributive-Only Adjectives (គុណនាមតាមទីតាំង):
    • Attributive: Sits directly before the noun ("an elder sister").
    • Predicative: Sits after linking verbs ("The sister is asleep").
    • Special Class: Adjectives beginning with 'a-' (asleep, alive, afraid, alone, awake, ashamed) can almost NEVER sit directly before a noun (say "the sleeping child", not "the asleep child").

12. Degrees of Comparison (កម្រិតប្រៀបធៀប):
    • Positive (base quality: tall, creative), Comparative (comparing two: taller, more creative), Superlative (highest among three or more: tallest, most creative).
    • Irregular sets: good -> better -> best; bad -> worse -> worst; far -> farther/further -> farthest/furthest.

THE ROYAL ORDER OF ADJECTIVES:
When stacking cumulative adjectives before a noun, follow the universal cognitive sequence:
[Determiner] -> [Opinion/Observation] -> [Size] -> [Age] -> [Shape] -> [Color] -> [Origin] -> [Material] -> [Purpose/Qualifier] -> NOUN.
Example: "A (determiner) charming (opinion) small (size) antique (age) round (shape) dark-brown (color) Italian (origin) walnut (material) dining (purpose) table."`,
    explanationKhmer: `តួនាទី និងអត្ថន័យនៃគុណនាម (Adjective) ក្នុងភាសាអង់គ្លេស៖
គុណនាម គឺជាពាក្យដែលប្រើសម្រាប់បញ្ជាក់ន័យ បន្ថែមព័ត៌មាន ឬពិពណ៌នាអំពីលក្ខណៈរបស់នាម ឬសព្វនាម (ដូចជា ទំហំ ពណ៌ រូបរាង អាយុ សម្ភារ បរិមាណ ឬអារម្មណ៍)។

ប្រភេទទាំង ១២ នៃគុណនាមក្នុងភាសាអង់គ្លេស៖

១. គុណនាមពិពណ៌នា (Descriptive / Qualitative Adjectives)៖ បង្ហាញលក្ខណៈពីធម្មជាតិ (brave, brilliant, blue, soft, fragile)។
២. គុណនាមបរិមាណ (Quantitative Adjectives)៖ បង្ហាញបរិមាណប្រហាក់ប្រហែល (some, much, little, enough, all, whole)។
៣. គុណនាមចំនួនលេខ (Numeral Adjectives)៖
   • Cardinal (ចំនួនរាប់): one, two, ten
   • Ordinal (លំដាប់ថ្នាក់): first, second, third
   • Multiplicative (គុណទ្វេ): single, double, triple
៤. គុណនាមចង្អុលបង្ហាញ (Demonstrative Adjectives)៖ this, that, these, those ដែលឈរពីមុខនាមផ្ទាល់ ("This laptop is new")។
៥. គុណនាមកម្មសិទ្ធិ (Possessive Adjectives)៖ my, your, his, her, its, our, their ដែលឈរពីមុខនាមដើម្បីបញ្ជាក់ភាពជាម្ចាស់ ("Our team won")។
៦. គុណនាមសួរ (Interrogative Adjectives)៖ Which, What, Whose ដែលឈរពីមុខនាមបង្កើតសំណួរ ("Which book do you prefer?")។
៧. គុណនាមបែងចែក (Distributive Adjectives)៖ Each, Every, Either, Neither ដែលបូកនឹងនាមឯកវចនៈ ("Each member spoke")។
៨. គុណនាមឈ្មោះផ្ទាល់ (Proper Adjectives)៖ ក្លាយចេញពីឈ្មោះផ្ទាល់ និងត្រូវសរសេរអក្សរធំជានិច្ច (Cambodian, French, Buddhist)។
៩. គុណនាមផ្សំ (Compound Adjectives)៖ ពាក្យពីរភ្ជាប់គ្នាដោយសហសញ្ញាឈរពីមុខនាម (well-known writer, high-tech device, full-time job)។
១០. គុណនាមកិរិយាសព្ទ (-ed vs -ing)៖
    • បញ្ចប់ដោយ -ed បង្ហាញពីអារម្មណ៍មនុស្ស (I am interested = ខ្ញុំមានអារម្មណ៍ចាប់អារម្មណ៍)។
    • បញ្ចប់ដោយ -ing បង្ហាញពីលក្ខណៈវត្ថុ ឬរឿងរ៉ាវ (The movie is interesting = ភាពយន្តនោះគួរឱ្យចាប់អារម្មណ៍)។
    • ហាមច្រឡំ "I am bored" (ខ្ញុំធុញ) ជាមួយ "I am boring" (ខ្ញុំជាមនុស្សគួរឱ្យធុញ)។
១១. គុណនាមតាមទីតាំង (Attributive vs Predicative)៖
    • គុណនាមមួយចំនួនដែលផ្តើមដោយ 'a-' (alive, asleep, afraid, alone, awake) មិនអាចឈរពីមុខនាមបានទេ (ត្រូវនិយាយ "The baby is asleep" មិនមែន "the asleep baby" ទេ)។
១២. កម្រិតប្រៀបធៀប (Degrees of Comparison)៖ Positive (good), Comparative (better than), Superlative (the best)។

លំដាប់លំដោយនៃគុណនាម (Order of Adjectives)៖
[Determiner -> យោបល់ -> ទំហំ -> អាយុ -> រូបរាង -> ពណ៌ -> ប្រភព -> វត្ថុធាតុ -> គោលបំណង] + នាម
ឧទាហរណ៍៖ "A lovely, small, old, round, brown, Italian, wooden dining table."`,
    examples: [
      'The museum exhibited an **exquisite** collection of antique artifacts.',
      'She felt completely **exhausted** after leading the five-hour negotiation.',
      'That documentary on quantum computing was thoroughly **fascinating**.',
      'He purchased a **handsome, dark blue Italian wool** suit for the gala.',
      'The city is developing a **reliable, sustainable** public transit system.',
      'Are you **interested** in attending the leadership conference this autumn?',
      'The **weathered wooden** bridge creaked under the weight of the truck.',
      'She offered a **practical, well-thought-out** alternative to the strategy.',
      'The mountain view from our cabin was **breathtaking** at sunrise.',
      'We noticed several **tiny, colorful, tropical** fish swimming near the reef.',
      'The results of the preliminary experiment were surprisingly **promising**.'
    ]
  },

  // ==========================================
  // 5. PARTS OF SPEECH: ADVERB
  // ==========================================
  'Adverb': {
    title: 'Adverb (Adverbs)',
    explanation: `WHAT IS AN ADVERB?
An adverb is a multifaceted grammatical modifier that qualifies or intensifies verbs, adjectives, other adverbs, and entire clauses. Adverbs add circumstance, vividness, and nuance to language by answering the questions:
• How? (Manner: elegantly, courageously, meticulously)
• When? (Time: yesterday, currently, subsequently, soon)
• Where? (Place: nearby, upstairs, internationally, abroad)
• How often? (Frequency: consistently, occasionally, seldom)
• To what degree? (Degree: exceptionally, thoroughly, barely, completely)
• Why / With what consequence? (Conjunctive: therefore, consequently, however)

THE 10 COMPLETE TYPES OF ADVERBS:

1. Adverbs of Manner (គុណកិរិយារបៀបរបប):
   • Describe how an action takes place (fluently, skillfully, gently, rapidly).
   • Position Rule: Placed after the main verb or after the direct object, NEVER between the verb and its direct object ("He solved the problem quickly", NOT "He solved quickly the problem").

2. Adverbs of Time (គុណកិរិយាពេលវេលា):
   • Tell when an action happens (yesterday, now, later, soon, recently, previously, eventually).
   • Usually positioned at the very end or at the very beginning of a sentence for emphasis ("Soon, we will launch the initiative").

3. Adverbs of Place (គុណកិរិយាទីកន្លែង):
   • Specify where an action takes place (here, there, outside, upstairs, everywhere, abroad).
   • Usually follow the main verb or direct object ("Please wait outside").

4. Adverbs of Frequency (គុណកិរិយាភាពញឹកញាប់):
   • Definite Frequency: daily, weekly, hourly, twice a year.
   • Indefinite Frequency: always, usually, normally, often, sometimes, rarely, seldom, hardly ever, never.
   • Placement Rule: Placed BEFORE regular main verbs ("She always reviews her notes"), but AFTER the verb 'to be' and auxiliary verbs ("He is always prepared"; "They have never complained").

5. Adverbs of Degree & Intensifiers (គុណកិរិយាកម្រិត):
   • Indicate the intensity, extent, or degree of an adjective, verb, or adverb: very, extremely, completely, slightly, rather, fairly, quite, too, enough.
   • Rule for 'Enough': Sits AFTER the adjective or adverb ("The room is warm enough"), unlike other degree adverbs which sit before.

6. Conjunctive Adverbs (គុណកិរិយាឈ្នាប់):
   • Bridge two independent clauses with logical transitions (cause, contrast, sequence): however, therefore, furthermore, nevertheless, moreover, consequently, otherwise.
   • Punctuation: Preceded by a semicolon and followed by a comma when connecting clauses: "The data was complex; however, the conclusion was undeniable."

7. Sentence / Viewpoint Adverbs (គុណកិរិយាវាយតម្លៃប្រយោគ):
   • Modify the entire statement and convey the speaker's emotional or cognitive stance: fortunately, surprisingly, honestly, undoubtedly, frankly, presumably ("Fortunately, everyone escaped unharmed").

8. Interrogative Adverbs (គុណកិរិយាសួរ):
   • Words that introduce questions about circumstance: WHEN (time), WHERE (place), WHY (reason), HOW (manner/degree).

9. Relative Adverbs (គុណកិរិយាឈ្នាប់ទំនាក់ទំនង):
   • Introduce relative clauses referring back to nouns of time, place, or reason: WHERE (the city where I was born), WHEN (the day when we met), WHY (the reason why she resigned).

10. Flat Adverbs & Tricky -LY Words:
    • Flat Adverbs have identical forms to adjectives without -ly: fast ("runs fast"), hard ("works hard"), late ("arrived late"), straight ("went straight").
    • Beware False Friends:
      - 'Hardly' means 'scarcely / almost not at all' ("He hardly studied"), which is opposite to 'working hard'.
      - 'Lately' means 'recently', not 'tardily'.
    • Adjectives Ending in -ly: Words like friendly, lovely, lively, lonely, silly are ADJECTIVES, not adverbs! To make them modify verbs, use a phrase: "in a friendly manner".`,
    explanationKhmer: `តួនាទី និងអត្ថន័យនៃកិរិយាសព្ទវិសេស / គុណកិរិយា (Adverb) ក្នុងភាសាអង់គ្លេស៖
Adverb គឺជាពាក្យដែលប្រើសម្រាប់បញ្ជាក់ន័យឱ្យ កិរិយាសព្ទ (Verb), គុណនាម (Adjective), Adverb មួយផ្សេងទៀត ឬប្រយោគទាំងមូល។ Adverb ឆ្លើយតបនឹងសំណួរ៖ យ៉ាងដូចម្តេច? (How?), នៅពេលណា? (When?), នៅឯណា? (Where?), ញឹកញាប់ប៉ុនណា? (How often?), ក្នុងកម្រិតណា? (To what degree?), និងហេតុអ្វី? (Why?)។

ប្រភេទទាំង ១០ នៃ Adverb ក្នុងភាសាអង់គ្លេស៖

១. Adverbs of Manner (របៀបរបប)៖ quickly, skillfully, fluently (ទីតាំង៖ ក្រោយកិរិយាសព្ទ ឬក្រោយកម្មបទ កុំដាក់នៅចន្លោះកិរិយាសព្ទនិងកម្មបទ)។
២. Adverbs of Time (ពេលវេលា)៖ yesterday, now, soon, later, already, recently (ទីតាំង៖ ចុងប្រយោគ ឬដើមប្រយោគ)។
៣. Adverbs of Place (ទីកន្លែង)៖ here, there, outside, upstairs, abroad (ទីតាំង៖ ក្រោយកិរិយាសព្ទ)។
៤. Adverbs of Frequency (ភាពញឹកញាប់)៖ always, usually, often, sometimes, rarely, never (ទីតាំង៖ នៅពីមុខកិរិយាសព្ទសកម្មធម្មតា តែនៅពីក្រោយកិរិយាសព្ទ To Be ឬ Auxiliary Verb)។
៥. Adverbs of Degree (កម្រិត)៖ extremely, very, thoroughly, quite, rather, too, enough (ចំណាំ៖ enough ឈរនៅពីក្រោយគុណនាម "warm enough")។
៦. Conjunctive Adverbs (ឈ្នាប់តក្កវិជ្ជា)៖ however, therefore, furthermore, nevertheless, consequently (ប្រើភ្ជាប់ល្បះឯករាជ្យពីរ៖ ; however, )។
៧. Sentence Adverbs (ការវាយតម្លៃលើប្រយោគ)៖ Fortunately, Honestly, Surprisingly, Undoubtedly (ឈរនៅដើមប្រយោគ និងមានក្បៀស)។
៨. Interrogative Adverbs (សំណួរ)៖ When, Where, Why, How (ប្រើបង្កើតសំណួរពីកាលៈទេសៈ)។
៩. Relative Adverbs (ឈ្នាប់ទំនាក់ទំនង)៖ where (ទីកន្លែង), when (ពេលវេលា), why (ហេតុផល)។
១០. Flat Adverbs និងពាក្យបញ្ចប់ដោយ -ly ពិសេស៖
    • Flat Adverbs មានទម្រង់ដូច Adjective ដោយមិនបាច់ថែម -ly៖ fast, hard, late (និយាយ "runs fast" មិនមែន "fastly" ទេ)។
    • ប្រយ័ត្ន៖ hard (ខ្លាំង/សស្រាក់សស្រាំ) ខុសពី hardly (ស្ទើរតែមិនសោះ); late (យឺត) ខុសពី lately (ថ្មីៗនេះ)។
    • ពាក្យ friendly, lovely, lively ជាគុណនាម (Adjective) មិនមែន Adverb ទេ។`,
    examples: [
      'The surgeon performed the delicate procedure **flawlessly**.',
      'She **frequently** travels to regional conferences to share her research.',
      'The instructions were **exceptionally** clear and easy to follow.',
      'He worked **hard** all evening to complete the engineering model on time.',
      '**Fortunately**, the backup generators kicked in immediately during the blackout.',
      'The diplomat handled the controversial question **tactfully** and with grace.',
      'I **hardly** recognized him after his ten years of living abroad.',
      'The train arrived **punctually** at 8:15 AM as scheduled.',
      'She speaks four languages **fluently** and writes with absolute elegance.',
      'We will **soon** announce the shortlisted candidates for the fellowship.',
      'The team analyzed the clinical trial data **meticulously**.'
    ]
  },

  // ==========================================
  // 6. PARTS OF SPEECH: PREPOSITION
  // ==========================================
  'Preposition': {
    title: 'Preposition (Prepositions)',
    explanation: `WHAT IS A PREPOSITION?
A preposition is a relational function word positioned before a noun, pronoun, or noun phrase (called the "object of the preposition") to express its spatial, temporal, instrumental, causal, or logical connection to another word in the sentence. Prepositions are the vital geographical, chronological, and structural roadmaps of English speech.

THE 10 COMPLETE TYPES OF PREPOSITIONS:

1. Simple Prepositions (ធ្នាក់ទោល):
   • Single-word core prepositions: at, in, on, by, for, from, of, off, to, up, with, through, under, over.

2. Compound Prepositions (ធ្នាក់ផ្សំពីរពាក្យ):
   • Formed by prefixing a preposition to a noun, adjective, or adverb: inside, outside, within, without, into, onto, throughout, underneath, behind, beside.

3. Phrasal / Complex Prepositions (ធ្នាក់កន្សោមពាក្យ):
   • Multi-word set phrases that perform the unified grammatical role of a single preposition: according to, in front of, on behalf of, because of, in spite of, with regard to, by means of, as well as, in addition to.

4. Participial Prepositions (ធ្នាក់ក្លាយពីកិរិយាសព្ទ):
   • Present (-ing) or past (-ed) participles that function as prepositions without modifying a specific agent: concerning, considering, regarding, including, pending, barring, provided. ("Considering the circumstances, you performed admirably").

5. Prepositions of Time (ធ្នាក់ពេលវេលា):
   • AT: Precise clock times and festive periods (at 8:30 AM, at noon, at midnight, at Christmas).
   • ON: Specific calendar days, dates, and named holidays (on Friday, on July 4th, on my graduation day).
   • IN: Longer time envelopes—months, seasons, years, decades, centuries (in August, in winter, in 2026, in the 21st century).
   • Duration & Boundary: during, throughout, for (duration), since (starting point), until/till (endpoint), by (deadline: "by 5:00 PM").

6. Prepositions of Place & Position (ធ្នាក់ទីកន្លែង និងទីតាំង):
   • The Spatial Hierarchy:
     - AT: Exact specific point, building address, or social location (at the airport, at 123 Main St, at the crossroads).
     - ON: Surface contact (horizontal or vertical), second floor, public mass transit (on the table, on the wall, on the bus, on the train).
     - IN: Enclosed 3D boundary, geographic region, city, country (in the room, in the box, in Phnom Penh, in Cambodia).
   • Positional Nuances: above / over (higher than), below / under / underneath (lower than), between (two entities), among (three or more entities), next to / beside (adjacent).

7. Prepositions of Direction & Movement (ធ្នាក់ទិសដៅ និងចលនា):
   • Depict dynamic trajectory: TO (destination: "walked to the office"), TOWARDS (bearing: "moved towards the exit"), INTO (entering 3D space: "dived into the pool"), OUT OF (exiting: "walked out of the hall"), THROUGH (passing within: "hiked through the jungle"), ACROSS (surface traversal: "swam across the river"), ALONG (parallel to line: "strolled along the beach").

8. Prepositions of Agency, Instrument & Manner (ធ្នាក់ភ្នាក់ងារ មធ្យោបាយ និងរបៀប):
   • Agency (the doer in passive voice): BY ("The novel was written by George Orwell").
   • Instrument / Tool: WITH ("He cut the ribbon with silver shears").
   • Manner: WITH / IN / BY ("She spoke with eloquence"; "He traveled by air").

9. Prepositions of Cause, Purpose & Reason (ធ្នាក់ហេតុផល និងគោលបំណង):
   • Express the underlying motive: FOR ("fighting for freedom"), FROM ("suffering from exhaustion"), BECAUSE OF / DUE TO ("delayed due to heavy fog").

10. Dependent Prepositions (Collocations) (ធ្នាក់ភ្ជាប់តាមក្បួនទម្លាប់):
    • Fixed pairings required by specific words:
      - Adjectives: interested IN, capable OF, accustomed TO, famous FOR, allergic TO, proud OF.
      - Verbs: rely ON, depend ON, apologize FOR, succeed IN, believe IN, prevent FROM.
      - Nouns: increase IN, reason FOR, access TO, solution TO.

CRITICAL RULES & COMMON TRAPS:
• In time vs. On time: "On time" = strictly according to the timetable ("The flight departed on time at 10:00"). "In time" = with enough buffer time before a deadline or event ("We arrived in time to review the slides").
• Omission with Determiners: Never use prepositions before 'this', 'that', 'next', 'last', 'every' ("I visited them last week", NOT "in last week").`,
    explanationKhmer: `តួនាទី និងអត្ថន័យនៃធ្នាក់ (Preposition) ក្នុងភាសាអង់គ្លេស៖
ធ្នាក់ គឺជាពាក្យដែលប្រើនៅពីមុខនាម ឬសព្វនាម ដើម្បីបង្ហាញពីទំនាក់ទំនងនៃ ពេលវេលា (Time), ទីកន្លែង (Place), ទិសដៅ (Direction), មធ្យោបាយ (Means) ឬហេតុផល (Reason) ជាមួយពាក្យដទៃទៀតក្នុងប្រយោគ។

ប្រភេទទាំង ១០ នៃធ្នាក់ក្នុងភាសាអង់គ្លេស៖

១. ធ្នាក់ទោល (Simple Prepositions)៖ ពាក្យតែមួយម៉ាត់ (at, in, on, by, for, from, with, through, under, over)។
២. ធ្នាក់ផ្សំ (Compound Prepositions)៖ inside, outside, within, without, into, onto, throughout, underneath, behind, beside។
៣. ធ្នាក់កន្សោមពាក្យ (Phrasal / Complex Prepositions)៖ according to (យោងតាម), in front of (នៅពីមុខ), on behalf of (ក្នុងនាមជាតំណាង), because of (ដោយសារតែ), in spite of (ទោះបីជា), as well as (ព្រមទាំង)។
៤. ធ្នាក់ក្លាយពីកិរិយាសព្ទ (Participial Prepositions)៖ concerning (ទាក់ទងនឹង), regarding, considering (ពិចារណាលើ), including (រាប់បញ្ចូលទាំង), pending (រង់ចាំការសម្រេច)។
៥. ធ្នាក់ពេលវេលា (Prepositions of Time)៖
   • AT៖ ម៉ោង និងពេលវេលាជាក់លាក់ (at 8:00 AM, at noon, at midnight, at Christmas)
   • ON៖ ថ្ងៃនៃសប្តាហ៍ និងកាលបរិច្ឆេទ (on Monday, on May 15th, on my birthday)
   • IN៖ ខែ រដូវ ឆ្នាំ ទសវត្សរ៍ សតវត្សរ៍ (in April, in summer, in 2026, in the 21st century)
   • រយៈពេល៖ for (រយៈពេលប៉ុន្មាន), since (តាំងពីពេលណា), until (រហូតដល់), by (យ៉ាងយូរបំផុតត្រឹមម៉ោង)។
៦. ធ្នាក់ទីកន្លែង និងទីតាំង (Prepositions of Place)៖
   • AT (ចំណុចជាក់លាក់/អាសយដ្ឋាន): at the office, at home, at 45 Main St
   • ON (លើផ្ទៃរាប/មធ្យោបាយសាធារណៈ): on the desk, on the wall, on the bus, on the train
   • IN (ក្នុងលំហបិទជិត/ទីក្រុង/ប្រទេស): in the bag, in Phnom Penh, in Cambodia
   • ទីតាំងផ្សេងទៀត: above/over (ពីលើ), under/below (ពីក្រោម), between (ចន្លោះពីរ), among (ក្នុងចំណោម ៣ ឡើង)។
៧. ធ្នាក់ទិសដៅ និងចលនា (Direction & Movement)៖ into (ចូលក្នុង), out of (ចេញក្រៅ), through (កាត់តាម), across (ឆ្លងកាត់), towards (ឆ្ពោះទៅរក)។
៨. ធ្នាក់ភ្នាក់ងារ និងមធ្យោបាយ (Agency & Instrument)៖ by (ដោយមនុស្ស/ភ្នាក់ងារ), with (ដោយឧបករណ៍/កន្ត្រៃ/ប៊ិច), by air/train (ដោយមធ្យោបាយធ្វើដំណើរ)។
៩. ធ្នាក់ហេតុផល និងគោលបំណង (Cause & Purpose)៖ for (ដើម្បី), because of / due to (ដោយសារតែ)។
១០. ធ្នាក់ភ្ជាប់តាមក្បួនទម្លាប់ (Dependent Prepositions)៖ interested in, capable of, depend on, apologize for, solution to។

កំហុសដែលត្រូវចៀសវាង៖
• "On time" (ទាន់ម៉ោងតាមកាលវិភាគ) ខុសពី "In time" (ទាន់ពេលមុនពេលមានអ្វីកើតឡើង)។
• ហាមប្រើធ្នាក់នៅពីមុខ next, last, this, every ("I saw her last night", មិនមែន "in last night" ទេ)។`,
    examples: [
      'The international summit will convene **at** 9:00 AM sharp **on** Monday morning.',
      'She has been living **in** Singapore since completing her master\'s degree **in** 2020.',
      'The research documents are placed **on** the third shelf **in** the archival room.',
      'The hikers navigated carefully **through** the dense bamboo forest **towards** the river.',
      'He is extraordinarily capable **of** managing complex engineering projects.',
      'We arrived at the terminal just **in time** to board the departing flight.',
      'Are you genuinely interested **in** pursuing a career in artificial intelligence?',
      'The cat jumped effortlessly **onto** the kitchen counter and then **into** the cardboard box.',
      'She apologized sincerely **for** the unexpected delay in submitting the feedback.',
      'Our success depends heavily **on** consistent collaboration between departments.',
      'The express train arrived **on time**, exactly to the minute.'
    ]
  },

  // ==========================================
  // 7. PARTS OF SPEECH: CONJUNCTION
  // ==========================================
  'Conjunction': {
    title: 'Conjunction (Conjunctions)',
    explanation: `WHAT IS A CONJUNCTION?
A conjunction is a syntactic connector that joins individual words, phrases, or clauses within a sentence, establishing clear logical, temporal, and hierarchical relationships between ideas. Without conjunctions, human thought would be trapped in fragmented, choppy, and robotic utterances. Conjunctions allow you to coordinate equal ideas, subordinate secondary concepts, establish conditions, and express complex causal logic.

THE 5 COMPLETE FAMILIES OF CONJUNCTIONS:

1. Coordinating Conjunctions (The FANBOYS):
   • Connect words, phrases, or independent clauses of equal grammatical rank and syntactic weight.
   • The famous acronym FANBOYS:
     - FOR: Explains cause or reasoning ("We stayed indoors, for the storm raged outside").
     - AND: Adds congruent information ("She is an author and lectures at the university").
     - NOR: Adds a secondary negative assertion, requiring subject-verb inversion ("He does not smoke, nor does he drink alcohol").
     - BUT: Introduces contrast or an exception ("The challenge was grueling, but they persevered").
     - OR: Offers an alternative or choice ("You can submit electronically or bring a physical copy").
     - YET: Concedes an unexpected contrast ("She was in pain, yet she maintained a bright smile").
     - SO: Signals consequence or result ("The budget was approved, so construction began immediately").
   • Punctuation: When connecting two complete independent clauses, place a comma immediately before the coordinating conjunction.

2. Subordinating Conjunctions (ឈ្នាប់បន្ទាប់បន្សំ):
   • Connect an independent (main) clause to a dependent (subordinate) clause that cannot stand alone as a sentence:
     - Cause & Effect: because, since, as, seeing that, so that, in order that.
     - Contrast & Concession: although, even though, though, whereas, while.
     - Time Relationships: before, after, since, until, when, whenever, while, as soon as, once.
     - Condition: if, unless (if not), provided that, in case, as long as.
     - Manner & Comparison: as if, as though, just as, than.
   • Comma Rule: When the subordinate clause starts the sentence, place a comma after it ("Although it rained, we enjoyed the hike"). When the main clause comes first, no comma is needed ("We enjoyed the hike although it rained").

3. Correlative Conjunctions (ឈ្នាប់ជាគូ):
   • Paired conjunctions that must always work in tandem to join grammatically parallel structures:
     - BOTH... AND: "She is both an architect and an urban planner."
     - EITHER... OR: "We must either adapt our workflow or risk falling behind."
     - NEITHER... NOR: "Neither the manager nor the supervisors were informed."
     - NOT ONLY... BUT ALSO: "He speaks not only Khmer but also fluent English and French."
     - WHETHER... OR: "We must proceed whether it rains or shines."
   • Parallelism Mandate: The grammatical form following the first correlative word must precisely mirror the grammatical form following the second.

4. Conjunctive Adverbs (Transition Words) (គុណកិរិយាឈ្នាប់):
   • Connect two independent clauses with semantic transitions: however, therefore, furthermore, nevertheless, consequently, moreover, meanwhile, otherwise.
   • Punctuation Pattern: Semicolon before, comma after ("The prototype failed its initial test; however, the engineering team resolved the issue").

5. Compound Conjunctions (ឈ្នាប់ផ្សំ):
   • Multi-word expressions that function as a single subordinating or coordinating unit: as well as, as soon as, in order that, as long as, provided that, in spite of the fact that.`,
    explanationKhmer: `តួនាទី និងអត្ថន័យនៃឈ្នាប់ (Conjunction) ក្នុងភាសាអង់គ្លេស៖
ឈ្នាប់ គឺជាពាក្យដែលប្រើសម្រាប់ភ្ជាប់ពាក្យ ឃ្លា ឬប្រយោគចូលគ្នា ដើម្បីបង្កើតទំនាក់ទំនងតក្កវិជ្ជា ដូចជា ការបន្ថែម ភាពផ្ទុយគ្នា ហេតុផល លក្ខខណ្ឌ លទ្ធផល និងជម្រើស។

ក្រុមទាំង ៥ នៃឈ្នាប់ក្នុងភាសាអង់គ្លេស៖

១. ឈ្នាប់សម្របសម្រួល (Coordinating Conjunctions - FANBOYS)៖
   • ភ្ជាប់ពាក្យ ឃ្លា ឬល្បះឯករាជ្យស្មើថ្នាក់គ្នា៖
     - For (ព្រោះតែ)
     - And (និង/ហើយ)
     - Nor (ក៏មិន...ដែរ - ត្រូវធ្វើ Inversion: "nor does he drink")
     - But (ប៉ុន្តែ - បង្ហាញភាពផ្ទុយគ្នា)
     - Or (ឬ/ឬមួយ - ផ្តល់ជម្រើស)
     - Yet (ក៏ប៉ុន្តែ/យ៉ាងណាក្តី)
     - So (ដូច្នេះ/ហេតុនេះ - បង្ហាញលទ្ធផល)
   • ក្បួនក្បៀស៖ ពេលភ្ជាប់ល្បះពេញលេញពីរ ត្រូវដាក់ក្បៀស (,) នៅពីមុខ FANBOYS។

២. ឈ្នាប់បន្ទាប់បន្សំ (Subordinating Conjunctions)៖
   • ភ្ជាប់ល្បះរណបទៅនឹងល្បះចម្បង៖
     - ហេតុផល (Cause): because, since, as, so that
     - ភាពផ្ទុយ/ការទទួលស្គាល់ (Concession): although, even though, while, whereas
     - ពេលវេលា (Time): before, after, as soon as, until, whenever, since
     - លក្ខខណ្ឌ (Condition): if, unless (លើកលែងតែ), provided that, as long as
   • ក្បួនក្បៀស៖ បើល្បះរណបឈរនៅដើមប្រយោគ ត្រូវដាក់ក្បៀសកាត់ ("Although it was cold, we swam")។

៣. ឈ្នាប់ជាគូ (Correlative Conjunctions)៖
   • ឈ្នាប់គូដែលត្រូវតែប្រើជាមួយគ្នានិងរក្សាទម្រង់ស្របគ្នា (Parallelism)៖
     - both... and (ទាំង... ទាំង...)
     - either... or (មិន... ក៏...)
     - neither... nor (ទាំងមិន... និងមិន...)
     - not only... but also (មិនត្រឹមតែ... ប៉ុន្តែថែមទាំង...)
     - whether... or (ទោះជា... ឬ...)

៤. គុណកិរិយាឈ្នាប់ (Conjunctive Adverbs)៖
   • however, therefore, furthermore, nevertheless, consequently, moreover (រូបមន្ត៖ ; however, )។

៥. ឈ្នាប់ផ្សំ (Compound Conjunctions)៖
   • as well as, as soon as, in order that, as long as, provided that។`,
    examples: [
      'The software is exceptionally powerful, **yet** it remains remarkably intuitive to use.',
      'She decided to take the scholarship **because** it provided full research funding.',
      '**Although** the weather was bitterly cold, the marathon runners maintained their pace.',
      'You can submit the assignment online **or** deliver a physical copy to the faculty office.',
      'He **not only** designed the architectural layout **but also** supervised the construction.',
      'We will postpone the outdoor workshop **unless** the severe storm clears by noon.',
      'The budget was approved, **so** the engineering team commenced development immediately.',
      '**Both** the marketing director **and** the chief executive endorsed the rebranding strategy.',
      'She arrived at the conference early **so that** she could test her audio equipment.',
      'He neither complained about the intense workload **nor** missed a single project milestone.',
      '**As soon as** the contract is signed, we will disburse the initial grant funds.'
    ]
  },

  // ==========================================
  // 8. PARTS OF SPEECH: INTERJECTION
  // ==========================================
  'Interjection': {
    title: 'Interjection (Interjections)',
    explanation: `WHAT IS AN INTERJECTION?
An interjection is a spontaneous word, sound, or short phrase uttered to express immediate human emotion, sudden psychological reaction, physical sensation, or conversational signaling. Unlike every other part of speech, interjections have no grammatical attachment to the subject, verb, or modifiers of the sentence—they are structurally autonomous and can be removed without affecting sentence syntax.

THE 6 FUNCTIONAL CATEGORIES OF INTERJECTIONS:

1. Primary Interjections (ឧទានសព្ទដើម / សូរឧទានសុទ្ធ):
   • Words or vocal sounds that exist exclusively as emotional exclamations and never function as nouns, verbs, or adjectives:
     - Ouch! / Ow! (sudden physical pain)
     - Wow! (astonishment, wonder, admiration)
     - Oops! / Whoops! (accidental minor mistake)
     - Phew! (relief after narrow escape or exhaustion)
     - Ugh! / Yuck! / Ew! (visceral disgust or aversion)
     - Shh! / Hush! (demand for silence)
     - Aha! (sudden discovery or realization)

2. Secondary Interjections (ឧទានសព្ទបន្ទាប់បន្សំ):
   • Standard words from other parts of speech (nouns, verbs, adjectives) repurposed as exclamations:
     - Heavens! / My goodness! / Lord! (astonishment)
     - Brilliant! / Excellent! / Splendid! (enthusiastic approval)
     - Shoot! / Darn! (frustration or annoyance)
     - Look! / Hark! / Listen! (directing attention)
     - Indeed! / Exactly! (strong intellectual affirmation)

3. Volitive & Conversational Interjections (ឧទានសព្ទសន្ទនា):
   • Used to initiate, maintain, guide, or interrupt verbal communication:
     - Hey! / Hello! (greeting or capturing notice)
     - Bye! / Farewell! (departure)
     - Please! (polite petition)
     - Psst! (surreptitious call for quiet attention)
     - Um / Uh / Er / Well (hesitation, cognitive pauses, floor-holding)

4. Emotive Interjections (ឧទានសព្ទបង្ហាញអារម្មណ៍):
   • Joy & Celebration: Hurray!, Yay!, Bravo!, Cheers!
   • Sorrow & Compassion: Alas!, Oh dear!, Poor thing!
   • Relief: Ah!, Thank goodness!

5. Punctuation Rules: Exclamation Mark vs. Comma:
   • Intense Emotion: Followed by an exclamation mark (!) and the next sentence begins capitalized:
     "Ouch! The boiling steam scorched my wrist."
     "Bravo! That was a masterpiece of storytelling."
   • Mild Emotion or Conversational Pause: Followed simply by a comma (,) within the ongoing clause:
     "Well, we can always attempt the experiment again."
     "Oh, I didn't realize you were waiting for me."

6. Register & Sociolinguistic Constraints:
   • Interjections thrive in vibrant spoken dialogue, dramatic acting, fictional novels, and informal messaging.
   • In formal academic papers, peer-reviewed journals, and corporate executive memos, interjections are strictly forbidden because formal discourse demands neutral, reasoned analysis rather than emotive exclamations.`,
    explanationKhmer: `តួនាទី និងអត្ថន័យនៃឧទានសព្ទ (Interjection) ក្នុងភាសាអង់គ្លេស៖
ឧទានសព្ទ គឺជាពាក្យខ្លីៗ ឬសូរឧទានដែលបន្លឺឡើងដើម្បីបង្ហាញពីអារម្មណ៍ភ្លាមៗ ដូចជា ភ្ញាក់ផ្អើល រំភើប ឈឺចាប់ ធូរចិត្ត ខកចិត្ត ឬការផ្តល់សញ្ញាក្នុងការសន្ទនា។ ឧទានសព្ទមិនមានចំណងវេយ្យាករណ៍ជាមួយប្រធាន ឬកិរិយាសព្ទនៃប្រយោគឡើយ។

ប្រភេទទាំង ៦ នៃឧទានសព្ទក្នុងភាសាអង់គ្លេស៖

១. ឧទានសព្ទដើម (Primary Interjections)៖ ជាសូរឧទានសុទ្ធសាធដែលមិនមែនជានាម ឬកិរិយាឡើយ៖
   • Ouch! / Ow! (ឈឺចាប់ភ្លាមៗ: អូយ!)
   • Wow! (ស្ញប់ស្ញែង/អស្ចារ្យ: អីយ៉ា! អស្ចារ្យណាស់!)
   • Oops! / Whoops! (ពេលធ្វើខុសដោយអចេតនា)
   • Phew! (ដកដង្ហើមធូរទ្រូង)
   • Ugh! / Yuck! (ខ្ពើមរអើម ឬធុញទ្រាន់)
   • Shh! / Hush! (ឱ្យនៅស្ងៀម)
   • Aha! (ពេលរកឃើញដំណោះស្រាយ ឬយល់ឃើញ)

២. ឧទានសព្ទបន្ទាប់បន្សំ (Secondary Interjections)៖ ពាក្យធម្មតា (គុណនាម នាម) ដែលយកមកប្រើជាឧទានសព្ទ៖
   • Brilliant! / Excellent! (អស្ចារ្យមែន!)
   • Heavens! / My goodness! (ព្រះអើយ!)
   • Look! / Listen! (មើលនែ៎! ស្តាប់នែ៎!)

៣. ឧទានសព្ទសន្ទនា (Volitive / Conversational)៖
   • Hey! (ហៅចំណាប់អារម្មណ៍), Psst! (ខ្សឹបហៅស្ងាត់ៗ), Um / Well (ស្ទាក់ស្ទើរពេលកំពុងគិត)។

៤. ឧទានសព្ទអារម្មណ៍ (Emotive Interjections)៖
   • Hurray! / Yay! (ជយោ! អបអរសាទរ), Alas! (អនិច្ចាអើយ! ខកចិត្ត/សោកស្តាយ)។

៥. ក្បួនសញ្ញាវណ្ណយុត្តិ៖
   • អារម្មណ៍ខ្លាំង៖ ប្រើសញ្ញាឧទាន (!) ហើយប្រយោគបន្ទាប់ផ្ដើមដោយអក្សរធំ ("Ouch! That hot water burned me.")។
   • អារម្មណ៍ស្រាល៖ ប្រើសញ្ញាក្បៀស (,) ក្នុងប្រយោគធម្មតា ("Well, let's proceed to the next agenda.")។

៦. កម្រិតនៃការប្រើប្រាស់ (Register)៖
   • ពេញនិយមបំផុតក្នុងការសន្ទនាផ្ទាល់មាត់ ការផ្ញើសារ និងប្រលោមលោក។ ហាមដាច់ខាតមិនឱ្យប្រើក្នុងសារណាស្រាវជ្រាវ (Research Papers) ឬលិខិតរដ្ឋបាលផ្លូវការឡើយ។`,
    examples: [
      '**Ouch!** I accidentally bit the inside of my cheek while eating.',
      '**Wow!** The sunset over the temple towers is utterly magnificent.',
      '**Phew!** We barely made it to the departure gate before the boarding doors closed.',
      '**Well**, we could always examine the statistical models one more time tomorrow.',
      '**Hurray!** Our research grant application was officially approved by the board.',
      '**Ugh**, the traffic on the bridge during rush hour is completely stationary.',
      '**Oh**, I completely forgot to attach the quarterly spreadsheet to that email.',
      '**Bravo!** That was one of the most moving violin performances I have ever witnessed.',
      '**Hey!** Watch out for that wet, slippery patch of polished marble near the stairs.',
      '**Alas**, the ancient parchment had degraded beyond human restoration.',
      '**Um**, could you please clarify the second bullet point in the strategic brief?'
    ]
  },

  // ==========================================
  // 9. SUBJECT PRONOUNS
  // ==========================================
  'Subject Pronouns': {
    title: 'Subject Pronouns (I, you, he, she, it, we, they)',
    explanation: `WHAT ARE SUBJECT PRONOUNS?
Subject pronouns (also termed subjective or nominative personal pronouns) are grammatical substitutes that perform the primary action or embody the primary state of being in a clause. They occupy the core subject position—situated directly before the predicate verb in declarative statements ("She researches genetics"), or inverted immediately after auxiliary verbs in interrogative questions ("Did she research genetics?").

THE 7 COMPLETE SUBJECT PRONOUNS & THEIR DEEP LINGUISTIC ROLES:

1. FIRST PERSON (The Origin of Speech):
   • 'I' (Singular): Identifies the direct speaker.
     - Orthographic Rule: 'I' is ALWAYS capitalized in English regardless of its position in a sentence ("My mentor and I authored the manuscript").
   • 'We' (Plural): Refers to the speaker alongside one or more other people.
     - Inclusive 'We': Encompasses the listener ("We must all work together to protect our environment").
     - Exclusive 'We': Excludes the listener ("We in the engineering department will deliver the prototype to you on Friday").

2. SECOND PERSON (The Addressee):
   • 'You' (Singular & Plural): Refers directly to the individual or group being addressed.
     - Grammatical Agreement: 'You' ALWAYS governs plural verb agreement regardless of whether you are speaking to one individual or ten thousand ("You are welcome"; never "You is").
     - Generic 'You' (Impersonal Pronoun): Used in conversational English to mean "anyone" or "people in general" ("You cannot achieve mastery without consistent practice").

3. THIRD PERSON (The External Referent):
   • 'He' (Singular Masculine): Replaces male humans and animals with designated male gender ("Dr. Evans called; he will arrive shortly").
   • 'She' (Singular Feminine): Replaces female humans and animals with designated female gender ("The director took the stage; she outlined the 5-year roadmap").
   • 'It' (Singular Non-Human & Impersonal):
     - Inanimate Objects & Abstractions: "The microscope arrived; it is extraordinarily precise."
     - Weather & Temperature (Meteorological 'It'): "It is raining heavily outside"; "It was bitterly cold."
     - Chronology & Distance: "It is 3:30 PM"; "It is forty miles to the coastline."
     - Dummy / Anticipatory 'It': Anticipates a postponed infinitive or clause ("It is essential to verify experimental data").
   • 'They' (Plural & Singular Epicene):
     - Plural: Replaces multiple people, animals, or objects ("The researchers published their findings; they received international acclaim").
     - Singular 'They': Standard, centuries-old English usage for a singular individual whose gender is unspecified, unknown, or non-binary ("If a student arrives late, they should register at the front desk").

SYNTACTIC RULES & CRITICAL PITFALLS:
• The Non-Pro-Drop Principle: Unlike Spanish or Khmer where the subject pronoun can be freely omitted when understood from context, English strictly prohibits null subjects. Every finite clause MUST contain an overt subject: Say "It is hot today," NEVER "Is hot today."
• Politeness Coordinate Order: In compound subjects containing multiple entities, the first-person pronoun must always come last: "Dara, Sophia, and I completed the study" (NEVER "I, Dara, and Sophia", and NEVER "Me and Dara").
• Subject Complement (Formal vs. Informal): In formal prescriptive grammar, the complement following 'To Be' takes the subject pronoun ("It is I"; "This is she"). In modern conversational English, the object pronoun is standard ("It's me").`,
    explanationKhmer: `តួនាទី និងក្បួនវេយ្យាករណ៍ស៊ីជម្រៅនៃសព្វនាមធ្វើជាប្រធាន (Subject Pronouns)៖
Subject Pronouns (សព្វនាមប្រធាន) គឺជាពាក្យដែលប្រើជំនួសឱ្យនាម ដើម្បីធ្វើជាតួអង្គប្រព្រឹត្តសកម្មភាព ឬជាប្រធាននៃល្បះ។ ទីតាំងរបស់វាគឺស្ថិតនៅពីមុខកិរិយាសព្ទក្នុងប្រយោគស្រប និងបដិសេធ ហើយនៅពីក្រោយកិរិយាសព្ទជំនួយក្នុងប្រយោគសំណួរ។

ការបែងចែកលម្អិតនៃ Subject Pronouns ទាំង ៧៖

១. បុរិសសព្វនាមទី ១ (អ្នកនិយាយ)៖
   • I (ខ្ញុំ)៖ តំណាងឱ្យអ្នកនិយាយទោល។ ច្បាប់អក្ខរាវិរុទ្ធភាសាអង់គ្លេសតម្រូវឱ្យសរសេរអក្សរធំ "I" ជានិច្ច ទោះបីវានៅកណ្តាល ឬចុងប្រយោគក៏ដោយ ("My friend and I")។
   • We (ពួកយើង)៖ អ្នកនិយាយ រួមជាមួយអ្នកដទៃ (រួមបញ្ចូលទាំងអ្នកស្តាប់ ឬមិនរួមបញ្ចូល)។

២. បុរិសសព្វនាមទី ២ (អ្នកស្តាប់)៖
   • You (អ្នក / លោក / អ្នកទាំងអស់គ្នា)៖ ប្រើបានទាំងឯកវចនៈ និងពហុវចនៈ ប៉ុន្តែត្រូវតែប្រើជាមួយកិរិយាសព្ទពហុវចនៈជានិច្ច (You are, You have)។
   • Generic 'You'៖ ប្រើជាអនាមិក សំដៅលើមនុស្សទូទៅ ("You must work hard to succeed" = នរណាក៏ដោយត្រូវតែខិតខំប្រឹងប្រែងដើម្បីជោគជ័យ)។

៣. បុរិសសព្វនាមទី ៣ (អ្នកដែលគេកំពុងនិយាយដល់)៖
   • He (គាត់/គាត់ប្រុស)៖ សម្រាប់មនុស្សប្រុសម្នាក់។
   • She (នាង/គាត់ស្រី)៖ សម្រាប់មនុស្សស្រីម្នាក់។
   • It (វា/នេះ)៖
     - វត្ថុ ឬគំនិតអរូបី (The computer -> it)
     - ប្រាប់អាកាសធាតុ (It is sunny) ម៉ោង (It is 9:00 AM) ចម្ងាយ (It is 5 km away)
     - Dummy 'It' (ប្រធានបន្ទាប់បន្សំ)៖ "It is important to study" (វាពិតជាសំខាន់ណាស់ក្នុងការរៀនសូត្រ)។
   • They (ពួកគេ / ពួកវា)៖ សម្រាប់មនុស្ស សត្វ ឬវត្ថុចាប់ពីពីរឡើងទៅ។ លើសពីនេះ 'They' ក៏ត្រូវបានប្រើជាឯកវចនៈ (Singular They) សម្រាប់មនុស្សម្នាក់ដែលមិនស្គាល់ភេទច្បាស់លាស់ ("Somebody left their umbrella")។

ក្បួនគ្រឹះ និងចំណុចប្រយ័ត្ន៖
១. ភាសាអង់គ្លេសមិនអនុញ្ញាតឱ្យលុបប្រធានចោលឡើយ (Non-pro-drop)៖ ត្រូវតែមានប្រធានជានិច្ច ដូចជា "It is cold" ហាមនិយាយថា "Is cold" ដូចក្នុងភាសាខ្មែរឡើយ។
២. វិធានសុជីវធម៌ពេលរៀបរាប់មនុស្សច្រើននាក់៖ ត្រូវដាក់ខ្លួនឯង (I) នៅចុងក្រោយជានិច្ច៖ "Sophea and I visited Angkor Wat" (ហាមនិយាយ "Me and Sophea" ឬ "I and Sophea")។`,
    examples: [
      '**I** am conducting clinical research on regenerative biology.',
      '**They** live in a sustainable eco-village outside the capital.',
      '**She** serves as the chief technology officer for the enterprise.',
      '**It** is an extraordinarily peaceful afternoon to read in the courtyard.',
      '**We** organize a community clean-up drive on the first Sunday of every month.',
      '**He** speaks three regional languages and interprets at diplomatic forums.',
      '**You** are welcome to join our weekly coding workshops anytime.',
      'My supervisor and **I** submitted the comprehensive quarterly audit yesterday.',
      '**It** takes approximately forty-five minutes to reach the airport by train.',
      'Whenever a customer requests support, **they** receive a ticket number within seconds.',
      '**We** believe that continuous learning is the cornerstone of professional growth.'
    ]
  },

  // ==========================================
  // 10. THE VERB "TO BE" (AM, IS, ARE)
  // ==========================================
  'To Be (am, is, are)': {
    title: 'The Verb "To Be" (am, is, are)',
    explanation: `WHAT IS THE VERB "TO BE"?
The verb "to be" is the foundational linchpin of the English language. It is uniquely irregular, exhibiting three distinct morphological forms in the present tense: AM, IS, and ARE. Beyond serving as a copular (linking) verb that connects a subject to its state, role, or description, it operates as an essential auxiliary (helping) verb that powers continuous aspect and passive voice.

THE MORPHOLOGY & SUBJECT HARMONY:
• 'am': Bound exclusively to the first-person singular pronoun 'I' ("I am dedicated to my craft").
• 'is': Paired with third-person singular subjects: he, she, it, singular countable nouns, and uncountable mass nouns ("He is punctual"; "Knowledge is power").
• 'are': Paired with plural subjects and the second-person 'you': you (singular & plural), we, they, and plural nouns ("You are capable"; "The blueprints are ready").

THE 7 COMMUNICATIVE ROLES OF "TO BE":
1. Defining Identity, Profession & Roles:
   • "Dr. Aris is a leading neurosurgeon."
2. Expressing Nationality, Origin & Geographic Roots:
   • "They are from Cambodia; their headquarters is in Phnom Penh."
3. Describing Intrinsic Qualities & Emotional / Physical States:
   • "She is resilient and compassionate"; "The students are exhausted after exams."
4. Stating Chronology, Age & Measurements:
   • "He is twenty-six years old"; "The mountain is 3,000 meters high"; "It is noon."
5. Specifying Spatial Location & Position:
   • "The confidential archives are on the subterranean level."
6. Serving as Auxiliary for the Continuous Aspect (be + Verb-ing):
   • "The engineering team is testing the electrical turbine."
7. Serving as Auxiliary for the Passive Voice (be + Past Participle V3):
   • "Solar energy is harvested across the desert grid."

SENTENCE STRUCTURES & CONTRACTIONS:
• Affirmative (+): Subject + am/is/are + Complement.
  - Contractions: I'm, you're, he's, she's, it's, we're, they're.
• Negative (-): Subject + am/is/are + not + Complement.
  - Contractions: isn't, aren't.
  - Exception: 'am not' CANNOT contract into 'amn't' in standard English; use "I'm not." (In colloquial tag questions, 'aren't I?' is idiomatic: "I am next, aren't I?").
• Interrogative (?): Inversion of verb to the clause front: Am/Is/Are + Subject + Complement?
  - "Are the participants ready for the symposium?"
• Short Answers Rule: NEVER contract affirmative short answers ("Yes, I am," NOT "Yes, I'm!"; "Yes, she is," NOT "Yes, she's!"). Negative short answers CAN be contracted ("No, she isn't").`,
    explanationKhmer: `តួនាទី និងការប្រើប្រាស់កិរិយាសព្ទ "To Be" (am, is, are)៖
កិរិយាសព្ទ "To Be" គឺជាកិរិយាសព្ទដ៏មានឥទ្ធិពល និងប្រើប្រាស់ញឹកញាប់បំផុតក្នុងភាសាអង់គ្លេស។ ក្នុងកាលបច្ចុប្បន្ន វាមាន ៣ ទម្រង់គឺ AM, IS, និង ARE។ វាដើរតួទាំងជាកិរិយាសព្ទតភ្ជាប់ (Linking Verb) និងជាកិរិយាសព្ទជំនួយ (Auxiliary Verb) ក្នុងទម្រង់ Continuous និង Passive Voice។

ការបែងចែកតាមប្រធានក្នុងបច្ចុប្បន្នកាល (Present Simple)៖
• AM ៖ ប្រើផ្តាច់មុខតែជាមួយ "I" ប៉ុណ្ណោះ (I am / I'm)។
• IS ៖ ប្រើជាមួយប្រធានឯកវចនៈ He, She, It ឬនាមឯកវចនៈ និងនាមរាប់មិនបាន (He is, She is, It is, The water is, Time is precious)។
• ARE ៖ ប្រើជាមួយ You, We, They ឬនាមពហុវចនៈ (You are, We are, They are, The books are)។

តួនាទីទាំង ៧ របស់កិរិយាសព្ទ "To Be"៖
១. បញ្ជាក់អត្តសញ្ញាណ និងមុខរបរ៖ "She is an architect."
២. ប្រាប់សញ្ជាតិ និងប្រភពដើម៖ "We are from Cambodia."
៣. ពិពណ៌នាអំពីគុណភាព និងស្ថានភាពអារម្មណ៍៖ "He is honest and creative."
៤. ប្រាប់អាយុ ទំហំ និងពេលវេលា៖ "She is 25 years old"; "It is 8:00 AM."
៥. ប្រាប់ទីតាំង៖ "The keys are on the desk."
៦. ធ្វើជាកិរិយាសព្ទជំនួយក្នុង Continuous Tenses (be + V-ing)៖ "They are working."
៧. ធ្វើជាកិរិយាសព្ទជំនួយក្នុង Passive Voice (be + V3)៖ "The bridge is built."

ក្បួនទម្រង់កាត់ និងការឆ្លើយសំណួរខ្លី៖
• បដិសេធ៖ isn't, aren't។ ចំណាំ៖ គ្មានពាក្យ 'amn't' ឡើយ ត្រូវប្រើ "I'm not"។
• ការឆ្លើយសំណួរខ្លី៖ ហាមប្រើទម្រង់កាត់ក្នុងការឆ្លើយស្របដាច់ខាត! ត្រូវឆ្លើយពេញ៖ "Yes, I am." (ហាមនិយាយ "Yes, I'm"), "Yes, he is." (ហាមនិយាយ "Yes, he's")។`,
    examples: [
      'She **is** an accomplished software architect with a passion for robotics.',
      'They **are** genuinely excited about the upcoming cultural exchange program.',
      'I **am** confident that our preparation will yield outstanding results.',
      'The museum **is** open to the public from Tuesday through Sunday.',
      'We **are not** discouraged by this temporary technical setback.',
      '**Is your supervisor** currently in her office or attending the symposium?',
      '**Are you** familiar with the latest environmental protection regulations?',
      'Phnom Penh and Siem Reap **are** two of the most visited destinations in Cambodia.',
      'It **is** crucial to verify experimental data before publishing the final paper.',
      'He **is** twenty-eight years old and holds a doctorate in civil engineering.',
      'The laboratory instruments **are** sterilized thoroughly prior to each trial.'
    ]
  },

  // ==========================================
  // 11. ARTICLES (A, AN, THE)
  // ==========================================
  'Articles (a, an, the)': {
    title: 'Articles (a, an, the)',
    explanation: `WHAT ARE ARTICLES?
Articles are specialized grammatical determiners that precede nouns to specify their definiteness, specificity, and identifiability. English maintains three distinct article states:
1. Indefinite Articles (A / An): Refer to an unspecific or newly introduced member of a class.
2. Definite Article (The): Refers to a specific, unique, or previously known entity.
3. Zero Article (Ø): The omission of any article before plural, uncountable, or categorical nouns.

1. THE INDEFINITE ARTICLES: 'A' VS. 'AN'
• Syntactic Constraint: Used EXCLUSIVELY with singular countable nouns ("a blueprint", "an experiment"). NEVER use 'a' or 'an' directly before plural nouns ("a books" is invalid) or uncountable mass nouns ("an information" is invalid).
• The Phonetic Principle (Sound Over Spelling):
  - Use 'A' before consonant SOUNDS: a doctor, a hospital, a university (/j/ consonant sound), a European capital (/j/ sound), a one-way street (/w/ sound).
  - Use 'AN' before vowel SOUNDS (/æ/, /e/, /ɪ/, /ɒ/, /ʌ/): an apple, an engineer, an honest mistake (silent 'h'), an hour (silent 'h'), an MBA graduate (/em/ consonant letter but begins with vowel sound /ɛ/).
• Communicative Role: Mentions something for the first time or classifies an entity ("She is a biologist").

2. THE DEFINITE ARTICLE: 'THE'
• Used with singular, plural, and uncountable nouns when both speaker and listener share an unmistakable mutual reference:
  - Second Mention: "I consulted a specialist. The specialist recommended physiotherapy."
  - Absolute Uniqueness: Entities of which only one exists (the sun, the earth, the equator, the internet).
  - Superlatives & Ordinal Numbers: the most rigorous trial, the tallest tower, the first chapter.
  - Specified Post-Modification: When a prepositional phrase or relative clause restricts the noun: "The water in this reservoir is filtered" (specific) vs. "Water is essential" (general).
  - Musical Instruments: "He plays the cello and the piano."
  - Well-Defined Social Institutions / Mass Media: the press, the police, the radio.

3. GEOGRAPHICAL USAGE RULES WITH 'THE':
• USE 'THE' WITH:
  - Oceans, Seas & Rivers: the Pacific Ocean, the Mekong River, the Mediterranean Sea.
  - Mountain Ranges (Plural): the Himalayas, the Alps, the Andes.
  - Island Groups (Archipelagos): the Philippines, the Maldives.
  - Deserts & Gulfs: the Sahara Desert, the Persian Gulf.
  - Countries containing political unions or plural nouns: the United States, the United Kingdom, the Netherlands, the United Arab Emirates, the Czech Republic.
• DO NOT USE 'THE' WITH (ZERO ARTICLE):
  - Individual Mountain Peaks: Mount Everest, Mount Fuji (NOT the Mount Everest).
  - Individual Islands: Bali, Madagascar.
  - Individual Lakes: Lake Superior, Lake Victoria.
  - Continents & Most Countries: Asia, Europe, Cambodia, France, Japan.
  - Cities & Streets: Phnom Penh, London, Wall Street, Oxford Street.

4. THE ZERO ARTICLE (NO ARTICLE):
• Plural & Uncountable Nouns Used in a Universal / General Sense: "Tigers are endangered"; "Architecture reflects civilization."
• Academic Disciplines & Languages: biology, mathematics, Khmer, English.
• Meals & Sports: eat breakfast, have dinner, play badminton, play chess.
• Institutional Nouns with Purpose: school, hospital, prison, university, church, bed.
  - "He is in hospital" (as a patient receiving medical care).
  - "He went to the hospital" (as a visitor visiting the physical building).`,
    explanationKhmer: `តួនាទី និងក្បួនវេយ្យាករណ៍លម្អិតនៃ Article (a, an, the) ក្នុងភាសាអង់គ្លេស៖
Article គឺជាពាក្យកំណត់ដែលឈរនៅពីមុខនាម ដើម្បីបញ្ជាក់ថានាមនោះជាអ្វីដែលទូទៅ ឬជាអ្វីដែលជាក់លាក់ដែលអ្នកស្តាប់ស្គាល់រួចហើយ។ ភាសាអង់គ្លេសមាន Article ចំនួន ៣ ប្រភេទ៖ Indefinite (a/an), Definite (the), និង Zero Article (មិនប្រើ Article)។

១. អសាធារណនាមកំណត់ (INDEFINITE ARTICLES: A / AN)៖
• ប្រើសម្រាប់តែ នាមរាប់បានឯកវចនៈ ប៉ុណ្ណោះ នៅពេលនិយាយលើកដំបូង ឬជានាមទូទៅមិនទាន់ស្គាល់អត្តសញ្ញាណ។
• ក្បួនសូរស័ព្ទសំឡេង (Sound Rule)៖
  - ប្រើ "A" នៅពីមុខ សូរព្យញ្ជនៈ៖ a doctor, a book, a university (/juː/ ជាសូរព្យញ្ជនៈ), a European country (/j/), a one-day trip (/w/)។
  - ប្រើ "AN" នៅពីមុខ សូរស្រៈ (a, e, i, o, u)៖ an apple, an engineer, an honest man (អក្សរ 'h' មិនបញ្ចេញសំឡេង សូរស័ព្ទផ្ដើមដោយស្រៈ /ɒ/), an hour (silent 'h'), an MBA (/em/)។
  - ចំណាំ៖ ការជ្រើសរើស A ឬ AN គឺផ្អែកលើ សំឡេងអាន មិនមែនផ្អែកលើតួអក្សរសរសេរឡើយ!

២. សាធារណនាមកំណត់ (DEFINITE ARTICLE: THE)៖
• ប្រើបានទាំងនាមឯកវចនៈ ពហុវចនៈ និងនាមរាប់មិនបាន នៅពេលដែលអ្នកនិយាយ និងអ្នកស្តាប់ដឹងច្បាស់ថាជារបស់មួយណា៖
  - និយាយជាលើកទីពីរ៖ "I bought a laptop. The laptop is very fast."
  - របស់ដែលមានតែមួយគត់លើលោក៖ the sun, the moon, the earth, the internet
  - គុណនាមកម្រិតខ្ពស់បំផុត និងលេខរៀង៖ the best, the most expensive, the first step
  - ឧបករណ៍តន្ត្រី៖ play the piano, play the guitar
  - នាមដែលមានឃ្លាកំណត់ជាក់លាក់៖ "The water in this bottle" (ទឹកជាក់លាក់ក្នុងដបនេះ)។

៣. ក្បួនភូមិសាស្ត្រជាមួយ THE៖
• ត្រូវប្រើ THE ជាមួយ៖ មហាសមុទ្រ សមុទ្រ និងទន្លេ (the Mekong River, the Pacific Ocean), ជួរភ្នំពហុវចនៈ (the Himalayas), កោះប្រជុំ (the Philippines), វាលខ្សាច់ (the Sahara), ប្រទេសដែលមានពាក្យ States, Kingdom, Republic ឬពហុវចនៈ (the United States, the United Kingdom, the Netherlands)។
• ហាមប្រើ THE ជាមួយ៖ ភ្នំទោល (Mount Everest), កោះទោល (Bali), បឹង (Lake Victoria), ទ្វីប (Asia), ឈ្មោះប្រទេសទូទៅ (Cambodia, Japan, France), ទីក្រុង និងផ្លូវ (Phnom Penh, Oxford Street)។

៤. កន្លែងដែលមិនត្រូវប្រើ ARTICLE (ZERO ARTICLE)៖
• និយាយជារួមពីនាមពហុវចនៈ ឬនាមរាប់មិនបាន៖ "Dogs are loyal"; "Education is key"
• មុខវិជ្ជា និងភាសា៖ study chemistry, speak English
• កីឡា និងអាហារ៖ play football, have lunch
• ស្ថាប័នដែលប្រើតាមគោលដៅដើម៖ in hospital (ជាអ្នកជំងឺ), at school (ជាសិស្សរៀន)។`,
    examples: [
      'She earned **an MBA** from **a** prestigious international university.',
      'It was **an honest** mistake made under extreme operational pressure.',
      '**The sun** rose majestically over **the** ancient stone towers of Angkor Wat.',
      'We had **a** productive meeting yesterday; **the** decisions made will guide our strategy.',
      'Mount Everest is **the** highest mountain peak on Earth.',
      'He plays **the** violin beautifully, but he also enjoys playing **soccer**.',
      '**Water** is essential for life, but **the water** in this well must be filtered.',
      'She waited for **an hour** at the station for **the** express train to arrive.',
      'They traveled across **the United Kingdom** before attending a summit in **France**.',
      '**Children** need love, guidance, and encouragement to thrive.',
      'He was awarded **the** first prize for his groundbreaking scientific essay.'
    ]
  },

  // ==========================================
  // 12. DEMONSTRATIVES (THIS, THAT, THESE, THOSE)
  // ==========================================
  'Demonstratives (this, that, these, those)': {
    title: 'Demonstratives (this, that, these, those)',
    explanation: `WHAT ARE DEMONSTRATIVES?
Demonstratives are spatial and conceptual pointing words. They situate a referent in relation to the speaker across three interconnected dimensions: physical space, chronological time, and psychological stance. A demonstrative functions in two distinct grammatical capacities:
• Demonstrative Determiners: Precede and modify a noun directly ("This hypothesis is verified").
• Demonstrative Pronouns: Stand autonomously in place of a noun phrase ("This is verified").

THE 2x2 DISTANCE AND QUANTITY MATRIX:

1. NEAR (PROXIMAL):
   • THIS (Singular):
     - Physical Proximity: Objects held in hand or immediately reachable ("This microscope on my table").
     - Current / Imminent Time: Contemporary moments, today, or current seasons ("This morning", "This month").
     - Conversational Introduction: Introducing a fresh concept or topic ("Listen to this proposal").
   • THESE (Plural):
     - Physical Proximity: Multiple entities nearby ("These historical manuscripts in the cabinet").
     - Contemporary Era: "These days, artificial intelligence transforms medical diagnostics."

2. FAR (DISTAL):
   • THAT (Singular):
     - Physical Distance: Entities visible or located away from the speaker ("That antenna tower on the ridge").
     - Past or Future Time: Completed events or distant occasions ("That symposium we attended last winter").
     - Previous Mention: Referring back to something just stated ("That was an insightful observation").
   • THOSE (Plural):
     - Physical Distance: Multiple entities situated at a distance ("Those constellations visible in the clear sky").
     - Past Eras: "Those years spent conducting field research were deeply transformative."

PSYCHOLOGICAL, PRAGMATIC & FORMAL ROLES:
• Psychological Closeness vs. Detachment:
  - 'This / These' signal emotional warmth, endorsement, and engagement ("I fully endorse this perspective").
  - 'That / Those' signal emotional distance, critique, or alienation ("I strongly disagree with that policy of theirs").
• Conversational & Telecommunication Etiquette:
  - Answering the phone: "Hello, this is Dr. Aris" (NEVER "I am Dr. Aris").
  - Asking who is on the line: "Who is that speaking?" (NEVER "Who are you?").
  - In-person introductions: "Sophea, this is my colleague, Jonathan."
• Formal Academic Substitution (That of / Those of):
  - In sophisticated academic comparisons, 'that' and 'those' prevent tedious noun repetition:
    "The energy output of solar panels exceeds that of older fossil generators" ('that' = 'the energy output').
    "The climatic conditions of Cambodia resemble those of southern Thailand" ('those' = 'the climatic conditions').

NUMBER AGREEMENT RULE:
Always maintain strict grammatical harmony between the demonstrative and the accompanying noun. Say "this kind of error" or "these kinds of errors" (NEVER "these kind of error").`,
    explanationKhmer: `តួនាទី និងការប្រើប្រាស់ស៊ីជម្រៅនៃ Demonstratives (this, that, these, those)៖
Demonstratives គឺជាពាក្យចង្អុលបង្ហាញដែលបញ្ជាក់ពី ចម្ងាយរូបវន្ត (Physical distance), ចម្ងាយពេលវេលា (Time), ឬចម្ងាយផ្លូវចិត្ត (Psychological distance) រវាងអ្នកនិយាយ និងរបស់ដែលកំពុងលើកឡើង។

តារាងបែងចែកតាមចំនួន និងចម្ងាយ៖

១. របស់នៅជិត (PROXIMAL)៖
   • THIS (នេះ - ឯកវចនៈ)៖
     - រូបវន្តនៅជិតដៃ៖ "This book in my hand" (សៀវភៅក្នុងដៃខ្ញុំនេះ)
     - ពេលវេលាបច្ចុប្បន្ន/ពេលនេះ៖ "This morning", "This week"
     - ណែនាំគំនិតថ្មី៖ "Listen to this story."
   • THESE (ទាំងនេះ - ពហុវចនៈ)៖
     - របស់ច្រើននៅជិតដៃ៖ "These documents need signatures."
     - សម័យកាលបច្ចុប្បន្ន៖ "These days, technology changes rapidly."

២. របស់នៅឆ្ងាយ (DISTAL)៖
   • THAT (នោះ - ឯកវចនៈ)៖
     - របស់មួយនៅឆ្ងាយពីខ្លួន៖ "Look at that bird on the tree."
     - ពេលវេលាក្នុងអតីតកាល៖ "That day was unforgettable."
     - សំដៅលើសម្តីដែលទើបតែនិយាយរួច៖ "That was a great suggestion."
   • THOSE (ទាំងនោះ - ពហុវចនៈ)៖
     - របស់ច្រើននៅឆ្ងាយពីខ្លួន៖ "Those stars are brilliant."
     - ឆ្នាំឬពេលវេលាពីអតីតកាល៖ "Those years during college."

ការប្រើប្រាស់ក្នុងការសន្ទនា និងភាសាផ្លូវការ៖
• លើកទូរស័ព្ទណែនាំខ្លួន៖ ត្រូវនិយាយថា "Hello, this is Dara" (ហាមនិយាយថា "I am Dara" ឡើយ)។
• ពេលសួរអ្នកម្ខាងទៀតក្នុងទូរស័ព្ទ៖ និយាយថា "Who is that?" (មិនមែន "Who are you?" ទេ)។
• ពេលណែនាំមិត្តភក្តិ៖ និយាយថា "Sophea, this is my brother, Rithy."
• ក្នុងសំណេរស្រាវជ្រាវ (That of / Those of) ដើម្បីចៀសវាងការសរសេរពាក្យដដែលៗ៖
  - "The population of Tokyo is larger than that of Paris." ('that' ជំនួសឱ្យ 'the population')
  - "The cars made in Germany are faster than those made locally." ('those' ជំនួសឱ្យ 'the cars')។`,
    examples: [
      '**This** quarterly financial report in my hands outlines our corporate growth.',
      'Could you please pass me **that** wrench hanging on the far wall?',
      '**These** digital tablets on the table are reserved for the design team.',
      '**Those** ancient temples visible across the horizon were constructed in the twelfth century.',
      'Hello, **this is** Dr. Evans returning your call regarding the lab results.',
      '**This kind** of innovative thinking is exactly what our organization encourages.',
      'We must resolve **these** logistical bottlenecks before expanding operations.',
      '**That** presentation you delivered yesterday was both articulate and persuasive.',
      'Remember **those** peaceful evenings we spent by the serene lakeside?',
      '**This** has been one of the most rewarding collaborative experiences of my career.',
      'Why did you select **those** specific variables for your experimental test?'
    ]
  },

  // ==========================================
  // 13. SINGULAR AND PLURAL NOUNS
  // ==========================================
  'Singular and Plural Nouns': {
    title: 'Singular and Plural Nouns',
    explanation: `UNDERSTANDING NOUN NUMBER:
Grammatical number dictates whether an English noun designates a single entity (singular) or multiple entities (plural). While the majority of English nouns follow predictable inflectional patterns, comprehensive mastery requires understanding phonological sibilant adjustments, Germanic vowel mutations, historical foreign borrowings (Latin and Greek), invariant plurals, and pluralia tantum nouns.

1. REGULAR PLURALIZATION PATTERNS:
• Standard Suffixation (+s):
  - Most nouns simply append -s (laptop -> laptops, molecule -> molecules, architect -> architects).
• Sibilant Stem Endings (-s, -ss, -sh, -ch, -x, -z):
  - To prevent unpronounceable consonant clusters, append -es, producing an extra /ɪz/ syllable:
    bus -> buses, lens -> lenses, fortress -> fortresses, flash -> flashes, branch -> branches, matrix -> matrices/matrixes, box -> boxes, buzz -> buzzes.
• Consonant + Y vs. Vowel + Y:
  - Consonant + 'y': Substitute 'y' with -ies (city -> cities, company -> companies, factory -> factories, hypothesis -> hypotheses).
  - Vowel + 'y': Retain 'y' and simply append -s (survey -> surveys, day -> days, attorney -> attorneys, key -> keys).
• Stems Ending in -O:
  - Native / Naturalized Consonant + O: Append -es (potato -> potatoes, tomato -> tomatoes, hero -> heroes, echo -> echoes).
  - Loanwords, Musical Terms, and Truncations: Append only -s (photo -> photos, piano -> pianos, cello -> cellos, auto -> autos).
  - Dual Accepted Spellings: volcanos/volcanoes, tornados/tornadoes, mottos/mottoes.
• Stems Ending in -F or -FE:
  - The 13 Classic Voiced Plural Nouns: Change -f/-fe to -ves (calf -> calves, elf -> elves, half -> halves, knife -> knives, leaf -> leaves, life -> lives, loaf -> loaves, self -> selves, sheaf -> sheaves, shelf -> shelves, thief -> thieves, wife -> wives, wolf -> wolves).
  - Invariant Regular -f Nouns: Retain 'f' and add -s (chief -> chiefs, cliff -> cliffs, roof -> roofs, belief -> beliefs, chef -> chefs).

2. IRREGULAR & HISTORICAL GERMANIC PLURALS:
• Internal Vowel Mutation (Umlaut Plurals):
  - man -> men, woman -> women (pronounced /ˈwɪm.ɪn/), foot -> feet, tooth -> teeth, goose -> geese, mouse -> mice, louse -> lice.
• Archaic Germanic -en Suffix:
  - child -> children, ox -> oxen, brother -> brethren (specialized archaic/religious usage).
• Invariant / Zero Plurals (Identical Singular and Plural Forms):
  - Fauna: sheep -> sheep, deer -> deer, fish -> fish (use 'fishes' only when referring to multiple biological species), trout -> trout, salmon -> salmon.
  - Technology & Industry: aircraft -> aircraft, spacecraft -> spacecraft.
  - Collective / Cross-Category: series -> series, species -> species, headquarters -> headquarters, crossroads -> crossroads.

3. CLASSICAL LATIN & GREEK LOANWORD PLURALS:
In academic, scientific, and medical registers, foreign plurals are standard:
• Latin -us -> -i: cactus -> cacti, stimulus -> stimuli, fungus -> fungi, alumnus -> alumni, bacillus -> bacilli.
• Latin -a -> -ae: formula -> formulae (or formulas), larva -> larvae, antenna -> antennae (insect feelers) vs. antennas (electronic receivers).
• Latin -um -> -a: datum -> data, curriculum -> curricula, bacterium -> bacteria, medium -> media, symposium -> symposia.
• Greek -is -> -es: crisis -> crises, thesis -> theses, analysis -> analyses, hypothesis -> hypotheses, basis -> bases, diagnosis -> diagnoses.
• Greek -on -> -a: criterion -> criteria, phenomenon -> phenomena.

4. PLURALIA TANTUM & SPECIAL NOUN CATEGORIES:
• Pluralia Tantum (Nouns Existing ONLY in the Plural):
  - Instruments & Attire with two symmetrical halves: trousers, pants, jeans, scissors, binoculars, tweezers, spectacles, glasses, tongs.
  - These nouns strictly require plural verbs: "The scissors ARE on the bench." To express singular quantity, use a partitive classifier: "A pair of scissors IS on the bench."
• Plural-Looking Nouns that are Grammatically SINGULAR:
  - Academic disciplines: physics, mathematics, economics, linguistics, politics, thermodynamics ("Mathematics IS fascinating").
  - Pathologies & Activities: measles, mumps, aerobics, gymnastics, news ("The news WAS encouraging").
• Pluralizing Compound Nouns:
  - Pluralize the primary syntactic head noun: mothers-in-law, passers-by, editors-in-chief, runners-up, attorneys general.
  - When no explicit noun is present, pluralize the final element: hand-me-downs, forget-me-nots.`,
    explanationKhmer: `ក្បួនវេយ្យាករណ៍ស៊ីជម្រៅនៃនាមឯកវចនៈ និងពហុវចនៈ (Singular & Plural Nouns)៖
នាមឯកវចនៈ (Singular) សំដៅលើមនុស្ស សត្វ ឬវត្ថុតែមួយ ចំណែកនាមពហុវចនៈ (Plural) សំដៅលើចំនួនចាប់ពីពីរឡើងទៅ។ ការបំប្លែងនាមទៅជាពហុវចនៈមានវិធានច្បាស់លាស់ទាំងទម្រង់ប្រក្រតី (Regular) និងមិនប្រក្រតី (Irregular)។

១. វិធានបំប្លែងជានាមពហុវចនៈទូទៅ (REGULAR PLURALS)៖
• បន្ថែម -s លើនាមទូទៅ៖ laptop -> laptops, engineer -> engineers
• បញ្ចប់ដោយសូរស៊ឹស (-s, -ss, -sh, -ch, -x, -z) ត្រូវបន្ថែម -es (បញ្ចេញសំឡេងបន្ថែម /ɪz/)៖
  bus -> buses, lens -> lenses, glass -> glasses, watch -> watches, box -> boxes
• ព្យញ្ជនៈ + Y vs. ស្រៈ + Y៖
  - ព្យញ្ជនៈ + y៖ ប្តូរ y ទៅជា -ies (city -> cities, company -> companies, factory -> factories)
  - ស្រៈ + y៖ ថែមតែ -s ធម្មតា (day -> days, key -> keys, attorney -> attorneys)
• នាមបញ្ចប់ដោយ -O៖
  - ពាក្យទូទៅ៖ ថែម -es (tomato -> tomatoes, hero -> heroes, echo -> echoes)
  - ពាក្យកម្ចី ឧបករណ៍តន្ត្រី ឬពាក្យកាត់៖ ថែមតែ -s (photo -> photos, piano -> pianos, cello -> cellos)
• នាមបញ្ចប់ដោយ -F ឬ -FE៖
  - នាមសំខាន់ៗទាំង ១៣ ត្រូវប្តូរទៅជា -ves៖ leaf -> leaves, knife -> knives, life -> lives, wife -> wives, wolf -> wolves, half -> halves, thief -> thieves, shelf -> shelves
  - នាមលើកលែងដែលថែមតែ -s៖ roof -> roofs, cliff -> cliffs, chief -> chiefs, belief -> beliefs

២. នាមពហុវចនៈមិនប្រក្រតី (IRREGULAR GERMANIC PLURALS)៖
• ប្តូរស្រៈខាងក្នុងពាក្យ (Vowel Mutation)៖
  man -> men, woman -> women (អានថា វីមីន /ˈwɪm.ɪn/), tooth -> teeth, foot -> feet, goose -> geese, mouse -> mice
• ថែមបច្ច័យបុរាណ -en៖ child -> children, ox -> oxen
• ទម្រង់ដូចគ្នាទាំងឯកវចនៈនិងពហុវចនៈ (Zero Plurals)៖
  sheep -> sheep (ចៀម), deer -> deer (ក្តាន់), fish -> fish (ត្រី), aircraft -> aircraft (យន្តហោះ), series -> series (ស៊េរី), species -> species (ប្រភេទពូជ)

៣. នាមកម្ចីពីភាសាឡាតាំង និងក្រិក (LATIN & GREEK LOANWORDS)៖
ប្រើប្រាស់យ៉ាងសំខាន់ក្នុងវិស័យវិទ្យាសាស្ត្រ និងការសិក្សាស្រាវជ្រាវ៖
• ឡាតាំង -us -> -i៖ cactus -> cacti, stimulus -> stimuli, fungus -> fungi, alumnus -> alumni
• ឡាតាំង -um -> -a៖ datum -> data, curriculum -> curricula, bacterium -> bacteria, medium -> media
• ក្រិក -is -> -es៖ crisis -> crises, thesis -> theses, analysis -> analyses, hypothesis -> hypotheses, basis -> bases
• ក្រិក -on -> -a៖ criterion -> criteria, phenomenon -> phenomena

៤. នាមពិសេសផ្សេងៗ៖
• នាមដែលមានទម្រង់ជាពហុវចនៈជានិច្ច (Pluralia Tantum)៖
  scissors (កន្ត្រៃ), trousers/pants (ខោ), glasses (វ៉ែនតា), binoculars (កែវយឹត) ត្រូវប្រើជាមួយកិរិយាសព្ទពហុវចនៈ ("The scissors ARE sharp") ឬប្រើ "A pair of scissors IS..."។
• នាមមានកន្ទុយ -s តែជាឯកវចនៈ៖
  physics, mathematics, news, economics ("Mathematics IS interesting", "The news WAS shocking")។
• នាមផ្សំ (Compound Nouns)៖ ត្រូវថែម -s លើនាមស្នូលសំខាន់៖
  mothers-in-law (ម្តាយក្មេកច្រើននាក់), passers-by (អ្នកដំណើរឆ្លងកាត់), editors-in-chief (និពន្ធនាយក)។`,
    examples: [
      'The **cities** along the coastline are investing in renewable flood defenses.',
      'Several **children** were laughing joyfully on the playground swings.',
      'All experimental **criteria** must be strictly fulfilled before trials commence.',
      'The chef sharpened his collection of professional culinary **knives**.',
      'These **crises** require decisive international leadership and cooperation.',
      'A herd of wild **deer** grazed peacefully in the meadow at dawn.',
      'He bought two pairs of noise-canceling **headphones** for the long flight.',
      'The ancient forest is home to hundreds of rare plant **species**.',
      'Both **women** were promoted to executive positions within the corporation.',
      'She organized the research **theses** into categorized digital folders.',
      'His **teeth** were examined and cleaned by the dental hygienist.'
    ]
  },

  // ==========================================
  // 14. COUNTABLE & UNCOUNTABLE NOUNS
  // ==========================================
  'Countable & Uncountable Nouns': {
    title: 'Countable & Uncountable Nouns',
    explanation: `UNDERSTANDING COUNTABILITY IN ENGLISH:
Countability is an essential grammatical categorization in English that classifies nouns based on whether they refer to discrete, separable individual units or to a continuous, undifferentiated mass, substance, or abstract state. This distinction governs syntactic agreements, article selection, and the distribution of quantifiers.

1. COUNTABLE NOUNS (DISCRETE ENTITIES):
• Nature: Represent identifiable entities that can be numbered directly (one microscope, two microscopes, three microscopes).
• Morphological Flexibility: Exhibit distinct singular and plural forms (document / documents).
• Article Distribution: Can take the indefinite articles 'a' or 'an' in the singular ("an experiment", "a protocol").
• Countable Quantifiers: Pair with: many, few, a few, several, each, every, a couple of, a number of.

2. UNCOUNTABLE NOUNS (MASS & ABSTRACT NOUNS):
• Nature: Represent homogeneous substances, conceptual qualities, or aggregate collections that cannot be divided into individual numbered entities without a container, metric, or classifier.
• THE 6 ESSENTIAL CATEGORIES OF UNCOUNTABLE NOUNS:
  1. Fluids, Liquids & Gases: water, petroleum, milk, blood, oxygen, steam, hydrogen.
  2. Solids, Minerals & Raw Materials: gold, silver, iron, timber, cotton, glass, plastic, sand.
  3. Mass Foodstuffs & Powders: rice, flour, wheat, salt, sugar, butter, bread, cheese, meat.
  4. Abstract Concepts & Qualities: knowledge, information, advice, intelligence, courage, integrity, patience, honesty, love.
  5. Collective Aggregate Categories: luggage, baggage, furniture, equipment, machinery, hardware, clothing, garbage, traffic, cash.
  6. Human Activities & Natural Phenomena: homework, research, work, weather, lightning, thunder, electricity, heat.
• Invariant Singular Agreement: Uncountable nouns NEVER take -s/-es (never write "furnitures", "advices", "informations", "researches").
• Indefinite Article Prohibition: NEVER use 'a' or 'an' directly before an uncountable noun ("an advice" is ungrammatical; use "a piece of advice").
• Predicate Verb Agreement: Always govern singular verbs ("The equipment was calibrated successfully").
• Uncountable Quantifiers: Pair with: much, little, a little, a great deal of, an amount of.

3. DUAL-CATEGORY NOUNS (THE CONTEXTUAL MEANING SHIFT):
Many prominent English nouns can function as both countable and uncountable, with a significant shift in meaning:
• Paper:
  - Uncountable (material): "Books are printed on recycled paper."
  - Countable (document / essay): "She published a groundbreaking research paper in Nature."
• Coffee / Tea:
  - Uncountable (beverage liquid): "Coffee is cultivated in tropical highlands."
  - Countable (servings): "We ordered two coffees and a green tea."
• Hair:
  - Uncountable (head of hair): "She has dark, curly hair."
  - Countable (individual strands): "There were two white hairs on his jacket."
• Experience:
  - Uncountable (accumulated wisdom/skill): "She has ten years of clinical experience."
  - Countable (specific life events): "Climbing Mount Aconcagua was an unforgettable experience."
• Room:
  - Uncountable (unoccupied spatial volume): "Is there enough room in the trunk for the luggage?"
  - Countable (partitioned chamber): "The laboratory has twelve containment rooms."
• Light:
  - Uncountable (radiant energy): "Sunlight streamed into the atrium."
  - Countable (lamps/fixtures): "Turn off the overhead lights when exiting."

4. THE ARCHITECTURE OF PARTITIVES (COUNTING THE UNCOUNTABLE):
To measure, quantify, or individuate uncountable entities, attach a specific partitive classifier:
• a piece of advice / information / furniture / luggage / research / equipment
• a grain of rice / sand / truth
• a bar of chocolate / soap
• a loaf of bread / two slices of bread
• a speck of dust / a ray of sunlight
• a clap of thunder / a flash of lightning
• a sheet / slip of paper
• a drop of water / a bottle of water / a glass of milk

5. QUANTIFIER COMPARISON MATRIX:
• For Countable Plurals Only: many books, few friends (scarce), a few friends (some), several ideas.
• For Uncountable Nouns Only: much effort, little patience (scarce), a little patience (some), a great deal of work.
• Shared by Both Classes: some, any, a lot of, plenty of, hardly any, enough.`,
    explanationKhmer: `តួនាទី និងការបែងចែកនាមរាប់បាន និងនាមរាប់មិនបាន (Countable & Uncountable Nouns)៖
ការបែងចែកភាពរាប់បាន គឺជាក្បួនវេយ្យាករណ៍គ្រឹះក្នុងភាសាអង់គ្លេស ដែលកំណត់ថាតើនាមនោះជារបស់ទោលដែលអាចរាប់ជាចំនួនបាន ឬជាសារធាតុ វត្ថុធាតុ និងគំនិតអរូបីដែលមិនអាចរាប់ជាគ្រាប់/កង់បាន។

១. នាមរាប់បាន (COUNTABLE NOUNS)៖
• ជារបស់ ឬមនុស្សដែលអាចរាប់ជាចំនួន ១, ២, ៣... បានដោយផ្ទាល់ (one laptop, two laptops)។
• មានទាំងទម្រង់ឯកវចនៈ និងពហុវចនៈ (document -> documents)។
• អាចប្រើជាមួយ a / an ពេលនៅលីវ (a computer, an engineer)។
• ប្រើជាមួយពាក្យបរិមាណ៖ many, few, a few, several, each, every, a number of។

២. នាមរាប់មិនបាន (UNCOUNTABLE NOUNS)៖
• ជារបស់រាវ ឧស្ម័ន ម្សៅ វត្ថុធាតុ គំនិតអរូបី ឬប្រភេទប្រមូលផ្តុំ ដែលមិនអាចបំបែករាប់ជាឯកតាដាច់ដោយឡែកបានដោយគ្មានរង្វាស់។
• ប្រភេទទាំង ៦ នៃនាមរាប់មិនបាន៖
  ១. វត្ថុរាវ និងឧស្ម័ន៖ water, petroleum, milk, oxygen, blood, coffee
  ២. វត្ថុធាតុរឹង និងរ៉ែ៖ gold, silver, iron, wood, sand, glass, plastic
  ៣. អាហារម៉ដ្ឋ ឬសារធាតុម្សៅ៖ rice, flour, sugar, salt, butter, bread, cheese, meat
  ៤. គំនិតអរូបី និងគុណសម្បត្តិ៖ information, advice, knowledge, courage, patience, honesty, love
  ៥. នាមប្រមូលផ្តុំជារួម៖ furniture, luggage, equipment, machinery, clothing, traffic, cash
  ៦. សកម្មភាព និងបាតុភូតធម្មជាតិ៖ homework, research, work, weather, lightning, electricity
• ក្បួនតឹងរ៉ឹង៖ ហាមបន្ថែម -s/-es លើនាមរាប់មិនបានជាដាច់ខាត (គ្មាន informations, furnitures, advices ឡើយ)!
• ហាមប្រើ a / an នៅពីមុខដោយផ្ទាល់ (កុំនិយាយថា "an advice" ត្រូវនិយាយថា "a piece of advice")។
• ប្រើជាមួយកិរិយាសព្ទឯកវចនៈជានិច្ច ("The equipment is working perfectly")។
• ប្រើជាមួយពាក្យបរិមាណ៖ much, little, a little, a great deal of, an amount of។

៣. នាមដែលអាចប្រើបានទាំងរាប់បាន និងរាប់មិនបាន (អាស្រ័យលើបរិបទ)៖
• Paper ៖ ក្រដាសជាវត្ថុធាតុ (Uncountable) vs. សារណាស្រាវជ្រាវ ឬកាសែត (Countable: a research paper)
• Coffee ៖ ទឹកកាហ្វេ (Uncountable) vs. កាហ្វេមួយកែវ (Countable: two coffees)
• Hair ៖ សក់ក្បាលជារួម (Uncountable) vs. សក់មួយសរសៃពីរ (Countable: two white hairs)
• Experience ៖ បទពិសោធជីវិត (Uncountable) vs. ព្រឹត្តិការណ៍ជាក់លាក់មួយ (Countable: an unforgettable experience)
• Room ៖ ចន្លោះទំនេរ (Uncountable: Is there room?) vs. បន្ទប់ (Countable: a hotel room)
• Light ៖ ពន្លឺ (Uncountable) vs. អំពូលភ្លើង (Countable: turn off the lights)

៤. ឃ្លារង្វាស់សម្រាប់រាប់នាមរាប់មិនបាន (PARTITIVES)៖
• a piece of advice / information / furniture / luggage / research (ដំបូន្មានមួយ / គ្រឿងសង្ហារិមមួយដុំ)
• a grain of rice / sand (អង្ករមួយគ្រាប់ / ខ្សាច់មួយគ្រាប់)
• a loaf of bread / two slices of bread (នំប៉័ងមួយដុំ / នំប៉័ងពីរបន្ទះ)
• a bottle of water / a glass of milk (ទឹកមួយដប / ទឹកដោះគោមួយកែវ)
• a bar of chocolate / soap (សូកូឡាមួយដុំ / សាប៊ូមួយដុំ)
• a flash of lightning / a clap of thunder (ផ្លេកបន្ទោរមួយឆ្វេច / ផ្គរលាន់មួយគ្រហឹម)។`,
    examples: [
      'She provided valuable **information** that resolved our operational dilemma.',
      'How **many laptops** does the computer science department require this term?',
      'There is **much work** remaining before the prototype is ready for testing.',
      'He offered me three excellent **pieces of advice** regarding financial planning.',
      'We have **a little time** left to polish the slides before the presentation.',
      'Only **a few participants** were able to complete the advanced coding challenge.',
      'The room was decorated with elegant, handcrafted wooden **furniture**.',
      'Please pour me a fresh **glass of water** from the dispenser.',
      'Her deep **patience** and understanding made her an exceptional mentor.',
      'Heavy **traffic** on the central avenue delayed our arrival at the museum.',
      'I packed only two small **pieces of luggage** for the weekend excursion.'
    ]
  },

  // ==========================================
  // 15. COMPARATIVE & SUPERLATIVE ADJECTIVES
  // ==========================================
  'Comparative Adjectives': {
    title: 'Comparative and Superlative Adjectives',
    explanation: `WHAT ARE COMPARISONS IN ENGLISH?
Grammatical comparison allows speakers and writers to measure relative gradations, ranks, and intensities of qualities between nominal entities. English organizes adjectival gradience into three formal degrees:
1. Positive Degree: The foundational baseline adjective denoting a quality without direct comparison ("The algorithm is fast").
2. Comparative Degree: Compares exactly TWO entities, groups, or conditions ("Algorithm A is faster than Algorithm B").
3. Superlative Degree: Identifies the supreme or extreme limit of a quality among THREE or more entities ("Algorithm A is the fastest of all tested algorithms").

THE SYSTEMATIC RULES OF FORMATION:

1. ONE-SYLLABLE ADJECTIVES:
• Standard Inflection:
  - Comparative: Append -er + 'than' (clean -> cleaner than, bold -> bolder than, cold -> colder than).
  - Superlative: Prepend 'the' and append -est (the cleanest, the boldest, the coldest).
• Consonant-Vowel-Consonant (CVC Doubling Rule):
  - When a single-syllable adjective terminates in a single vowel flanked by a single consonant, double the final consonant before suffixation:
    big -> bigger -> the biggest
    hot -> hotter -> the hottest
    slim -> slimmer -> the slimmest
    wet -> wetter -> the wettest
• Silent -E Endings:
  - Simply append -r / -st (simple -> simpler -> the simplest, wide -> wider -> the widest).

2. TWO-SYLLABLE ADJECTIVES ENDING IN -Y:
• Replace 'y' with 'i' and append -er / -est:
  happy -> happier than -> the happiest
  easy -> easier than -> the easiest
  heavy -> heavier than -> the heaviest
  reliable -> (more than 2 syllables: use more/most)
• Two-Syllable Adjectives with Suffix Flexibility:
  - Certain two-syllable adjectives accept either inflectional -er/-est or periphrastic more/most:
    narrow -> narrower / more narrow
    simple -> simpler / more simple
    quiet -> quieter / more quiet
    clever -> cleverer / more clever

3. MULTI-SYLLABLE ADJECTIVES (TWO OR MORE SYLLABLES):
• Comparative: Use 'more' + base adjective + 'than' (more innovative than, more resilient than, more sophisticated than).
• Superlative: Use 'the most' + base adjective (the most innovative, the most resilient, the most sophisticated).
• Inferior Comparison: Use 'less' + base adjective + 'than' / 'the least' (less demanding than, the least hazardous).
• Critical Double-Marking Pitfall: NEVER combine periphrastic and inflectional markers (saying "more smarter" or "most beautifulest" is an egregious grammatical error).

4. IRREGULAR COMPARATIVE MORPHOLOGY:
These historic root-changing forms must be memorized:
• Good / Well -> Better -> The Best
• Bad / Ill -> Worse -> The Worst (NEVER "more bad" or "baddest")
• Far -> Farther (physical geographic distance) / Further (figurative degree, extent, or additional time) -> The Farthest / Furthest
• Little (quantity) -> Less -> The Least
• Much / Many -> More -> The Most
• Old -> Older / The Oldest (general age & objects) vs. Elder / The Eldest (restricted to human family relationships: "my elder sister").

5. LATIN COMPARATIVES (REQUIRING 'TO' INSTEAD OF 'THAN'):
Inherited directly from Latin, these comparative adjectives are inherently comparative and MANDATE the preposition 'to' rather than the conjunction 'than':
• superior to (NOT superior than)
• inferior to (NOT inferior than)
• senior to (NOT senior than)
• junior to (NOT junior than)
• prior to (NOT prior than)
• preferable to (NOT preferable than)

6. ADVANCED COMPARATIVE CONSTRUCTIONS:
• Proportional / Parallel Comparatives (The... The...):
  - Expresses simultaneous co-variance: "The higher the temperature rises, the faster the reaction proceeds."
• Progressive / Gradual Comparatives:
  - Indicates continuous escalation over time: "Renewable energy technologies are becoming cheaper and cheaper."
• Equivalence and Non-Equivalence (As... As):
  - Positive Equality: "The prototype is as durable as forged titanium."
  - Negative Inequality: "The secondary trial was not as conclusive as the initial pilot."
• Comparative Intensifiers and Mitigators:
  - To quantify the magnitude of difference: much faster, far more expensive, significantly better, slightly taller, a bit heavier.`,
    explanationKhmer: `តួនាទី និងក្បួនវេយ្យាករណ៍ស៊ីជម្រៅនៃការប្រៀបធៀបគុណនាម (Comparatives & Superlatives)៖
ការប្រៀបធៀបក្នុងភាសាអង់គ្លេស ប្រើសម្រាប់វាស់វែងកម្រិត និងគុណសម្បត្តិរវាងមនុស្ស សត្វ វត្ថុ ឬស្ថានភាព។ វាចែកចេញជា ៣ កម្រិតផ្លូវការ៖
១. កម្រិតធម្មតា (Positive Degree)៖ បង្ហាញពីលក្ខណៈដោយមិនប្រៀបធៀប ("The car is fast")។
២. កម្រិតជាង (Comparative Degree)៖ ប្រៀបធៀបរវាងរបស់ ពីរ ("Car A is faster than Car B")។
៣. កម្រិតបំផុត (Superlative Degree)៖ បង្ហាញពីភាពខ្ពស់បំផុតក្នុងចំណោមរបស់ ចាប់ពីបីឡើងទៅ ("Car A is the fastest of all")។

វិធាននៃការបំប្លែងគុណនាមតាមព្យាង្គ៖

១. គុណនាម ១ ព្យាង្គ (ONE-SYLLABLE ADJECTIVES)៖
• ទូទៅ៖ ថែម -er than សម្រាប់កម្រិតជាង និងថែម the -est សម្រាប់កម្រិតបំផុត (cold -> colder than -> the coldest)។
• ក្បួន CVC (ព្យញ្ជនៈ-ស្រៈ-ព្យញ្ជនៈ)៖ ត្រូវត្រួតព្យញ្ជនៈចុងមួយទៀត មុននឹងថែម -er/-est៖
  big -> bigger than -> the biggest
  hot -> hotter than -> the hottest
  slim -> slimmer than -> the slimmest
• បញ្ចប់ដោយ -e ស្រាប់៖ ថែមតែ -r / -st (simple -> simpler -> the simplest)។

២. គុណនាម ២ ព្យាង្គបញ្ចប់ដោយ -Y៖
• ប្តូរ y ទៅជា -i ហើយថែម -er than / the -iest៖
  easy -> easier than -> the easiest
  heavy -> heavier than -> the heaviest
  happy -> happier than -> the happiest

៣. គុណនាមចាប់ពី ២ ព្យាង្គឡើងទៅ (MULTI-SYLLABLE ADJECTIVES)៖
• កម្រិតជាង៖ ប្រើ more + Adjective + than (more expensive than, more beautiful than)
• កម្រិតបំផុត៖ ប្រើ the most + Adjective (the most expensive, the most beautiful)
• កម្រិតតិចជាង៖ ប្រើ less + Adjective + than / the least + Adjective
• ការហាមឃាត់៖ ហាមប្រើ "more" ត្រួតជាមួយ "-er" ដាច់ខាត (កុំនិយាយ "more taller" ត្រូវនិយាយថា "taller")។

៤. គុណនាមមិនប្រក្រតី (IRREGULAR COMPARATIVES)៖
• good -> better than -> the best (ល្អ -> ល្អជាង -> ល្អបំផុត)
• bad -> worse than -> the worst (អាក្រក់ -> អាក្រក់ជាង -> អាក្រក់បំផុត)
• far -> farther than (ចម្ងាយរូបវន្ត) / further (កម្រិត ឬព័ត៌មានបន្ថែម) -> the farthest / furthest
• little -> less than -> the least (តិច -> តិចជាង -> តិចបំផុត)
• many / much -> more than -> the most (ច្រើន -> ច្រើនជាង -> ច្រើនបំផុត)
• old -> older/oldest (ទូទៅ) vs. elder/eldest (សម្រាប់បងប្អូនសមាជិកគ្រួសារ)។

៥. គុណនាមកម្ចីពីឡាតាំង (LATIN COMPARATIVES)៖
គុណនាមទាំងនេះ ត្រូវតែប្រើជាមួយធ្នាក់ "TO" ហាមប្រើជាមួយ "THAN" ដាច់ខាត៖
• superior to (ល្អប្រសើរជាង)
• inferior to (អន់ជាង)
• senior to (រៀមច្បងជាង / តំណែងខ្ពស់ជាង)
• junior to (ក្មេងជាង / តំណែងទាបជាង)
• prior to (មុនពេល)

៦. ទម្រង់ប្រៀបធៀបកម្រិតខ្ពស់៖
• ទម្រង់ The... The... (កាន់តែ... កាន់តែ...)៖ "The more you read, the smarter you become."
• ទម្រង់កាន់តែកើនឡើងជាលំដាប់៖ "It is getting hotter and hotter."
• ទម្រង់ស្មើគ្នា៖ as + Adjective + as ("as strong as titanium") / មិនស្មើ៖ not as... as។
• ពាក្យបញ្ជាក់ទំហំខុសគ្នា៖ much faster (លឿនជាងឆ្ងាយ), slightly taller (ខ្ពស់ជាងបន្តិច)។`,
    examples: [
      'This new fiber-optic network is considerably **faster than** the older infrastructure.',
      'She is widely recognized as **the most influential** environmental scientist of her generation.',
      'His second research proposal was **much better than** his preliminary draft.',
      'Today\'s humidity is **worse than** yesterday\'s, making outdoor labor challenging.',
      'The modern electric vehicle is **as quiet as** a whisper on the highway.',
      'Mount Everest is **the highest** mountain peak above sea level on our planet.',
      '**The more** consistently you practice conversational English, **the more** fluent you will become.',
      'Living in a tranquil rural community is often **less stressful than** dwelling in a metropolis.',
      'That was undeniably **the most challenging** examination I have ever undertaken.',
      'This laptop battery lasts **longer than** any previous model we have tested.',
      'Prevention is always **better than** cure when managing long-term health.'
    ]
  },

  // ==========================================
  // 16. MODAL VERBS: CAN, COULD, MUST, SHOULD
  // ==========================================
  'Can/Can\'t': {
    title: 'Modal Verbs: Can, Could, Must, Should',
    explanation: `WHAT ARE MODAL VERBS?
Modal auxiliary verbs are specialized helping verbs that calibrate the communicative modality of a proposition. Rather than denoting pure physical actions themselves, they modulate the main verb to express capacity, permission, obligation, advice, deduction, probability, or prohibition.

THE 4 UNIVERSAL SYNTACTIC LAWS OF MODAL VERBS:
1. Complete Absence of Inflection: Modals possess no third-person singular -s, no past -ed, and no continuous -ing (say "She can conduct research," NEVER "She cans").
2. Mandatory Bare Infinitive Complementation: Modals are followed directly by the base infinitive WITHOUT 'to' ("They must submit the dossier," NOT "They must to submit").
3. Direct Negative Cliticization: Negatives are created by placing 'not' directly after the modal without auxiliary 'do' (cannot/can't, could not/couldn't, should not/shouldn't, must not/mustn't).
4. Direct Interrogative Inversion: Questions are formed via direct subject-auxiliary inversion ("Can you verify the algorithm?", NOT "Do you can verify?").

SYSTEMATIC BREAKDOWN OF THE CORE MODALS:

1. CAN & CAN'T:
• Innate or Acquired Present Ability:
  - "Dr. Sovan can decipher ancient Sanskrit inscriptions."
• Informal or Conversational Permission:
  - "Can we utilize the spectrophotometer this afternoon?"
• Theoretical General Possibility:
  - "Extreme cold weather can compromise lithium-ion battery performance."
• Negative Logical Deduction (High Certainty of Impossibility):
  - "That figure cannot be correct; our previous audit showed zero deficit."

2. COULD & COULDN'T:
• General Past Ability:
  - "In her youth, she could solve complex multivariate equations mentally."
  - Critical Nuance: 'Could' denotes general ongoing past ability. To express successful completion of a specific, challenging one-time action in the past, English requires 'was/were able to' or 'managed to' ("Although the fire was fierce, all scientists were able to escape safely," NOT "could escape").
• Polite Requests & Gentle Inquiries:
  - "Could you please clarify the methodology detailed in chapter three?" (Far more polite and diplomatically deferential than 'can').
• Present / Future Hypothetical Possibility:
  - "We could initiate the clinical pilot in June if budget approval arrives."

3. SHOULD & SHOULDN'T (ADVISABILITY & EXPECTATION):
• Normative Advice, Recommendation & Best Practice:
  - "Engineers should double-check tensile stress calculations before casting concrete."
• High Logical Expectation / Probable Outcome:
  - "The consignment was dispatched yesterday; it should arrive by noon."
• Retrospective Regret & Past Criticism (Should Have + Past Participle V3):
  - "We should have backed up the primary database prior to the system migration."

4. MUST & MUSTN'T VS. HAVE TO & DON'T HAVE TO:
• MUST:
  - Subjective / Internal Obligation: The speaker's personal moral conviction, direct authority, or urgency: "I must master data analysis to advance my career."
  - High Logical Deduction (Positive Certainty): When evidence leaves no reasonable doubt: "The pavement is soaking wet; it must have rained heavily."
• MUST NOT / MUSTN'T (ABSOLUTE PROHIBITION):
  - Expresses that an action is strictly forbidden, illegal, hazardous, or unacceptable: "Personnel must not handle hazardous biological agents without biosafety gear."
• HAVE TO (EXTERNAL OBLIGATION):
  - Expresses objective requirements imposed by laws, corporate policies, or physical realities: "All citizens have to carry valid passport credentials when crossing borders."
• DO NOT HAVE TO (LACK OF OBLIGATION / OPTIONALITY):
  - Expresses that an action is completely optional; no necessity exists: "Tomorrow is an official public holiday; you do not have to report to the office."
  - Critical Pitfall: 'Mustn't' (forbidden) and 'don't have to' (optional) are POLAR OPPOSITES in English semantics!`,
    explanationKhmer: `តួនាទី និងការប្រើប្រាស់ស៊ីជម្រៅនៃ Modal Verbs (Can, Could, Should, Must)៖
Modal Verbs (កិរិយាសព្ទជំនួយពិសេស) ប្រើសម្រាប់បញ្ជាក់អំពី សមត្ថភាព (Ability), ការសុំការអនុញ្ញាត (Permission), ដំបូន្មាន (Advice), កាតព្វកិច្ច (Obligation), ការហាមឃាត់ (Prohibition), និងការសន្និដ្ឋានប្រាកដប្រជា (Deduction)។

ក្បួនវេយ្យាករណ៍ដែកទាំង ៤ នៃ MODAL VERBS៖
១. គ្មានការប្រែប្រួលកន្ទុយ (-s, -ed, -ing) ដាច់ខាត៖ She can (ហាមសរសេរ She cans)។
២. ត្រូវតែបន្តដោយកិរិយាសព្ទដើមគ្មាន "to" (Bare Infinitive)៖ You must go (ហាមសរសេរ You must to go)។
៣. បង្កើតទម្រង់បដិសេធដោយគ្រាន់តែថែម "not" នៅពីក្រោយ Modal ផ្ទាល់ (cannot, couldn't, shouldn't, mustn't)។
៤. បង្កើតសំណួរដោយលើក Modal មកមុខប្រធាន (Can you help me? / Should we start?)។

ការបែងចែកអត្ថន័យ និងការប្រើប្រាស់នៃ MODAL នីមួយៗ៖

១. CAN & CAN'T៖
• សមត្ថភាពបច្ចុប្បន្ន (Ability)៖ "She can speak four languages fluently."
• ការសុំអនុញ្ញាតបែបក្រៅផ្លូវការ (Permission)៖ "Can I borrow your pen?"
• ការសន្និដ្ឋានអវិជ្ជមានប្រាកដ ១០០% (Impossibility)៖ "It can't be true!" (វាមិនអាចទៅរួចជាដាច់ខាត)។

២. COULD & COULDN'T៖
• សមត្ថភាពទូទៅក្នុងអតីតកាល (Past Ability)៖ "When I was young, I could run fast."
  - ចំណាំសំខាន់៖ សម្រាប់សកម្មភាពលំបាកដែលបានសម្រេចក្នុងអតីតកាលតែម្តង ត្រូវប្រើ "was/were able to" មិនត្រូវប្រើ "could" ទេ ("He was able to escape the fire")។
• ការស្នើសុំ ឬសួរបែបគួរសមខ្ពស់ (Polite Request)៖ "Could you please help me?" (គួរសមជាង 'can')។
• លទ្ធភាពដែលអាចកើតឡើង (Possibility)៖ "We could go to the museum tomorrow."

៣. SHOULD & SHOULDN'T៖
• ដំបូន្មាន ការណែនាំ និងអ្វីដែលគួរធ្វើ (Advice & Recommendation)៖ "You should sleep early."
• ការរំពឹងទុកសមហេតុផល (Expectation)៖ "The flight should land in ten minutes."
• ការស្តាយក្រោយចំពោះអតីតកាល (Should have + V3)៖ "You should have told me earlier" (ឯងគួរតែប្រាប់ខ្ញុំពីមុនមក)។

៤. MUST & MUSTN'T vs. HAVE TO & DON'T HAVE TO (អន្ទាក់វេយ្យាករណ៍សំខាន់បំផុត!)៖
• MUST ៖
  - កាតព្វកិច្ចផ្ទាល់ខ្លួនពីចិត្តអ្នកនិយាយ៖ "I must finish this book today."
  - ការសន្និដ្ឋានប្រាកដប្រជា ៩៩%៖ "He has worked for 12 hours; he must be exhausted" (គាត់ប្រាកដជាហត់ខ្លាំងណាស់)។
• MUSTN'T (ការហាមឃាត់ដាច់ខាត / ខុសច្បាប់)៖
  - "You mustn't smoke in the hospital" (ហាមជក់បារីដាច់ខាត)។
• HAVE TO (កាតព្វកិច្ចច្បាប់ខាងក្រៅ)៖
  - "Drivers have to stop at red traffic lights."
• DON'T HAVE TO (មិនចាំបាច់ធ្វើទេ តែបើចង់ធ្វើក៏បាន / ស្រេចចិត្ត)៖
  - "Tomorrow is a holiday; you don't have to wake up early" (មិនបាច់ក្រោកពីព្រលឹមទេ តែបើចង់ក្រោកក៏មិនខុសដែរ)។
  - ចំណាំ៖ Mustn't (ហាមដាច់ខាត) និង Don't have to (មិនចាំបាច់) មានន័យផ្ទុយគ្នាស្រឡះ!`,
    examples: [
      'She **can translate** complex diplomatic terminology without hesitation.',
      '**Could you please** email me the finalized financial projection by 4:00 PM?',
      'You **should consult** a qualified nutritionist to design your dietary plan.',
      'All visitors **must register** their identification at the security checkpoint.',
      'You **must not disclose** proprietary company source code to unauthorized third parties.',
      'Tomorrow is a national holiday, so employees **do not have to attend** the office.',
      'When he lived in Japan, he **could speak** conversational Japanese fluently.',
      'That theoretical model **cannot be correct** because it violates thermodynamic laws.',
      'We **should arrive** at the international terminal by noon if traffic remains smooth.',
      'He **must be** exhausted after piloting an eleven-hour transpacific flight.',
      '**Can you recommend** an engaging introductory textbook on macroeconomics?'
    ]
  },

  // ==========================================
  // 17. GERUNDS VS. INFINITIVES
  // ==========================================
  'Gerunds vs Infinitives': {
    title: 'Gerunds vs. Infinitives',
    explanation: `UNDERSTANDING NON-FINITE VERB COMPLEMENTATION:
Gerunds (verb + -ing) and Infinitives (to + base verb) are non-finite verb forms that allow an action to function syntactically as a noun within a clause—acting as grammatical subjects, direct objects, predicate nominatives, or prepositional complements. Knowing when to deploy a gerund versus an infinitive is determined by the governing verb, grammatical position, and semantic nuances of time and agency.

1. THE GERUND (VERB + -ING FUNCTIONING NOMINALLY):
• Underlying Semantic Orientation: Typically denotes real, experienced, ongoing, or completed activities.
• Syntactic Functions:
  - Grammatical Subject: "Conducting systematic clinical trials requires meticulous documentation."
  - Subject Complement: "Her primary responsibility is monitoring network stability."
  - Mandatory Complement of Prepositions: Whenever a verb immediately succeeds a preposition, it MUST take the gerund form:
    "He succeeded IN synthesizing the compound."
    "Thank you FOR reviewing our proposal."
    "She apologized FOR interrupting the lecture."
• Prepositional Phrases Ending in 'TO' (The Classic Learner Trap):
  In these idioms, 'to' is a PREPOSITION, NOT an infinitive marker, and thus MANDATES a gerund:
  - look forward to + gerund ("I look forward to meeting you")
  - be / get used to + gerund ("He is used to working under pressure")
  - object to + gerund ("They object to paying additional surcharges")
  - in addition to + gerund ("In addition to teaching, she conducts field research")
• Governing Verbs MANDATING Gerunds Only:
  admit, appreciate, avoid, consider, delay, deny, enjoy, escape, finish, imagine, involve, keep, mind, miss, postpone, practice, recommend, resist, risk, suggest, tolerate.
  - "The director suggested postponing the product launch." (NOT "suggested to postpone")

2. THE INFINITIVE (TO + BASE VERB):
• Underlying Semantic Orientation: Typically denotes prospective, future-oriented, intentional, hypothetical, or purpose-driven actions.
• Syntactic Functions:
  - Adverbial Complement of Purpose: Answers why an action is performed ("Engineers redesigned the intake TO improve airflow").
  - Adjective Complement: Follows evaluative adjectives ("It is imperative TO verify raw data").
  - Nominal Subject (Formal/Aphoristic): "To err is human; to forgive, divine."
• Governing Verbs MANDATING Full Infinitives (To + Verb):
  agree, aim, appear, arrange, choose, decide, demand, deserve, expect, fail, hesitate, hope, learn, manage, offer, plan, prepare, promise, refuse, seem, tend, threaten, volunteer, want, wish.
  - "The consortium decided to allocate additional capital." (NOT "decided allocating")

3. THE BARE INFINITIVE (VERB WITHOUT 'TO'):
• Causative Verbs:
  - make + object + bare verb: "The strict supervisor made them rewrite the report."
  - let + object + bare verb: "The firewall let the packets pass through."
  - have + object + bare verb: "I will have my assistant schedule the meeting."
• Sensory Perception Verbs (see, hear, notice, watch, feel):
  - Completed observation (Bare Infinitive): "I heard the bell chime once."
  - Ongoing observation in progress (Participle/Gerund): "I heard the bell chiming continuously."
• Modal Auxiliary Verbs (can, could, should, must, might): Always followed by bare infinitive.

4. VERBS WITH DUAL COMPLEMENTATION:
• Class A: No Substantive Change in Meaning:
  begin, start, continue, intend, bother ("She began reading" == "She began to read").
• Class B: Critical Semantic Shift (Meaning Changes Completely!):
  1. STOP:
     - Stop + Gerund = Terminate / quit an ongoing action ("He stopped smoking three years ago").
     - Stop + Infinitive = Halt an activity in order to initiate a new purpose ("He stopped to smoke a cigarette").
  2. REMEMBER:
     - Remember + Gerund = Recall a past event or memory ("I remember visiting Siem Reap in 2015").
     - Remember + Infinitive = Not forget to perform an upcoming obligation ("Remember to submit the quarterly audit by 5:00 PM").
  3. FORGET:
     - Forget + Gerund = Lose the memory of a past occurrence ("I will never forget seeing the sunrise over Angkor Wat").
     - Forget + Infinitive = Fail to carry out an intended duty ("He forgot to attach the financial spreadsheet").
  4. REGRET:
     - Regret + Gerund = Sorrow or remorse concerning a prior past action ("I regret sending that emotional email").
     - Regret + Infinitive = Formal, courteous announcement of bad news ("We regret to inform you that your application was declined").
  5. TRY:
     - Try + Infinitive = Exert physical or mental effort to overcome an obstacle ("She tried to lift the heavy machine").
     - Try + Gerund = Experiment with a novel method or remedy to see what happens ("If your headache persists, try drinking herbal tea").
  6. NEED:
     - Need + Infinitive = Active duty ("I need to service the engine").
     - Need + Gerund = Passive necessity ("The engine needs servicing" == "The engine needs to be serviced").`,
    explanationKhmer: `តួនាទី និងក្បួនវេយ្យាករណ៍ស៊ីជម្រៅនៃ Gerunds (V-ing) និង Infinitives (to + Verb)៖
Gerunds (កិរិយាសព្ទថែម -ing) និង Infinitives (to + កិរិយាសព្ទដើម) គឺជាទម្រង់កិរិយាសព្ទមិនបញ្ចប់ (Non-finite verbs) ដែលបំពេញតួនាទីជា "នាម" ក្នុងប្រយោគ (ធ្វើជាប្រធាន កម្មបទ ឬបំពេញន័យធ្នាក់)។

១. GERUND (កិរិយាសព្ទថែម -ING ដើរតួជានាម)៖
• អត្ថន័យស្នូល៖ បង្ហាញពីសកម្មភាពពិត សកម្មភាពដែលបានឆ្លងកាត់ ឬកំពុងបន្ត។
• តួនាទីវេយ្យាករណ៍៖
  - ធ្វើជាប្រធាននៃប្រយោគ៖ "Exercising daily improves cardiovascular endurance."
  - ធ្វើជាកម្មបទនៅពីក្រោយធ្នាក់ (Prepositions) ជានិច្ច៖
    "He succeeded in passing the exam." / "Thank you for helping me." / "She is good at speaking."
• អន្ទាក់ "TO" ដែលជាធ្នាក់ (Preposition) ត្រូវតែប្រើ Gerund ហាមប្រើ Infinitive៖
  - look forward to + V-ing (ទន្ទឹងរង់ចាំ៖ "I look forward to hearing from you")
  - be / get used to + V-ing (ទម្លាប់នឹង៖ "He is used to working late")
  - object to + V-ing (ជំទាស់នឹង៖ "They object to paying extra fees")
• កិរិយាសព្ទដែលត្រូវប្រើជាមួយតែ Gerund ប៉ុណ្ណោះ៖
  admit, avoid, consider, deny, enjoy, finish, imagine, keep, mind, postpone, practice, recommend, risk, suggest (ឧទាហរណ៍៖ "He suggested delaying the launch", ហាមសរសេរ "suggested to delay")។

២. INFINITIVE (TO + កិរិយាសព្ទដើម V1)៖
• អត្ថន័យស្នូល៖ បង្ហាញពីគោលបំណង ការរំពឹងទុក សកម្មភាពទៅអនាគត ឬសម្មតិកម្ម។
• តួនាទីវេយ្យាករណ៍៖
  - បង្ហាញពីគោលបំណង (Purpose)៖ "He studied hard to pass the scholarship exam."
  - បំពេញន័យគុណនាម៖ "It is essential to back up your database."
• កិរិយាសព្ទដែលត្រូវប្រើជាមួយតែ Infinitive (To + V1) ប៉ុណ្ណោះ៖
  agree, decide, demand, hope, learn, manage, offer, plan, promise, refuse, seem, want, wish, hesitate (ឧទាហរណ៍៖ "She decided to study robotics", ហាមសរសេរ "decided studying")។

៣. BARE INFINITIVE (កិរិយាសព្ទដើមគ្មាន "TO")៖
• ប្រើក្រោយកិរិយាសព្ទបង្គាប់បញ្ជា (Causatives)៖ make, let, have
  - "The teacher made them rewrite the test." / "Please let me explain."
• ប្រើក្រោយកិរិយាសព្ទវិញ្ញាណទាំង ៥ (see, hear, watch, notice) នៅពេលឃើញសកម្មភាពតាំងពីដើមដល់ចប់។
• ប្រើក្រោយ Modal Verbs (can, could, should, must) ជានិច្ច។

៤. កិរិយាសព្ទដែលប្រើបានទាំងពីរ តែមានអត្ថន័យខុសគ្នាស្រឡះ (សំខាន់បំផុត!)៖
១. STOP៖
   - Stop + V-ing = ឈប់ធ្វើសកម្មភាពនោះដាច់ ("He stopped smoking" = គាត់ឈប់ជក់បារីហើយ)។
   - Stop + to V = ឈប់មួយភ្លែតដើម្បីទៅធ្វើអ្វីផ្សេង ("He stopped to buy coffee" = គាត់ឈប់សិនដើម្បីទិញកាហ្វេ)។
២. REMEMBER៖
   - Remember + V-ing = ចងចាំរឿងរ៉ាវអតីតកាល ("I remember visiting Angkor Wat as a child")។
   - Remember + to V = ចងចាំថាកុំភ្លេចធ្វើកិច្ចការទៅមុខ ("Remember to lock the door")។
៣. FORGET៖
   - Forget + V-ing = ភ្លេចព្រឹត្តិការណ៍ដែលធ្លាប់កើតឡើង ("I will never forget meeting the king")។
   - Forget + to V = ភ្លេចមិនបានធ្វើកិច្ចការនោះ ("He forgot to bring his passport")។
៤. REGRET៖
   - Regret + V-ing = ស្តាយក្រោយចំពោះកំហុសអតីតកាល ("I regret saying those rude words")។
   - Regret + to V = សោកស្តាយក្នុងការប្រាប់ដំណឹងមិនល្អ ("We regret to inform you that...")។
៥. TRY៖
   - Try + to V = ខិតខំប្រឹងប្រែងជំនះឧបសគ្គ ("She tried to climb the steep wall")។
   - Try + V-ing = សាកល្បងវិធីថ្មីមើលថាតើមានប្រសិទ្ធភាពឬទេ ("Try drinking warm water")។
៦. NEED៖
   - Need + to V = ត្រូវការធ្វើ (Active: "I need to fix the car")។
   - Need + V-ing = ត្រូវការឱ្យគេជួសជុល (Passive: "The car needs fixing" = "The car needs to be fixed")។`,
    examples: [
      '**Mastering** technical English requires consistent practice and immersion.',
      'She **decided to enroll** in the postgraduate data science program.',
      'He apologized sincerely **for arriving** late to the strategy session.',
      'They **avoided discussing** the contentious contractual clause during the preliminary call.',
      'Please **remember to submit** your expense claims before Friday afternoon.',
      'I vividly **remember meeting** the renowned philosopher at a symposium in 2018.',
      'The construction crew **stopped working** when the tropical downpour commenced.',
      'While driving through the countryside, we **stopped to admire** the breathtaking valley.',
      'She is deeply interested **in developing** sustainable agricultural technologies.',
      'We **plan to launch** the beta test of the educational platform next month.',
      'He **refused to compromise** on the safety standards of the aerospace equipment.'
    ]
  },

  // ==========================================
  // 18. PASSIVE VOICE
  // ==========================================
  'Passive Voice': {
    title: 'Passive Voice',
    explanation: `WHAT IS VOICE IN ENGLISH GRAMMAR?
Voice characterizes the syntactic relationship between the verbal predicate and its nominal arguments (the agent/doer and the patient/receiver).
• Active Voice: The grammatical subject is the active agent executing the action ("The engineer calibrated the sensor array"). Focus: THE DOER.
• Passive Voice: The grammatical subject is the patient receiving the action ("The sensor array was calibrated by the engineer"). Focus: THE RECIPIENT, PROCESS, OR RESULT.

THE UNIVERSAL ARCHITECTURAL FORMULA OF THE PASSIVE:
Subject (Original Patient) + Appropriate Form of "BE" + Past Participle (V3) (+ by Agent)

TENSE-BY-TENSE PASSIVE CONJUGATION MATRIX:
1. Present Simple: am / is / are + V3
   - "Solar panels are installed on industrial rooftops."
2. Present Continuous: am / is / are + BEING + V3
   - "A new transcontinental railway is being constructed."
3. Present Perfect: have / has + BEEN + V3
   - "The fiscal audit has been finalized by external accountants."
4. Past Simple: was / were + V3
   - "The historic observatory was established in 1892."
5. Past Continuous: was / were + BEING + V3
   - "The telecommunications infrastructure was being overhauled during the blackout."
6. Past Perfect: had + BEEN + V3
   - "The treaty had been ratified before the trade embargo was lifted."
7. Future Simple: will + BE + V3
   - "The clinical trial results will be published next month."
8. Future Perfect: will have + BEEN + V3
   - "The bypass will have been completed before the rainy season arrives."
9. Modal Auxiliaries: modal (can, must, should, might) + BE + V3
   - "Hazardous chemicals must be stored in reinforced containment vaults."
10. Modal Perfect: modal + have + BEEN + V3
   - "The data breach could have been averted with multi-factor authentication."

ADVANCED PASSIVE STRUCTURES:
1. Verbs with Double Objects (Direct Object & Indirect Object):
   Verbs like give, send, show, offer, award take two objects ("The board offered Dr. Sovan a research fellowship"):
   • Person as Subject (Dominant, Natural English): "Dr. Sovan was offered a research fellowship."
   • Thing as Subject (Less common, requires 'to'): "A research fellowship was offered to Dr. Sovan."
2. Impersonal & Distancing Passive (Academic & Journalistic Register):
   Used to report widespread beliefs, claims, or hypotheses neutrally without committing the speaker:
   • Pattern A (Dummy 'It'): "It is estimated that renewable energy will provide 80% of power by 2040."
   • Pattern B (Personal Subject + Infinitive): "Renewable energy is estimated to provide 80% of power by 2040."
   (Common verbs: is believed to, is reported to, is acknowledged to, is rumored to).
3. Causative Passive (Have / Get Something Done):
   Expresses delegating an action to a professional or third-party service:
   • Subject + have/get + object + V3: "We had our laboratory instruments calibrated yesterday."
4. Intransitive Verbs CANNOT Be Passive:
   Verbs lacking a direct object cannot undergo passive transformation. Never make passive:
   happen, occur, arrive, die, fall, exist, disappear, sleep, come.
   (Saying "An accident was happened" or "The money was disappeared" is an impermissible grammatical error!).

STRATEGIC USES OF THE PASSIVE IN PROFESSIONAL WRITING:
1. Unknown Agent: "The server room was compromised at 2:00 AM." (Perpetrator is unknown).
2. Obvious / Contextually Irrelevant Agent: "The grapes are harvested in late autumn." (Harvested by agricultural workers; the process matters).
3. Scientific Objectivity & Replicability: "Five grams of catalyst were introduced into the mixture." (Focus is on reproducible empirical steps, not the scientist).
4. Diplomatic Tact & Mitigating Blame: "A typographical discrepancy was made in the contract." (Politely neutral compared to "You made an error").`,
    explanationKhmer: `តួនាទី និងក្បួនវេយ្យាករណ៍ស៊ីជម្រៅនៃ Passive Voice (ល្បះកម្ម) ក្នុងភាសាអង់គ្លេស៖
Passive Voice (ល្បះកម្ម) គឺជាទម្រង់ប្រយោគដែលផ្តោតលើ "អ្នកទទួលរងសកម្មភាព" ឬ "លទ្ធផលនៃសកម្មភាព" ជាជាងផ្តោតលើ "អ្នកធ្វើ"។
• Active Voice (ល្បះកត្តុ)៖ ប្រធានជាអ្នកធ្វើសកម្មភាព ("The doctor examined the patient.")
• Passive Voice (ល្បះកម្ម)៖ ប្រធានជាអ្នកទទួលរងសកម្មភាព ("The patient was examined by the doctor.")

រូបមន្តគ្រឹះទូទៅនៃ Passive Voice៖
Subject (កម្មបទដើម) + កិរិយាសព្ទ "BE" តាមកាល + Past Participle (V3) (+ by + អ្នកធ្វើ)

តារាងរូបមន្តកាលនីមួយៗ (Conjugation Matrix)៖
១. Present Simple: am / is / are + V3 ("English is spoken worldwide.")
២. Present Continuous: am / is / are + being + V3 ("The road is being paved.")
៣. Present Perfect: have / has + been + V3 ("The report has been completed.")
៤. Past Simple: was / were + V3 ("The temple was built in the 12th century.")
៥. Past Continuous: was / were + being + V3 ("The system was being updated.")
៦. Past Perfect: had + been + V3 ("The document had been signed before noon.")
៧. Future Simple: will be + V3 ("The winners will be announced tomorrow.")
៨. Modal Verbs: modal + be + V3 ("Safety helmets must be worn at all times.")
៩. Modal Perfect: modal + have been + V3 ("The error could have been prevented.")

ទម្រង់ល្បះកម្មកម្រិតខ្ពស់ (Advanced Passive)៖
១. កិរិយាសព្ទដែលមានកម្មបទពីរ (Double Objects)៖
   កិរិយាសព្ទ give, offer, send, award មានកម្មបទមនុស្ស និងកម្មបទវត្ថុ ("They gave Sophea an award")៖
   • យកមនុស្សធ្វើជាប្រធាន (ពេញនិយមបំផុតក្នុងភាសាអង់គ្លេស)៖ "Sophea was given an award."
   • យកវត្ថុធ្វើជាប្រធាន (ត្រូវថែម to)៖ "An award was given to Sophea."
២. ល្បះកម្មរាយការណ៍បែបរដ្ឋបាល និងស្រាវជ្រាវ (Impersonal Passive)៖
   ប្រើសម្រាប់រាយការណ៍ព័ត៌មានដោយរក្សាភាពអព្យាក្រឹត៖
   • "It is reported that the economy is growing."
   • "The economy is reported to be growing." (is believed to, is thought to)
៣. ទម្រង់ Causative Passive (ជួល ឬឱ្យគេធ្វើអ្វីមួយឱ្យ)៖
   • have / get + something + V3៖ "I had my car repaired yesterday" (ខ្ញុំបានយកឡានទៅឱ្យគេជួសជុល)។
៤. កិរិយាសព្ទដែលមិនអាចធ្វើជា Passive បានជាដាច់ខាត (Intransitive Verbs)៖
   កិរិយាសព្ទគ្មានកម្មបទ ដូចជា arrive, happen, occur, die, disappear, fall មិនអាចធ្វើជា Passive ឡើយ!
   (ហាមសរសេរ "An accident was happened" ត្រូវសរសេរ "An accident happened")។

ពេលណាដែលត្រូវប្រើ Passive Voice?
១. មិនដឹងអ្នកណាជាអ្នកធ្វើ ("My phone was stolen.")
២. អ្នកធ្វើគឺច្បាស់ពេក មិនចាំបាច់ប្រាប់ក៏គេដឹង ("The suspect was arrested.")
៣. ក្នុងសំណេរវិទ្យាសាស្ត្រ និងការស្រាវជ្រាវ ដើម្បីរក្សាភាពសត្យានុម័ត ("Data was collected.")
៤. ការនិយាយបែបការទូត ដើម្បីកាត់បន្ថយការស្តីបន្ទោសផ្ទាល់ខ្លួន ("A mistake was made.")។`,
    examples: [
      'The historic suspension bridge **was constructed** over a century ago.',
      'Critical environmental data **is collected** by satellite sensors every hour.',
      'The annual corporate budget **has been approved** by the board of trustees.',
      'A revolutionary treatment for rare diseases **is currently being developed**.',
      'All confidential documents **must be shredded** before disposal.',
      'The architectural designs **will be unveiled** at the international expo tomorrow.',
      'His breakthrough research paper **was accepted** by a leading scientific journal.',
      'The ancient temple complex **was restored** through an international cultural collaboration.',
      'Several security vulnerabilities **were discovered** during the software audit.',
      'Clean solar energy **is generated** on the rooftop of the university complex.',
      'The election results **had been verified** thoroughly before the official broadcast.'
    ]
  },

  // ==========================================
  // 19. REPORTED SPEECH (INDIRECT SPEECH)
  // ==========================================
  'Reported Speech': {
    title: 'Reported Speech (Indirect Speech)',
    explanation: `WHAT IS REPORTED SPEECH?
Reported speech (also known as Indirect Speech) is the syntactic mechanism used to relate what someone previously communicated without reproducing their exact words verbatim inside quotation marks.
• Direct Speech (Verbatim): The lead engineer said, "We have solved the thermal latency issue."
• Reported Speech (Integrated): The lead engineer said that they had solved the thermal latency issue.

1. THE BACKSHIFT MECHANISM (TENSE SHIFTING):
When the introductory reporting verb is in a past tense (e.g., said, explained, mentioned, stated), the verbs inside the reported statement shift one step backward into the grammatical past:
• Present Simple -> Past Simple:
  "I live in Phnom Penh" -> He explained that he lived in Phnom Penh.
• Present Continuous -> Past Continuous:
  "We are optimizing the code" -> She stated that they were optimizing the code.
• Present Perfect -> Past Perfect:
  "I have verified the results" -> He reported that he had verified the results.
• Past Simple -> Past Perfect:
  "The earthquake struck at dawn" -> The reporter confirmed that the earthquake had struck at dawn.
• Past Continuous -> Past Perfect Continuous:
  "I was working on the prototype" -> She said she had been working on the prototype.
• Will -> Would:
  "We will deliver the shipment" -> They promised that they would deliver the shipment.
• Can -> Could / May -> Might / Must -> Had to:
  "You must wear goggles" -> The lab technician insisted that we had to wear goggles.
• CRITICAL EXCEPTION TO BACKSHIFT:
  When reporting timeless scientific axioms, universal truths, or situations that remain currently valid, backshift is omitted:
  "The physicist explained that light travels at approximately 300,000 kilometers per second."

2. PRONOUN & DEICTIC CONTEXT TRANSFORMATIONS:
Because the speaker, setting, and temporal perspective have shifted, all referential anchors must adjust:
• Pronoun Shifts: I -> he/she; we -> they; my -> his/her; our -> their; you -> I/we/they.
• Time and Locational Expression Shifts:
  - now -> then / at that time
  - today -> that day
  - tonight -> that night
  - yesterday -> the day before / the previous day
  - tomorrow -> the next day / the following day
  - last week -> the week before / the previous week
  - next year -> the following year
  - here -> there
  - this / these -> that / those
  - ago -> before

3. REPORTING QUESTIONS (WORD ORDER REVERSAL):
When reporting questions, the interrogative sentence structure inverts back into affirmative statement word order (Subject + Verb). Auxiliary 'do / does / did' are dropped, and question marks become periods:
• Wh- Questions (Keep the question word):
  - Direct: "Where do you store the backups?"
  - Reported: She asked me WHERE I STORED the backups (NOT "where did I store").
• Yes / No Questions (Introduce with 'IF' or 'WHETHER'):
  - Direct: "Are you attending the symposium tomorrow?"
  - Reported: He inquired IF (or WHETHER) I was attending the symposium the next day.

4. REPORTING ORDERS, REQUESTS & ADVICE (INFINITIVE PATTERNS):
Commands and requests do not use 'that'-clauses; they use the formula:
Reporting Verb + Person Object + (Not) to + Base Verb:
• Orders & Directives: "Do not touch the electrical relay."
  -> The safety inspector ordered us NOT TO TOUCH the electrical relay.
• Requests: "Could you please review my manuscript?"
  -> She asked him TO REVIEW her manuscript.
• Advice: "You should seek a second medical opinion."
  -> The physician advised him TO SEEK a second medical opinion.

5. NUANCED REPORTING VERBS (BEYOND 'SAY' AND 'TELL'):
• Say vs. Tell:
  - 'Say' does NOT take a personal object directly: "She said that she agreed" (NEVER "She said me").
  - 'Tell' MANDATES a personal object: "She told ME that she agreed."
• Specialized Reporting Verb Structures:
  - Verb + that-clause: explain, admit, agree, claim, deny, insist, promise, state.
  - Verb + object + to-infinitive: advise, encourage, invite, order, remind, warn ("She reminded me to save my progress").
  - Verb + Gerund / Preposition + Gerund:
    apologize for + V-ing ("He apologized for being late")
    insist on + V-ing ("They insisted on paying the bill")
    accuse of + V-ing ("They accused him of leaking data")
    suggest + V-ing ("She suggested conducting another trial").`,
    explanationKhmer: `តួនាទី និងក្បួនវេយ្យាករណ៍ស៊ីជម្រៅនៃ Reported Speech (កថាបរទស) ក្នុងភាសាអង់គ្លេស៖
Reported Speech (Indirect Speech) គឺជាការយកសម្តី ឬសាររបស់អ្នកដទៃមកនិយាយ ឬសរសេររៀបរាប់ឡើងវិញ ដោយមិនចាំបាច់ស្រង់ពាក្យដើមក្នុងសញ្ញាសម្រង់ ("...") ឡើយ។

១. វិធានប្តូរកាលថយក្រោយមួយជំហាន (THE BACKSHIFT RULE)៖
នៅពេលកិរិយាសព្ទរាយការណ៍ជាអតីតកាល (said, told, stated...) កាលក្នុងប្រយោគត្រូវថយមួយកម្រិត៖
• Present Simple -> Past Simple ("I work here" -> He said he worked there)
• Present Continuous -> Past Continuous ("I am coding" -> She said she was coding)
• Present Perfect / Past Simple -> Past Perfect ("I have finished" -> He said he had finished)
• Past Continuous -> Past Perfect Continuous ("I was writing" -> She said she had been writing)
• Will -> Would ("I will call" -> He said he would call)
• Can -> Could / May -> Might / Must -> Had to
• ករណីលើកលែងមិនបាច់ថយកាល៖ ការពិតវិទ្យាសាស្ត្រជាសកលដែលនៅតែពិតជានិច្ច ("The teacher said that the Earth revolves around the Sun")។

២. ការប្តូរសព្វនាម និងពាក្យបញ្ជាក់ពេលវេលា/ទីកន្លែង៖
• now -> then (ពេលនោះ)
• today -> that day (ថ្ងៃនោះ)
• yesterday -> the day before / the previous day (ថ្ងៃមុននោះ)
• tomorrow -> the next day / the following day (ថ្ងៃបន្ទាប់)
• here -> there (ទីនោះ)
• this / these -> that / those
• ago -> before

៣. ក្បួនរាយការណ៍ប្រយោគសំណួរ (REPORTING QUESTIONS)៖
សំណួរត្រូវបំប្លែងមកជាទម្រង់ល្បះស្របធម្មតាវិញ (Subject + Verb) ដោយលុប do/does/did ចោល៖
• សំណួរ Wh-Questions៖ រក្សាពាក្យ Wh ដដែល រួចតាមដោយ ប្រធាន + កិរិយាសព្ទ
  - Direct: "Where do you live?"
  - Reported: He asked me where I lived (ហាមសរសេរ "where did I live")។
• សំណួរ Yes/No Questions៖ ត្រូវថែម IF ឬ WHETHER (ថាតើ...)
  - Direct: "Are you ready?"
  - Reported: She asked if I was ready.

៤. ក្បួនរាយការណ៍ប្រយោគបញ្ជា សំណូមពរ និងដំបូន្មាន (COMMANDS & REQUESTS)៖
ប្រើរូបមន្ត៖ Reporting Verb + កម្មបទមនុស្ស + (not) TO + V1
• ប្រយោគបញ្ជា៖ "Don't touch the wire!" -> He ordered us NOT TO TOUCH the wire.
• ប្រយោគស្នើសុំ៖ "Please help me." -> She asked me TO HELP her.
• ដំបូន្មាន៖ "You should rest." -> The doctor advised him TO REST.

៥. ភាពខុសគ្នានៃកិរិយាសព្ទរាយការណ៍៖
• SAY vs. TELL៖
  - Say មិនត្រូវការកម្មបទមនុស្សទេ ("He said that...")។
  - Tell ត្រូវតែមានកម្មបទមនុស្សនៅពីក្រោយជានិច្ច ("He told ME that...", "She told HIM that...")។
• កិរិយាសព្ទពិសេសផ្សេងទៀត៖
  - apologize for + V-ing (សុំទោសចំពោះ៖ "He apologized for arriving late")
  - remind + someone + to V (រំលឹកនរណាម្នាក់៖ "She reminded me to submit the file")
  - suggest + V-ing (ផ្តល់យោបល់៖ "He suggested taking a break")។`,
    examples: [
      'She **mentioned that she was analyzing** the latest epidemiological data.',
      'He **told the board that the quarterly revenue had increased** by fifteen percent.',
      'The meteorologist **stated that the tropical storm would make landfall** the following day.',
      'They **explained that they had completed** the environmental impact study the previous week.',
      'She **promised that she would email** the finalized research manuscript by Friday.',
      'He **confided in me that he was considering** a career transition into biotechnology.',
      'The director **announced that the organization had secured** a multi-year research grant.',
      'She **inquired whether I was available** to facilitate the opening panel discussion.',
      'He **claimed that he had never encountered** such an intricate algorithmic challenge.',
      'The architect **explained that the blueprint complied** with all national safety standards.',
      'They **reassured us that the backup servers would activate** automatically during an outage.'
    ]
  },

  // ==========================================
  // 20. SUBJECT-VERB AGREEMENT
  // ==========================================
  'Subject-Verb Agreement': {
    title: 'Subject-Verb Agreement Essentials',
    explanation: `WHAT IS SUBJECT-VERB AGREEMENT?
Subject-verb agreement is the cardinal structural law of English syntax: a finite verb must match its grammatical subject in NUMBER (singular or plural) and in PERSON (first, second, or third).
• Singular Subject -> Singular Verb (+s/-es in Present Simple): "The satellite transmits data."
• Plural Subject -> Plural Verb (Base Form in Present Simple): "The satellites transmit data."
While the core principle is intuitive, complex sentence architecture—such as intervening modifying phrases, compound subjects, correlative conjunctions, collective nouns, and inverted clauses—often conceals the true grammatical subject.

THE 10 SYSTEMATIC RULES OF SUBJECT-VERB HARMONY:

1. The Intervening Phrase Trap (False Proximity):
• Modifiers, prepositional phrases, and parenthetical expressions placed between the subject and verb do NOT change the subject's grammatical number. Ignore intervening words:
  - "The box [of Swiss artisan chocolates] IS on the conference table." (Subject = 'box', NOT 'chocolates').
  - "The lead scientist, [accompanied by four lab technicians], HAS arrived." (Subject = 'scientist').
  - Common intervening linkers: along with, together with, as well as, in addition to, accompanied by, including.

2. Compound Subjects Joined by 'AND':
• Two or more subjects coordinated by 'and' constitute a plural subject and mandate a plural verb:
  - "The chief executive officer and the lead architect HAVE approved the blueprints."
• Exception (Unified Conceptual Entity):
  - When two items joined by 'and' form an inseparable culinary dish, proverb, or singular entity, use a singular verb:
    "Bread and butter IS a staple breakfast." / "Slow and steady WINS the race."

3. Correlative Conjunctions (The Principle of Proximity):
• When nominals are joined by 'or', 'nor', 'either... or', or 'neither... nor', the verb agrees strictly with the subject NEAREST to it:
  - "Neither the professor nor the STUDENTS WERE satisfied with the grading rubric."
  - "Neither the students nor the PROFESSOR WAS satisfied with the grading rubric."

4. Indefinite Pronouns are Predominantly Singular:
• All indefinite pronouns ending in -body, -one, -thing, plus 'each', 'either', and 'neither' take singular verbs:
  - everyone, everybody, everything, someone, somebody, something, anyone, anybody, anything, no one, nobody, nothing, each, neither, either.
  - "Everyone in the international research consortium HAS signed the confidentiality agreement."
  - "Each of the prototype algorithms EXHIBITS exceptional processing throughput."

5. Fractional and Percentage Quantifiers (Governed by the Object of Preposition):
• With proportional expressions (some of, half of, all of, majority of, percent of, none of), the number of the noun inside the prepositional phrase determines the verb:
  - "Fifty percent of the agricultural harvest WAS lost." (uncountable -> singular).
  - "Fifty percent of the research participants WERE vaccinated." (countable plural -> plural).

6. "A NUMBER OF" vs. "THE NUMBER OF":
• A number of (= many / several) mandates a PLURAL verb:
  - "A number of engineers HAVE raised concerns regarding structural load."
• The number of (= a specific mathematical figure) mandates a SINGULAR verb:
  - "The number of active participants IS decreasing steadily."

7. Measurements, Sums of Money, Periods of Time, and Distances:
• When considered as a single total unit or aggregate quantity, expressions of time, currency, mass, and distance require a SINGULAR verb:
  - "Ten thousand dollars WAS allocated for laboratory consumables."
  - "Forty-two kilometers IS the official marathon distance."
  - "Three hours WAS insufficient time to complete the comprehensive examination."

8. Morphologically Plural Nouns with Singular Meaning:
• Academic disciplines, diseases, games, and news ending in -s take SINGULAR verbs:
  - Physics, mathematics, economics, statistics, thermodynamics, politics, ethics, rabies, measles, mumps, news.
  - "Physics IS the fundamental framework of empirical natural science."
  - "The news from the geological survey WAS exceptionally promising."

9. Morphologically Singular Nouns with Plural Meaning:
• Collective nouns designating groups of people or living beings take PLURAL verbs without any -s suffix:
  - police, people, clergy, cattle, poultry, vermin.
  - "The police ARE conducting a thorough forensic investigation at the site."
  - "Local cattle WERE grazing along the open highland pasture."

10. Inverted Sentences and Existential 'There / Here':
• 'There' and 'Here' are dummy introductory particles, NEVER the grammatical subject. The true subject follows the verb:
  - "There IS a severe bottleneck in the data transmission pipeline." (Subject = 'bottleneck').
  - "There ARE multiple security safeguards embedded within the firmware." (Subject = 'safeguards').`,
    explanationKhmer: `តួនាទី និងក្បួនវេយ្យាករណ៍ស៊ីជម្រៅនៃ Subject-Verb Agreement (ការស្របគ្នារវាងប្រធាននិងកិរិយាសព្ទ)៖
Subject-Verb Agreement គឺជាច្បាប់គ្រឹះនៃទម្រង់ប្រយោគអង់គ្លេស៖ កិរិយាសព្ទត្រូវតែស្របគ្នាជាមួយប្រធាន ទាំងវចនៈ (ឯកវចនៈ ឬពហុវចនៈ) និងបុរិសសព្ទ។
• ប្រធានឯកវចនៈ -> កិរិយាសព្ទឯកវចនៈ (+s/-es ក្នុងកាលបច្ចុប្បន្ន)៖ "The student studies."
• ប្រធានពហុវចនៈ -> កិរិយាសព្ទពហុវចនៈ (កិរិយាសព្ទដើម)៖ "The students study."

វិធានវេយ្យាករណ៍សំខាន់ៗទាំង ១០ ដើម្បីចៀសវាងអន្ទាក់៖

១. អន្ទាក់នៃឃ្លាជ្រៀតកណ្តាល (INTERVENING PHRASES)៖
• កុំមើលពាក្យដែលនៅជិតកិរិយាសព្ទ ត្រូវរកប្រធានពិតប្រាកដឱ្យឃើញ ដោយមិនគិតឃ្លាដែលនៅចន្លោះនោះឡើយ៖
  - "The box [of Swiss chocolates] IS on the table." (ប្រធានពិតគឺ 'box' ជាឯកវចនៈ ប្រើ 'is')។
  - "The professor, [along with his assistants], HAS arrived." (ប្រធានពិតគឺ 'professor')។

២. ប្រធានផ្សំដោយ 'AND'៖
• ភ្ជាប់នាមពីរដោយ "and" ចាត់ទុកជាពហុវចនៈ ("Dara and Sophea ARE here")។
• លើកលែងតែរបស់ពីរនោះផ្សំគ្នាជារបស់តែមួយ ឬមុខម្ហូបតែមួយ ទើបប្រើឯកវចនៈ៖ "Bread and butter IS delicious."

៣. ប្រធានភ្ជាប់ដោយ 'EITHER... OR' / 'NEITHER... NOR'៖
• កិរិយាសព្ទត្រូវស្របតាមនាមដែលនៅជិតវាបំផុត (Principle of Proximity)៖
  - "Neither the teacher nor the STUDENTS WERE present." (students នៅជិត ប្រើ were)
  - "Neither the students nor the TEACHER WAS present." (teacher នៅជិត ប្រើ was)។

៤. សព្វនាមអជាក់លាក់ (INDEFINITE PRONOUNS) ជាឯកវចនៈជានិច្ច៖
• ពាក្យបញ្ចប់ដោយ -body, -one, -thing ព្រមទាំង each, either, neither ត្រូវប្រើជាមួយកិរិយាសព្ទឯកវចនៈ (+s/is/has)៖
  everyone, someone, nobody, everything, each of the students ("Everyone HAS a dream", "Each of the cars IS inspected")។

៥. ភាគរយ និងប្រភាគ (FRACTIONS & PERCENTAGES)៖
• អាស្រ័យលើនាមនៅពីក្រោយធ្នាក់ "of"៖
  - "50% of the water WAS polluted." (water រាប់មិនបាន ប្រើ was)
  - "50% of the participants WERE vaccinated." (participants ពហុវចនៈ ប្រើ were)។

៦. "A NUMBER OF" vs. "THE NUMBER OF" (ចំណុចងាយច្រឡំ!)៖
• A number of (= ច្រើន) ត្រូវប្រើជាមួយកិរិយាសព្ទ ពហុវចនៈ៖ "A number of students HAVE passed."
• The number of (= ចំនួនសរុប) ត្រូវប្រើជាមួយកិរិយាសព្ទ ឯកវចនៈ៖ "The number of students IS increasing."

៧. រង្វាស់ចម្ងាយ ពេលវេលា និងលុយកាក់ (ជារួមតែមួយ)៖
• ទោះបីជាមានចំនួនច្រើន ក៏ចាត់ទុកជាឯកតាទោល ប្រើកិរិយាសព្ទឯកវចនៈ៖
  - "Ten thousand dollars WAS spent." / "Five kilometers IS a short walk." / "Two hours IS not enough."

៨. នាមមានកន្ទុយ -S តែជាឯកវចនៈ៖
• មុខវិជ្ជា និងជំងឺ ដូចជា physics, mathematics, economics, politics, news, measles ប្រើឯកវចនៈ៖
  - "Physics IS fascinating." / "The news WAS shocking."

៩. នាមគ្មានកន្ទុយ -S តែជាពហុវចនៈជានិច្ច៖
• police (ប៉ូលិស), people (មនុស្ស), cattle (គោក្របី) ត្រូវប្រើជាមួយកិរិយាសព្ទពហុវចនៈជានិច្ច៖
  - "The police ARE investigating the incident."

១០. ប្រយោគផ្ដើមដោយ 'THERE' ឬ 'HERE'៖
• There និង Here មិនមែនជាប្រធានទេ ប្រធានពិតគឺនៅពីក្រោយកិរិយាសព្ទ៖
  - "There IS an issue." (issue ឯកវចនៈ ប្រើ is)
  - "There ARE many solutions." (solutions ពហុវចនៈ ប្រើ are)។`,
    examples: [
      'The comprehensive evaluation **of** regional hospital facilities **takes** several weeks.',
      'Neither the project director nor the lead engineers **were** available for the debrief.',
      '**Everyone** in the international research consortium **is** dedicated to the mission.',
      'A bouquet of fresh tropical flowers **brightens** the reception counter.',
      '**Each** of the applicants **has** demonstrated exceptional analytical proficiency.',
      'The CEO, accompanied by her senior legal advisors, **is** attending the negotiation.',
      'Half of the agricultural harvest **was** preserved in temperature-controlled silos.',
      'Half of the committee members **have** already cast their confidential ballots.',
      'There **are** several compelling arguments in favor of renewable energy subsidies.',
      'Physics **is** a demanding yet profoundly illuminating scientific discipline.',
      'The quality of these handcrafted artisanal textiles **exceeds** all export standards.'
    ]
  },

  // ==========================================
  // 13. MIXED CONDITIONALS (C1 / B2 Advanced)
  // ==========================================
  'Mixed Conditionals': {
    title: 'Mixed Conditionals',
    structure: {
      affirmative: 'Type 1 (Past Condition → Present Result): If + had(n\'t) + V3, Subject + would/could/might + V1 | Type 2 (Present Trait/State → Past Result): If + Past Simple (were/did), Subject + would/could/might have + V3',
      negative: 'Type 1: If we hadn\'t missed the flight, we wouldn\'t be stuck in transit today. | Type 2: If he weren\'t so careless, he wouldn\'t have forgotten his passport yesterday.',
      question: 'Type 1: Would you be working in Tokyo today if you hadn\'t studied Japanese? | Type 2: Would they have offered you the job if you weren\'t fluent in French?'
    },
    explanation: `WHAT ARE MIXED CONDITIONALS?
In standard English conditionals, the "if-clause" and the "main result clause" inhabit the same timeframe:
• Second Conditional: Unreal Present Condition → Unreal Present Result (e.g., "If I had money now, I would buy it now").
• Third Conditional: Unreal Past Condition → Unreal Past Result (e.g., "If I had studied harder last year, I would have passed the exam last year").

However, real life is rarely neatly confined to a single timeframe! Actions taken in the past frequently shape who we are and what we experience today, while ongoing traits, habits, and permanent realities have constantly shaped our past outcomes. Mixed Conditionals exist specifically to bridge two different time zones across the condition and the result.

THE TWO MAJOR TYPES OF MIXED CONDITIONALS:

1. TYPE 1: PAST ACTION/CONDITION → PRESENT CONSEQUENCE (Third Conditional IF + Second Conditional RESULT)
   • Formula: If + Past Perfect (had + V3), Subject + would / could / might + Base Verb (V1)
   • Communication Purpose: We look back at an unchangeable event or decision in the past and express its ongoing, observable consequence right now in the present.
   • Conceptual Logic: "Because X didn't happen in the past, Y is not true today."
   • Examples:
     - "If I had accepted that overseas scholarship five years ago, I would be living in Cambridge today." (Past decision -> Present residency)
     - "If they had installed solar panels last winter, their electricity bill would be substantially lower this month."

2. TYPE 2: PRESENT/PERMANENT TRAIT → PAST CONSEQUENCE (Second Conditional IF + Third Conditional RESULT)
   • Formula: If + Past Simple (were / did / didn't), Subject + would / could / might have + Past Participle (V3)
   • Communication Purpose: We state a permanent personality trait, general ability, or enduring current state of affairs, and explain how it influenced a specific event or outcome in the past.
   • Conceptual Logic: "Because I am inherently this type of person right now, I acted or succeeded/failed that way back then."
   • Examples:
     - "If she were more patient with clients, she wouldn't have lost that major account last Tuesday." (She is not patient in general -> lost account in the past)
     - "If I spoke conversational German, I would have translated the contract for the board yesterday." (I don't speak German -> couldn't translate yesterday)

SUBTLE NUANCES WITH MODALS:
• WOULD: Expresses a definite hypothetical outcome ("would be", "would have been").
• COULD: Expresses hypothetical ability or capacity ("could be leading", "could have won").
• MIGHT: Expresses hypothetical possibility, uncertainty, or probability ("might be living", "might have attended").

CRITICAL LEARNING PITFALLS TO AVOID:
1. Never use "would" inside the if-clause. Say "If I had known" (NOT "If I would have known").
2. In formal English (especially at C1/C2 levels), use the subjunctive "were" for all subjects: "If he were more diligent" (preferable to "was").
3. Make sure the timeline contrast is clear by using explicit time markers when needed (e.g., "now", "today", "yesterday", "last year").`,
    explanationKhmer: `សេចក្តីផ្តើមអំពី MIXED CONDITIONALS (ប្រយោគលក្ខខណ្ឌចម្រុះពេលវេលា)៖
នៅក្នុងវេយ្យាករណ៍ភាសាអង់គ្លេសធម្មតា លក្ខខណ្ឌ និងលទ្ធផលតែងតែស្ថិតនៅក្នុងពេលវេលាតែមួយ (Second Conditional សម្រាប់បច្ចុប្បន្ន និង Third Conditional សម្រាប់អតីតកាល)។ ប៉ុន្តែក្នុងជីវិតពិត ព្រឹត្តិការណ៍ក្នុងអតីតកាលតែងតែជះឥទ្ធិពលដល់បច្ចុប្បន្ន ឬចរិតលក្ខណៈអចិន្ត្រៃយ៍ក្នុងបច្ចុប្បន្នបានកំណត់លទ្ធផលកាលពីអតីតកាល។ ហេតុនេះហើយទើបគេប្រើ "Mixed Conditionals" ដើម្បីតភ្ជាប់ពេលវេលាពីរខុសគ្នា!

ប្រភេទចម្បងទាំងពីរនៃ MIXED CONDITIONALS៖

១. ប្រភេទទី ១៖ អតីតកាលប៉ះពាល់បច្ចុប្បន្ន (Past Condition → Present Result)
   • រូបមន្ត៖ If + Past Perfect (had + V3), Subject + would/could/might + Base Verb (V1)
   • គោលបំណង៖ ស្រមើស្រមៃអំពីសកម្មភាពក្នុងអតីតកាលដែលមិនបានកើតឡើង ហើយបង្ហាញពីផលវិបាកដែលកំពុងកើតមាននៅពេលបច្ចុប្បន្ននេះ។
   • ឧទាហរណ៍៖ "If I had studied medicine, I would be a doctor now." (កាលពីមុនមិនបានរៀនពេទ្យ ដូច្នេះឥឡូវនេះមិនមែនជាវេជ្ជបណ្ឌិតទេ)។

២. ប្រភេទទី ២៖ ស្ថានភាព/ចរិតបច្ចុប្បន្នប៉ះពាល់អតីតកាល (Present State → Past Result)
   • រូបមន្ត៖ If + Past Simple (were/V2), Subject + would/could/might have + Past Participle (V3)
   • គោលបំណង៖ បង្ហាញពីចរិតលក្ខណៈ ឬស្ថានភាពអចិន្ត្រៃយ៍របស់មនុស្សម្នាក់ក្នុងពេលបច្ចុប្បន្ន ដែលជាហេតុធ្វើឱ្យមានលទ្ធផលណាមួយកាលពីអតីតកាល។
   • ឧទាហរណ៍៖ "If she were braver, she would have applied for that job last week." (គាត់មិនសូវក្លាហានជាទូទៅ ទើបសប្តាហ៍មុនមិនបានដាក់ពាក្យ)។

ចំណុចសំខាន់ៗដែលត្រូវប្រយ័ត្ន៖
• ហាមប្រើ "would" នៅខាងក្នុងឃ្លា If-clause ជាដាច់ខាត។
• ក្នុងកម្រិតផ្លូវការ (C1) គួរបន្តប្រើ "were" សម្រាប់គ្រប់ប្រធានទាំងអស់ (If I were, If he were, If it were)។
• អាចប្រើ could ឬ might ជំនួស would ដើម្បីបញ្ជាក់ពីសមត្ថភាព ឬលទ្ធភាព។`,
    examples: [
      'If she **had accepted** the scholarship in Boston, she **would be working** at MIT right now.',
      'If I **hadn\'t missed** my morning flight, I **would be attending** the keynote conference today.',
      'If he **were** more fluent in English, he **would have aced** the diplomatic interview yesterday.',
      'If we **had backed up** the database servers yesterday, we **would not be facing** this catastrophic outage now.',
      'If they **had known** about the severe tropical storm, they **would not be stranded** on the island right now.',
      'If I **were not** allergic to seafood, I **would have ordered** the grilled lobster dinner last night.',
      'If she **had trained** with Olympic coaches during her youth, she **would be** a world champion today.',
      'If you **had listened** to my architectural advice, the foundations **would not be cracking** now.',
      'If he **had not resigned** from the executive board, he **would be leading** the new artificial intelligence division today.',
      'If the team **possessed** stronger crisis management skills, they **would have diffused** the scandal much faster last week.',
      'If I **had bought** those shares five years ago, I **would be** financially independent today.',
      'If she **loved** classical music, she **would have attended** the philharmonic symphony concert last weekend.'
    ]
  },

  // ==========================================
  // 14. ZERO CONDITIONAL (B1 / Core)
  // ==========================================
  'Zero Conditional': {
    title: 'Zero Conditional',
    structure: {
      affirmative: 'If/When + Present Simple, Subject + Present Simple (Cause and natural/automatic effect)',
      negative: 'If you don\'t water these desert plants regularly, their foliage doesn\'t thrive.',
      question: 'What happens to sea water if the atmospheric temperature drops below freezing?'
    },
    explanation: `WHAT IS THE ZERO CONDITIONAL?
The Zero Conditional is used to express general truths, scientific facts, immutable laws of nature, automatic cause-and-effect relationships, and habitual routines. In the Zero Conditional, the outcome is 100% guaranteed to happen every time the condition is met.

KEY RULES & PATTERNS:
1. Tenses: Both the condition clause (if-clause) and the result clause use the PRESENT SIMPLE tense.
2. "If" vs. "When": Because the outcome is universally true and invariable, "if" and "when" can almost always be used interchangeably with no change in meaning:
   - "If you heat water to 100°C, it boils." = "When you heat water to 100°C, it boils."
3. Imperatives in Results: The main clause can also be an imperative (command or instruction):
   - "If the alarm sounds, evacuate the building immediately."`,
    explanationKhmer: `សេចក្តីផ្តើមអំពី ZERO CONDITIONAL (លក្ខខណ្ឌប្រភេទសូន្យ)៖
Zero Conditional ត្រូវបានប្រើប្រាស់សម្រាប់បង្ហាញពីការពិតទូទៅ ការពិតបែបវិទ្យាសាស្ត្រ ច្បាប់ធម្មជាតិ ឬទម្លាប់ដែលតែងតែកើតឡើងជានិច្ចនៅពេលដែលលក្ខខណ្ឌមួយត្រូវបានបំពេញ (លទ្ធផលកើតឡើង ១០០%)។

ទម្រង់វេយ្យាករណ៍៖
• If / When + Present Simple, Subject + Present Simple
• ដោយសារលទ្ធផលជាការពិតឥតប្រែប្រួល អ្នកអាចប្រើពាក្យ "when" ជំនួស "if" បានដោយអត្ថន័យនៅដដែល។
• អាចប្រើឃ្លាបញ្ជា (Imperatives) ក្នុងផ្នែកលទ្ធផល៖ "If you have any questions, contact our support team."`,
    examples: [
      'If water **reaches** 100 degrees Celsius at sea level, it **boils** rapidly.',
      'When the sun **sets** over the horizon, the temperature in the valley **drops** noticeably.',
      'If you **press** this red emergency button, the production line **stops** instantly.',
      'Plants **wither** and die if they **do not receive** sufficient sunlight and hydration.',
      'If iron **is exposed** to oxygen and moisture, it **rusts** over time.',
      'When people **exercise** consistently, their cardiovascular endurance **improves**.',
      'If you **mix** yellow and blue pigments, you **obtain** green.',
      'Ice **melts** quickly when you **leave** it on the heated kitchen counter.',
      'If employees **work** overtime on national holidays, the company **pays** them double wages.',
      'When the atmospheric pressure **decreases**, rain clouds **form** more rapidly.',
      'If you **store** dairy products at room temperature, they **spoil** within hours.',
      'If you **have** any doubts about medication dosages, **consult** your physician immediately.'
    ]
  },

  // ==========================================
  // 15. FIRST CONDITIONAL (B1 / Core)
  // ==========================================
  'First Conditional': {
    title: 'First Conditional',
    structure: {
      affirmative: 'If + Present Simple, Subject + will/can/may/should + Base Verb (V1)',
      negative: 'If the weather forecast doesn\'t improve by morning, we won\'t embark on the mountain trail.',
      question: 'Will you accept the job offer in Singapore if the salary meets your expectations?'
    },
    explanation: `WHAT IS THE FIRST CONDITIONAL?
The First Conditional talks about real, possible, and probable future situations and their realistic consequences. Unlike the Zero Conditional (which describes universal facts), the First Conditional addresses specific real-world events that have a high likelihood of occurring in the near future.

KEY RULES & PATTERNS:
1. Sentence Structure:
   - Condition Clause: If + Present Simple (e.g., "If it rains tomorrow...")
   - Result Clause: Subject + will / won't + Base Verb (e.g., "...we will cancel the picnic.")
2. NEVER use "will" in the If-Clause: A very common learner mistake is saying "If it will rain...". Always use the Present Simple after "if"!
3. Modal Alternatives to "Will":
   - CAN: Expresses ability ("If you finish early, you can join us.")
   - MAY / MIGHT: Expresses possibility ("If the train is delayed, we might miss the introductory session.")
   - SHOULD: Expresses advice ("If you feel dizzy, you should sit down.")
4. Alternatives to "If": "Unless" (meaning "if not"), "Provided that", "As long as", "In case".`,
    explanationKhmer: `សេចក្តីផ្តើមអំពី FIRST CONDITIONAL (លក្ខខណ្ឌប្រភេទទីមួយ)៖
First Conditional ត្រូវបានប្រើដើម្បីនិយាយអំពីស្ថានភាពពិតប្រាកដ ឬមានលទ្ធភាពខ្ពស់ក្នុងការកើតឡើងនៅពេលអនាគត និងលទ្ធផលជាក់ស្តែងរបស់វា។

ទម្រង់វេយ្យាករណ៍៖
• If + Present Simple, Subject + will / can / may / should + Base Verb (V1)
• ចំណាំសំខាន់បំផុត៖ ហាមប្រើ "will" នៅខាងក្នុងឃ្លា If-clause ជាដាច់ខាត (និយាយ "If it rains" មិនមែន "If it will rain" ទេ)។
• អាចប្រើពាក្យជំនួស "If" ដូចជា៖ Unless (ប្រសិនបើ...មិន), Provided that (លុះត្រាតែ), As long as (ឱ្យតែ)។`,
    examples: [
      'If the client **approves** the architectural blueprint tomorrow, we **will begin** construction next week.',
      'If you **study** consistently for the IELTS exam, you **will achieve** your target band score.',
      'We **will cancel** the outdoor music festival if the thunderstorm **intensifies**.',
      'If she **submits** her doctoral application before the deadline, the committee **will review** it favorably.',
      'You **can borrow** my company laptop if you **handle** it with care.',
      'If the shipment **does not arrive** by Friday, we **will request** a full commercial refund.',
      'Unless they **lower** their wholesale prices, we **will switch** to a domestic supplier.',
      'If the flight **lands** on schedule, I **will meet** you at the international arrivals terminal.',
      'You **should consult** a financial advisor if you **plan** to invest in overseas real estate.',
      'If the software update **fails**, our IT engineers **will restore** the previous stable version.',
      'Provided that everyone **cooperates**, we **will conclude** this quarterly audit within two days.',
      'If interest rates **rise** further, commercial borrowing **will slow** down noticeably.'
    ]
  },

  // ==========================================
  // 16. SECOND CONDITIONAL (B1 / B2)
  // ==========================================
  'Second Conditional': {
    title: 'Second Conditional',
    structure: {
      affirmative: 'If + Past Simple (were/did), Subject + would/could/might + Base Verb (V1)',
      negative: 'If I didn\'t have so many clinical commitments, I would spend more time writing research papers.',
      question: 'Where would you choose to live if you had the freedom to work remotely anywhere on earth?'
    },
    explanation: `WHAT IS THE SECOND CONDITIONAL?
The Second Conditional is used to imagine hypothetical, counterfactual, or highly unlikely scenarios in the present or future, along with their imagined consequences. We use it when the condition is either impossible or contrary to current reality.

KEY RULES & PATTERNS:
1. Structure: If + Past Simple, Subject + would + Base Verb (V1).
   - Although the verb in the if-clause is in the past tense form, the meaning is strictly PRESENT or FUTURE!
2. The Subjunctive "Were":
   - In formal and standard English, "were" is preferred over "was" for all persons (I, he, she, it):
   - "If I were you, I would take that opportunity." (Giving advice)
   - "If he were honest, he would admit the mistake."
3. Nuanced Modal Variations:
   - "Would" indicates a definite hypothetical consequence.
   - "Could" means "would be able to" (hypothetical capability).
   - "Might" means "would perhaps" (hypothetical possibility).`,
    explanationKhmer: `សេចក្តីផ្តើមអំពី SECOND CONDITIONAL (លក្ខខណ្ឌប្រភេទទីពីរ)៖
Second Conditional ត្រូវបានប្រើដើម្បីស្រមើស្រមៃអំពីស្ថានភាពដែលផ្ទុយពីការពិតក្នុងពេលបច្ចុប្បន្ន ឬស្ទើរតែមិនអាចកើតឡើងបានក្នុងពេលអនាគត និងលទ្ធផលដែលកើតចេញពីការស្រមើស្រមៃនោះ។

ទម្រង់វេយ្យាករណ៍៖
• If + Past Simple (were/V2), Subject + would / could / might + Base Verb (V1)
• ទោះបីជាកិរិយាសព្ទក្នុង If-clause ជាទម្រង់ Past Simple ក៏ដោយ ក៏អត្ថន័យរបស់វាគឺសម្រាប់ "បច្ចុប្បន្ន ឬ អនាគត" ប៉ុណ្ណោះ។
• ក្នុងភាសាផ្លូវការ គេនិយមប្រើ "were" សម្រាប់គ្រប់ប្រធានទាំងអស់៖ "If I were you..." (ប្រសិនបើខ្ញុំជាអ្នក)។`,
    examples: [
      'If I **won** the national innovation grant, I **would establish** a renewable energy laboratory.',
      'If she **lived** closer to the downtown hospital, she **would walk** to work every morning.',
      'If I **were** in your executive position, I **would negotiate** more favorable contract terms.',
      'He **would travel** around the globe if he **possessed** unlimited financial resources.',
      'If we **didn\'t have** this urgent project deadline, we **could attend** the seminar this afternoon.',
      'What **would you do** if someone **handed** you a million dollars with no strings attached?',
      'If they **were** more collaborative, the entire division **would achieve** significantly better results.',
      'She **might accept** the fellowship if the university **offered** on-campus housing.',
      'If I **knew** how to pilot a helicopter, I **would fly** across the Grand Canyon.',
      'If the climate **were** less humid here, tourism **would flourish** even more in the summer.',
      'I **would not hesitate** to resign if management **compromised** our ethical standards.',
      'If you **exercised** more discipline with your schedule, you **would feel** far less overwhelmed.'
    ]
  },

  // ==========================================
  // 17. THIRD CONDITIONAL (B2 / Advanced)
  // ==========================================
  'Third Conditional': {
    title: 'Third Conditional',
    structure: {
      affirmative: 'If + Past Perfect (had + V3), Subject + would/could/might have + Past Participle (V3)',
      negative: 'If the navigator hadn\'t double-checked the coordinates, the vessel wouldn\'t have avoided the reef.',
      question: 'Would you have accepted the transfer to Sydney if the company had covered all relocation expenses?'
    },
    explanation: `WHAT IS THE THIRD CONDITIONAL?
The Third Conditional deals entirely with the PAST. It is used to describe counterfactual past events—situations that DID NOT happen—and to imagine what the past outcome would have been if things had gone differently. It is the language of regret, relief, hindsight, and historical analysis.

KEY RULES & PATTERNS:
1. Structure: If + Past Perfect (had + V3), Subject + would have + Past Participle (V3).
2. Timeframe: 100% in the past. It is too late to change anything because the events are already finalized.
3. Expressing Regret and Relief:
   - Regret: "If I had studied harder, I would have passed." (Reality: I didn't study, so I failed).
   - Relief: "If we hadn't caught that cab, we would have missed the flight." (Reality: We caught it, so we didn't miss it).
4. Modals:
   - "Could have + V3" (would have had the ability/opportunity).
   - "Might have + V3" (perhaps would have happened).`,
    explanationKhmer: `សេចក្តីផ្តើមអំពី THIRD CONDITIONAL (លក្ខខណ្ឌប្រភេទទីបី)៖
Third Conditional ត្រូវបានប្រើប្រាស់សម្រាប់និយាយអំពីព្រឹត្តិការណ៍ក្នុង "អតីតកាល" សុទ្ធសាធ ដែលមិនបានកើតឡើងពិតប្រាកដ (ផ្ទុយពីការពិតក្នុងអតីតកាល)។ គេប្រើវាជាញឹកញាប់ដើម្បីបង្ហាញពីការសោកស្តាយ (Regret) ការធូរទ្រូង (Relief) ឬការវិភាគឡើងវិញនូវប្រវត្តិសាស្ត្រ។

ទម្រង់វេយ្យាករណ៍៖
• If + Past Perfect (had + V3), Subject + would / could / might have + Past Participle (V3)
• សកម្មភាពទាំងពីរបានបញ្ចប់សព្វគ្រប់ក្នុងអតីតកាល ហើយមិនអាចកែប្រែបានឡើយ។
• ឧទាហរណ៍៖ "If I had known, I would have helped." (ការពិតគឺកាលនោះខ្ញុំមិនបានដឹង ទើបខ្ញុំមិនបានជួយ)។`,
    examples: [
      'If the surgeon **had arrived** ten minutes earlier, the patient **would have suffered** fewer complications.',
      'If we **had booked** our flight reservations in advance, we **would have saved** hundreds of dollars.',
      'She **would have graduated** with highest honors if she **had not fallen** severely ill during finals.',
      'If the emergency brakes **had failed**, the train **would have collided** with the stationary carriage.',
      'They **could have prevented** the data breach if they **had updated** their cybersecurity firewall.',
      'If you **had informed** me about the venue change, I **would not have driven** to the wrong address.',
      'The company **might have avoided** bankruptcy if the board **had diversified** their product line.',
      'If he **had listened** to his mentor\'s advice, he **would not have made** such a reckless investment.',
      'We **would have visited** the Louvre Museum if the queues **had not been** so overwhelming.',
      'If the weather **had cooperated** last weekend, our botanical expedition **would have succeeded**.',
      'She **would have been promoted** to senior partner if she **had won** that international arbitration case.',
      'If they **had installed** backup generators, the factory **would not have lost** a full week of production.'
    ]
  },

  // ==========================================
  // 18. INVERTED CONDITIONALS (B2 / C1 / C2)
  // ==========================================
  'Inverted Conditionals': {
    title: 'Inverted Conditionals',
    structure: {
      affirmative: 'Type 1: Should you require... | Type 2: Were I in your position... | Type 3: Had we known the risks...',
      negative: 'Should you not wish to participate... | Were it not for your help... | Had it not been for their intervention...',
      question: 'Should the board reject the proposal, what contingency measures will you initiate?'
    },
    explanation: `WHAT ARE INVERTED CONDITIONALS?
Inverted Conditionals (also known as "Conditionals without IF") are sophisticated, formal grammatical structures where the word "if" is omitted, and the auxiliary verb is moved BEFORE the subject (subject-auxiliary inversion). They are hallmarks of advanced academic, legal, and professional English (CEFR B2, C1, and C2).

THE THREE CLASSIC INVERSIONS:

1. FIRST CONDITIONAL INVERSION (With "Should"):
   • Standard: "If you need any further information, please let me know."
   • Inverted: "Should you need any further information, please let me know."
   • Rule: Replace "If + Subject + Verb" with "Should + Subject + Base Verb". Adds polite formality and reduces the perceived likelihood slightly.

2. SECOND CONDITIONAL INVERSION (With "Were"):
   • With Verb "To Be":
     - Standard: "If I were in your place, I would accept."
     - Inverted: "Were I in your place, I would accept."
   • With Action Verbs (Were + Subject + to + Base Verb):
     - Standard: "If the government raised taxes, citizens would protest."
     - Inverted: "Were the government to raise taxes, citizens would protest."

3. THIRD CONDITIONAL INVERSION (With "Had"):
   • Standard: "If we had realized the implications, we would have acted differently."
   • Inverted: "Had we realized the implications, we would have acted differently."
   • Rule: Drop "If" and invert "Had" and the Subject: "Had + Subject + Past Participle (V3)".

SPECIAL ADVANCED CONSTRUCTIONS:
• "Had it not been for..." (meaning "without" / "if not for" in the past):
  - "Had it not been for your guidance, we would have failed."
• "Were it not for..." (meaning "without" in the present):
  - "Were it not for your dedication, our team would not be so cohesive."`,
    explanationKhmer: `សេចក្តីផ្តើមអំពី INVERTED CONDITIONALS (ប្រយោគលក្ខខណ្ឌទម្រង់បញ្ច្រាស ដោយគ្មាន IF)៖
Inverted Conditionals គឺជាទម្រង់វេយ្យាករណ៍កម្រិតខ្ពស់ (B2, C1, C2) ដែលលុបពាក្យ "If" ចោល ហើយរុញកិរិយាសព្ទជំនួយ (Auxiliary Verb) មកដាក់មុខប្រធាន (Subject)។ ទម្រង់នេះត្រូវបានប្រើប្រាស់យ៉ាងទូលំទូលាយក្នុងអត្ថបទផ្លូវការ ការទូត ឯកសារច្បាប់ និងការសរសេរបែបសិក្សាស្រាវជ្រាវ។

ទម្រង់បញ្ច្រាសសំខាន់ៗទាំង ៣ ប្រភេទ៖

១. ជំនួស First Conditional ដោយប្រើ "Should"៖
   • ទម្រង់ធម្មតា៖ "If you require assistance..."
   • ទម្រង់បញ្ច្រាស៖ "Should you require assistance..." (បង្កើនភាពគួរសម និងផ្លូវការ)។

២. ជំនួស Second Conditional ដោយប្រើ "Were"៖
   • ជាមួយកិរិយាសព្ទ To Be៖ "Were I in your shoes, I would..."
   • ជាមួយកិរិយាសព្ទសកម្មភាព (Were + Subj + to + V1)៖ "Were they to discover the truth, they would..."

៣. ជំនួស Third Conditional ដោយប្រើ "Had"៖
   • ទម្រង់ធម្មតា៖ "If we had known..."
   • ទម្រង់បញ្ច្រាស៖ "Had we known..." (រុញ Had មកមុខប្រធាន)។

ទម្រង់ពិសេសកម្រិត C1/C2៖
• "Had it not been for..." (ប្រសិនបើកាលនោះកុំតែបាន...): "Had it not been for your financial support, the clinic would have closed."
• "Were it not for..." (ប្រសិនបើកុំតែមាន... ក្នុងបច្ចុប្បន្ន): "Were it not for his leadership, our company would be lost."`,
    examples: [
      '**Should you require** any additional documentation, please contact our administrative desk.',
      '**Were I** in your executive position, I would reconsider the acquisition timeline.',
      '**Had we anticipated** this severe market downturn, we would have liquidated our high-risk assets.',
      '**Should any discrepancies arise** during the financial audit, report them directly to the committee.',
      '**Were the company to expand** into Southeast Asian markets, significant capital would be required.',
      '**Had she not intervened** so decisively, the diplomatic crisis would have escalated drastically.',
      '**Had it not been for** your exceptional mentorship, I would never have achieved this promotion.',
      '**Were it not for** persistent international pressure, the cease-fire would not hold today.',
      '**Should the temperature exceed** 40 degrees, the sensitive manufacturing equipment automatically shuts down.',
      '**Were he to resign** unexpectedly, the board of directors would name an interim CEO immediately.',
      '**Had the structural engineers inspected** the bridge earlier, the catastrophic collapse would have been averted.',
      '**Had I known** about your flight delay, I would have rescheduled our dinner reservation.'
    ]
  }
};

/**
 * Searches the comprehensive grammar topics by exact key, case-insensitive match,
 * or cleaned title (removing levels, labels, prefixes).
 */
export function getGrammarTopicData(topicOrKey: string): LessonContent | null {
  if (!topicOrKey) return null;
  const clean = topicOrKey.trim();

  // 1. Direct exact match
  if (COMPREHENSIVE_GRAMMAR_TOPICS[clean]) {
    return COMPREHENSIVE_GRAMMAR_TOPICS[clean];
  }

  // 2. Extract core topic from cache keys like 'lesson_Levels_C1_Mixed Conditionals' or 'lesson_PartsOfSpeech__Noun'
  const keyParts = clean.split('_');
  const lastPart = keyParts[keyParts.length - 1]?.trim();
  if (lastPart && COMPREHENSIVE_GRAMMAR_TOPICS[lastPart]) {
    return COMPREHENSIVE_GRAMMAR_TOPICS[lastPart];
  }

  // 3. Case-insensitive match
  const lower = clean.toLowerCase();
  for (const key of Object.keys(COMPREHENSIVE_GRAMMAR_TOPICS)) {
    if (key.toLowerCase() === lower) {
      return COMPREHENSIVE_GRAMMAR_TOPICS[key];
    }
  }

  if (lastPart) {
    const lastPartLower = lastPart.toLowerCase();
    for (const key of Object.keys(COMPREHENSIVE_GRAMMAR_TOPICS)) {
      if (key.toLowerCase() === lastPartLower) {
        return COMPREHENSIVE_GRAMMAR_TOPICS[key];
      }
    }
  }

  // 4. Targeted smart alias mapping for conditionals and advanced grammar
  if (lower.includes('mixed conditional')) {
    return COMPREHENSIVE_GRAMMAR_TOPICS['Mixed Conditionals'];
  }
  if (lower.includes('zero conditional')) {
    return COMPREHENSIVE_GRAMMAR_TOPICS['Zero Conditional'];
  }
  if (lower.includes('first conditional')) {
    return COMPREHENSIVE_GRAMMAR_TOPICS['First Conditional'];
  }
  if (lower.includes('second conditional')) {
    return COMPREHENSIVE_GRAMMAR_TOPICS['Second Conditional'];
  }
  if (lower.includes('third conditional')) {
    return COMPREHENSIVE_GRAMMAR_TOPICS['Third Conditional'];
  }
  if (
    lower.includes('inverted conditional') || 
    lower.includes('inversion in conditional') || 
    lower.includes('inversion in conditionals') || 
    lower.includes('without if') ||
    lower.includes('had i known') ||
    lower.includes('advanced conditional')
  ) {
    return COMPREHENSIVE_GRAMMAR_TOPICS['Inverted Conditionals'];
  }

  // 5. Normalized topic matching (e.g., 'Nouns' -> 'Noun', 'Pronouns' -> 'Pronoun')
  const singularCandidates = [
    clean.replace(/s$/i, ''),
    clean.replace(/\b(basics|topic|lesson|grammar)\b/gi, '').trim()
  ];
  for (const candidate of singularCandidates) {
    if (!candidate) continue;
    for (const key of Object.keys(COMPREHENSIVE_GRAMMAR_TOPICS)) {
      if (key.toLowerCase() === candidate.toLowerCase() || candidate.toLowerCase().includes(key.toLowerCase())) {
        return COMPREHENSIVE_GRAMMAR_TOPICS[key];
      }
    }
  }

  return null;
}
