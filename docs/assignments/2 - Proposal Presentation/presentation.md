---
Title: Class Registration Assistant
Author:
- Anabelle VanDenburgh
- Connor Fitzgerald
- Matt Stewart
---

# What are we Building?

## Project Idea 
- assigned to Sierra

baza hint:

> what is the problem that your system solves? give statistics !!!

## Existing Works
- An existing work that we're trying to improve on is the College of Charleston class registration system.
- The pros of this service
- 1. You can't sign up for classes that conflict with your schedule.
- 2. Shows you the fees that the classes will add to your bill.
- 3. Has direct CRN lookup so you don't have to search for the class you want.
- The cons of this service
- 1. There are no recommendations for what classes to take, you instead must view degree works to see what classes you're missing.
- 2. No reminders about when to sign up so if you miss your sign-ups you might not get a class you need for graduation.
- 3. Have to compete with other students to get the classes you need for graduation.

- Our system will address these limitations by being able to filter classes by major and get recommendations for what classes to take based on major these two solutions simplify the registration process for students just looking to complete what they need for their major. The registration assistant will also send the student reminders about when registration starts and the registration assistant will automatically register the student for classes they desire ahead of time which eliminates the chance of missing sign-ups.



## Stakeholders.
- assigned to Matt
- Explain the stakeholders with the role(s) of each stakeholder.
- at least 3-4 stakeholders needed

## Requirements
- assigned to Sierra

### Functional
### Non-Functional

# How are we Building it?

## Proposed System Design
- Assigned to Anabelle

## Process
- We will be using the Agile development model for our project because it offers several benefits.
- 1. Early and Continuous Delivery: Agile prioritizes the delivery of working software early and often, which helps in identifying issues, gathering feedback, and making necessary adjustments early in the development process.
- 2. Improved Quality: Frequent testing and quality assurance activities are integral to Agile. This results in higher software quality, as issues are detected and resolved promptly, reducing the chances of delivering a buggy product.
- 3. Risk Management: Agile encourages risk mitigation through regular assessment and adaptation. By breaking down the project into smaller, manageable increments, it becomes easier to identify and manage risks effectively.
- 4.  Customer involvement: Agile encourages the active involvement of customers and end-users throughout the development process, ensuring that the product aligns with their expectations and needs.


## Timeline
- Assigned to Anabelle
- will probably get group approval for this
- will use mermaid.live to make gannt chart

```mermaid

```

## Risk Analysis
- Time Risk: All projects suffer the inherent risk of going over their alloted development time. Whether it be due to troubleshooting, difficulty in implementation/launching, or changes to the project based on feedback causing it to extend past deadlines, there is continual risk of not being able to follow our projected timeline. To mitigate time issues, the project will be developed using an Agile development model as covered previously.
- Database Risk: As no personal user data will be stored on an external server, there is minimal risk to stakeholders in the event of a database breach; all personally-identifiable information(PII) will be maintained at the user-level. As such, no mitigation is needed for this risk.
-Resource Risk: To prevent development from being delayed or outright stopped due to lack of proper development tools or funds, this project will be run using public, open-source software on personal equipment, developed primarily in a Linux environment. In the event of individual personal equipment failure, there are backup laptops available for use in development as needed, with all project data being stored on the cloud to prevent catastrophic data loss in the event of equipment damage or loss. Any additional costs for the project (such as server-related costs of hosting, domain name registration, etc.) will be handled by the development team on an as-needed basis.
- Functionality Risk: The goal of this project is to create an easier process for CofC students to determine their class schedule, find appropriate classes, and overall improve the registration process we currently have access to via MyPortal. Due to the availability of base registration functionality already being accessible to end users, there is a risk involved in this project that it either does not bring any additional functionality to this process than what is currently available or is presented in a manner that makes it unintuitive or too difficult for end users to want to use it. As such, as end-users ourselves, the development team have our own list of additional functionality we want to implement to help mitigate this risk. In addition, as part of the agile development process, implementing additional functionality, removing unused functionality, or improving accessibility to the end user will be done based on feedback or timing constraints on a rolling basis.

## Development Tools
- [Bun](?)
- [Hono]
- [SQLite]
- [Python]
- [jQuery]
- [Pandoc]

## Budget
- Nothing Required
- Domain name
  - classes.anabelle.dev - Free
  - cougarclass.es - $20
  - cougarclasses.org - $8
- Self-Hosting with own computer - Free

## Contingency Plans
- We could probably use Apache if [Bun] becomes unstable

<!--Links-->
[Bun]:             bun.sh
[Hono]:	           hono.dev
[SQLite]:	   sqlite.org
[Python]:          python.org
[jQuery]:          jquery.com
[Pandoc]:          pandoc.org
