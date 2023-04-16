# Budgeting App
- update - added schema and diagram, in views.py you can see the currency conversion api calls, I have my own user class, and the react app is set to build into the django
- I've managed to get it on AWS but I'm already trying to turn it off because I don't understand the pay tiers.  I can get it up and running if that helps looking at it

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
  - 


## Purpose
All information will require a login, providing viewing and changing data associated with the user.

Users will be able to add expenses and view/change all in Expenses page

The home page will include a summary of expenses and compare them to a user designated budget for all categories.

## API's
Beyond the site database, the website will incorporate the option to put the cost of expenses in other currency.  Then the backend will call the Currency conversion api to convert to USD.  Everything will be stored and displayed in USD.

For a second API, I haven't found anything terribly pertinent.  The Noun API can be used to add a picture to expenses based off the name or category.

## SQL schema

![drawSQL-budget-export-2023-04-10](https://user-images.githubusercontent.com/59803742/230972320-09fc6c53-67fb-4f3a-855f-4b579cf02130.png)

## Application wire frame
![Wire 1](https://user-images.githubusercontent.com/59803742/230976491-0f8677fb-86c7-4056-9413-a51d4ea73b2a.png)