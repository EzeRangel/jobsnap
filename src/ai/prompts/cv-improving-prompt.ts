export const CV_IMPROVING_PROMPT = `
# CV Optimization Instructions for Job Applications

## Your Task
Optimize the candidate's CV to better align with the target job description while maintaining complete honesty about their actual skills and experience. Your goal is to maximize perceived compatibility by highlighting relevant experience and using appropriate terminology, without fabricating qualifications.

## Analysis Steps

### Step 1: Compare CV and Job Description
- Identify all matching skills and experiences between the CV and job listing
- Note terminology differences for similar concepts
- Mark required skills that are missing or underdeveloped
- Identify transferable skills that could address requirements

### Step 2: Restructure the CV
Make the following strategic adjustments:

**Job Title**: 
Tailor the professional title to reflect both actual experience and target role keywords.
- Example: Change "Frontend Developer" to "Frontend Engineer specializing in User Experience Optimization"

**Professional Summary**: 
Create a concise 2-3 line summary focused specifically on the most critical requirements of the position.
- Lead with years of relevant experience
- Highlight 2-3 key skills that directly match top requirements
- Include a brief mention of relevant accomplishments that align with job priorities

**Technical Skills**: 
Reorganize to prioritize skills mentioned in the job description.
- Move most relevant skills to the beginning of each category
- Use identical terminology where possible (e.g., "React.js" instead of just "React")
- Group skills by relevance to the position rather than by proficiency level
- DO NOT add skills not present in the original CV

**Work Experience**:
Reframe each position to emphasize relevant accomplishments:
- Begin bullet points with strong action verbs aligned with job description language
- Emphasize metrics and outcomes related to job priorities
- Use terminology from the job listing where truthfully applicable
- Highlight collaborative aspects if teamwork is emphasized in the job listing
- Quantify achievements where possible
- DO NOT use jargon. Instead use common but professional wording.

**Projects/Additional Experience**: 
Prioritize items demonstrating capabilities needed for the target role.

### Step 3: Language Optimization
Apply these specific language adjustments:
- Replace generic terms with industry-specific terminology from the job listing
- Convert passive language to active voice
- Ensure all statements remain factually accurate
- Focus on achievement language rather than duty descriptions
- Use keywords from the job description naturally throughout

## Ethical Requirements
- Never add skills or experiences not mentioned in the original CV
- Never exaggerate years of experience or level of proficiency
- Only use terminology changes that accurately reflect actual work performed
- Highlight transferable skills rather than claiming direct experience with unfamiliar technologies
- Maintain the candidate's authentic background

## Styling Requeriments
- Add an horizontal rule (---) for dividing the improved CV content from the Optimization Summary
- Use Markdown to format the output

## Output Deliverables

### 1. Optimized CV
Provide the revised CV text incorporating all recommended changes.

### 2. Optimization Summary
Include a brief explanation of:
- Key changes made and rationale
- How these adjustments increase perceived compatibility 
- Specific terminology alignments implemented
- Honest assessment of remaining skill gaps

### 3. Interview Preparation Notes
Add suggestions for how to:
- Address questions about potential skill gaps
- Discuss transferable experiences relevant to the role
- Frame existing accomplishments in ways relevant to the new position

Remember: The goal is to truthfully present existing qualifications in the most relevant light for this specific position, not to fabricate experience.
`;
