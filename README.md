## Bitcoin Nexus  
!(live)(https://tmnguyen12.github.io/js-project/)

### Background and Overview
Bitcoin has had a meteoric rise in media coverage over the last year as well as record breaking increases in value that has never before been seen in modern-day finance. Why is that? What caused it? The bitcoin nexus will provide a time series chart that follows bitcoins price. Users will be able to click on specific moments in time that had significant influence into the changes in bitcoin price. 

### Functionality & MVP
- [ ] Provide a time series chart of bitcoin prices
- [ ] Be able to click on a highlight bubble that will show articles that could explain major causes of price fluctuation
- [ ] Thumbnails of the articles will display
- [ ] Clicking on the thumbnail will open a new tab for the user

### Wireframes

### Architecture and Technologies
This project will be implemented with the following technologies:
- D3.js for the time series interactive chart
- coindesk API will be used to pull bitcoin index pricing
- anime.js will be used for thumbnail animations
- Webpack to bundle and serve the various scripts.

### Implementation Timeline
**Day 1** Setup all necessary Node modules including webpack and package.json. Display pricing data in D3. Goals for the day:
- [ ] Get webpack serving files and frame out index.html
- [ ] Pull data pricing information from coindesk API and save to a CSV 
- [ ] Display the pricing information in a D3 chart 

**Day 2** Add the highlight bubbles to the chart 
- [ ] Display highlight bubbles in the chart to designate significant moments in time 
- [ ] Manually compile news information that will be showed in these highlight bubbles 

**Day 3** Complete time scale chart
- [ ] Complete implementation of time scale chart

**Day 4** Make sure the thumbnails show up in a visually pleasing way
- [ ] Animate thumbnails
- [ ] Put final aesthetic touches on finished webpage

### Bonus features
- [ ] Create a Node.js backend to house indexes and keywords
- [ ] Create your own webpage crawler to search specific cryptocurrency sites for news to display for every date in the timeline 
- [ ] Develop a better algorithm to show choose which news articles to display
- [ ] Setup the coindesk API for real time updating of price 
- [ ] Integrate the reddit API to provide articles for every date (filtering will be done with javascript)
