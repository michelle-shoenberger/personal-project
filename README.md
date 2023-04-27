# Beyond Budget


## Versions
- 1
- 2
  - 2.1 - routing, children for expense page
  - 2.2 - filter persists, fixed state in expenses
  - 2.3 - re-structure of useContext, appLoader added
- 3 
  - 3.1 - adding historicals, updated build
  - 3.2 - add currency options
  - 3.3 - add signup
  - 3.4 - expenses page update, update form, crud expenses
  - 3.5 - added dates for expense forms
  - 3.6 - profile page added
  - 3.7 - total budget added
- 4 - first deployed version
  - 4.1 - fixed api calls
  - 4.2 - updated signup call
  - 4.3 - added quotes api call
- 5 - update to user sign up process
  - 5.1 - redesign of login, auto generate initial profile and fix logout
  - 5.2 - restyle of home page
  - 5.3 - 


## How to use 
This app offers versatility in tracking expenses and visualizing a budget.  

The user can set their own categories on the profile page.  With each category, the user can set a unique limit.  Setting the total budget allows the comparison to the sum of all expenses for the month.

The homepage consists of a short-cut to add a new expense and a snapshot of the progress through this month's budget.  This progress is visualized through a tabular view of each category's totals, a bar chart displaying the total expenses in each category, and a pie chart representing the percentage of total expense for each category.

The expenses page lets you filter all expenses by name or category.  Clicking on an expense sends you to the detail page where all the details can be edited and updated.

Finally the history page tracks expenses by month for the last year.  The monthly totals show overall expenses per month.  The scatter plot below breaks this figure out by category.  To see details at each point, hover over the dot with your mouse.

## External API's
Beyond the site database, the website will incorporate the option to put the cost of expenses in other currency.  Then the backend will call the Currency conversion api to convert to USD.  Everything will be stored and displayed in USD.

For a second API, I haven't found anything terribly pertinent.  The Noun API can be used to add a picture to expenses based off the name or category.

## SQL schema

![drawSQL-budget-export-2023-04-10](https://user-images.githubusercontent.com/59803742/230972320-09fc6c53-67fb-4f3a-855f-4b579cf02130.png)

## Application wire frame
![Wire 1](https://user-images.githubusercontent.com/59803742/230976491-0f8677fb-86c7-4056-9413-a51d4ea73b2a.png)