questions
- switching between list and detail - between holding it all in app, or in another parent component, or passing the information between pages
  - it's supposed to be a single-page
- conditional routing - can I make a master route that goes away once logged in
- re-renders from props/context/loaders
  - no updating after initial render

# Versions
- 1

- 2
  - 2.1 - routing, children for expense page
  - 2.2 - filter persists, fixed state in expenses
  - 



- look into separate context files - with state
- make separate api call folder



# To do list
- Setup django api
- Setup budget react front-end


## Front-end work
+ navigation
  + create navbar
  + functional nav links
    + brand
    + expenses
  + add user button
    - avatar for user
    - dropdown for profile, settings, logout
  + conditional routing - only access the log in page until logged in
    + go to home once whoami comes back
      - is this the best way?

+ routing
  + layout - appnav and main page, footer
  + home page
  + Expenses page
    + expense list
    + expense detail

- authentication
  + layout - can't access other pages until logged in
  + pull expenses/cats/summary based on user
    - else return nothing - navigate to login
  - api auth - require token for get/post

### Login page
- features
  - log in form
  - sign up form - auto log in



+ login in user
  + form
  + return data
  + set to cookie - persistence
  + set user state
  + auto log back in - pull from cookie, using token
    - stretch - JWT - AuthO
+ tie user state to context
+ complex context
  + setUser function
+ make it the screen until logged in
- sign up 
  - create form
  - create path

### Home page
- features
  + new expense form
  + summary
    + totals by all, and category
    + table 
    + stretch - graph - pie chart
    - stretch - for this month
      - leave picking a date range for the archives
  + consumption of budget
    + compare expense in each category against limit - % left
    + stretch - chart
    - stretch - ryg indicator - day by day targets

- summary
  - total expenditure - for this month
    + table of expenses ending in total
    + stretch - pie char
  - status of budget
    + $X of $X used
      - % used
    - stretch - bar graph of % for each category
    - stretch - ryg indicator
      - track consumption on a per day basis

- state
  - totals - pulled from api

+ creating form
  + MyForm component to create
  - adding keys - am I rendering it right?
  + make categories field a category field
+ submitting new object
  + return FormData
  + axios post
  + return success
    + notification of success
    + navigate to expenses
      - offer to route to expense detail page
+ summary
  + state - totals
  + table with summary totals
  + stretch - add pie chart
+ budget summary
  + add bar chart
  - add gyr indicator
- make the summary page for current month
- stretch - toggle - choose new or summary

### Expense page
- control expenses state
- either list all or show details

- state
  - expenses - called from api initially on page, not changed
  - currentList - taking in a filter, is a part of the expenses state
    - passed to expense list as prop
    - setfunction in useEffect when filter changes
  - filterObj

- stretch - set up context for filter (obj, setFunction)


#### Filter
- features
  + filter list of expenses
    + by name
    + by category
    - stretch - by date range, by both

+ add filter 
  + by name
    + add text input
    + onChange link to filterName
    + useEffect changes currentList - using expenses
  + by category
    + make selection input off categories

#### Expenses list
- features
  + list all user expenses
    - stretch - each has an expansion for more info (accordion)
    - stretch - pagination
  + item-name links to detail
  - stretch - present total summary at top
    - stretch - find a way to minimize

- prop
  - currentList - expense objects to list
- state
  - total - summing up list
    - should be up with the currentList? 
- navigation - from navbar
  - auto nav after creating an expense? give option

+ API call
  + set up axios call
  + set up useEffect - setting state on startup
    + only make api call initially
+ list - as ListGroup
  + create custom ExpenseListItem - contains name, date, cost
  + make list of ExpenseListItems from currentList
  + sort by date - recent to last
    - stretch - create button to reverse sort
  + add total cost for everything in list


#### Expense detail 
- features
  - list all information on expense
  - stretch - present form for updating 
    - pre-fill with current information
  - route back to currentList

- state 
  - expense - individual object
    - passed by parent loader
    - useState filters for id (param)
- navigation - from expense list

+ list details
  + simple list
  - pass down categories
  - stretch - form
  - stretch - image (api call)
+ nav - 
  + set listitem - onclick as Link
+ route back to list - same list
  + Link


### Archives page
- features
  - 


## Back-end work
- stretch
  - have expense list only return needed items; make another call for detail

- models
  - Expense
  - Category
  - User

- Expense
  - item_name - name of item bought
    - how to denote multiples, like groceries, when all still in one category
  - category - foreign key
    - add default to Other
  - date - defaulting to today
  - cost - decimal (2places), for price
  - description
    - allow Null
  - user

- User
  - categories - many to many
  - expenses - reverse reference
  - budget_total - decimal
    - auto update category fields

- Budget - through table for User and Categories
  - user_id - foreignkey
  - category_id - foreignkey
  - limit - decimal - exact amount
    - stretch - percentage of budget total

### Custom views

- summary - return summary data
  - for current month
    - stretch - with date range
  + return total overall
  + return total per category
  - 

- gyr indicator - on track or off track
  - stretch - add yellow criteria
  - defining on track 
    - divide cat limit by 30 - per day
      - stretch - use days in current month
    - multiply per day by current day of the month - requires knowing the date
  - compare with current total - > equals 'r', <= equals 'g'

- set up view
  + get queryset of expenses
    - for current user
    - for current month
  + create total object 
  + get queryset of categories
    - ? for current user
  + create totals
    + for loop through expenses
    + keep counter for full total
  + return Json


# Site design
- Universal nav bar
  - User icon - link to profile
  - Login button until logged in

- Login screen - dual login/signup
  - Signup automatically logs in

- Home screen
  - Add an expense - auto fill with current time
  - Summary of expenses - for timeframe
    - total expense
    - totals in each category
- List all screen
  - filter option


# Project planning
- Budget
  - start out on login page
  - emphasis on this month
  - home page
    - add new expense
    - month's summary
  - expenses page
    - list - all expenses for month
    - detail 
    - stretch - filter to change date range

  - archives
    - stretch - how to catelogue for past months


- Budget features
  + add expense - post expense object
  + list expenses - pull all expense objects for user 
    + filter expenses - by date, category(ies), name; expense data
  - edit expense - change any field, pre-populate
  + summarize expenses - manipulate expense objects data
    - for current month
    - stretch - add archives - monthly results for multiple years
    - stretch - comparisons for year, comparisons between same months of different years
  + stretch - make a budget - post budget object, by month
    + set total
    + set total for each category
    - stretch - divide up for smaller timeframes
  + stretch - show progress on budget
    + compare totals in expenses to budget limit by categories
    - stretch - include smaller periods of time, any time frame, using dates
    + stretch - graphics
  - stretch - make new category
  - stretch - show historicals
    - show excess from time frame
    - archives - from tiime frame, show expenses or show budget comparison

- how to store data for historical analysis





- Django api requirements
  - expense objects - viewset
    - list all
    - create new
    - update
  - for all objects


- Budget database
  - Expenses - time, date, amount, category, user, description/comment, item
    - could be multiple categories - many to many
      - starting with one to many
    - user - one to many, foreign key
  - Categories - name
    - expenses - many to many
  - Manager?
  - Budget - total, name, month, year
    - categories - with limit (through table), percentage of total or set
    - user - one to many, users can have multiple
    - completed boolean - after timeframe, add to historicals
  - User
    - stretch - update 