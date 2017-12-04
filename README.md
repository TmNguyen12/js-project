## Bitcoin Nexus  

### Background and Overview
Bitcoin has had a meteoric rise in media coverage over the last year as well as record breaking increases in value that has never before been seen in modern-day finance. Why is that? What caused it? The bitcoin nexus will provide a time series chart that follows bitcoins price. Users can click on specific dates and will be provided with a display of links and thumnbnails showing news stories that were trending that date, providing unique insight into understanding the trends and forces that influence this cryptocurrencies erratic fluctuations.

### Functionality & MVP
- [ ] Provide a time series chart of bitcoin prices
- [ ] Be able to click on a date and have relevant news articles display
- [ ] Thumbnails of the articles will display
- [ ] Clicking on the thumbnail will open a new tab for the user

### Wireframes

### Architecture and Technologies
This project will be implemented with teh following technologies:
- D3.js or Chart.js for the time series interactive chart
- coindesk API will provide real-time bitcoin index pricing
- reddit API will provide top news articles for that date (filtering will be done with javascript)
- anime.js will be used for thumbnail animations
- Webpack to bundle and serve teh various scripts.


### Implementation Timeline
**Day 1** Setup all necessary Node modules including webpack and package.json. Confirm the data from both APIs, sorting and filtering algorithm for reddit decided. Goals for the day:
- [ ] Get webpack serving files and fram eout index.html
- [ ] Confirm you can pull data and display from the coinbase and reddit APIs
- [ ] Decide how you're going to filter out the noise from reddit posts and implement that sorting algorithm
- [ ] See if you can display the thumbnails for certain dates on the page.
  api_utils.js
  filtering.js
  main.js

**Day 2** Learn about and implement the time scale chart
- [ ] Research Chart.js or D3 and figure out how you are going to implement the technology
- [ ] Begin implementation
timeline.js

**Day 3** Complete time scale chart
- [ ] Complete implementation of time scale chart

**Day 4** Make sure the thumbnails show up in a visually pleasing way
- [ ] Animate thumbnails
- [ ] Put final aesthetic touches on finished webpage

### Bonus features
- [ ] Create a Node.js backend to house indexes and keywords
- [ ] Create your own webpage crawler to search specific cryptocurrency sites for news
- [ ] Develop a better algorithm to show choose which news articles to display
